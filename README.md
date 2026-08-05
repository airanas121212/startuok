# Startuok - GitHub Pages package

This folder is a complete static website. It does not need a build step.

## Publish with GitHub Pages

1. Create a GitHub repository and copy the contents of this folder into its root.
2. Push to the `main` branch.
3. In **Settings -> Pages**, choose **GitHub Actions** as the publishing source.
4. Run the included **Deploy Startuok to GitHub Pages** workflow, or push another commit to `main`.

The included workflow publishes the site root directly. `.nojekyll`, directory-based routes, the relative web-app manifest, and the 404 base-path helper support both a custom domain and a repository Pages URL.

## Custom domain

The included `CNAME` points to `startuok.online`. Add the same domain in the repository's Pages settings and configure its DNS records. Remove `CNAME` if this repository should only use the default `github.io` address.

Canonical URLs, social metadata, `robots.txt`, and `sitemap.xml` intentionally continue to identify `https://startuok.online/` as the production site.

## Visual assets

The homepage uses three publication-ready 1536 x 1024 campaign photographs for Ofisera, Glowina, and Topiniai. PNG sources are retained and optimized WebPs are delivered by the website; all store copy and the Glowina wordmark remain editable HTML/CSS. The V4 Glowina campaign includes four clearly labelled fictional cosmetics, while Topiniai shows eight realistically constructed generic gadgets without copied trademarks. The service pages use three desktop illustrations with separate square mobile crops. Original SVG concepts remain in `assets/` as an unused comparison archive.

See `ILLUSTRATION-AUDIT.md` for the complete SVG map, visual-system rules, priorities, and reusable generation prompts.
