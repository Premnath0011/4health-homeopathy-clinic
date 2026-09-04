import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Apiurl from "../../Environmnet/Apiurl";
import { normalizeConditions, resolveServiceImage } from "../../../Common/serviceApi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const icons = {
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  image: "M4 16l4-4 4 4 4-4 4 4M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
  bold: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
  italic: "M19 4h-9M14 20H5M15 4L9 20",
  underline: "M6 3v6a6 6 0 0 0 12 0V3M4 21h16",
  strike: "M4 12h16M4 6h16",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5",
  codeBlock: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h5",
  superscript: "M12 4l2 2-2 2M4 18h10",
  subscript: "M12 20l2-2-2-2M4 6h10",
  heading: "M1 4v6M1 10h6M1 4h6M1 14v6M1 20h6M1 14h6M11 4h10M11 10h7M11 14h10M11 20h7",
  paragraph: "M4 6h16M4 12h16M4 18h10",
  quote: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.5-2-3L7 1M17 21c3 0 7-1 7-8V5c0-1.25-.756-2.5-2-3L21 1",
  alignLeft: "M4 6h16M4 12h12M4 18h8",
  alignCenter: "M4 6h16M6 12h12M8 18h8",
  alignRight: "M4 6h16M8 12h12M12 18h8",
  alignJustify: "M4 6h16M4 12h16M4 18h16",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  listOrdered: "M10 6h11M10 12h11M10 18h11M4 4v4M6 4H4M5 8v3M7 8v3M4 16.5L5 18l2-2",
  taskList: "M9 5l3 3 8-8M5 12h14M5 18h14",
  color: "M12 2a8 8 0 0 0-8 8c0 4 8 12 8 12s8-8 8-12a8 8 0 0 0-8-8z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  highlight: "M12 2a8 8 0 0 0-8 8c0 4 8 12 8 12s8-8 8-12a8 8 0 0 0-8-8z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  table: "M4 4h16v16H4z M9 4v16M15 4v16M4 9h16M4 15h16",
  youtube: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02L15.5 11.75l-5.75-3.27v6.54z",
  embed: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h8",
  horizontalRule: "M4 12h16",
  undo: "M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
  redo: "M21 7v6h-6M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  grab: "M9 5h6M9 12h6M9 19h6",
  close: "M18 6L6 18M6 6l12 12",
  emoji: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01M15 9h.01",
  mention: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M12 8v4l2 2M12 16h.01",
  slash: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z M12 6v6l4 2",
};

// ── Colors ──────────────────────────────────────────────────────────────────
const GREEN = "#2E8B57";
const GREEN_HOVER = "#247346";
const GREEN_SOFT = "#F0FAF4";
const BORDER = "#D1EDE6";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";

// ── Custom Popup Modal ──────────────────────────────────────────────────────
const PopupModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: 18,
          padding: "28px 32px",
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: GREEN_SOFT,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon d={icons.close} size={24} color={GREEN} />
          </div>
        </div>
        <h4 style={{ fontWeight: 700, color: TEXT_DARK, marginBottom: 8 }}>
          {message}
        </h4>
        <DashboardButton variant="primary" onClick={onClose}>
          OK
        </DashboardButton>
      </div>
    </div>
  );
};

// ── Input Modal (Prompt replacement) ──────────────────────────────────────
const InputModal = ({
  isOpen,
  title,
  message,
  placeholder = "",
  initialValue = "",
  onConfirm,
  onCancel,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) setValue(initialValue);
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(value);
    onCancel(); // close modal
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "white",
          borderRadius: 18,
          padding: "28px 32px",
          maxWidth: 450,
          width: "90%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 style={{ fontWeight: 700, color: TEXT_DARK, marginBottom: 4 }}>
          {title}
        </h4>
        {message && (
          <p style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 16 }}>
            {message}
          </p>
        )}
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            borderRadius: 10,
            borderColor: BORDER,
            padding: "10px 16px",
            fontSize: 14,
            marginBottom: 16,
          }}
          autoFocus
        />
        <div className="d-flex justify-content-end gap-2">
          <DashboardButton variant="outline" onClick={onCancel}>
            Cancel
          </DashboardButton>
          <DashboardButton variant="primary" onClick={handleConfirm}>
            Confirm
          </DashboardButton>
        </div>
      </div>
    </div>
  );
};

