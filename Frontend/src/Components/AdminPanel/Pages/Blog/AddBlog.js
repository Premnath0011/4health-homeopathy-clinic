import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Apiurl from "../../Environmnet/Apiurl";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
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
  image:
    "M4 16l4-4 4 4 4-4 4 4M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
  bold: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
  italic: "M19 4h-9M14 20H5M15 4L9 20",
  underline: "M6 3v6a6 6 0 0 0 12 0V3M4 21h16",
  strike: "M4 12h16M4 6h16",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5",
  codeBlock: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h5",
  superscript: "M12 4l2 2-2 2M4 18h10",
  subscript: "M12 20l2-2-2-2M4 6h10",
  heading:
    "M1 4v6M1 10h6M1 4h6M1 14v6M1 20h6M1 14h6M11 4h10M11 10h7M11 14h10M11 20h7",
  paragraph: "M4 6h16M4 12h16M4 18h10",
  quote:
    "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.5-2-3L7 1M17 21c3 0 7-1 7-8V5c0-1.25-.756-2.5-2-3L21 1",
  alignLeft: "M4 6h16M4 12h12M4 18h8",
  alignCenter: "M4 6h16M6 12h12M8 18h8",
  alignRight: "M4 6h16M8 12h12M12 18h8",
  alignJustify: "M4 6h16M4 12h16M4 18h16",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  listOrdered:
    "M10 6h11M10 12h11M10 18h11M4 4v4M6 4H4M5 8v3M7 8v3M4 16.5L5 18l2-2",
  taskList: "M9 5l3 3 8-8M5 12h14M5 18h14",
  color:
    "M12 2a8 8 0 0 0-8 8c0 4 8 12 8 12s8-8 8-12a8 8 0 0 0-8-8z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  highlight:
    "M12 2a8 8 0 0 0-8 8c0 4 8 12 8 12s8-8 8-12a8 8 0 0 0-8-8z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  table: "M4 4h16v16H4z M9 4v16M15 4v16M4 9h16M4 15h16",
  youtube:
    "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02L15.5 11.75l-5.75-3.27v6.54z",
  embed: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h8",
  horizontalRule: "M4 12h16",
  undo: "M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
  redo: "M21 7v6h-6M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  grab: "M9 5h6M9 12h6M9 19h6",
  close: "M18 6L6 18M6 6l12 12",
  emoji:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01M15 9h.01",
  mention:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M12 8v4l2 2M12 16h.01",
  slash: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z M12 6v6l4 2",
  chevronDown: "M6 9l6 6 6-6",
  chevronUp: "M18 15l-6-6-6 6",
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

// ── Popup Modal (Info / Error – OK button only) ─────────────────────────
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

