import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const pages = ["es", "en", "pt"]
    .map((language) => `  <url><loc>${new URL(`/${language}/`, site)}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages}\n</urlset>\n`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    },
  );
};