// ── DashboardButton ──────────────────────────────────────────────────────
const DashboardButton = ({ variant = "outline", children, onClick, disabled, style, small = false }) => {
  const [hover, setHover] = useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: small ? 4 : 6,
    fontWeight: 600,
    fontSize: small ? 11 : 12,
    padding: small ? "5px 12px" : "7px 18px",
    borderRadius: 30,
    cursor: disabled ? "default" : "pointer",
    border: variant === "primary" ? "none" : `1.5px solid ${hover ? GREEN : BORDER}`,
    background: variant === "primary" ? (hover && !disabled ? GREEN_HOVER : GREEN) : "white",
    color: variant === "primary" ? "white" : GREEN,
    transition: "all 0.2s",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    opacity: disabled ? 0.5 : 1,
    ...(style || {}),
  };
  return (
    <button
      style={base}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ── Toolbar Button ──────────────────────────────────────────────────────
const ToolbarButton = ({ onClick, children, active = false, disabled = false }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "6px 10px",
      borderRadius: 6,
      border: active ? `2px solid ${GREEN}` : "1px solid transparent",
      background: active ? GREEN_SOFT : "transparent",
      color: active ? GREEN : "#475569",
      cursor: "pointer",
      transition: "all 0.15s",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 13,
      fontWeight: 500,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}
    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f1f5f9"; }}
    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
  >
    {children}
  </button>
);

