# Garden

<a href="https://github.com/mlhoutel/garden/blob/main/package.json" alt="Version">
  <img src="https://img.shields.io/github/package-json/v/mlhoutel/garden?style=flat-square&color=informational" />
</a>

<a href="https://github.com/mlhoutel/garden/search?l=svelte" alt="Language">
  <img src="https://img.shields.io/github/languages/top/mlhoutel/garden?style=flat-square&color=orange" />
</a>

<a href="https://github.com/mlhoutel/garden/blob/main/LICENSE/" alt="License">
  <img src="https://img.shields.io/github/license/mlhoutel/garden?style=flat-square&color=yellow" />
</a>

&nbsp;&nbsp;

<p align="center">
  <a href="https://mlhoutel.github.io/garden/"><img src="./static/logos/sumgrad.svg" width="100px" /></a>
</p>
  
&nbsp;&nbsp;

_Welcome to my digital garden, a collection of my thoughts, ponderings, and notes on various topics! Here you'll find blog posts that delve into topics that interest me, help sheets that are quick reference guides, and demos of small, fleeting projects. Whether you want to learn something new or just explore different perspectives, I hope you find something useful here. Thanks for visiting!_ [browse website](https://mlhoutel.github.io/garden/)

## License

The source code for this site is licensed under version 2.0 of the the [Mozilla Public License](./LICENSE.md). See the licence file. The content of the posts is licensed under the Creative Commons BY SA licence.

## Compiling

1. fetch the source code from github

```
git clone https://github.com/mlhoutel/garden
```

2. install the node dependancies

```
npm install
```

> Currently, [June 2023] the choice was made to bump up the libs towards svelte 4.0. The [mdsvex](https://github.com/pngwn/MDsveX) lib don't officialy support this version, so for now, the install should be done with `npm i --force`.

3. start a local development server

```
npm run start
```

4. build the website for release

```
npm run build
```

5. start a release preview

```
npm run preview
```

# Blog Content (Private)

This repository contains all private content for the blog, used as a submodule in the **main blog-skeleton** repository.  

It is designed to work with **local development** using a plain HTTPS URL and **Vercel deployment** using a GitHub token for private access.

---

## Structure

- `articles/` — Markdown posts  
- `sheets/` — Reference materials  
- `assets/` — Images and media  
- `config/` — Metadata and configuration

---

## Usage in Main Repo

### 1. Link as Submodule

In the public blog-skeleton repo:

```
git submodule add https://github.com/yourusername/blog-content-private.git content
git commit -m "Add private content submodule"
```

### 2. Environment Setup



**Local Development:** create `.env` from `.env.example`:

```
cp .env.example .env
```

Set the submodule URL to the normal HTTPS URL:

```
CONTENT_SUBMODULE_URL=https://github.com/yourusername/garden-content.git
```

**Vercel Deployment:** add environment variable:

```
Name: CONTENT_SUBMODULE_URL
Value: https://<GH_TOKEN>@github.com/yourusername/blog-content-private.git
```

## 1️⃣ Create a GitHub Personal Access Token (PAT)

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained token → Generate new token**.  
2. Configure:

   - **Repository access:** Select only your private content repo.  
   - **Permissions:** `Contents: Read-only`  
   - **Expiration:** choose what works for you (or no expiration if you prefer).  

3. Copy the generated token — you will need it in Vercel.

---

## 2️⃣ Configure Vercel Environment Variable

1. Go to your **Vercel project → Settings → Environment Variables**.  
2. Add a new variable:

```text
Name: CONTENT_SUBMODULE_URL
Value: https://<GH_TOKEN>@github.com/yourusername/blog-content-private.git
Environment: Production, Preview (optional: Development)
```

### 3. NPM Commands

| Command | Description |
|---------|-------------|
| `npm run content:init` | Initialize and clone submodules |
| `npm run content:update` | Pull latest content |
| `npm run content:status` | Check submodule state |
| `npm run setup` | Install dependencies + initialize content |

---

## Automatic Deployment

1. Create a **Vercel Deploy Hook** → copy URL.  
2. Add a **GitHub webhook** to this repo → trigger Vercel deploy on push.

---

## Adding New Content (Private Repo Side)

1. Add markdown, assets, or config files in the proper folders.  
2. Commit and push changes:

```
git add .
git commit -m "Add new content"
git push
```

3. The main repo can fetch updates:

```
npm run content:update
git commit -am "Update content"
git push
```

---

## Notes

- Local development uses `.env` with plain HTTPS URL; no token required.  
- Vercel deployment automatically uses the tokened URL to fetch the private submodule.
```
