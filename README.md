# Babu Surendra Singh School Group Static Website

This is a static multi-branch school website built with HTML, CSS, and JavaScript.

## Local Preview

From inside `site/`:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Update Branches

1. Edit `assets/data/branches.json`.
2. Add branch images in `assets/images/branches/<branch-id>/`.
3. Keep image `src` paths and alt text updated in the JSON file.

## Deploy On GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this `site/` folder to repository root.
3. In GitHub repository settings, open **Pages**.
4. Set source to **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`.
6. Save and wait for deployment URL.

## Deploy On Netlify

1. Create a Netlify account and click **Add new site**.
2. Connect your GitHub repository.
3. Build command: leave empty.
4. Publish directory: `/`.
5. Deploy site.

## Final Setup Checklist

- Replace placeholder SVGs with real branch photos.
- Update Formspree endpoint in `contact.html`.
- Verify all map links and phone numbers.
- Set your final custom domain if required.
