// // pageMetadata.js — Full file
// // Centralized metadata (title / description) for every page/route.
// // To add a new page: just add a new entry below with the route path as key.

// const SITE_NAME = "4Health Homeopathy";

// const pageMetadata = {
//   // ───────────── Website Routes ─────────────
//   "/": {
//     title: `Home | ${SITE_NAME}`,
//     description: "4Health Homeopathy - Natural healing, trusted care.",
//   },
//   "/about-us": {
//     title: `About Us | ${SITE_NAME}`,
//     description: "Learn more about 4Health Homeopathy and our doctors.",
//   },
//   "/treatments": {
//     title: `Services | ${SITE_NAME}`,
//     description: "Explore the homeopathy services we offer.",
//   },
//   "/blog": {
//     title: `Blog | ${SITE_NAME}`,
//     description: "Read our latest articles on homeopathy and wellness.",
//   },
//   "/contact-us": {
//     title: `Contact Us | ${SITE_NAME}`,
//     description: "Get in touch with 4Health Homeopathy.",
//   },
//   "/diet-paln": {
//     title: `Diet Plan | ${SITE_NAME}`,
//     description: "Personalized diet plans for better health.",
//   },
//   "/login": {
//     title: `Login | ${SITE_NAME}`,
//     description: "Login to your account.",
//   },
//   "/testimonial": {
//     title: `Testimonials | ${SITE_NAME}`,
//     description: "See what our patients say about us.",
//   },
//   "/homeopathy": {
//     title: `Homeopathy | ${SITE_NAME}`,
//     description: "Understanding homeopathy treatment.",
//   },
//   "/wellness-program": {
//     title: `Wellness Program | ${SITE_NAME}`,
//     description: "Join our wellness programs for a healthier life.",
//   },
//   "/online-consultation": {
//     title: `Online Consultation | ${SITE_NAME}`,
//     description: "Book an online consultation with our doctors.",
//   },

//   // ───────────── Admin Routes ─────────────
//   "/admin/dash": {
//     title: `Dashboard | Admin | ${SITE_NAME}`,
//     description: "Admin dashboard overview.",
//   },
//   "/admin/user": {
//     title: `Users | Admin | ${SITE_NAME}`,
//     description: "Manage users.",
//   },
//   "/admin/enquire": {
//     title: `Enquiries | Admin | ${SITE_NAME}`,
//     description: "Manage customer enquiries.",
//   },
//   "/admin/appoinment": {
//     title: `Appointments | Admin | ${SITE_NAME}`,
//     description: "Manage appointments.",
//   },
//   "/admin/blog": {
//     title: `Blogs | Admin | ${SITE_NAME}`,
//     description: "Manage blog posts.",
//   },
//   "/admin/add-blog": {
//     title: `Add Blog | Admin | ${SITE_NAME}`,
//     description: "Add a new blog post.",
//   },
//   "/admin/blog-details": {
//     title: `Blog Details | Admin | ${SITE_NAME}`,
//     description: "View blog details.",
//   },
//   "/admin/treatment": {
//     title: `Services | Admin | ${SITE_NAME}`,
//     description: "Manage services.",
//   },
//   "/admin/add-treatment": {
//     title: `Add Service | Admin | ${SITE_NAME}`,
//     description: "Add a new service.",
//   },
//   "/admin/treatment-details": {
//     title: `Service Details | Admin | ${SITE_NAME}`,
//     description: "View service details.",
//   },
// };

// // Fallback metadata for any route not listed above
// export const defaultMetadata = {
//   title: SITE_NAME,
//   description: "4Health Homeopathy - Natural healing, trusted care.",
// };

// export default pageMetadata;


// pageMetadata.js — Full file
// Centralized metadata (title / description) for every page/route.
// To add a new page in code: just add a new entry below with the route path as key.
//
// Admin-panel editing support:
// Edits made from /admin/settings/general are stored in localStorage under
// STORAGE_KEY as { "/path": { title, description } } and are merged on top
// of the defaults below via getPageMetadata(). This means the admin panel
// can "override" any title/description without touching this file again.

const SITE_NAME = "4Health Homeopathy";
const STORAGE_KEY = "pageMetadataOverrides";

