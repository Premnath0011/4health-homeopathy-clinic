const express = require("express");
const { blogUpload } = require("../middlewares/upload");
const router = express.Router();
const Blog = require("../models/Blog");
const generateId = require("../CommonIdGenerate/GenerateId.js");

const parseBoolean = (value, fallback = false) => {
  if (typeof value === "boolean") return value;
  if (value === undefined || value === null || value === "") return fallback;

  return ["true", "1", "yes", "on"].includes(
    String(value).trim().toLowerCase(),
  );
};

const parseSections = (sections) => {
  if (!sections) return [];
  if (Array.isArray(sections)) return sections;
  if (typeof sections === "string") return JSON.parse(sections);
  return [];
};

const escapeRegex = (value = "") =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// POST — create blog
router.post("/blog", blogUpload.single("image"), async (req, res) => {
  try {
    const blogId = await generateId("blog_id");
    const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : "";

    const blogData = {
      ...req.body,
      blog_id: blogId,
      image: imagePath,
      sections: parseSections(req.body.sections),
      isPopular: parseBoolean(req.body.isPopular, false),
    };

    const newBlog = await Blog.create(blogData);
    return res.status(201).json(newBlog);
  } catch (error) {
    console.error("Blog POST error:", error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({
        message: "Invalid blog sections JSON.",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
});

// GET — blogs with optional public/admin filters
router.get("/blog", async (req, res) => {
  try {
    const query = {};

    if (req.query.blog_status) {
      query.blog_status = req.query.blog_status;
    }

    if (req.query.category) {
      query.category = {
        $regex: `^${escapeRegex(req.query.category)}$`,
        $options: "i",
      };
    }

    if (req.query.isPopular !== undefined) {
      query.isPopular = parseBoolean(req.query.isPopular, false);
    }

    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 0, 0),
      100,
    );

    let databaseQuery = Blog.find(query).sort({
      date: -1,
      createdAt: -1,
      _id: -1,
    });

    if (limit > 0) {
      databaseQuery = databaseQuery.limit(limit);
    }

    const blogs = await databaseQuery;
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// GET — single blog by id
router.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// PUT — update blog
router.put("/blog/:id", blogUpload.single("image"), async (req, res) => {
  try {
    const existing = await Blog.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    let imagePath = existing.image;

    if (req.file) {
      imagePath = `/uploads/blogs/${req.file.filename}`;
    } else if (req.body.removeImage === "true") {
      imagePath = "";
    }

    const updateBody = {
      ...req.body,
      image: imagePath,
      sections: parseSections(req.body.sections),
      isPopular:
        req.body.isPopular === undefined
          ? existing.isPopular
          : parseBoolean(req.body.isPopular, existing.isPopular),
    };

    delete updateBody.keepExistingImage;
    delete updateBody.removeImage;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateBody,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Blog PUT error:", error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({
        message: "Invalid blog sections JSON.",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
});

// PATCH — select or remove a Popular Article
router.patch("/blog/:id/popular", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    blog.isPopular =
      req.body.isPopular === undefined
        ? !blog.isPopular
        : parseBoolean(req.body.isPopular, blog.isPopular);

    await blog.save();

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// PATCH — increment view count
router.patch("/blog/:id/view", async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE — remove blog
router.delete("/blog/:id", async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Data Not Found",
      });
    }

    return res.status(200).json({
      message: "Data Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
