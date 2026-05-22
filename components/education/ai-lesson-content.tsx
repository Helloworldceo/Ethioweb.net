import { Fragment, ReactNode } from "react";

type AiLessonContentProps = {
  content: string;
};

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`} className="rounded bg-[var(--paper)] px-1.5 py-0.5 text-[0.95em]">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

export function AiLessonContent({ content }: AiLessonContentProps) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let tableLines: string[] = [];
  let codeLines: string[] = [];
  let inCodeBlock = false;

  function flushList() {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className="space-y-3 pl-5 text-sm leading-7 text-[var(--muted)]">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`} className="list-disc">{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  }

  function flushTable() {
    if (tableLines.length === 0) return;
    blocks.push(
      <pre key={`table-${blocks.length}`} className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-sm leading-7 text-[var(--muted)] whitespace-pre-wrap">
        {tableLines.join("\n")}
      </pre>,
    );
    tableLines = [];
  }

  function flushCode() {
    if (codeLines.length === 0) return;
    blocks.push(
      <pre key={`code-${blocks.length}`} className="overflow-x-auto rounded-2xl bg-[#101a1a] p-4 text-sm leading-7 text-[#d8f7f2] whitespace-pre-wrap">
        <code>{codeLines.join("\n")}</code>
      </pre>,
    );
    codeLines = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushList();
      flushTable();
      if (inCodeBlock) {
        flushCode();
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushList();
      flushTable();
      continue;
    }

    if (line.startsWith("|")) {
      flushList();
      tableLines.push(line);
      continue;
    }

    flushTable();

    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="heading-display text-2xl font-black text-[var(--ink)]">
          {renderInline(line.slice(3))}
        </h2>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="heading-display text-xl font-bold text-[var(--ink)]">
          {renderInline(line.slice(4))}
        </h3>,
      );
      continue;
    }

    if (line.startsWith("> ")) {
      flushList();
      blocks.push(
        <blockquote key={`quote-${blocks.length}`} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm leading-7 text-[var(--muted)]">
          {renderInline(line.slice(2))}
        </blockquote>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      continue;
    }

    flushList();
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-sm leading-8 text-[var(--muted)]">
        {renderInline(line)}
      </p>,
    );
  }

  flushList();
  flushTable();
  flushCode();

  return <div className="space-y-5">{blocks}</div>;
}
