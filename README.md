# Batlienergy - Global Lithium Battery B2B E-commerce Platform

A professional global B2B e-commerce platform for lithium battery products, built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **24 Language Support**: Full internationalization with subdomain routing
- **Modern Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **UI Components**: shadcn/ui component library
- **Dark Theme**: Professional dark theme with electric green accent
- **Responsive Design**: Mobile-first responsive design
- **SEO Optimized**: Built-in SEO best practices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Library**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
batlienergy-store/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized routes
│   │   │   ├── layout.tsx     # Locale layout
│   │   │   └── page.tsx       # Home page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                # shadcn/ui components
│   ├── data/
│   │   └── products.ts        # Product data
│   └── lib/
│       ├── i18n/
│       │   └── config.ts      # i18n configuration
│       └── utils.ts           # Utility functions
├── public/
│   └── images/                # Static images
├── middleware.ts              # Next.js middleware
└── next.config.ts             # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd batlienergy-store
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Supported Languages (24)

- English (en) - Default
- Spanish (es)
- Portuguese (pt)
- German (de)
- French (fr)
- Italian (it)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Arabic (ar)
- Hindi (hi)
- Turkish (tr)
- Vietnamese (vi)
- Thai (th)
- Indonesian (id)
- Polish (pl)
- Dutch (nl)
- Swedish (sv)
- Chinese (zh)
- Bengali (bn)
- Urdu (ur)
- Swahili (sw)
- Persian (fa)
- Hebrew (he)

## Product Categories

1. Cylindrical Cells (18650/21700)
2. LiFePO4 Prismatic Cells
3. E-Bike Batteries
4. Tricycle Batteries
5. FPV Drone Batteries
6. Power Tool Batteries
7. Portable Power Stations
8. 32650/32700 LiFePO4
9. LiPo Packs
10. 4680 Cells
11. Home Storage Systems

## Development Roadmap

### Phase 1: Foundation (Completed)
- [x] Project setup with Next.js 16
- [x] TypeScript and Tailwind CSS configuration
- [x] shadcn/ui integration
- [x] Basic layout components (Header, Footer)
- [x] Multi-language configuration
- [x] Homepage design

### Phase 2: Core Features (Next)
- [ ] Product listing pages
- [ ] Product detail pages
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Order management

### Phase 3: Payment & AI (Future)
- [ ] Airwallex payment integration
- [ ] AI customer service chatbot
- [ ] Order tracking system

### Phase 4: Third-party Integration (Future)
- [ ] Facebook Shop integration
- [ ] Google Merchant Center
- [ ] WhatsApp Business API

## License

Private - Shenzhen Batelithium Technology Co., Ltd.

## Contact

- Email: julian@batelithium.com
- Website: https://batlienergy.com