// ── Input Modal (Prompt replacement – with Cancel & Confirm) ────────────
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
const DashboardButton = ({
  variant = "outline",
  children,
  onClick,
  disabled,
  style,
  small = false,
}) => {
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
    border:
      variant === "primary" ? "none" : `1.5px solid ${hover ? GREEN : BORDER}`,
    background:
      variant === "primary"
        ? hover && !disabled
          ? GREEN_HOVER
          : GREEN
        : "white",
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
const ToolbarButton = ({
  onClick,
  children,
  active = false,
  disabled = false,
}) => (
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
    onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.background = "#f1f5f9";
    }}
    onMouseLeave={(e) => {
      if (!active) e.currentTarget.style.background = "transparent";
    }}
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
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        padding: "8px 12px",
        borderBottom: `1px solid ${BORDER}`,
        background: "#f9fafb",
        borderRadius: "12px 12px 0 0",
      }}
    >
      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Icon d={icons.bold} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Icon d={icons.italic} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <Icon d={icons.underline} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      >
        <Icon d={icons.strike} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <Icon d={icons.code} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      >
        <Icon d={icons.codeBlock} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        active={editor.isActive("superscript")}
      >
        <Icon d={icons.superscript} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        active={editor.isActive("subscript")}
      >
        <Icon d={icons.subscript} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <Icon d={icons.close} size={14} /> Clear
      </ToolbarButton>

      {/* Headings */}
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <ToolbarButton
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          active={editor.isActive("heading", { level })}
        >
          H{level}
        </ToolbarButton>
      ))}
      <ToolbarButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        active={editor.isActive("paragraph")}
      >
        <Icon d={icons.paragraph} size={14} />
      </ToolbarButton>

      {/* Block Quote & Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        <Icon d={icons.quote} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      >
        <Icon d={icons.alignLeft} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      >
        <Icon d={icons.alignCenter} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      >
        <Icon d={icons.alignRight} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        active={editor.isActive({ textAlign: "justify" })}
      >
        <Icon d={icons.alignJustify} size={14} />
      </ToolbarButton>

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <Icon d={icons.list} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        <Icon d={icons.listOrdered} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        active={editor.isActive("taskList")}
      >
        <Icon d={icons.taskList} size={14} />
      </ToolbarButton>

      {/* Color & Highlight */}
      <ToolbarButton onClick={() => handleColorChange("text")}>
        <Icon d={icons.color} size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => handleColorChange("highlight")}>
        <Icon d={icons.highlight} size={14} />
      </ToolbarButton>

      {/* Media */}
      <ToolbarButton onClick={addImage}>
        <Icon d={icons.image} size={14} />
      </ToolbarButton>

      {/* Links */}
      <ToolbarButton
        onClick={() => {
          openInputModal({
            title: "Enter Link URL",
            message: "Type the URL you want to link to:",
            placeholder: "https://example.com",
            initialValue: "",
            onConfirm: (url) => {
              if (url)
                editor
                  .chain()
                  .focus()
                  .setLink({ href: url, target: "_blank" })
                  .run();
            },
          });
        }}
        active={editor.isActive("link")}
      >
        <Icon d={icons.link} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          if (editor.isActive("link")) {
            const currentHref = editor.getAttributes("link").href || "";
            openInputModal({
              title: "Edit Link URL",
              message: "Update the link URL:",
              placeholder: "https://example.com",
              initialValue: currentHref,
              onConfirm: (url) => {
                if (url)
                  editor
                    .chain()
                    .focus()
                    .setLink({ href: url, target: "_blank" })
                    .run();
              },
            });
          }
        }}
      >
        <Icon d={icons.link} size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()}>
        <Icon d={icons.close} size={14} />
      </ToolbarButton>

      {/* Tables */}
      <ToolbarButton onClick={insertTable}>
        <Icon d={icons.table} size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()}>
        + Row
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()}>
        - Row
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        + Col
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        - Col
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().mergeCells().run()}>
        Merge
      </ToolbarButton>

      {/* Embeds */}
      <ToolbarButton onClick={addEmbed}>
        <Icon d={icons.embed} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          openInputModal({
            title: "Enter YouTube URL",
            message: "Paste the YouTube video URL:",
            placeholder: "https://www.youtube.com/watch?v=...",
            initialValue: "",
            onConfirm: (url) => {
              if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
            },
          });
        }}
      >
        <Icon d={icons.youtube} size={14} />
      </ToolbarButton>

      {/* Layout */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Icon d={icons.horizontalRule} size={14} />
      </ToolbarButton>

      {/* Productivity */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
        <Icon d={icons.undo} size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
        <Icon d={icons.redo} size={14} />
      </ToolbarButton>

      {/* Advanced – Emoji, Mention */}
      <ToolbarButton
        onClick={() => {
          openInputModal({
            title: "Insert Emoji",
            message: "Type an emoji (e.g., 😊) or a colon code (:smile:):",
            placeholder: "😊 or :smile:",
            initialValue: "",
            onConfirm: (emoji) => {
              if (emoji) editor.commands.insertContent(emoji);
            },
          });
        }}
      >
        <Icon d={icons.emoji} size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          openInputModal({
            title: "Add Mention",
            message: "Enter the name to mention (e.g., Dr. Sharma):",
            placeholder: "Dr. Sharma",
            initialValue: "",
            onConfirm: (name) => {
              if (name) editor.commands.insertContent(`@${name}`);
            },
          });
        }}
      >
        <Icon d={icons.mention} size={14} />
      </ToolbarButton>
    </div>
  );
};

