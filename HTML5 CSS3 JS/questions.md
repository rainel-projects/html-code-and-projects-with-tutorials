from pathlib import Path

# Content for the markdown file
content = """# HTML5 Semantic Markup – Interview Q&A

### Q1. What is the difference between `<section>` and `<div>`?
**A:**  
`<section>` defines a thematic grouping of content with a heading.  
`<div>` is a generic container with no semantic meaning.

---

### Q2. When to use `<article>` vs `<section>`?
**A:**  
- Use `<article>` for independent, reusable content (blog post, comment).  
- Use `<section>` for grouping related content within a page.

---

### Q3. Can we have multiple `<header>` tags?
**A:**  
Yes, each section or article can have its own `<header>`.

---

### Q4. Why is semantic HTML important for SEO?
**A:**  
Search engines use semantic tags to understand content structure, giving priority to important parts like `<article>` and headings.

---

### Q5. What is the difference between `<figure>` and `<img>`?
**A:**  
`<figure>` groups visual content with a caption using `<figcaption>`. `<img>` only displays an image.
"""

# File path
file_path = Path("/mnt/data/HTML5_Semantic_Markup_Interview_QA.md")

# Write content to markdown file
file_path.write_text(content)

file_path
