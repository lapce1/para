/**
 * Renders a JSON-LD <script> for structured data (SEO rich results).
 * Server component — the JSON is serialized at build time into the static HTML.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: it's our own structured data, and "<"
      // can't appear unescaped in a way that breaks out of the script for these values.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
