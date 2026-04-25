# School Images Guide

All branch images are organized by folder:

- `assets/images/branches/green-valley/`
- `assets/images/branches/riverdale/`
- `assets/images/branches/sunrise/`

Current files are lightweight SVG placeholders so the project runs immediately.

## Replace With Real Photos

1. Keep original high-resolution photos in a separate backup folder outside this project.
2. Create web versions in `webp` or optimized `jpg`.
3. Suggested sizes:
   - Branch card thumbnail: `800x450`
   - Gallery images: `1200x700` (or similar landscape)
4. Keep each web image around `150 KB` to `400 KB`.
5. Keep descriptive names, for example `science-lab.webp`, `campus-front.jpg`.
6. Update image paths in `assets/data/branches.json`.

## Compression Example (ImageMagick)

```bash
magick input.jpg -resize 1200x700 -quality 78 output.webp
```

The pages already use `loading="lazy"` and branch data includes image alt text.