const pageMetadata = {
  // ───────────── Website Routes ─────────────
  "/": {
    title: `Home | ${SITE_NAME}`,
    description: "4Health Homeopathy - Natural healing, trusted care.",
  },
  "/about-us": {
    title: `About Us | ${SITE_NAME}`,
    description: "Learn more about 4Health Homeopathy and our doctors.",
  },
  "/treatments": {
    title: `Services | ${SITE_NAME}`,
    description: "Explore the homeopathy services we offer.",
  },
  "/blog": {
    title: `Blog | ${SITE_NAME}`,
    description: "Read our latest articles on homeopathy and wellness.",
  },
  "/contact-us": {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Get in touch with 4Health Homeopathy.",
  },
  "/diet-paln": {
    title: `Diet Plan | ${SITE_NAME}`,
    description: "Personalized diet plans for better health.",
  },
  "/login": {
    title: `Login | ${SITE_NAME}`,
    description: "Login to your account.",
  },
  "/testimonial": {
    title: `Testimonials | ${SITE_NAME}`,
    description: "See what our patients say about us.",
  },
  "/gallery": {
  title: `Gallery | ${SITE_NAME}`,
  description: "Browse photos of our clinic, treatments, wellness programs and patient results.",
},
  "/wellness-program": {
    title: `Wellness Program | ${SITE_NAME}`,
    description: "Join our wellness programs for a healthier life.",
  },
  "/online-consultation": {
    title: `Online Consultation | ${SITE_NAME}`,
    description: "Book an online consultation with our doctors.",
  },

  // ───────────── Admin Routes ─────────────
  "/admin/dash": {
    title: `Dashboard | Admin | ${SITE_NAME}`,
    description: "Admin dashboard overview.",
  },
  "/admin/user": {
    title: `Users | Admin | ${SITE_NAME}`,
    description: "Manage users.",
  },
  "/admin/enquire": {
    title: `Enquiries | Admin | ${SITE_NAME}`,
    description: "Manage customer enquiries.",
  },
  "/admin/appoinment": {
    title: `Appointments | Admin | ${SITE_NAME}`,
    description: "Manage appointments.",
  },
  "/admin/blog": {
    title: `Blogs | Admin | ${SITE_NAME}`,
    description: "Manage blog posts.",
  },
  "/admin/add-blog": {
    title: `Add Blog | Admin | ${SITE_NAME}`,
    description: "Add a new blog post.",
  },
  "/admin/blog-details": {
    title: `Blog Details | Admin | ${SITE_NAME}`,
    description: "View blog details.",
  },
  "/admin/treatment": {
    title: `Services | Admin | ${SITE_NAME}`,
    description: "Manage services.",
  },
  "/admin/add-treatment": {
    title: `Add Service | Admin | ${SITE_NAME}`,
    description: "Add a new service.",
  },
  "/admin/treatment-details": {
    title: `Service Details | Admin | ${SITE_NAME}`,
    description: "View service details.",
  },
  "/admin/testimonial": {
    title: `Testimonials | Admin | ${SITE_NAME}`,
    description: "Manage testimonials.",
  },
  "/admin/settings/general": {
    title: `General Settings | Admin | ${SITE_NAME}`,
    description: "Manage SEO titles and descriptions for every page.",
  },
};

// Fallback metadata for any route not listed above
export const defaultMetadata = {
  title: SITE_NAME,
  description: "4Health Homeopathy - Natural healing, trusted care.",
};

// ───────────── Admin-override helpers ─────────────

// Reads the saved overrides object from localStorage ({} if none / corrupt)
export const getOverrides = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

// Saves the full overrides object back to localStorage
export const saveOverrides = (overrides) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
};

// Updates (or clears, if data is null) the override for a single path
export const setOverrideForPath = (path, data) => {
  const overrides = getOverrides();
  if (data === null) {
    delete overrides[path];
  } else {
    overrides[path] = data;
  }
  saveOverrides(overrides);
  return overrides;
};

// Returns the final metadata for a path: admin override (if any) > default
export const getPageMetadata = (path) => {
  const overrides = getOverrides();
  const base = pageMetadata[path] || defaultMetadata;
  const override = overrides[path];
  return override ? { ...base, ...override } : base;
};

// Returns the full merged list — used by the admin "Page Metadata" screen
// so it can show every known route plus its current (possibly overridden) values.
export const getAllPageMetadata = () => {
  const overrides = getOverrides();
  const paths = Array.from(
    new Set([...Object.keys(pageMetadata), ...Object.keys(overrides)])
  );
  return paths
    .sort()
    .map((path) => {
      const base = pageMetadata[path] || defaultMetadata;
      const override = overrides[path];
      return {
        path,
        title: override?.title ?? base.title,
        description: override?.description ?? base.description,
        isOverridden: Boolean(override),
        defaultTitle: base.title,
        defaultDescription: base.description,
      };
    });
};

export default pageMetadata;