/** @type {import('next').NextConfig} */

// IMPORTANT: this must exactly match your GitHub repository name, with a
// leading slash, e.g. if your repo is github.com/yourname/let-them-eat-cake
// then this should be "/let-them-eat-cake". If you rename the repo, update
// this too, or the site will load with broken styling and broken links.
const repoName = "/let-them-eat-cake";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: repoName,
  assetPrefix: repoName + "/",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
