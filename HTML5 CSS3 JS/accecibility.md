from pathlib import Path

# Content for the markdown file
content = """# HTML5 Accessibility (a11y) – Interview Q&A

### Q1. What makes this example accessible?
- Uses semantic HTML5 and ARIA roles.
- Proper heading hierarchy.
- Keyboard navigable links.
- Tooltip explanations for learning.

---

### Q2. Why are ARIA roles used if we already have semantic HTML?
- Semantic HTML is preferred, but ARIA roles reinforce meaning for assistive technologies or older browsers.

---

### Q3. What is the difference between `<section>` and `<article>` in accessibility?
- `<section>` → groups related content within a page.
- `<article>` → independent, self-contained content readable alone.
- Screen readers announce them differently.

---

### Q4. How does `<aside>` help with accessibility?
- Marks content as supplementary, allowing users to skip or focus only if needed.

---

### Q5. What is the purpose of a proper heading hierarchy?
- Helps screen readers navigate sections efficiently.
- Improves overall readability and SEO.

---

### Q6. How would you make an image accessible in this code?
```html
<img src="profile.jpg" alt="Profile picture of Veda" />
