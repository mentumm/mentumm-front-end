export const urlRegex = /^(?:([a-z]+):)?(\/\/)?([^\s$.?#].[^\s]*)$/i;

export function ensureHttps(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    return `https://${url}`;
  }
}