// ── Section Editor ──────────────────────────────────────────────────────────
const SectionEditor = ({
  section,
  sectionNumber,
  isOpen,
  onToggle,
  onHeadingChange,
  onContentChange,
  onRemove,
  onAddAfter,
  canRemove,
  openInputModal,
  registerSectionRef,
  registerHeadingRef,
}) => {
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
      Placeholder.configure({ placeholder: "Write your section content…" }),
      CharacterCount,
    ],
    content: section.content || "<p>Write your section content...</p>",
    onUpdate: ({ editor }) => {
      onContentChange(section.id, editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && section.content !== editor.getHTML()) {
      editor.commands.setContent(
        section.content || "<p>Write your section content...</p>",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, section.content]);

  const plainContent = String(section.content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div
      ref={(node) => registerSectionRef(section.id, node)}
      style={{
        border: `1px solid ${isOpen ? GREEN : BORDER}`,
        borderRadius: 16,
        background: "white",
        marginBottom: 14,
        overflow: "hidden",
        boxShadow: isOpen
          ? "0 8px 24px rgba(46,139,87,0.10)"
          : "0 2px 10px rgba(46,139,87,0.04)",
        scrollMarginTop: 96,
        transition: "all 0.2s ease",
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(section.id)}
        style={{
          width: "100%",
          border: "none",
          background: isOpen ? GREEN_SOFT : "white",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: isOpen ? GREEN : "#E8F5EE",
            color: isOpen ? "white" : GREEN,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {sectionNumber}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 750,
              color: TEXT_DARK,
              fontSize: 14,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {section.heading.trim() || `Untitled Section ${sectionNumber}`}
          </div>
          <div
            style={{
              color: TEXT_MUTED,
              fontSize: 11,
              marginTop: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {plainContent || "No section content yet"}
          </div>
        </div>

        <span
          style={{
            fontSize: 11,
            color: TEXT_MUTED,
            background: "white",
            border: `1px solid ${BORDER}`,
            borderRadius: 20,
            padding: "4px 9px",
            flexShrink: 0,
          }}
        >
          {plainContent ? `${plainContent.split(" ").length} words` : "Empty"}
        </span>

        {canRemove && (
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              onRemove(section.id);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                onRemove(section.id);
              }
            }}
            style={{
              color: "#D63C3C",
              border: "1px solid #FECACA",
              background: "#FFF7F7",
              borderRadius: 20,
              padding: "5px 10px",
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            Remove
          </span>
        )}

        <Icon
          d={isOpen ? icons.chevronUp : icons.chevronDown}
          size={16}
          color={GREEN}
        />
      </button>

      {isOpen && (
        <div style={{ padding: "18px 18px 20px" }}>
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: TEXT_DARK,
                marginBottom: 6,
              }}
            >
              Section Heading *
            </label>
            <input
              ref={(node) => registerHeadingRef(section.id, node)}
              type="text"
              className="form-control"
              placeholder="e.g., Introduction, Symptoms, Treatment Options"
              value={section.heading}
              onChange={(e) => onHeadingChange(section.id, e.target.value)}
              style={{
                borderRadius: 10,
                borderColor: BORDER,
                padding: "10px 14px",
                fontSize: 14,
                fontWeight: 600,
                color: TEXT_DARK,
              }}
            />
          </div>

          <div
            style={{
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <MenuBar editor={editor} openInputModal={openInputModal} />
            <EditorContent
              editor={editor}
              style={{
                padding: "12px 16px",
                minHeight: 150,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 14,
            }}
          >
            <DashboardButton
              variant="outline"
              small
              onClick={() => onAddAfter(section.id)}
            >
              <Icon d={icons.plus} size={12} /> Add Next Section
            </DashboardButton>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main AddBlog ──────────────────────────────────────────────────────────
const AddBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editBlog = location.state?.editBlog || null;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Popup for errors/info (OK only)
  const [popup, setPopup] = useState({ isOpen: false, message: "" });

  // Input modal for user text input
  const [inputModal, setInputModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    placeholder: "",
    initialValue: "",
    onConfirm: null,
  });

  const initialSectionId = useRef(Date.now()).current;
  const [sections, setSections] = useState([
    {
      id: initialSectionId,
      heading: "",
      content: "<p>Start writing your first section...</p>",
    },
  ]);
  const [openSectionId, setOpenSectionId] = useState(initialSectionId);
  const sectionRefs = useRef(new Map());
  const headingRefs = useRef(new Map());

  // ── Pre-fill fields when editing an existing blog ──
  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title || "");
      setAuthor(editBlog.author || "");
      setDate(
        editBlog.date
          ? editBlog.date.slice(0, 10)
          : new Date().toISOString().split("T")[0],
      );
      setCategory(editBlog.category || "");
      setIsPopular(Boolean(editBlog.isPopular));
      const apiServerUrl = Apiurl.replace(/\/api\/?$/, "");
      setImageUrl(
        editBlog.image
          ? editBlog.image.startsWith("http")
            ? editBlog.image
            : `${apiServerUrl}${editBlog.image}`
          : "",
      );
      if (editBlog.sections && editBlog.sections.length > 0) {
        const loadedSections = editBlog.sections.map((s, i) => ({
          id: Date.now() + i,
          heading: s.heading || "",
          content: s.content || "<p></p>",
        }));
        setSections(loadedSections);
        setOpenSectionId(loadedSections[0]?.id || initialSectionId);
      }
    }
  }, [editBlog]);

  // ── Modal functions ──
  const showPopup = (msg) => setPopup({ isOpen: true, message: msg });
  const closePopup = () => setPopup({ isOpen: false, message: "" });

  const openInputModal = ({
    title,
    message,
    placeholder = "",
    initialValue = "",
    onConfirm,
  }) => {
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

  // ── Section handlers ──
  const registerSectionRef = useCallback((id, node) => {
    if (node) sectionRefs.current.set(id, node);
    else sectionRefs.current.delete(id);
  }, []);

  const registerHeadingRef = useCallback((id, node) => {
    if (node) headingRefs.current.set(id, node);
    else headingRefs.current.delete(id);
  }, []);

  const focusSection = useCallback((id, focusHeading = true) => {
    window.setTimeout(() => {
      sectionRefs.current.get(id)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      if (focusHeading) {
        window.setTimeout(() => headingRefs.current.get(id)?.focus(), 350);
      }
    }, 60);
  }, []);

  const addSection = (afterId = null) => {
    const newSection = {
      id: Date.now() + Math.random(),
      heading: "",
      content: "<p>Start writing this section...</p>",
    };

    setSections((currentSections) => {
      if (!afterId) return [...currentSections, newSection];

      const insertIndex = currentSections.findIndex(
        (section) => section.id === afterId,
      );
      if (insertIndex === -1) return [...currentSections, newSection];

      const nextSections = [...currentSections];
      nextSections.splice(insertIndex + 1, 0, newSection);
      return nextSections;
    });

    setOpenSectionId(newSection.id);
    focusSection(newSection.id);
  };

  const removeSection = (id) => {
    if (sections.length <= 1) {
      showPopup("You need at least one section.");
      return;
    }

    const sectionToRemove = sections.find((section) => section.id === id);
    const shouldRemove = window.confirm(
      `Remove "${sectionToRemove?.heading || "this section"}"?`,
    );
    if (!shouldRemove) return;

    const currentIndex = sections.findIndex((section) => section.id === id);
    const nextSections = sections.filter((section) => section.id !== id);
    setSections(nextSections);

    if (openSectionId === id) {
      const nextOpenSection =
        nextSections[Math.min(currentIndex, nextSections.length - 1)];
      if (nextOpenSection) {
        setOpenSectionId(nextOpenSection.id);
        focusSection(nextOpenSection.id, false);
      }
    }
  };

  const updateHeading = (id, newHeading) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === id ? { ...section, heading: newHeading } : section,
      ),
    );
  };

  const updateContent = (id, newContent) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section,
      ),
    );
  };

  const toggleSection = (id) => {
    setOpenSectionId((currentId) => (currentId === id ? null : id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title || !author) {
      showPopup("Please fill in Title and Author.");
      return;
    }
    const invalidSection = sections.find((section) => !section.heading.trim());
    if (invalidSection) {
      setOpenSectionId(invalidSection.id);
      focusSection(invalidSection.id);
      showPopup("Please fill in all section headings.");
      return;
    }

    const cleanSections = sections.map(({ heading, content }) => ({
      heading: heading.trim(),
      content,
    }));

    const contentHtml = cleanSections
      .map((section) => `<h2>${section.heading}</h2>${section.content}`)
      .join("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("category", category.trim() || "Uncategorized");
    formData.append("isPopular", String(isPopular));

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (editBlog?.image && imageUrl) {
      formData.append("keepExistingImage", "true");
    } else if (editBlog?.image && !imageUrl) {
      formData.append("removeImage", "true");
    }

    formData.append(
      "excerpt",
      contentHtml.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 140) + "...",
    );
    formData.append("sections", JSON.stringify(cleanSections));
    formData.append("content", contentHtml);

    try {
      setSubmitting(true);
      if (editBlog?._id) {
        await axios.put(`${Apiurl}/blog/${editBlog._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showPopup("Blog updated successfully!");
      } else {
        await axios.post(`${Apiurl}/blog`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showPopup("Blog published successfully!");
      }
      setTimeout(() => navigate("/admin/blog"), 900);
    } catch (err) {
      showPopup("Failed to save blog. Please try again.");
    } finally {
      setSubmitting(false);
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
        padding: "24px 28px 110px",
        background: BG,
        minHeight: "100vh",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: 14,
      }}
    >
      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <DashboardButton
            variant="outline"
            small
            onClick={() => navigate("/admin/blog")}
          >
            <Icon d={icons.arrowLeft} size={14} /> Back
          </DashboardButton>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: TEXT_DARK,
              margin: 0,
            }}
          >
            {editBlog ? "Edit Blog" : "Add New Blog"}
          </h1>
        </div>
        <div
          style={{
            color: TEXT_MUTED,
            fontSize: 12,
            background: "white",
            border: `1px solid ${BORDER}`,
            borderRadius: 20,
            padding: "6px 12px",
          }}
        >
          {sections.length} {sections.length === 1 ? "section" : "sections"}
        </div>
      </div>

      {/* ── Form Card ── */}
      <div style={card}>
        {/* Metadata */}
        <div className="mb-4">
          <label
            className="form-label"
            style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}
          >
            Blog Title *
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              borderRadius: 10,
              borderColor: BORDER,
              padding: "10px 16px",
              fontSize: 15,
            }}
          />
        </div>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}
            >
              Author *
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                borderRadius: 10,
                borderColor: BORDER,
                padding: "10px 16px",
              }}
            />
          </div>
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}
            >
              Date *
            </label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                borderRadius: 10,
                borderColor: BORDER,
                padding: "10px 16px",
              }}
            />
          </div>
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}
            >
              Category
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Homeopathy, Wellness"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                borderRadius: 10,
                borderColor: BORDER,
                padding: "10px 16px",
              }}
            />
          </div>
        </div>

        {/* Popular Article Control */}
        <div
          className="mb-4"
          style={{
            border: `1px solid ${isPopular ? GREEN : BORDER}`,
            background: isPopular ? GREEN_SOFT : "#ffffff",
            borderRadius: 14,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 750,
                fontSize: 13,
                color: TEXT_DARK,
                marginBottom: 3,
              }}
            >
              Popular Article
            </div>
            <div style={{ fontSize: 11, color: TEXT_MUTED }}>
              Enable this to show the article inside the website Popular Articles card.
            </div>
          </div>

          <label
            htmlFor="popular-article-toggle"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12,
              color: isPopular ? GREEN : TEXT_MUTED,
              userSelect: "none",
            }}
          >
            <input
              id="popular-article-toggle"
              type="checkbox"
              checked={isPopular}
              onChange={(event) => setIsPopular(event.target.checked)}
              style={{ width: 18, height: 18, accentColor: GREEN, cursor: "pointer" }}
            />
            {isPopular ? "Selected as Popular" : "Mark as Popular"}
          </label>
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label
            className="form-label"
            style={{ fontWeight: 600, fontSize: 13, color: TEXT_DARK }}
          >
            Featured Image
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
              style={{
                width: "auto",
                borderRadius: 10,
                borderColor: BORDER,
                padding: "8px 12px",
              }}
            />
            {imageUrl && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 10,
                    border: `1px solid ${BORDER}`,
                  }}
                />
                <span
                  style={{ fontSize: 12, color: TEXT_MUTED, cursor: "pointer" }}
                  onClick={() => {
                    setImageUrl("");
                    setImageFile(null);
                  }}
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

        {/* Sections */}
        <div className="mb-3">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <label
                className="form-label"
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: TEXT_DARK,
                  margin: 0,
                }}
              >
                Blog Sections *
              </label>
              <div style={{ color: TEXT_MUTED, fontSize: 11, marginTop: 3 }}>
                Open one section at a time. Add the next section directly below
                the current one.
              </div>
            </div>
            <span
              style={{
                color: GREEN,
                background: GREEN_SOFT,
                borderRadius: 20,
                padding: "5px 10px",
                fontWeight: 700,
                fontSize: 11,
                whiteSpace: "nowrap",
              }}
            >
              {sections.length} Total
            </span>
          </div>

          <div>
            {sections.map((section, index) => (
              <SectionEditor
                key={section.id}
                section={section}
                sectionNumber={index + 1}
                isOpen={openSectionId === section.id}
                onToggle={toggleSection}
                onHeadingChange={updateHeading}
                onContentChange={updateContent}
                onRemove={removeSection}
                onAddAfter={addSection}
                canRemove={sections.length > 1}
                openInputModal={openInputModal}
                registerSectionRef={registerSectionRef}
                registerHeadingRef={registerHeadingRef}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => addSection()}
            style={{
              width: "100%",
              border: `1.5px dashed ${GREEN}`,
              color: GREEN,
              background: GREEN_SOFT,
              borderRadius: 14,
              padding: "13px 16px",
              fontWeight: 750,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            <Icon d={icons.plus} size={14} /> Add Another Section
          </button>
        </div>
      </div>

      <style>{`
        .blog-bottom-actions {
          position: fixed;
          right: 28px;
          bottom: 20px;
          z-index: 1200;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid ${BORDER};
          border-radius: 18px;
          padding: 10px;
          box-shadow: 0 12px 34px rgba(30, 47, 43, 0.18);
          backdrop-filter: blur(10px);
        }
        @media (max-width: 768px) {
          .blog-bottom-actions {
            left: 12px;
            right: 12px;
            bottom: 12px;
            justify-content: flex-end;
            overflow-x: auto;
          }
        }
      `}</style>

      {/* Always-visible bottom actions */}
      <div className="blog-bottom-actions">
        <DashboardButton
          variant="outline"
          onClick={() => navigate("/admin/blog")}
          disabled={submitting}
        >
          Cancel
        </DashboardButton>
        <DashboardButton
          variant="outline"
          onClick={() => addSection()}
          disabled={submitting}
        >
          <Icon d={icons.plus} size={13} /> Add Section
        </DashboardButton>
        <DashboardButton
          variant="primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? "Saving..."
            : editBlog
              ? "Update Blog"
              : "Publish Blog"}
        </DashboardButton>
      </div>

      {/* ── Popup Modal (info/error) ── */}
      <PopupModal
        isOpen={popup.isOpen}
        message={popup.message}
        onClose={closePopup}
      />

      {/* ── Input Modal (prompt replacement) ── */}
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

export default AddBlog; 
