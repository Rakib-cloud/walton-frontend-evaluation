import DOMPurify from "isomorphic-dompurify";

const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

export function containsHtml(value: string): boolean {
  return HTML_TAG_PATTERN.test(value);
}

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "ul",
      "ol",
      "li",
      "span",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });
}
