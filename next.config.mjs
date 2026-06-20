/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // emits ./out for the Cloudflare Worker's ASSETS binding
  images: { unoptimized: true }, // required: the export target has no image optimizer
};
export default nextConfig;
