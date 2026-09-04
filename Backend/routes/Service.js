const express = require("express");
const fs = require("fs");
const path = require("path");
const upload = require("../middlewares/upload");
const Service = require("../models/Service");
const generateId = require("../CommonIdGenerate/GenerateId");

const router = express.Router();

// Service forms can contain one main image plus dynamic condition image fields
// such as conditionImage_0, conditionImage_1, etc.  Keep the multer error
// inside this route so an invalid image does not become a generic HTTP 500.
const serviceUpload = (req, res, next) => {
  upload.any()(req, res, (error) => {
    if (!error) {
      return next();
    }

    return res.status(400).json({
      message: error.message || "Unable to upload service image",
    });
  });
};

const slugify = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => String(item || "").trim())
          .filter(Boolean);
      }
    } catch (_error) {
      return value
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
};

const parseBoolean = (value) => value === true || value === "true";

const parseConditions = (value) => {
  if (!value) {
    return [];
  }

  let parsed = value;

  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch (_error) {
      parsed = value
        .split(/\r?\n|,/)
        .map((item) => ({
          title: item.trim(),
          description: "",
          symptoms: [],
          howWeHelp: [],
          image: "",
          removeImage: false,
        }))
        .filter((item) => item.title);
    }
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .map((item) => {
      if (typeof item === "string") {
        return {
          title: item.trim(),
          description: "",
          symptoms: [],
          howWeHelp: [],
          image: "",
          removeImage: false,
        };
      }

      return {
        title: String(item?.title || "").trim(),
        description: String(
          item?.description ?? item?.content ?? "",
        ).trim(),
        symptoms: parseArray(item?.symptoms),
        howWeHelp: parseArray(item?.howWeHelp),
        image: String(item?.image || "").trim(),
        removeImage: parseBoolean(item?.removeImage),
      };
    })
    .filter((item) => item.title);
};

const parseNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const buildUniqueSlug = async (title, requestedSlug, excludeId = null) => {
  const baseSlug = slugify(requestedSlug || title) || `service-${Date.now()}`;
  let slug = baseSlug;
  let counter = 2;

  while (
    await Service.exists({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
};

const removeUploadedImage = (imagePath) => {
  if (!imagePath || !imagePath.startsWith("/uploads/")) {
    return;
  }

  const absolutePath = path.join(__dirname, "..", imagePath.replace(/^\//, ""));

  try {
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error("Unable to remove service image:", error.message);
  }
};

const uploadedFiles = (req) => {
  if (Array.isArray(req.files)) return req.files;
  if (req.file) return [req.file];
  if (req.files && typeof req.files === "object") {
    return Object.values(req.files).flat();
  }
  return [];
};

const getUploadedFile = (req, fieldname) =>
  uploadedFiles(req).find((file) => file.fieldname === fieldname) || null;

const cleanupRequestUploads = (req) => {
  uploadedFiles(req).forEach((file) => {
    removeUploadedImage(`/uploads/${file.filename}`);
  });
};

const getImagePath = (req, existingImage = "") => {
  const mainImage = getUploadedFile(req, "image");

  if (mainImage) {
    return `/uploads/${mainImage.filename}`;
  }

  if (req.body.removeImage === "true") {
    return "";
  }

  return req.body.image || existingImage;
};

const attachConditionImages = (req, conditions = []) =>
  conditions.map((condition, index) => {
    const conditionFile = getUploadedFile(req, `conditionImage_${index}`);
    const nextImage = conditionFile
      ? `/uploads/${conditionFile.filename}`
      : condition.removeImage
        ? ""
        : condition.image || "";

    const { removeImage: _removeImage, ...cleanCondition } = condition;
    return {
      ...cleanCondition,
      image: nextImage,
    };
  });

const extractConditionImages = (conditions = []) => {
  if (!Array.isArray(conditions)) return [];

  return conditions
    .map((condition) => {
      if (!condition || typeof condition === "string") return "";
      return String(condition.image || "").trim();
    })
    .filter(Boolean);
};

const normalizeBody = async (req, existing = null) => {
  const body = req.body || {};
  const image = getImagePath(req, existing?.image || "");
  const slug = await buildUniqueSlug(
    body.title || existing?.title,
    body.slug || existing?.slug,
    existing?._id,
  );

  const parsedConditions =
    body.conditions !== undefined
      ? parseConditions(body.conditions)
      : parseConditions(existing?.conditions || []);

  return {
    title: String(body.title || existing?.title || "").trim(),
    slug,
    category: String(
      body.category || existing?.category || "Homeopathy",
    ).trim(),
    status: body.status === "Inactive" ? "Inactive" : "Active",
    description: String(
      body.description || existing?.description || "",
    ).trim(),
    image,
    doctors: parseNumber(body.doctors, existing?.doctors || 0),
    patients: parseNumber(body.patients, existing?.patients || 0),
    conditions: attachConditionImages(req, parsedConditions),
    quote:
      body.quote !== undefined
        ? String(body.quote || "").trim()
        : existing?.quote || "",
    approach:
      body.approach !== undefined
        ? String(body.approach || "").trim()
        : existing?.approach || "",
    displayOrder: parseNumber(body.displayOrder, existing?.displayOrder || 0),
  };
};

router.get("/service", async (req, res) => {
  try {
    const filter = {};

    if (req.query.status === "Active" || req.query.status === "Inactive") {
      filter.status = req.query.status;
    }

    const services = await Service.find(filter)
      .select("-icon")
      .sort({ displayOrder: 1, createdAt: 1 });

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/service/slug/:slug", async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug.toLowerCase(),
      status: "Active",
    }).select("-icon");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/service/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).select("-icon");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/service", serviceUpload, async (req, res) => {
  try {
    const serviceData = await normalizeBody(req);

    if (!serviceData.title || !serviceData.description) {
      cleanupRequestUploads(req);
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    serviceData.service_id = await generateId("service_id");
    const service = await Service.create(serviceData);

    return res.status(201).json(service);
  } catch (error) {
    cleanupRequestUploads(req);
    return res.status(500).json({ message: error.message });
  }
});

router.put("/service/:id", serviceUpload, async (req, res) => {
  try {
    const existing = await Service.findById(req.params.id);

    if (!existing) {
      cleanupRequestUploads(req);
      return res.status(404).json({ message: "Service not found" });
    }

    const oldImage = existing.image;
    const oldConditionImages = extractConditionImages(existing.conditions);
    const updateData = await normalizeBody(req, existing);

    if (!updateData.title || !updateData.description) {
      cleanupRequestUploads(req);
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
        $unset: {
          icon: 1,
          symptoms: 1,
          howWeHelp: 1,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (oldImage && oldImage !== updated.image) {
      removeUploadedImage(oldImage);
    }

    const retainedConditionImages = new Set(
      extractConditionImages(updated.conditions),
    );
    oldConditionImages.forEach((imagePath) => {
      if (!retainedConditionImages.has(imagePath)) {
        removeUploadedImage(imagePath);
      }
    });

    return res.status(200).json(updated);
  } catch (error) {
    cleanupRequestUploads(req);
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/service/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    removeUploadedImage(service.image);
    extractConditionImages(service.conditions).forEach(removeUploadedImage);

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;