

## Deploy to GitHub Pages with Custom Domain

### Overview
Your current GitHub Actions workflow uploads raw source code instead of building the app first. We need to update it to install dependencies, build the project, and deploy the built output. We also need to add a `CNAME` file for your custom domain.

### Changes

**1. Update `.github/workflows/static.yml`**
- Add a Node.js setup step (Node 20)
- Add `npm ci` to install dependencies
- Add `npm run build` to build the Vite project
- Change the upload path from `'.'` (raw source) to `'./dist'` (built output)

**2. Add `public/CNAME`**
- Create a file containing your custom domain name (e.g., `synapsio.com`)
- Vite copies files from `public/` into `dist/` during build, so GitHub Pages will pick it up automatically

### What you need to do on your end (after these changes are pushed)

1. **Enable GitHub Pages** in your repo: Settings > Pages > Source: "GitHub Actions"
2. **Configure DNS** at your domain registrar:
   - A record: `@` pointing to `185.199.108.153`
   - A record: `@` pointing to `185.199.109.153`
   - A record: `@` pointing to `185.199.110.153`
   - A record: `@` pointing to `185.199.111.153`
   - CNAME record: `www` pointing to `yourusername.github.io`
3. In GitHub repo Settings > Pages, enter your custom domain and enable "Enforce HTTPS"

### Technical Details

Updated workflow steps:

```text
steps:
  - Checkout code
  - Setup Node.js 20
  - npm ci (install dependencies)
  - npm run build (produces dist/ folder)
  - Configure Pages
  - Upload dist/ as artifact
  - Deploy to GitHub Pages
```

