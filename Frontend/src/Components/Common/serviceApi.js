import Apiurl from "../AdminPanel/Environmnet/Apiurl";

export const SERVICE_API_URL = `${Apiurl}/service`;
export const API_SERVER_URL = Apiurl.replace(/\/api\/?$/, "");

export const resolveServiceImage = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  if (image.startsWith("/uploads/")) {
    return `${API_SERVER_URL}${image}`;
  }

  return image;
};

export const stripHtml = (html = "") =>
  String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

export const listToText = (items = []) =>
  Array.isArray(items) ? items.join("\n") : "";

export const textToList = (value = "") =>
  String(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeStringList = (items = []) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => String(item || "").trim())
    .filter(Boolean);
};

export const normalizeConditions = (
  conditions = [],
  legacySymptoms = [],
  legacyHowWeHelp = [],
) => {
  if (!Array.isArray(conditions)) {
    return [];
  }

  return conditions
    .map((condition) => {
      if (typeof condition === "string") {
        return {
          title: condition.trim(),
          description: "",
          symptoms: normalizeStringList(legacySymptoms),
          howWeHelp: normalizeStringList(legacyHowWeHelp),
          image: "",
        };
      }

      return {
        _id: condition?._id,
        title: String(condition?.title || "").trim(),
        description: String(
          condition?.description ?? condition?.content ?? "",
        ).trim(),
        symptoms: normalizeStringList(
          Array.isArray(condition?.symptoms)
            ? condition.symptoms
            : legacySymptoms,
        ),
        howWeHelp: normalizeStringList(
          Array.isArray(condition?.howWeHelp)
            ? condition.howWeHelp
            : legacyHowWeHelp,
        ),
        image: String(condition?.image || "").trim(),
      };
    })
    .filter((condition) => condition.title);
};
