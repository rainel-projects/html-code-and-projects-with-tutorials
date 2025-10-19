from pathlib import Path

# Content for the markdown file
content = """# CSS3 Layouts – Flexbox & Grid Interview Questions

## 🧩 Flexbox Interview Questions

**Q1. What is Flexbox in CSS?**  
Flexbox is a CSS layout model for one-dimensional layouts (row or column).  
It makes alignment, spacing, and distribution of items easier than floats or inline-block.

**Q2. Difference between `flex-direction: row` and `flex-direction: column`?**  
- `row`: main axis is horizontal → items laid out left to right.  
- `column`: main axis is vertical → items stacked top to bottom.

**Q3. What does `justify-content` do?**  
- Aligns items along the main axis.  
- Common values: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`.

**Q4. What does `align-items` do?**  
- Aligns items along the cross axis (perpendicular to main axis).  
- Values: `stretch` (default), `flex-start`, `flex-end`, `center`, `baseline`.

**Q5. How do you make all flex items grow equally?**  
- Use `flex: 1` on the flex items.  
- Shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0;`.

**Q6. Difference between `align-items` and `align-self`?**  
- `align-items`: applies to all items in the container.  
- `align-self`: overrides `align-items` for a single item.

**Q7. What is `flex-wrap` and why is it used?**  
Determines if items wrap to next line when they overflow:  
- `nowrap` → default, no wrap  
- `wrap` → wraps items to next line  
- `wrap-reverse` → wraps in reverse order

**Q8. Can Flexbox be used for entire page layout?**  
- Yes, but it’s mainly for linear (1D) layouts.  
- For complex 2D layouts, CSS Grid is preferred.

---

## 🧩 Grid Interview Questions

**Q1. What is CSS Grid and how is it different from Flexbox?**  
- Grid is 2D (rows + columns), Flexbox is 1D (row OR column).

**Q2. What does `1fr` mean in `grid-template-columns`?**  
- `fr` = fraction of available space. `1fr` = 1 part of the space.

**Q3. How do you create gaps between grid items?**  
- Use `grid-gap` (or just `gap` in modern CSS) for rows and columns.

**Q4. How can a grid item span multiple columns or rows?**  
- `grid-column: 1 / 3;` → spans from column 1 to 3  
- `grid-row: 1 / 3;` → spans multiple rows

**Q5. How do you make a responsive grid?**  
- Combine `repeat(auto-fit, minmax(200px, 1fr))` with media queries.

**Q6. Can Grid and Flexbox be used together?**  
- Yes! Use Grid for page layout and Flexbox for individual sections or rows.
"""

# File path
file_path = Path("/mnt/data/CSS3_Layouts_Interview_QA.md")

# Write content to markdown file
file_path.write_text(content)

file_path
