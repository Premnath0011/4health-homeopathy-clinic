// Blog.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowRight, FiSearch, FiMail, FiArrowLeft } from "react-icons/fi";
import {
  FaRegCalendarAlt,
  FaChevronRight,
  FaLeaf,
  FaBone,
  FaAllergies,
  FaFemale,
  FaChild,
  FaBrain,
  FaAppleAlt,
  FaSpa,
  FaShieldAlt,
  FaBed,
  FaFileAlt,
  FaSpinner,
} from "react-icons/fa";
import Footer from "./Footer/Footer";
import blogHero from "../../assets/Image/Blog/blog-banner.webp";
import Apiurl from "../AdminPanel/Environmnet/Apiurl";


// ── Scroll Reveal ──
function useReveal(deps = []) {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .bl-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .bl-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      * { scrollbar-width: none; }
      *::-webkit-scrollbar { width: 0px; background: transparent; }
      * { -ms-overflow-style: none; } 
      
      .blog-category-scroll {
  scrollbar-width: thin;
  scrollbar-color: #4ba86a #eef7f1;
}

.blog-category-scroll::-webkit-scrollbar {
  width: 8px;
}

.blog-category-scroll::-webkit-scrollbar-track {
  background: #eef7f1;
  border-radius: 10px;
}

.blog-category-scroll::-webkit-scrollbar-thumb {
  background: #4ba86a;
  border-radius: 10px;
  border: 2px solid #eef7f1;
}

.blog-category-scroll::-webkit-scrollbar-thumb:hover {
  background: #3a8a56;
}

.blog-category-scroll {
  -ms-overflow-style: auto;
}
    `;
    document.head.appendChild(style);

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("bl-visible");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".bl-reveal").forEach((el) => obs.observe(el));
    return () => {
      obs.disconnect();
      document.head.removeChild(style);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ── Category badge color map ──
const categoryColorMap = {
  Homeopathy: "#2E8B57",
  Wellness: "#1583a8",
  Research: "#9C27B0",
  Immunity: "#FF9800",
  Pediatrics: "#b2790f",
  Allergy: "#c23a63",
  "Joint Health": "#0f6baf",
  "Mental Health": "#7142c2",
  "Skin Care": "#2d8f4e",
  "Digestive Health": "#16826b",
  "Women's Health": "#c13c8b",
  "Children's Health": "#b2790f",
  "Sleep Health": "#6047c2",
  Default: "#6B7280",
};

const getCategoryColor = (category) =>
  categoryColorMap[category] || categoryColorMap.Default;

const resolveBlogImage = (image) => {
  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  return `${Apiurl.replace(/\/api\/?$/, "")}${image}`;
};

const formatBlogDate = (value) => {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const categoryIconMap = {
  Allergy: <FaAllergies />,
  "Joint Health": <FaBone />,
  "Skin Care": <FaSpa />,
  "Women's Health": <FaFemale />,
  "Children's Health": <FaChild />,
  "Mental Health": <FaBrain />,
  "Digestive Health": <FaAppleAlt />,
  Wellness: <FaLeaf />,
  Immunity: <FaShieldAlt />,
  "Sleep Health": <FaBed />,
};


// ════════════════════════════════════════════════════════════════
// ARTICLE DETAIL VIEW
// ════════════════════════════════════════════════════════════════
const ArticleDetail = ({ article, onBack, colors }) => {
  const { greenColor, blueDark, muted, border } = colors;

  // Increment view count when article is opened
  useEffect(() => {
    if (article?._id) {
      axios.patch(`${Apiurl}/blog/${article._id}/view`).catch(() => {});
    }
  }, [article?._id]);

  return (
    <div className="bl-reveal bl-visible">
      <button
        onClick={onBack}
        className="d-flex align-items-center gap-2 mb-4 p-0 border-0 bg-transparent"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 700,
          color: greenColor,
          cursor: "pointer",
        }}
      >
        <FiArrowLeft size={15} /> Back to Articles
      </button>

      {/* Featured Image */}
      {article.image && (
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 24,
            maxHeight: 320,
          }}
        >
          <img
            src={resolveBlogImage(article.image)}
            alt={article.title}
            style={{
              width: "100%",
              height: 320,
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <span
        className="d-inline-block mb-3"
        style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          padding: "6px 14px",
          borderRadius: 20,
          color: "#fff",
          background: getCategoryColor(article.category),
        }}
      >
        {article.category || "General"}
      </span>

      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 34px)",
          fontWeight: 800,
          color: blueDark,
          margin: "0 0 14px",
          lineHeight: 1.25,
        }}
      >
        {article.title}
      </h1>

      <div
        className="d-flex align-items-center gap-3 mb-4 flex-wrap"
        style={{ fontSize: "0.8rem", color: "#8a96a3" }}
      >
        <span className="d-flex align-items-center gap-1">
          <FaRegCalendarAlt size={12} /> {formatBlogDate(article.date)}
        </span>
        <span
          className="d-flex align-items-center gap-1"
          style={{ color: greenColor, fontWeight: 600 }}
        >
          {article.author}
        </span>
      </div>

      <hr style={{ borderColor: border, margin: "0 0 28px" }} />

      {/* Render sections from backend */}
      {article.sections && article.sections.length > 0
        ? article.sections.map((sec, i) => (
            <div key={i} className="mb-4">
              {sec.heading && (
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: blueDark,
                    margin: "0 0 14px",
                  }}
                >
                  {sec.heading}
                </h2>
              )}
              {sec.content && (
                <div
                  className="blog-content"
                  style={{
                    fontSize: "0.92rem",
                    color: muted,
                    lineHeight: 1.85,
                  }}
                  dangerouslySetInnerHTML={{ __html: sec.content }}
                />
              )}
            </div>
          ))
        : // Fallback: render combined content HTML if sections are empty
          article.content && (
            <div
              className="blog-content"
              style={{ fontSize: "0.92rem", color: muted, lineHeight: 1.85 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// PAGINATION COMPONENT
// ════════════════════════════════════════════════════════════════
const Pagination = ({ currentPage, totalPages, onPageChange, colors }) => {
  const { greenColor, blueDark, border } = colors;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) end = Math.min(5, totalPages - 1);
      if (currentPage >= totalPages - 2) start = Math.max(totalPages - 4, 2);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-5 bl-reveal"
      aria-label="Blog pagination"
    >
      <button
        disabled={currentPage === 1}
        className="d-flex align-items-center gap-2 px-3 py-2 border rounded-2 bg-white"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: currentPage === 1 ? "#9aa7b5" : "#233143",
          borderColor: border,
          opacity: currentPage === 1 ? 0.45 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          transition: "background 0.25s ease, color 0.25s ease",
        }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        onMouseEnter={(e) => {
          if (currentPage > 1) {
            e.currentTarget.style.background = blueDark;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = blueDark;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color =
            currentPage === 1 ? "#9aa7b5" : "#233143";
          e.currentTarget.style.borderColor = border;
        }}
      >
        <FaChevronRight size={11} style={{ transform: "rotate(180deg)" }} />
        Previous
      </button>

      <ul className="d-flex align-items-center gap-2 list-unstyled m-0 p-0">
        {pageNumbers.map((num, idx) => (
          <li
            key={idx}
            className="d-flex align-items-center justify-content-center"
            style={{
              width: num === "..." ? "auto" : 34,
              height: num === "..." ? "auto" : 34,
              padding: num === "..." ? "0 2px" : 0,
              borderRadius: num === "..." ? 0 : 8,
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: num === "..." ? "default" : "pointer",
              background: num === currentPage ? greenColor : "transparent",
              color:
                num === "..."
                  ? "#9aa7b5"
                  : num === currentPage
                    ? "#fff"
                    : "#233143",
              transition: "background 0.25s ease, color 0.25s ease",
            }}
            onClick={() => num !== "..." && onPageChange(num)}
            onMouseEnter={(e) => {
              if (num !== "..." && num !== currentPage)
                e.currentTarget.style.background = "#E8F5ED";
            }}
            onMouseLeave={(e) => {
              if (num !== "..." && num !== currentPage)
                e.currentTarget.style.background = "transparent";
            }}
          >
            {num}
          </li>
        ))}
      </ul>

      <button
        disabled={currentPage === totalPages}
        className="d-flex align-items-center gap-2 px-3 py-2 border rounded-2 bg-white"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: currentPage === totalPages ? "#9aa7b5" : "#233143",
          borderColor: border,
          opacity: currentPage === totalPages ? 0.45 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          transition: "background 0.25s ease, color 0.25s ease",
        }}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        onMouseEnter={(e) => {
          if (currentPage < totalPages) {
            e.currentTarget.style.background = blueDark;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = blueDark;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color =
            currentPage === totalPages ? "#9aa7b5" : "#233143";
          e.currentTarget.style.borderColor = border;
        }}
      >
        Next <FaChevronRight size={11} />
      </button>
    </nav>
  );
};

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
const Blog = () => {
  const navigate = useNavigate();

  // ── State ──
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const articlesRef = useRef(null);
  const articlesPerPage = 6;

  useReveal([selectedBlog, currentPage, loading, categoryFilter, searchTerm]);

  // ── Fetch published blogs from backend once ──
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${Apiurl}/blog`, {
          params: { blog_status: "published" },
        });

        const published = (Array.isArray(res.data) ? res.data : []).filter(
          (blog) => !blog.blog_status || blog.blog_status === "published",
        );

        setBlogs(published);
      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [selectedBlog, currentPage]);

  // ── Colors ──
  const greenColor = "#4BA86A";
  const greenDark = "#3a8a56";
  const blueDark = "#0F3D6E";
  const muted = "#5F6B7A";
  const border = "#E8EDF2";
  const colors = { greenColor, blueDark, muted, border };

  // Categories are generated only from published articles.
  const categories = useMemo(() => {
    const counts = blogs.reduce((accumulator, blog) => {
      const category = String(blog.category || "Uncategorized").trim();
      accumulator[category] = (accumulator[category] || 0) + 1;
      return accumulator;
    }, {});

    return Object.entries(counts)
      .map(([label, count]) => ({ label, count }))
      .sort((first, second) => first.label.localeCompare(second.label));
  }, [blogs]);

  // The website card displays the latest five articles selected by the admin.
  const popularArticles = useMemo(
    () => blogs.filter((blog) => Boolean(blog.isPopular)).slice(0, 5),
    [blogs],
  );

    // ── Filtered & paginated blogs ──
  const filteredBlogs = blogs.filter((b) => {
    const matchSearch =
      !searchTerm ||
      (b.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.author || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      !categoryFilter ||
      (b.category || "").toLowerCase() === categoryFilter.toLowerCase();
    return matchSearch && matchCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / articlesPerPage),
  );
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentPosts = filteredBlogs.slice(
    startIndex,
    startIndex + articlesPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setCurrentPage(1);
  };

  const handleBack = () => {
    setSelectedBlog(null);
    setCurrentPage(1);
  };

  const handleCategoryClick = (label) => {
    setCategoryFilter((prev) => (prev === label ? null : label));
    setCurrentPage(1);
    setSelectedBlog(null);

    // Mobile only: after choosing a category, move back to the
    // beginning of the article list so the filtered results are visible.
    if (window.innerWidth <= 767) {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          if (!articlesRef.current) return;

          const top =
            articlesRef.current.getBoundingClientRect().top +
            window.scrollY -
            78;

          window.scrollTo({
            top: Math.max(0, top),
            behavior: "smooth",
          });
        }, 0);
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSelectedBlog(null);
  };

  return (
    <div
      className="blog-page"
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#233143",
        background: "#ffffff",
        overflowX: "hidden",
      }}
    >
      {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
      <section
        className="blog-hero-section"
        style={{
          background: `linear-gradient(135deg, #f8faf8 0%, #f2f8f3 25%, #e9f5ec 65%, #dff1e5 100%)`,
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
        }}
      >
        <FaLeaf
          style={{
            position: "absolute",
            top: 26,
            right: 36,
            fontSize: 70,
            opacity: 0.13,
            color: greenColor,
            transform: "rotate(18deg)",
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        />
        <FaLeaf
          style={{
            position: "absolute",
            bottom: 20,
            left: 30,
            fontSize: 70,
            opacity: 0.13,
            color: greenColor,
            transform: "rotate(-25deg)",
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        />

        <div className="container-fluid px-0">
          <div className="row g-0 blog-hero-row" style={{ minHeight: 480 }}>
            <div
              className="col-lg-6 col-12 d-flex align-items-center bl-reveal blog-hero-content"
              style={{
                padding: "80px 48px 60px 10%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="w-100 text-center text-lg-start">
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: greenColor,
                    marginBottom: 14,
                  }}
                >
                  Our Blog
                </span>
                <h1
                  style={{
                    fontSize: "clamp(32px, 4vw, 50px)",
                    fontWeight: 800,
                    color: blueDark,
                    lineHeight: 1.15,
                    margin: "0 0 18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Knowledge for
                  <br />
                  <span style={{ color: greenColor }}>Better Health</span>
                </h1>
                <p
                  className="mx-auto mx-lg-0"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: muted,
                    maxWidth: 460,
                    margin: "0 0 28px",
                  }}
                >
                  Expert insights, natural health tips, and homeopathy solutions
                  for a healthier, happier you.
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  role="search"
                  className="mx-auto mx-lg-0 blog-search-form"
                  style={{
                    display: "flex",
                    maxWidth: 420,
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 4px 24px rgba(15,61,110,0.10)",
                    padding: 6,
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search articles..."
                    aria-label="Search articles"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      padding: "10px 14px",
                      fontSize: "0.88rem",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#233143",
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    style={{
                      background: greenColor,
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = greenDark)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = greenColor)
                    }
                  >
                    <FiSearch size={16} />
                  </button>
                </form>
              </div>
            </div>

            <div
              className="col-lg-6 d-none d-lg-block bl-reveal"
              style={{
                position: "relative",
                minHeight: 480,
                overflow: "hidden",
              }}
            >
              <img
                src={blogHero}
                alt="Natural homeopathy remedies and herbs"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "left center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  background: `linear-gradient(to right, #e9f5ec 0%, rgba(233,245,236,.98) 12%, rgba(233,245,236,.85) 28%, rgba(233,245,236,.45) 48%, transparent 75%)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: "none",
                  background: `linear-gradient(to bottom, rgba(248,250,248,0.95) 0%, rgba(242,248,243,0.75) 15%, rgba(233,245,236,0.35) 35%, transparent 60%)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 2 — ARTICLES + SIDEBAR ═══════════════ */}
      <section className="py-5 blog-articles-section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="row">
            {/* ── Sidebar ── */}
            <div className="col-lg-4 mt-4 mt-lg-0 blog-sidebar" style={{ order: 2 }}>
              {/* About Our Blog */}
              <div
                className="bl-reveal p-4 mb-4 position-relative overflow-hidden blog-sidebar-card"
                style={{
                  background: "#f4f8fb",
                  border: "1px solid #e2eef6",
                  borderRadius: 24,
                  boxShadow: "0 4px 24px rgba(15,61,110,0.08)",
                }}
              >
                <FaLeaf
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 16,
                    fontSize: 32,
                    color: greenColor,
                    opacity: 0.35,
                    transform: "rotate(15deg)",
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                />
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: blueDark,
                    margin: "0 0 14px",
                  }}
                >
                  About Our Blog
                </h4>
                <p
                  style={{
                    fontSize: "0.86rem",
                    lineHeight: 1.7,
                    color: muted,
                    margin: "0 0 14px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Our blog is dedicated to spreading awareness about natural
                  healing, homeopathic treatments, and healthy living. Stay
                  informed with expert articles by our experienced homeopaths.
                </p>
                <span
                  style={{
                    display: "block",
                    width: 36,
                    height: "2.5px",
                    background: "#c9a96e",
                  }}
                />
              </div>

              {/* Categories */}
              <div
                className="bl-reveal p-4 mb-4 blog-sidebar-card blog-categories-card"
                style={{
                  background: "#fff",
                  border: `1px solid ${border}`,
                  borderRadius: 24,
                  boxShadow: "0 4px 24px rgba(15,61,110,0.08)",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: blueDark,
                    margin: "0 0 14px",
                  }}
                >
                  Categories
                </h4>
                <div
  className="blog-category-scroll"
  style={{
    maxHeight: "520px",
    overflowY: "scroll",
    overflowX: "hidden",
    paddingRight: "6px",
    scrollbarGutter: "stable",
  }}
>
  <ul className="list-unstyled m-0 p-0">
                  {categories.map(({ label, count }, i) => {
                    const isActive = categoryFilter === label;
                    const icon = categoryIconMap[label] || <FaFileAlt />;
                    return (
                      <li
                        key={label + i}
                        className="d-flex align-items-center justify-content-between py-2"
                        style={{
                          borderBottom:
                            i < categories.length - 1
                              ? `1px solid ${border}`
                              : "none",
                          cursor: "pointer",
                          color: isActive ? greenColor : "#233143",
                          fontWeight: isActive ? 700 : 500,
                          transition: "color 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive)
                            e.currentTarget.style.color = greenColor;
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive)
                            e.currentTarget.style.color = "#233143";
                        }}
                        onClick={() => handleCategoryClick(label)}
                      >
                        <span
                          className="d-flex align-items-center gap-3"
                          style={{ fontSize: "0.88rem" }}
                        >
                          <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              background: isActive ? greenColor : "#E8F5ED",
                              color: isActive ? "#fff" : greenColor,
                              fontSize: "0.78rem",
                              flexShrink: 0,
                              transition: "all 0.2s",
                            }}
                          >
                            {icon}
                          </span>
                          <span>{label}</span>
                          <span
                            style={{
                              color: isActive ? "#ffffff" : "#8a96a3",
                              fontSize: "0.72rem",
                              marginLeft: "auto",
                            }}
                          >
                            {count}
                          </span>
                        </span>
                        <FaChevronRight
                          size={11}
                          style={{ color: isActive ? greenColor : "#b6c0cb" }}
                        />
                      </li>
                    );
                  })}
                </ul>
                </div>
                {categoryFilter && (
                  <button
                    onClick={() => {
                      setCategoryFilter(null);
                      setCurrentPage(1);
                    }}
                    style={{
                      marginTop: 12,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#D63C3C",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    ✕ Clear filter
                  </button>
                )}
              </div>

              {/* Popular Articles */}
              <div
                className="bl-reveal p-4 blog-sidebar-card"
                style={{
                  background: "#fff",
                  border: `1px solid ${border}`,
                  borderRadius: 24,
                  boxShadow: "0 4px 24px rgba(15,61,110,0.08)",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: blueDark,
                    margin: "0 0 14px",
                  }}
                >
                  Popular Articles
                </h4>
                {popularArticles.length > 0 ? (
                  <ul className="list-unstyled m-0 p-0">
                    {popularArticles.map((article, index) => (
                      <li
                        key={article._id || article.blog_id || index}
                        className="d-flex align-items-center gap-3 py-2"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleReadMore(article)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            handleReadMore(article);
                          }
                        }}
                        style={{
                          borderBottom:
                            index < popularArticles.length - 1
                              ? `1px solid ${border}`
                              : "none",
                          cursor: "pointer",
                          borderRadius: 10,
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.background = "#F4FBF7";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.background = "transparent";
                        }}
                      >
                        {article.image ? (
                          <img
                            src={resolveBlogImage(article.image)}
                            alt={article.title}
                            style={{
                              width: 56,
                              height: 56,
                              borderRadius: 12,
                              objectFit: "cover",
                              flexShrink: 0,
                              background: "#E8F5ED",
                            }}
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: 56,
                              height: 56,
                              borderRadius: 12,
                              flexShrink: 0,
                              background: "#E8F5ED",
                              color: greenColor,
                            }}
                          >
                            <FaFileAlt />
                          </span>
                        )}

                        <div style={{ minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: "0.84rem",
                              fontWeight: 650,
                              color: "#233143",
                              lineHeight: 1.4,
                              margin: "0 0 4px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {article.title}
                          </p>
                          <span style={{ fontSize: "0.74rem", color: "#9aa7b5" }}>
                            {formatBlogDate(article.date)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    style={{
                      padding: "14px 4px 4px",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                      color: muted,
                    }}
                  >
                    No popular articles selected yet.
                  </div>
                )}
              </div>
            </div>

            {/* ── Main Column ── */}
            <div
              ref={articlesRef}
              className="col-lg-8 blog-main-column"
              style={{ order: 1 }}
            >
              {selectedBlog ? (
                <ArticleDetail
                  article={selectedBlog}
                  onBack={handleBack}
                  colors={colors}
                />
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 bl-reveal">
                    <h2
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: 800,
                        color: blueDark,
                        letterSpacing: "-0.01em",
                        margin: 0,
                      }}
                    >
                      {categoryFilter ? (
                        <>
                          <span style={{ color: greenColor }}>
                            {categoryFilter}
                          </span>{" "}
                          Articles
                        </>
                      ) : searchTerm ? (
                        <>
                          Results for{" "}
                          <span style={{ color: greenColor }}>
                            "{searchTerm}"
                          </span>
                        </>
                      ) : (
                        <>
                          Latest{" "}
                          <span style={{ color: greenColor }}>Articles</span>
                        </>
                      )}
                    </h2>
                    <span style={{ fontSize: "0.82rem", color: muted }}>
                      {filteredBlogs.length} article
                      {filteredBlogs.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Loading State */}
                  {loading && (
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: 300, gap: 14 }}
                    >
                      <FaSpinner
                        size={32}
                        color={greenColor}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                      <p
                        style={{ color: muted, fontSize: "0.9rem", margin: 0 }}
                      >
                        Loading articles...
                      </p>
                      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                    </div>
                  )}

                  {/* Error State */}
                  {!loading && error && (
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{
                        minHeight: 280,
                        background: "#fff5f5",
                        borderRadius: 18,
                        border: "1px solid #fecaca",
                        gap: 12,
                      }}
                    >
                      <p
                        style={{ color: "#D63C3C", fontWeight: 600, margin: 0 }}
                      >
                        {error}
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        style={{
                          background: greenColor,
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "8px 20px",
                          fontSize: "0.84rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Empty State */}
                  {!loading && !error && filteredBlogs.length === 0 && (
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{ minHeight: 280, gap: 10 }}
                    >
                      <span style={{ fontSize: 48 }}>📭</span>
                      <p style={{ color: muted, fontWeight: 600, margin: 0 }}>
                        {searchTerm || categoryFilter
                          ? "No articles match your search."
                          : "No articles published yet."}
                      </p>
                      {(searchTerm || categoryFilter) && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setCategoryFilter(null);
                          }}
                          style={{
                            background: "none",
                            border: `1px solid ${border}`,
                            borderRadius: 8,
                            padding: "6px 16px",
                            fontSize: "0.82rem",
                            color: muted,
                            cursor: "pointer",
                            marginTop: 4,
                          }}
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  )}

                  {/* Blog Cards Grid */}
                  {!loading && !error && filteredBlogs.length > 0 && (
                    <>
                      <div className="row g-4 blog-card-grid">
                        {currentPosts.map((post, index) => {
                          const badgeBg = getCategoryColor(post.category);
                          return (
                            <div
                              className="col-md-6 col-lg-4 bl-reveal blog-card-col"
                              key={post._id || index}
                            >
                              <article
                                className="d-flex flex-column h-100 blog-card"
                                style={{
                                  background: "#fff",
                                  border: `1px solid ${border}`,
                                  borderRadius: 18,
                                  overflow: "hidden",
                                  boxShadow: "0 2px 14px rgba(15,61,110,0.05)",
                                  transition:
                                    "transform 0.3s ease, box-shadow 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(-6px)";
                                  e.currentTarget.style.boxShadow =
                                    "0 16px 34px rgba(15,61,110,0.12)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                  e.currentTarget.style.boxShadow =
                                    "0 2px 14px rgba(15,61,110,0.05)";
                                }}
                              >
                                {/* Card Image */}
                                <div
                                  style={{
                                    width: "100%",
                                    height: 170,
                                    overflow: "hidden",
                                    background: "#E8F5ED",
                                  }}
                                >
                                  {post.image ? (
                                    <img
                                      src={resolveBlogImage(post.image)}
                                      alt={post.title}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        transition: "transform 0.5s ease",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform =
                                          "scale(1.06)")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform =
                                          "scale(1)")
                                      }
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <div
                                      className="d-flex align-items-center justify-content-center h-100"
                                      style={{
                                        color: greenColor,
                                        fontSize: 40,
                                        opacity: 0.4,
                                      }}
                                    >
                                      <FaLeaf />
                                    </div>
                                  )}
                                </div>

                                <div className="p-3 d-flex flex-column flex-grow-1">
                                  <span
                                    className="align-self-start mb-2"
                                    style={{
                                      display: "inline-block",
                                      fontSize: "0.64rem",
                                      fontWeight: 700,
                                      letterSpacing: "0.04em",
                                      textTransform: "uppercase",
                                      padding: "5px 12px",
                                      borderRadius: 20,
                                      color: "#fff",
                                      background: badgeBg,
                                    }}
                                  >
                                    {post.category || "General"}
                                  </span>

                                  <h3
                                    style={{
                                      fontSize: "1.02rem",
                                      fontWeight: 700,
                                      color: blueDark,
                                      lineHeight: 1.4,
                                      margin: "0 0 8px",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {post.title}
                                  </h3>

                                  <p
                                    className="flex-grow-1"
                                    style={{
                                      fontSize: "0.85rem",
                                      color: muted,
                                      lineHeight: 1.6,
                                      margin: "0 0 16px",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {post.excerpt ||
                                      (post.content
                                        ? post.content
                                            .replace(/<[^>]*>/g, "")
                                            .slice(0, 120) + "..."
                                        : "Read the full article...")}
                                  </p>

                                  <div
                                    className="d-flex align-items-center gap-3 mb-3 flex-wrap"
                                    style={{
                                      fontSize: "0.74rem",
                                      color: "#8a96a3",
                                    }}
                                  >
                                    <span className="d-flex align-items-center gap-1">
                                      <FaRegCalendarAlt size={11} /> {formatBlogDate(post.date)}
                                    </span>
                                    {post.author && (
                                      <span className="d-flex align-items-center gap-1">
                                        {post.author}
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    className="align-self-start d-flex align-items-center gap-1 p-0 border-0 bg-transparent"
                                    style={{
                                      fontFamily: "'Poppins', sans-serif",
                                      fontSize: "0.85rem",
                                      fontWeight: 700,
                                      color: greenColor,
                                      cursor: "pointer",
                                      transition:
                                        "gap 0.25s ease, color 0.25s ease",
                                    }}
                                    onClick={() => handleReadMore(post)}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = greenDark;
                                      e.currentTarget.style.gap = "9px";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color = greenColor;
                                      e.currentTarget.style.gap = "6px";
                                    }}
                                  >
                                    Read More <FiArrowRight size={13} />
                                  </button>
                                </div>
                              </article>
                            </div>
                          );
                        })}
                      </div>

                      {totalPages > 1 && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          colors={colors}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — NEWSLETTER CTA ═══════════════ */}
      <div style={{ background: "#fff" }}>
        <div
          className="py-4 position-relative overflow-hidden blog-newsletter"
          style={{
            background:
              "linear-gradient(135deg, #0f3d6e 0%, #0f6baf 55%, #4ba86a 100%)",
          }}
        >
          <FaLeaf
            style={{
              position: "absolute",
              top: 10,
              right: 30,
              fontSize: 140,
              opacity: 0.12,
              color: "#fff",
              transform: "rotate(25deg)",
              pointerEvents: "none",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
          <FaLeaf
            style={{
              position: "absolute",
              bottom: 0,
              left: 10,
              fontSize: 90,
              opacity: 0.1,
              color: "#fff",
              transform: "rotate(-20deg)",
              pointerEvents: "none",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
          <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="row align-items-center text-center text-md-start">
              <div className="col-md-8 col-12 d-flex align-items-center gap-3 flex-column flex-md-row mb-3 mb-md-0">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.18)",
                    fontSize: "1.4rem",
                    color: "#fff",
                  }}
                >
                  <FaFileAlt />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 4px",
                      lineHeight: 1.3,
                    }}
                  >
                    Expert Knowledge. Natural Healing.
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.85)",
                      margin: 0,
                      maxWidth: 380,
                      lineHeight: 1.5,
                    }}
                  >
                    Stay updated with the latest health tips, homeopathy
                    insights, and wellness advice.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-12 text-center text-md-end">
                <button
                  className="d-inline-flex align-items-center gap-2 px-4 py-3 border-0 rounded-3 fw-bold blog-newsletter-btn"
                  style={{
                    background: "#fff",
                    color: blueDark,
                    fontSize: "0.86rem",
                    fontFamily: "'Poppins', sans-serif",
                    cursor: "pointer",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  }}
                  onClick={() => navigate("/contact-us")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.92";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <FiMail size={14} /> Subscribe to Our Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        /* =========================================================
           BLOG — MOBILE RESPONSIVE ONLY
           Desktop layout and existing logic remain unchanged.
        ========================================================= */

        @media (max-width: 767.98px) {
          .blog-page .container {
            padding-left: 16px;
            padding-right: 16px;
          }

          /* Hero */
          .blog-hero-section {
            min-height: auto !important;
          }

          .blog-hero-row {
            min-height: auto !important;
          }

          .blog-hero-content {
            padding: 34px 18px 38px !important;
          }

          .blog-hero-content > div {
            text-align: left !important;
          }

          .blog-hero-content span {
            margin-bottom: 10px !important;
          }

          .blog-hero-content h1 {
            font-size: 30px !important;
            line-height: 1.15 !important;
            margin-bottom: 13px !important;
          }

          .blog-hero-content p {
            max-width: 100% !important;
            margin: 0 0 20px !important;
            font-size: 0.86rem !important;
            line-height: 1.65 !important;
          }

          .blog-search-form {
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 5px !important;
            border-radius: 10px !important;
          }

          .blog-search-form input {
            min-width: 0;
            padding: 9px 10px !important;
            font-size: 0.82rem !important;
          }

          .blog-search-form button {
            width: 38px !important;
            height: 38px !important;
          }

          /* Main blog area */
          .blog-articles-section {
            padding-top: 34px !important;
            padding-bottom: 34px !important;
          }

          .blog-main-column > .bl-reveal:first-child,
          .blog-main-column > div:first-child {
            scroll-margin-top: 78px;
          }

          .blog-main-column h2 {
            font-size: 1.35rem !important;
            line-height: 1.3;
          }

          .blog-card-grid {
            --bs-gutter-x: 12px;
            --bs-gutter-y: 14px;
          }

          .blog-card-col {
            width: 100%;
          }

          .blog-card {
            border-radius: 14px !important;
            box-shadow: 0 2px 12px rgba(15,61,110,0.05) !important;
          }

          .blog-card > div:first-child {
            height: 190px !important;
          }

          .blog-card .p-3 {
            padding: 14px !important;
          }

          .blog-card h3 {
            font-size: 0.98rem !important;
            line-height: 1.38 !important;
          }

          .blog-card p {
            font-size: 0.8rem !important;
            line-height: 1.55 !important;
            margin-bottom: 12px !important;
          }

          /* Article detail */
          .blog-main-column .blog-content {
            font-size: 0.86rem !important;
            line-height: 1.72 !important;
            overflow-wrap: anywhere;
          }

          .blog-main-column .blog-content img {
            max-width: 100% !important;
            height: auto !important;
          }

          .blog-main-column .blog-content table {
            display: block;
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
          }

          /* Sidebar */
          .blog-sidebar {
            margin-top: 28px !important;
          }

          .blog-sidebar-card {
            padding: 18px !important;
            margin-bottom: 16px !important;
            border-radius: 16px !important;
          }

          .blog-sidebar-card h4 {
            font-size: 1rem !important;
            margin-bottom: 11px !important;
          }

          .blog-sidebar-card p {
            font-size: 0.8rem !important;
            line-height: 1.6 !important;
          }

          /* Categories: compact and easy to tap */
          .blog-categories-card .blog-category-scroll {
            max-height: 330px !important;
            padding-right: 3px !important;
          }

          .blog-categories-card li {
            min-height: 48px;
            padding-top: 7px !important;
            padding-bottom: 7px !important;
          }

          .blog-categories-card li > span {
            gap: 10px !important;
            min-width: 0;
            width: calc(100% - 18px);
          }

          .blog-categories-card li > span > span:nth-child(2) {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Pagination */
          .blog-main-column nav[aria-label="Blog pagination"] {
            justify-content: center !important;
            gap: 12px !important;
            margin-top: 28px !important;
          }

          .blog-main-column nav[aria-label="Blog pagination"] > button {
            padding: 7px 10px !important;
            font-size: 0.74rem !important;
          }

          .blog-main-column nav[aria-label="Blog pagination"] ul {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          /* Newsletter */
          .blog-newsletter {
            padding-top: 28px !important;
            padding-bottom: 28px !important;
          }

          .blog-newsletter .row {
            gap: 4px;
          }

          .blog-newsletter .col-md-8 {
            gap: 10px !important;
            margin-bottom: 14px !important;
          }

          .blog-newsletter .col-md-8 > div:first-child {
            width: 46px !important;
            height: 46px !important;
            border-radius: 12px !important;
          }

          .blog-newsletter h3 {
            font-size: 1.05rem !important;
          }

          .blog-newsletter p {
            font-size: 0.78rem !important;
            line-height: 1.5 !important;
          }

          .blog-newsletter-btn {
            padding: 10px 16px !important;
            font-size: 0.76rem !important;
          }
        }

        @media (max-width: 420px) {
          .blog-page .container {
            padding-left: 13px;
            padding-right: 13px;
          }

          .blog-hero-content {
            padding: 28px 14px 32px !important;
          }

          .blog-hero-content h1 {
            font-size: 27px !important;
          }

          .blog-card > div:first-child {
            height: 175px !important;
          }

          .blog-sidebar-card {
            padding: 16px !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Blog;