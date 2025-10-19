from pathlib import Path

# Content for the markdown file
content = """# SEO Basics – HTML5 & Frontend Developer Interview Q&A

## Key SEO Practices in This Code
- Unique `<title>` per page.
- Meta description summarizing page content.
- Canonical link to prevent duplicate content issues.
- Heading hierarchy (`h1` → `h2` → `h3`).
- Descriptive anchor text for links.
- Alt attributes for all images.
- Use of semantic HTML5 tags (`header`, `main`, `section`, `article`, `aside`, `footer`).
- Strong/emphasis tags for important content.

---

## 🧩 Interview Questions on SEO

### Q1. Why is the `<title>` tag important for SEO?
- Search engines use it as the page title in search results.

### Q2. What is the purpose of meta description?
- Provides a summary of the page; can influence click-through rates.

### Q3. Why are semantic HTML5 tags important for SEO?
- Help search engines understand content structure.
- Improve accessibility and readability.

### Q4. How do you make images SEO-friendly?
- Use `alt` text describing the image.
- Optionally add `title` attributes.

### Q5. What is a canonical link and why is it needed?
- Prevents duplicate content issues by telling search engines the preferred URL.

### Q6. What is the difference between `<strong>` and `<b>` for SEO?
- `<strong>` indicates importance to search engines and screen readers.
- `<b>` is purely visual, no semantic meaning.
"""

# File path
file_path = Path("/mnt/data/HTML5_SEO_Interview_QA.md")

# Write content to markdown file
file_path.write_text(content)

file_path
