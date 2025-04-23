# Divyanshu Sahu - Personal Website

This repository contains the source code for my personal website, built with Next.js and Tailwind CSS.

🔗 [Live Website](https://www.divyanshu.pro/)

## 📋 Project Overview

This is a personal portfolio website showcasing my projects, skills, blog posts, and contact information. The website features:

- Responsive design for all device sizes
- Dark mode support with user preference persistence
- Project showcase with GitHub repository links
- Blog section with Markdown support and syntax highlighting
- Contact information and social media links
- SEO optimization with proper metadata and JSON-LD
- Animated UI elements with smooth transitions

## 🛠️ Technologies Used

- **Next.js** - React framework for server-side rendering and static site generation
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **MDX** - Markdown processing with JSX support
- **Gray Matter** - YAML front-matter parser
- **Remark/Rehype** - Markdown processing ecosystem
- **Sharp** - High-performance image processing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/divyanshusahu/my-website.git
cd my-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

The website will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create an optimized production build:
```bash
npm run build
# or
yarn build
```

To start the production server locally:
```bash
npm start
# or
yarn start
```

## 📁 Project Structure

- `components/` - React components used throughout the website
  - `Footer.js` - Website footer with social links and copyright
  - `Header.js` - Navigation and theme toggle
  - `Home.js` - Homepage component with intro section
  - `Layout.js` - Common layout wrapper
  - `MyProjects.js` - Projects showcase section
  - `ProjectCard.js` - Individual project display component
- `content/` - Content files for the website
  - `blogs/` - Markdown files for blog posts
- `lib/` - Utility functions and helpers
  - `blog.js` - Functions for blog post processing
- `pages/` - Next.js pages and API routes
  - `_app.js` - Custom App component with global settings
  - `index.js` - Homepage
  - `blogs/` - Blog related pages
    - `[slug].js` - Dynamic blog post page
    - `index.js` - Blog listing page
- `public/` - Static assets like images and icons
- `styles/` - Global CSS and Tailwind configuration

## 🧪 Linting

To run the linter:
```bash
npm run lint
# or
yarn lint
```

## 🚢 Deployment

This website is deployed on [Vercel](https://vercel.com), which automatically builds and deploys from the master branch.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Divyanshu Sahu**

- GitHub: [@divyanshusahu](https://github.com/divyanshusahu)
- LinkedIn: [divyanshu-sahu](https://www.linkedin.com/in/divyanshu-sahu/)
- Twitter: [@divyan5hu](https://twitter.com/divyan5hu)