// ── Full Toolbar ──────────────────────────────────────────────────────────
const MenuBar = ({ editor, openInputModal }) => {
  if (!editor) return null;

  const handleColorChange = (type) => {
    openInputModal({
      title: `Enter ${type} color`,
      message: `Enter a hex color code (e.g., #ff0000) for ${type}:`,
      placeholder: "#ff0000",
      initialValue: "",
      onConfirm: (value) => {
        if (value) {
          if (type === "text") editor.chain().focus().setColor(value).run();
          else editor.chain().focus().setHighlight({ color: value }).run();
        }
      },
    });
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target.result;
          editor.chain().focus().setImage({ src: url }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const addEmbed = () => {
    openInputModal({
      title: "Enter Embed URL",
      message: "Paste the URL of a video, map, or any iframe content:",
      placeholder: "https://www.youtube.com/embed/...",
      initialValue: "",
      onConfirm: (url) => {
        if (url) {
          const iframeHtml = `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="${url}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>`;
          editor.commands.insertContent(iframeHtml);
        }
      },
    });
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "8px 12px", borderBottom: `1px solid ${BORDER}`, background: "#f9fafb", borderRadius: "12px 12px 0 0" }}>
      {/* Text Formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Icon d={icons.bold} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Icon d={icons.italic} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}><Icon d={icons.underline} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}><Icon d={icons.strike} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")}><Icon d={icons.code} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Icon d={icons.codeBlock} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")}><Icon d={icons.superscript} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")}><Icon d={icons.subscript} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().unsetAllMarks().run()}><Icon d={icons.close} size={14} /> Clear</ToolbarButton>

      {/* Headings */}
      {[1, 2, 3, 4, 5, 6].map(level => (
        <ToolbarButton key={level} onClick={() => editor.chain().focus().toggleHeading({ level }).run()} active={editor.isActive("heading", { level })}>
          H{level}
        </ToolbarButton>
      ))}
      <ToolbarButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")}><Icon d={icons.paragraph} size={14} /></ToolbarButton>

      {/* Block Quote & Alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Icon d={icons.quote} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })}><Icon d={icons.alignLeft} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })}><Icon d={icons.alignCenter} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })}><Icon d={icons.alignRight} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })}><Icon d={icons.alignJustify} size={14} /></ToolbarButton>

      {/* Lists */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><Icon d={icons.list} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><Icon d={icons.listOrdered} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")}><Icon d={icons.taskList} size={14} /></ToolbarButton>

      {/* Color & Highlight */}
      <ToolbarButton onClick={() => handleColorChange("text")}><Icon d={icons.color} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => handleColorChange("highlight")}><Icon d={icons.highlight} size={14} /></ToolbarButton>

      {/* Media */}
      <ToolbarButton onClick={addImage}><Icon d={icons.image} size={14} /></ToolbarButton>

      {/* Links */}
      <ToolbarButton onClick={() => {
        openInputModal({
          title: "Enter Link URL",
          message: "Type the URL you want to link to:",
          placeholder: "https://example.com",
          initialValue: "",
          onConfirm: (url) => {
            if (url) editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
          },
        });
      }} active={editor.isActive("link")}><Icon d={icons.link} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => {
        if (editor.isActive("link")) {
          const currentHref = editor.getAttributes("link").href || "";
          openInputModal({
            title: "Edit Link URL",
            message: "Update the link URL:",
            placeholder: "https://example.com",
            initialValue: currentHref,
            onConfirm: (url) => {
              if (url) editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
            },
          });
        }
      }}><Icon d={icons.link} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()}><Icon d={icons.close} size={14} /></ToolbarButton>

      {/* Tables */}
      <ToolbarButton onClick={insertTable}><Icon d={icons.table} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()}>- Row</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Col</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().deleteColumn().run()}>- Col</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().mergeCells().run()}>Merge</ToolbarButton>

      {/* Embeds */}
      <ToolbarButton onClick={addEmbed}><Icon d={icons.embed} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => {
        openInputModal({
          title: "Enter YouTube URL",
          message: "Paste the YouTube video URL:",
          placeholder: "https://www.youtube.com/watch?v=...",
          initialValue: "",
          onConfirm: (url) => {
            if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
          },
        });
      }}><Icon d={icons.youtube} size={14} /></ToolbarButton>

      {/* Layout */}
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}><Icon d={icons.horizontalRule} size={14} /></ToolbarButton>

      {/* Productivity */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()}><Icon d={icons.undo} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()}><Icon d={icons.redo} size={14} /></ToolbarButton>

      {/* Advanced – Emoji, Mention */}
      <ToolbarButton onClick={() => {
        openInputModal({
          title: "Insert Emoji",
          message: "Type an emoji (e.g., 😊) or a colon code (:smile:):",
          placeholder: "😊 or :smile:",
          initialValue: "",
          onConfirm: (emoji) => {
            if (emoji) editor.commands.insertContent(emoji);
          },
        });
      }}><Icon d={icons.emoji} size={14} /></ToolbarButton>
      <ToolbarButton onClick={() => {
        openInputModal({
          title: "Add Mention",
          message: "Enter the name to mention (e.g., Dr. Sharma):",
          placeholder: "Dr. Sharma",
          initialValue: "",
          onConfirm: (name) => {
            if (name) editor.commands.insertContent(`@${name}`);
          },
        });
      }}><Icon d={icons.mention} size={14} /></ToolbarButton>
    </div>
  );
};

const DynamicTextList = ({ title, items, setItems, placeholder, addLabel }) => (
  <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: 16, height: "100%" }}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <label className="form-label mb-0" style={{ fontWeight: 700, fontSize: 14, color: TEXT_DARK }}>
        {title}
      </label>
      <DashboardButton
        variant="outline"
        small
        onClick={() => setItems((current) => [...current, ""])}
      >
        <Icon d={icons.plus} size={13} /> {addLabel}
      </DashboardButton>
    </div>

    {items.length === 0 && (
      <div style={{ border: `1px dashed ${BORDER}`, borderRadius: 10, padding: 14, color: TEXT_MUTED, textAlign: "center", fontSize: 12 }}>
        No items added.
      </div>
    )}

    <div className="d-flex flex-column gap-2">
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="d-flex gap-2 align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            value={item}
            onChange={(e) => {
              const value = e.target.value;
              setItems((current) => current.map((currentItem, itemIndex) =>
                itemIndex === index ? value : currentItem
              ));
            }}
            style={{ borderRadius: 10, borderColor: BORDER, padding: "9px 12px" }}
          />
          <button
            type="button"
            aria-label={`Remove ${title} item`}
            onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}
            style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${BORDER}`, background: "white", color: "#D63C3C", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <Icon d={icons.close} size={14} color="#D63C3C" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const createConditionKey = () =>
  `condition-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const createEmptyCondition = () => ({
  _clientKey: createConditionKey(),
  title: "",
  description: "",
  symptoms: [],
  howWeHelp: [],
  image: "",
  _imageFile: null,
  _imagePreview: "",
  _removeImage: false,
});

