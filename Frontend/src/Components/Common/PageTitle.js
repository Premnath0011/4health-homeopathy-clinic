// // PageTitle.js — Full file
// // Reads the current route, looks it up in pageMetadata.js,
// // and sets document.title (+ meta description) automatically.
// // Place <PageTitle /> once inside <Router>, alongside the Routes.

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import pageMetadata, { defaultMetadata } from "./pageMetadata";

// const PageTitle = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const meta = pageMetadata[location.pathname] || defaultMetadata;

//     // Set the browser tab title
//     document.title = meta.title;

//     // Set / update the meta description tag
//     let metaDescTag = document.querySelector('meta[name="description"]');
//     if (!metaDescTag) {
//       metaDescTag = document.createElement("meta");
//       metaDescTag.setAttribute("name", "description");
//       document.head.appendChild(metaDescTag);
//     }
//     metaDescTag.setAttribute("content", meta.description || "");
//   }, [location.pathname]);

//   return null; // This component renders nothing visually
// };

// export default PageTitle;




// PageTitle.js — Full file
// Reads the current route, looks it up via getPageMetadata() (which merges
// any admin-panel overrides saved in localStorage on top of the defaults
// in pageMetadata.js), and sets document.title (+ meta description)
// automatically. Place <PageTitle /> once inside <Router>, alongside Routes.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata } from "./pageMetadata";

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = getPageMetadata(location.pathname);

    // Set the browser tab title
    document.title = meta.title;

    // Set / update the meta description tag
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement("meta");
      metaDescTag.setAttribute("name", "description");
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute("content", meta.description || "");
  }, [location.pathname]);

  return null; // This component renders nothing visually
};

export default PageTitle;