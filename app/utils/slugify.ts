export default function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-alphanumeric characters
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '')             // Remove hyphens from the start of the string
    .replace(/-+$/, '');            // Remove hyphens from the end of the string
}