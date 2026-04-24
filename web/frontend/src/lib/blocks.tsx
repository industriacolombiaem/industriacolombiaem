"use client";

import React from "react";
import type { RichTextBlock, RichTextLeaf } from "./strapi";

// ---------------------------------------------------------------------------
// RichTextRenderer — Strapi v5 structured JSON blocks → JSX
//
// Strapi v5 stores RichText as a structured JSON "blocks" format:
// [
//   { type: "paragraph", children: [{ type: "text", text: "Hello" }] },
//   { type: "heading", level: 2, children: [...] },
//   ...
// ]
// ---------------------------------------------------------------------------

interface RichTextRendererProps {
  content: RichTextBlock[] | null | undefined;
  className?: string;
}

export function RichTextRenderer({
  content,
  className,
}: RichTextRendererProps) {
  if (!content || content.length === 0) return null;

  return (
    <div className={className}>
      {content.map((block, index) => (
        <RichTextBlock key={index} block={block} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Block-level renderer
// ---------------------------------------------------------------------------

function RichTextBlock({ block }: { block: RichTextBlock }) {
  const children = block.children ?? [];

  switch (block.type) {
    case "paragraph":
      return <p className="mb-4 leading-relaxed">{renderLeaves(children)}</p>;

    case "heading": {
      const level = (block as RichTextBlock & { level: number }).level ?? 2;
      const headingClasses: Record<number, string> = {
        1: "font-display-xl text-headline-lg font-bold tracking-headline-lg mt-8 mb-4",
        2: "font-display-xl text-headline-md font-bold tracking-headline-md mt-6 mb-3",
        3: "font-display-xl text-headline-sm font-bold tracking-headline-sm mt-5 mb-2",
        4: "font-bold text-title-lg mt-4 mb-2",
        5: "font-bold text-title-md mt-3 mb-2",
        6: "font-bold text-title-sm mt-3 mb-1",
      };
      const cls = headingClasses[level] ?? headingClasses[2];
      const HeadingTag = `h${level}` as React.ElementType;
      return <HeadingTag className={cls}>{renderLeaves(children)}</HeadingTag>;
    }

    case "list":
      if ((block as RichTextBlock & { format: string }).format === "ordered") {
        return (
          <ol className="list-decimal list-inside mb-4 space-y-1">
            {children.map((item, i) => (
              <li key={i} className="leading-relaxed">
                <RichTextInline content={item} />
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-disc list-inside mb-4 space-y-1">
          {children.map((item, i) => (
            <li key={i} className="leading-relaxed">
              <RichTextInline content={item} />
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-on-surface-variant mb-4">
          {renderLeaves(children)}
        </blockquote>
      );

    case "code":
      return (
        <pre className="bg-surface-container rounded-sm p-4 overflow-x-auto mb-4">
          <code className="text-sm">{renderLeaves(children)}</code>
        </pre>
      );

    case "image": {
      const imageBlock = block as RichTextBlock & {
        image: { url: string; alternativeText?: string };
      };
      return (
        <figure className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageBlock.image?.url}
            alt={imageBlock.image?.alternativeText || ""}
            className="rounded-sm max-w-full h-auto"
          />
        </figure>
      );
    }

    // Fallback: treat as paragraph
    default:
      return <p className="mb-4 leading-relaxed">{renderLeaves(children)}</p>;
  }
}

// ---------------------------------------------------------------------------
// Inline content renderer (for list items, etc.)
// ---------------------------------------------------------------------------

function RichTextInline({ content }: { content: RichTextLeaf }) {
  if (content.type === "text" || content.text !== undefined) {
    return <>{renderLeaf(content)}</>;
  }

  // Link inline node
  if (content.type === "link") {
    const linkContent = content as RichTextLeaf & {
      url: string;
      children: RichTextLeaf[];
    };
    return (
      <a
        href={linkContent.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {renderLeaves(linkContent.children ?? [])}
      </a>
    );
  }

  // Other inline nodes: render children
  if (content.children) {
    return <>{renderLeaves(content.children)}</>;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Leaf (text) renderer with inline formatting
// ---------------------------------------------------------------------------

function renderLeaves(leaves: RichTextLeaf[]): React.ReactNode {
  return leaves.map((leaf, i) => <React.Fragment key={i}>{renderLeaf(leaf)}</React.Fragment>);
}

function renderLeaf(leaf: RichTextLeaf): React.ReactNode {
  let text: React.ReactNode = leaf.text ?? "";

  // Handle nested children (e.g., link inside bold text)
  if (leaf.children && leaf.children.length > 0) {
    return <RichTextInline content={leaf} />;
  }

  if (leaf.bold) text = <strong>{text}</strong>;
  if (leaf.italic) text = <em>{text}</em>;
  if (leaf.underline) text = <u>{text}</u>;
  if (leaf.strikethrough) text = <s>{text}</s>;
  if (leaf.code) text = <code className="bg-surface-container px-1 rounded text-sm">{text}</code>;

  // Handle inline link nodes that appear as leaves
  if (leaf.type === "link") {
    const linkLeaf = leaf as RichTextLeaf & { url: string };
    return (
      <a
        href={linkLeaf.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {leaf.text}
      </a>
    );
  }

  return text;
}