# Santhosh Portfolio - Graphiloper

A premium portfolio website for Santhosh V, a dual-threat professional combining Graphic Design and Full Stack Development skills.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop)

## Features

### Frontend
- **Glassmorphism Design** - Modern translucent UI with backdrop blur effects
- **Dark/Light Mode** - Seamless theme switching with `next-themes`
- **Masonry Grid** - Dynamic project layout that preserves image aspect ratios
- **Smooth Animations** - Powered by Framer Motion
- **Fully Responsive** - Optimized for all device sizes

### Sections
- **Hero** - High-impact introduction with animated elements
- **Projects** - Masonry grid showcasing recent work
- **Services & Pricing** - Tabbed pricing cards for Design, Development, and Custom Features
- **Contact** - Functional contact form with WhatsApp integration

### Admin Panel
- **Secure Authentication** - Password-protected admin access
- **Project Management** - CRUD operations for portfolio projects
- **Password Change** - Secure password update functionality
- **Favicon Upload** - Dynamic website icon management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Database** - SQLite (local) / PostgreSQL (production) with Prisma ORM
- **Email Integration** - Contact form via Resend API
- **File Uploads** - Image and favicon upload support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Database**: Prisma ORM (SQLite/PostgreSQL)
- **Email**: Resend API
- **Authentication**: Custom session-based auth

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/YOUR_USERNAME/santhosh-portfolio.git
cd santhosh-portfolio
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env
```
Edit `.env` with your values:
```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="your-secret-key"
RESEND_API_KEY="your-resend-key"
CONTACT_EMAIL="santhoshwe2007@gmail.com"
```

4. **Initialize the database**:
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**:
```bash
npm run dev
```

6. **Open in browser**: [http://localhost:3000](http://localhost:3000)

### Admin Access
- URL: `http://localhost:3000/admin/login`
- Default password: `admin123`
- **Important**: Change the default password immediately after first login!

## Project Structure

```
santhosh-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── contact/       # Contact form email handler
│   │   │   ├── projects/      # Project CRUD API
│   │   │   └── upload/        # File upload handler
│   │   ├── admin/             # Admin panel
│   │   │   ├── login/         # Admin login page
│   │   │   ├── projects/      # Project management
│   │   │   └── settings/      # Admin settings
│   │   ├── page.tsx           # Main portfolio page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── sections/         # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   ├── services-section.tsx
│   │   │   └── contact-section.tsx
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   └── whatsapp-button.tsx
│   ├── lib/
│   │   ├── utils.ts          # Utility functions
│   │   ├── prisma.ts         # Prisma client
│   │   └── auth.ts           # Authentication utilities
│   └── hooks/                # Custom React hooks
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── DEPLOYMENT.md            # Detailed deployment guide
└── package.json
```

## Customization

### Colors
Edit `src/app/globals.css` to customize the color scheme:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
}
```

### Content
- **Hero Section**: Edit `src/components/sections/hero-section.tsx`
- **Services/Pricing**: Edit `src/components/sections/services-section.tsx`
- **Projects**: Manage through admin panel or edit API fallback data

### Contact Information
Update in `src/components/sections/contact-section.tsx`:
- Email: `santhoshwe2007@gmail.com`
- WhatsApp: `+919994723048`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- **Free Hosting**: Vercel with Supabase
- **Paid Hosting**: VPS (DigitalOcean, AWS, etc.)

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/santhosh-portfolio)

## Services & Pricing

The following services are pre-configured in the application:

### Graphic Design Packages
- **Identity Starter**: ₹15,000 – ₹25,000
- **Brand Pro**: ₹40,000 – ₹65,000
- **The Creative Suite**: ₹80,000+

### Full Stack Development
- **MVP / Portfolio**: ₹45,000 – ₹75,000
- **Business Hub**: ₹1,20,000 – ₹2,50,000
- **SaaS / E-commerce**: ₹4,00,000+

### Custom Features
- Payment Gateway Integration: ₹15,000+
- Custom User Dashboard: ₹45,000+
- Third-Party API Integration: ₹12,000 - ₹30,000
- Real-time Capabilities: ₹35,000+
- Advanced PWA Setup: ₹20,000+

## API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth` | POST | Login | No |
| `/api/auth` | DELETE | Logout | Yes |
| `/api/auth` | PUT | Change password | Yes |
| `/api/contact` | POST | Send contact email | No |
| `/api/projects` | GET | List all projects | No |
| `/api/projects` | POST | Create project | Yes |
| `/api/projects` | PUT | Update project | Yes |
| `/api/projects` | DELETE | Delete project | Yes |
| `/api/upload` | POST | Upload file | Yes |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `SESSION_SECRET` | Secret for session encryption | Yes |
| `RESEND_API_KEY` | Resend API key for emails | No* |
| `FROM_EMAIL` | Sender email address | No* |
| `CONTACT_EMAIL` | Recipient email for contact form | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes |

*Required for contact form functionality

## Troubleshooting

### Common Issues

**Build fails with Prisma error**:
```bash
npx prisma generate
npm run build
```

**Database connection issues**:
- Check `DATABASE_URL` in `.env`
- Run `npx prisma db push` to sync schema

**Email not sending**:
- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for email status

## License

This project is private and proprietary. All rights reserved.

## Contact

For support or inquiries:
- Email: santhoshwe2007@gmail.com
- WhatsApp: +91 99947 23048

---

Built with ❤️ by Santhosh V - The Graphiloper