// ── Main Component ──────────────────────────────────────────────────────────
const AddAdminService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editService = location.state?.editService || null;

  const [title, setTitle] = useState(editService?.title || "");
  const [slug, setSlug] = useState(editService?.slug || "");
  const [category, setCategory] = useState(editService?.category || "Homeopathy");
  const [status, setStatus] = useState(editService?.status || "Active");
  const [imageUrl, setImageUrl] = useState(editService?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [doctors, setDoctors] = useState(editService?.doctors || 0);
  const [patients, setPatients] = useState(editService?.patients || 0);
  const [displayOrder, setDisplayOrder] = useState(editService?.displayOrder || 0);
  const [conditions, setConditions] = useState(() =>
    normalizeConditions(
      editService?.conditions,
      editService?.symptoms,
      editService?.howWeHelp,
    ).map((condition) => ({
      ...condition,
      _clientKey: condition._id || createConditionKey(),
      _imageFile: null,
      _imagePreview: resolveServiceImage(condition.image || ""),
      _removeImage: false,
    })),
  );
  const [expandedConditionIndex, setExpandedConditionIndex] = useState(
    conditions.length > 0 ? 0 : null,
  );
  const conditionCardRefs = useRef({});
  const conditionTitleRefs = useRef({});
  const [quote, setQuote] = useState(editService?.quote || "");
  const [approach, setApproach] = useState(editService?.approach || "");
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // Popup & Input Modal
  const [popup, setPopup] = useState({ isOpen: false, message: "" });
  const [inputModal, setInputModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    placeholder: "",
    initialValue: "",
    onConfirm: null,
  });

  const showPopup = (msg) => setPopup({ isOpen: true, message: msg });
  const closePopup = () => setPopup({ isOpen: false, message: "" });

  const openInputModal = ({ title, message, placeholder = "", initialValue = "", onConfirm }) => {
    setInputModal({
      isOpen: true,
      title,
      message,
      placeholder,
      initialValue,
      onConfirm,
    });
  };

  const closeInputModal = () => {
    setInputModal({
      isOpen: false,
      title: "",
      message: "",
      placeholder: "",
      initialValue: "",
      onConfirm: null,
    });
  };

  // TipTap editor for description
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Underline,
      Strike,
      Code,
      CodeBlock,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Color,
      Highlight,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube,
      HorizontalRule,
      Mention.configure({ suggestion: { char: "@" } }),
      Placeholder.configure({ placeholder: "Write a detailed description of the service..." }),
      CharacterCount,
    ],
    content: editService?.description || "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setRemoveImage(false);
      const reader = new FileReader();
      reader.onload = (event) => setImageUrl(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleConditionImageUpload = (index, file) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setConditions((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        if (item._imagePreview?.startsWith("blob:")) {
          URL.revokeObjectURL(item._imagePreview);
        }

        return {
          ...item,
          _imageFile: file,
          _imagePreview: previewUrl,
          _removeImage: false,
        };
      }),
    );
  };

  const handleRemoveConditionImage = (index) => {
    setConditions((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        if (item._imagePreview?.startsWith("blob:")) {
          URL.revokeObjectURL(item._imagePreview);
        }

        return {
          ...item,
          _imageFile: null,
          _imagePreview: "",
          _removeImage: Boolean(item.image),
        };
      }),
    );
  };

  const scrollToCondition = (index, focusTitle = false) => {
    window.setTimeout(() => {
      conditionCardRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if (focusTitle) {
        window.setTimeout(() => {
          conditionTitleRefs.current[index]?.focus();
        }, 350);
      }
    }, 80);
  };

  const handleAddCondition = () => {
    const newIndex = conditions.length;
    setConditions((current) => [...current, createEmptyCondition()]);
    setExpandedConditionIndex(newIndex);
    scrollToCondition(newIndex, true);
  };

  const handleToggleCondition = (index) => {
    setExpandedConditionIndex((current) =>
      current === index ? null : index,
    );
  };

  const handleRemoveCondition = (index) => {
    const conditionName = conditions[index]?.title?.trim() || `Condition ${index + 1}`;
    const shouldRemove = window.confirm(
      `Remove “${conditionName}”? This condition and its entered details will be deleted.`,
    );

    if (!shouldRemove) return;

    setConditions((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );

    setExpandedConditionIndex((current) => {
      if (current === null) return null;
      if (current === index) return null;
      if (current > index) return current - 1;
      return current;
    });
  };

  const handleSubmit = async () => {
    if (!title.trim() || !editor || editor.isEmpty) {
      showPopup("Please fill in Service Title and Description.");
      return;
    }

    const emptyConditionIndex = conditions.findIndex(
      (condition) => !String(condition.title || "").trim(),
    );

    if (emptyConditionIndex !== -1) {
      showPopup(`Please enter a name for Condition ${emptyConditionIndex + 1}.`);
      setExpandedConditionIndex(emptyConditionIndex);
      scrollToCondition(emptyConditionIndex, true);
      return;
    }

    const seenConditionNames = new Set();
    const duplicateConditionIndex = conditions.findIndex((condition) => {
      const normalizedName = String(condition.title || "").trim().toLowerCase();
      if (seenConditionNames.has(normalizedName)) return true;
      seenConditionNames.add(normalizedName);
      return false;
    });

    if (duplicateConditionIndex !== -1) {
      showPopup("Condition names must be unique. Please rename the duplicate condition.");
      setExpandedConditionIndex(duplicateConditionIndex);
      scrollToCondition(duplicateConditionIndex, true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("slug", slug.trim());
    formData.append("category", category);
    formData.append("status", status);
    formData.append("description", editor.getHTML());
    formData.append("doctors", String(parseInt(doctors, 10) || 0));
    formData.append("patients", String(parseInt(patients, 10) || 0));
    formData.append("displayOrder", String(parseInt(displayOrder, 10) || 0));
    const cleanedConditions = conditions
      .map((condition) => ({
        title: String(condition.title || "").trim(),
        description: String(condition.description || "").trim(),
        symptoms: (Array.isArray(condition.symptoms) ? condition.symptoms : [])
          .map((item) => String(item || "").trim())
          .filter(Boolean),
        howWeHelp: (Array.isArray(condition.howWeHelp) ? condition.howWeHelp : [])
          .map((item) => String(item || "").trim())
          .filter(Boolean),
        image: String(condition.image || "").trim(),
        removeImage: Boolean(condition._removeImage),
      }))
      .filter((condition) => condition.title);

    formData.append("conditions", JSON.stringify(cleanedConditions));
    conditions.forEach((condition, index) => {
      if (condition._imageFile) {
        formData.append(`conditionImage_${index}`, condition._imageFile);
      }
    });
    formData.append("quote", quote.trim());
    formData.append("approach", approach.trim());

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (removeImage) {
      formData.append("removeImage", "true");
    } else if (editService?.image) {
      formData.append("image", editService.image);
    }

    setSaving(true);
    try {
      if (editService?._id) {
        await axios.put(`${Apiurl}/service/${editService._id}`, formData);
      } else {
        await axios.post(`${Apiurl}/service`, formData);
      }
      navigate("/admin/treatment");
    } catch (error) {
      console.error("Service save failed:", error);
      showPopup(error.response?.data?.message || "Unable to save service. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const card = {
    background: CARD_BG,
    borderRadius: 18,
    border: `1px solid ${BORDER}`,
    boxShadow: "0 2px 12px rgba(46,139,87,0.06)",
    padding: "24px 28px",
  };

  return (
    <div
      style={{
        padding: "24px 28px 120px",
        background: BG,
        minHeight: "100vh",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: 14,
      }}
    >
      <style>{`
        .service-sticky-actions {
          position: fixed;
          right: 24px;
          bottom: 20px;
          z-index: 1200;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid ${BORDER};
          border-radius: 16px;
          box-shadow: 0 12px 35px rgba(30, 47, 43, 0.18);
          backdrop-filter: blur(10px);
        }

        @media (max-width: 767px) {
          .service-sticky-actions {
            left: 12px;
            right: 12px;
            bottom: 12px;
            justify-content: space-between;
          }

          .service-sticky-label {
            display: none;
          }
        }
      `}</style>

      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <DashboardButton variant="outline" small onClick={() => navigate("/admin/treatment")}>
            <Icon d={icons.arrowLeft} size={14} /> Back
          </DashboardButton>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: TEXT_DARK, margin: 0 }}>
            {editService ? "Edit Service" : "Add New Service"}
          </h1>
        </div>
        <div className="d-flex gap-2">
          <DashboardButton variant="outline" onClick={() => navigate("/admin/treatment")}>
            Cancel
          </DashboardButton>
          <DashboardButton variant="primary" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : editService ? "Update Service" : "Publish Service"}
          </DashboardButton>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div style={card}>
        {/* Service Title */}
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
            Service Title *
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px", fontSize: 15 }}
          />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              URL Slug
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Auto-generated from title when left blank"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px" }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              Display Order
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px" }}
            />
          </div>
        </div>

        <div className="row g-3 mb-4">
          {/* Category */}
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              Category *
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px" }}
            />
          </div>

          {/* Status */}
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              Status
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px" }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Stats: Doctors & Patients */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              Number of Doctors
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 10"
              value={doctors}
              onChange={(e) => setDoctors(e.target.value)}
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px" }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              Number of Patients (approx.)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., 1200"
              value={patients}
              onChange={(e) => setPatients(e.target.value)}
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px" }}
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
            Featured Image
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
              style={{ width: "auto", borderRadius: 10, borderColor: BORDER, padding: "8px 12px" }}
            />
            {imageUrl && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                  src={resolveServiceImage(imageUrl)}
                  alt="Preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: `1px solid ${BORDER}` }}
                />
                <span
                  style={{ fontSize: 12, color: TEXT_MUTED, cursor: "pointer" }}
                  onClick={() => { setImageUrl(""); setImageFile(null); setRemoveImage(true); }}
                >
                  ✕ Remove
                </span>
              </div>
            )}
          </div>
          <small style={{ color: TEXT_MUTED, fontSize: 12 }}>
            Upload an image or leave blank to use a placeholder.
          </small>
        </div>

        {/* Description Editor */}
        <div className="mb-3">
          <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
            Description *
          </label>
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", background: "white" }}>
            <MenuBar editor={editor} openInputModal={openInputModal} />
            <EditorContent
              editor={editor}
              style={{ padding: "12px 16px", minHeight: 200, fontSize: 14, lineHeight: 1.7 }}
            />
          </div>
        </div>

        {/* Dynamic Conditions - Accordion Builder */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center gap-3 mb-3 flex-wrap">
            <div>
              <label className="form-label mb-0" style={{ fontWeight: 700, fontSize: 14, color: TEXT_DARK }}>
                Conditions We Treat
              </label>
              <div style={{ color: TEXT_MUTED, fontSize: 12 }}>
                Open one condition at a time and add its description, symptoms, and treatment points.
              </div>
            </div>
            <DashboardButton variant="primary" small onClick={handleAddCondition}>
              <Icon d={icons.plus} size={13} color="white" /> Add New Condition
            </DashboardButton>
          </div>

          {conditions.length === 0 && (
            <button
              type="button"
              onClick={handleAddCondition}
              style={{
                width: "100%",
                border: `1px dashed ${BORDER}`,
                borderRadius: 14,
                padding: "26px 18px",
                color: GREEN,
                background: GREEN_SOFT,
                textAlign: "center",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 8 }}>＋</div>
              Add your first condition
            </button>
          )}

          <div className="d-flex flex-column gap-3">
            {conditions.map((condition, index) => {
              const isExpanded = expandedConditionIndex === index;
              const conditionName = condition.title?.trim() || `Untitled Condition ${index + 1}`;
              const symptomCount = Array.isArray(condition.symptoms) ? condition.symptoms.filter(Boolean).length : 0;
              const helpCount = Array.isArray(condition.howWeHelp) ? condition.howWeHelp.filter(Boolean).length : 0;

              return (
                <div
                  key={condition._clientKey || condition._id || `condition-${index}`}
                  ref={(element) => {
                    conditionCardRefs.current[index] = element;
                  }}
                  style={{
                    border: `1px solid ${isExpanded ? GREEN : BORDER}`,
                    borderRadius: 14,
                    background: "white",
                    overflow: "hidden",
                    boxShadow: isExpanded
                      ? "0 8px 24px rgba(46,139,87,0.10)"
                      : "0 2px 8px rgba(46,139,87,0.04)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Accordion Header */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleToggleCondition(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleToggleCondition(index);
                      }
                    }}
                    style={{
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      cursor: "pointer",
                      background: isExpanded ? GREEN_SOFT : "white",
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: isExpanded ? GREEN : "#E8F5ED",
                            color: isExpanded ? "white" : GREEN,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </span>
                        <strong
                          style={{
                            color: TEXT_DARK,
                            fontSize: 14,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {conditionName}
                        </strong>
                        <span style={{ color: TEXT_MUTED, fontSize: 11 }}>
                          {symptomCount} symptoms · {helpCount} help points
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveCondition(index);
                        }}
                        style={{
                          border: "1px solid #FECACA",
                          background: "#FFF5F5",
                          color: "#D63C3C",
                          borderRadius: 9,
                          padding: "6px 10px",
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                      <span
                        aria-hidden="true"
                        style={{
                          color: GREEN,
                          fontSize: 18,
                          lineHeight: 1,
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                       ⌄
                      </span>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div style={{ padding: "18px 18px 20px", borderTop: `1px solid ${BORDER}` }}>
                      <div className="row g-3 mb-3">
                        <div className="col-6">
                          <label className="form-label" style={{ fontWeight: 700, fontSize: 12, color: TEXT_DARK }}>
                            Condition Name *
                          </label>
                          <input
                            ref={(element) => {
                              conditionTitleRefs.current[index] = element;
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Condition name (e.g., Sinusitis)"
                            value={condition.title}
                            onChange={(event) => {
                              const value = event.target.value;
                              setConditions((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, title: value } : item,
                                ),
                              );
                            }}
                            style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 14px" }}
                          />
                        </div>

                        <div className="col-6">
                          <label className="form-label" style={{ fontWeight: 700, fontSize: 12, color: TEXT_DARK }}>
                            Condition Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(event) =>
                              handleConditionImageUpload(index, event.target.files?.[0])
                            }
                            style={{ borderRadius: 10, borderColor: BORDER, padding: "8px 12px" }}
                          />

                          {condition._imagePreview && (
                            <div
                              style={{
                                marginTop: 9,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: 8,
                                border: `1px solid ${BORDER}`,
                                borderRadius: 10,
                                background: GREEN_SOFT,
                              }}
                            >
                              <img
                                src={condition._imagePreview}
                                alt={`${condition.title || "Condition"} preview`}
                                style={{
                                  width: 52,
                                  height: 42,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                style={{
                                  flex: 1,
                                  minWidth: 0,
                                  color: TEXT_MUTED,
                                  fontSize: 11,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {condition._imageFile?.name || "Current condition image"}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveConditionImage(index)}
                                style={{
                                  border: "1px solid #FECACA",
                                  background: "white",
                                  color: "#D63C3C",
                                  borderRadius: 8,
                                  padding: "5px 8px",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  flexShrink: 0,
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: 700, fontSize: 12, color: TEXT_DARK }}>
                          Condition Description
                        </label>
                        <textarea
                          className="form-control"
                          rows="5"
                          placeholder="Write a detailed description for this condition"
                          value={condition.description || ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            setConditions((current) =>
                              current.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, description: value } : item,
                              ),
                            );
                          }}
                          style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 14px", resize: "vertical" }}
                        />
                      </div>

                      <div className="row g-3">
                        <div className="col-lg-6">
                          <DynamicTextList
                            title="Common Symptoms"
                            items={condition.symptoms || []}
                            setItems={(updater) =>
                              setConditions((current) =>
                                current.map((item, itemIndex) => {
                                  if (itemIndex !== index) return item;
                                  const currentItems = Array.isArray(item.symptoms) ? item.symptoms : [];
                                  return {
                                    ...item,
                                    symptoms: typeof updater === "function" ? updater(currentItems) : updater,
                                  };
                                }),
                              )
                            }
                            placeholder="Enter symptom for this condition"
                            addLabel="Add Symptom"
                          />
                        </div>

                        <div className="col-lg-6">
                          <DynamicTextList
                            title="How We Help"
                            items={condition.howWeHelp || []}
                            setItems={(updater) =>
                              setConditions((current) =>
                                current.map((item, itemIndex) => {
                                  if (itemIndex !== index) return item;
                                  const currentItems = Array.isArray(item.howWeHelp) ? item.howWeHelp : [];
                                  return {
                                    ...item,
                                    howWeHelp: typeof updater === "function" ? updater(currentItems) : updater,
                                  };
                                }),
                              )
                            }
                            placeholder="Enter how we help this condition"
                            addLabel="Add Help Point"
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center gap-2 mt-3 flex-wrap">
                        <span style={{ color: TEXT_MUTED, fontSize: 11 }}>
                          Changes are kept automatically until you publish the service.
                        </span>
                        <div className="d-flex gap-2">
                          <DashboardButton
                            variant="outline"
                            small
                            onClick={() => setExpandedConditionIndex(null)}
                          >
                            Done
                          </DashboardButton>
                          <DashboardButton
                            variant="primary"
                            small
                            onClick={handleAddCondition}
                          >
                            <Icon d={icons.plus} size={12} color="white" /> Add Next Condition
                          </DashboardButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              Highlight Quote
            </label>
            <textarea
              className="form-control"
              rows="4"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Short treatment highlight quote"
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px", resize: "vertical" }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}>
              Treatment Approach
            </label>
            <textarea
              className="form-control"
              rows="4"
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              placeholder="Explain how this service is treated"
              style={{ borderRadius: 10, borderColor: BORDER, padding: "10px 16px", resize: "vertical" }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <DashboardButton variant="outline" onClick={() => navigate("/admin/treatment")}>
            Cancel
          </DashboardButton>
          <DashboardButton variant="primary" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : editService ? "Update Service" : "Publish Service"}
          </DashboardButton>
        </div>
      </div>

      {/* Always-visible quick actions */}
      <div className="service-sticky-actions">
        <span className="service-sticky-label" style={{ color: TEXT_MUTED, fontSize: 12, fontWeight: 700 }}>
          {conditions.length} {conditions.length === 1 ? "Condition" : "Conditions"}
        </span>
        <DashboardButton variant="outline" onClick={handleAddCondition} disabled={saving}>
          <Icon d={icons.plus} size={13} /> Add Condition
        </DashboardButton>
        <DashboardButton variant="primary" onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : editService ? "Update Service" : "Publish Service"}
        </DashboardButton>
      </div>

      {/* Popup Modal */}
      <PopupModal isOpen={popup.isOpen} message={popup.message} onClose={closePopup} />

      {/* Input Modal */}
      <InputModal
        isOpen={inputModal.isOpen}
        title={inputModal.title}
        message={inputModal.message}
        placeholder={inputModal.placeholder}
        initialValue={inputModal.initialValue}
        onConfirm={(value) => {
          if (inputModal.onConfirm) inputModal.onConfirm(value);
        }}
        onCancel={closeInputModal}
      />
    </div>
  );
};

export default AddAdminService; 