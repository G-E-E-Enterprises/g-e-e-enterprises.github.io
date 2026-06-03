# G.E.E. Enterprises Website & Portal

![G.E.E. Enterprises Logo](assets/logo.png)

This repository holds the code for the official website of **Greatly Enhanced Experience Enterprises (G.E.E. Enterprises)**, hosted publicly at [g-e-e-enterprises.github.io](https://g-e-e-enterprises.github.io/).

The website showcases the organization's focus on premium, user-centric **Utility & Productivity** and **Social Interaction** applications, featuring our flagship product: **Tracking Toolkit: Time & Count**.

---

## Repository Structure

The website is designed with a lightweight, framework-free architecture using pure semantic HTML5 and vanilla CSS.

```text
├── index.html            # Main landing page & product showcase
├── styles.css            # Custom CSS design system (HSL tokens, mockup, responsiveness)
├── privacy-policy.html   # Privacy documentation for G.E.E. local-first apps
└── assets/
    └── logo.png          # Main corporate logo asset
```

### Core Components

* **Design System (`styles.css`)**: Built using custom HSL tokens, featuring dark-mode defaults, glassmorphic card overlays, responsive fluid typography via `clamp()`, and smooth micro-animations.
* **Smartphone Mockup**: A pure HTML/CSS representation of the **Tracking Toolkit** dashboard inside a responsive viewport frame, showing stopwatches, counters, checklists, and rule bubbles.
* **Contact Form**: An accessible interactive contact form with custom validation states using `:user-invalid` styling.
* **Product Roadmap**: Highlights upcoming releases for both the Utility and Social divisions.

---

## Local Development & Testing

To run the site locally and inspect layout changes in real-time, you can spin up a static server in this directory.

### Option A: Using Browser Sync (Recommended for Hot Reload)
Run this command from the repository root:
```bash
npx browser-sync start --server --files "*"
```

### Option B: Using Python's Built-in Server
If you have Python installed, run:
```bash
python3 -m http.server 8080
```
Then, open your web browser and navigate to `http://localhost:8080`.

---

## Deployment

Since this repository is named `g-e-e-enterprises.github.io`, it is configured for automatic deployment via **GitHub Pages**.

1. Commit your changes directly to the `main` branch.
2. Push your commits to GitHub.
3. GitHub Actions will automatically compile the build and update the live website within a few minutes.
