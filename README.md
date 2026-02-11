<p align="center">
  <img src="https://raw.githubusercontent.com/softwareprosdev/gmanwebsite/main/public/logo.png" alt="RGV Handyman Logo" width="150" height="150" />
</p>

<h1 align="center">RGV Handyman</h1>

<p align="center">
  <strong>Professional Handyman Services in South Texas</strong>
</p>

<p align="center">
  <a href="https://rgvhandyman.softwarepros.org">rgvhandyman.softwarepros.org</a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-purple?style=for-the-badge&logo=framer" />
</p>

---

## 🌟 Features

| Feature | Description |
|---------|-------------|
| **Bento Grid Design** | Modern, aesthetic layout with responsive card arrangements |
| **Interactive Animations** | Smooth scroll-triggered animations using Framer Motion |
| **Before/After Sliders** | Interactive comparison tool for portfolio showcase |
| **County Selector** | Service area selection for South Texas counties |
| **Form Validation** | Client-side form validation with error handling |
| **SEO Optimized** | Comprehensive metadata and structured data |
| **Mobile Responsive** | Fully responsive design for all devices |

---

## 📍 Service Areas

### Primary Counties
- **Hidalgo County** - McAllen, Edinburg, Mission, San Juan, Pharr, Weslaco, Donna, La Joya
- **Cameron County** - Brownsville, Harlingen, Raymondville, Los Fresnos, San Benito
- **Starr County** - Rio Grande City, Los Fresnos

### Additional Areas
- Willacy County | Kenedy County | Brooks County | Jim Hogg County

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling

### Animation & UI
- **[Framer Motion](https://framer.com/motion)** - Animation library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/softwareprosdev/gmanwebsite.git
cd gmanwebsite

# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Hero, Services, Portfolio, Booking
│   ├── ui/                  # Reusable UI (NeonButton)
│   └── animations/          # ScrollReveal, transitions
├── data/                    # Content data
│   ├── services.ts
│   ├── portfolio.ts
│   └── navigation.ts
└── utils/                   # Utility functions
```

---

## 📝 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero and services preview |
| `/services` | Full services catalog |
| `/portfolio` | Before/after project gallery |
| `/contact` | Booking form and contact information |

---

## 🔧 Configuration

### Environment Variables

```env
# Add to .env.local if needed
NEXT_PUBLIC_SITE_URL=https://rgvhandyman.softwarepros.org
```

### SEO Configuration

Edit `src/app/layout.tsx` to update:
- Site metadata (title, description, keywords)
- Open Graph tags
- Twitter card settings
- Local business schema

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Build Artifacts

```bash
npm run build
# Output: .next/ directory
```

---

## 📊 SEO & Local Marketing

### Key Optimizations
- **Local Business Schema** - Google My Business structured data
- **Geo Metadata** - Targeted for South Texas region
- **Semantic HTML** - Search engine friendly markup
- **Fast Loading** - Optimized images and code splitting
- **Mobile-First** - Responsive design for local searches

### Target Keywords
- RGV handyman
- Hidalgo County repair
- South Texas plumbing
- Brownsville electrical
- McAllen home repair

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Designed and developed for **RGV Handyman**
- Serving the Rio Grande Valley community since 2024

---

<p align="center">
  <strong>Made with 💙 for South Texas</strong>
</p>

<p align="center">
  <a href="https://rgvhandyman.softwarepros.org">Website</a> |
  <a href="https://github.com/softwareprosdev/gmanwebsite">GitHub</a>
</p>

---

*RGV Handyman - Precision Repair, Powered by Future*
