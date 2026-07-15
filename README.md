# gzarruk_site

Personal brand site for Gustavo A. Zarruk — a single-file, bold & modern link-hub.

## Files
- `index.html` — the whole site (self-contained, no build step).
- `assets/profile.jpg` — your photo (add this yourself, see below).

## 1. Add your photo
Put your chosen photo in an `assets/` folder named exactly `profile.jpg`:

```
gzarruk_site/
  index.html
  assets/
    profile.jpg
```

Tip: a square crop (~800×800px) looks best. If the file is missing, the page
automatically shows a "GZ" monogram instead of breaking.

## 2. Push to GitHub

```bash
git clone git@github.com:gzarruk/gzarruk_site.git
# copy index.html, README.md and your assets/ folder into the repo, then:
git add .
git commit -m "Add personal brand site"
git push origin main
```

## 3. Turn on GitHub Pages
Repo → **Settings** → **Pages** → under **Build and deployment**, set
**Source = Deploy from a branch**, **Branch = main**, **Folder = / (root)** → **Save**.
Your site goes live at `https://gzarruk.github.io/gzarruk_site/` within a minute or two.

## 4. Connect your custom domain (registered at Squarespace)
Google Sites is not involved — you host on GitHub Pages and point your Squarespace
domain at it.

**a. In GitHub:** Settings → Pages → **Custom domain** → enter `www.YOURDOMAIN.com`
→ Save. (GitHub commits a `CNAME` file to the repo for you.)

**b. In Squarespace:** Domains dashboard → your domain → **DNS** → **DNS Settings**
→ **Custom Records** → **Add record**:

| Type  | Host / Name | Data / Value             |
|-------|-------------|--------------------------|
| CNAME | `www`       | `gzarruk.github.io`      |

(Optional — to make the bare `yourdomain.com` also work, add four **A** records on
host `@` pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`,
`185.199.110.153`, `185.199.111.153`.)

**c. Back in GitHub Pages:** once DNS propagates (can take up to 24–48h), tick
**Enforce HTTPS**.

## Editing later
Everything is plain HTML/CSS in `index.html` — edit the name, tagline, bio, or link
URLs directly, commit, and push. Colors live in the `:root` block near the top.
