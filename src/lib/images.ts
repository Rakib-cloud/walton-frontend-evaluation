/** Normalize CDN/API image URLs for next/image */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;

  const trimmed = url.trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  return `https://${trimmed}`;
}

export function collectImageUrls(
  urls: Array<string | null | undefined>,
): string[] {
  const seen = new Set<string>();

  return urls
    .map(normalizeImageUrl)
    .filter((url): url is string => {
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });
}
