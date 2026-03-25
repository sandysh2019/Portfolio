# Deployment Guide - Santhosh Portfolio

This guide provides step-by-step instructions for deploying the Santhosh Portfolio website on both free and paid hosting infrastructures.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Free Deployment (Vercel)](#free-deployment-vercel)
- [Paid Deployment (VPS/DigitalOcean)](#paid-deployment-vpsdigitalocean)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed locally
- A GitHub account (for Vercel deployment)
- Your project code pushed to a Git repository

---

## Free Deployment (Vercel)

Vercel is the recommended platform for free Next.js deployment with serverless functions support.

### Step 1: Prepare Your Project

1. Ensure your `package.json` has the correct build script:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

2. Update `next.config.js` for static export (optional for Vercel):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
```

### Step 2: Set Up Database (Supabase)

Since serverless environments don't persist local files, you need a cloud database:

1. **Create a Supabase account** at [supabase.com](https://supabase.com)

2. **Create a new project** and get your connection details

3. **Update your database schema** - Run this SQL in Supabase SQL Editor:
```sql
-- Create Project table
CREATE TABLE projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Create Admin table
CREATE TABLE admins (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  password TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Create SiteConfig table
CREATE TABLE siteconfigs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

4. **Update Prisma schema** (`prisma/schema.prisma`):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  imageUrl    String
  category    String
  link        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Admin {
  id        String   @id @default(cuid())
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteConfig {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

5. **Install PostgreSQL adapter**:
```bash
npm install @prisma/adapter-neon @neondatabase/serverless
```

### Step 3: Deploy to Vercel

1. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/santhosh-portfolio.git
git push -u origin main
```

2. **Import project to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework Preset: Next.js

3. **Configure Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add the following:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` (from Supabase) | Production, Preview, Development |
| `SESSION_SECRET` | A random 32+ character string | Production, Preview |
| `RESEND_API_KEY` | Your Resend API key | Production |
| `FROM_EMAIL` | `onboarding@resend.dev` | Production |
| `CONTACT_EMAIL` | `santhoshwe2007@gmail.com` | Production |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Production |

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your site

### Step 4: Set Up Email (Resend)

1. **Create Resend account** at [resend.com](https://resend.com)

2. **Get API Key** from Resend dashboard

3. **Verify your domain** (optional but recommended):
   - Add your domain in Resend
   - Add DNS records as instructed
   - Wait for verification

4. **Update environment variable** with your Resend API key

### Step 5: Initial Admin Setup

1. Visit `https://your-domain.vercel.app/admin/login`
2. Default password: `admin123`
3. **Immediately change the password** in Settings

---

## Paid Deployment (VPS/DigitalOcean)

For production environments with persistent storage.

### Step 1: Provision a VPS

1. **Create a Droplet on DigitalOcean**:
   - OS: Ubuntu 22.04 LTS
   - Plan: Basic (at least 1GB RAM)
   - Datacenter: Choose closest to your audience
   - Authentication: SSH Key (recommended)

2. **Connect to your server**:
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Git
apt install -y git
```

### Step 3: Clone and Setup Project

```bash
# Create app directory
mkdir -p /var/www/santhosh-portfolio
cd /var/www/santhosh-portfolio

# Clone your repository
git clone https://github.com/YOUR_USERNAME/santhosh-portfolio.git .

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build the application
npm run build
```

### Step 4: Configure Environment Variables

```bash
# Create .env file
nano /var/www/santhosh-portfolio/.env
```

Add:
```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="your-super-secret-session-key-change-this-in-production"
RESEND_API_KEY="re_your_resend_api_key"
FROM_EMAIL="onboarding@resend.dev"
CONTACT_EMAIL="santhoshwe2007@gmail.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Step 5: Setup PM2

```bash
# Create PM2 ecosystem file
nano /var/www/santhosh-portfolio/ecosystem.config.js
```

Add:
```javascript
module.exports = {
  apps: [{
    name: 'santhosh-portfolio',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/santhosh-portfolio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Start with PM2:
```bash
cd /var/www/santhosh-portfolio
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd
```

### Step 6: Configure Nginx

```bash
nano /etc/nginx/sites-available/santhosh-portfolio
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Handle uploads
    location /uploads {
        alias /var/www/santhosh-portfolio/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/santhosh-portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 7: Setup SSL (Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is automatically configured
```

### Step 8: Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

### Step 9: Create Deployment Script

```bash
nano /var/www/santhosh-portfolio/deploy.sh
```

Add:
```bash
#!/bin/bash

echo "Starting deployment..."

cd /var/www/santhosh-portfolio

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build application
npm run build

# Restart PM2
pm2 restart santhosh-portfolio

echo "Deployment complete!"
```

Make executable:
```bash
chmod +x /var/www/santhosh-portfolio/deploy.sh
```

---

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Database connection string | Yes | `file:./dev.db` or `postgresql://...` |
| `SESSION_SECRET` | Secret for session encryption | Yes | Random 32+ char string |
| `RESEND_API_KEY` | Resend API key for emails | No* | `re_...` |
| `FROM_EMAIL` | Sender email address | No* | `onboarding@resend.dev` |
| `CONTACT_EMAIL` | Recipient email for contact form | Yes | `santhoshwe2007@gmail.com` |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes | `https://yoursite.com` |
| `ADMIN_PASSWORD_HASH` | Pre-hashed admin password | No | `$2a$10$...` |

*Required for contact form functionality

---

## Database Setup

### SQLite (Local/VPS)

SQLite is the default and works out of the box. The database file (`dev.db`) will be created automatically.

**Note**: On serverless platforms (Vercel, Netlify), SQLite won't work because the filesystem is read-only. Use PostgreSQL instead.

### PostgreSQL (Production/Serverless)

1. **Supabase** (Recommended for free tier):
   - Create project at supabase.com
   - Get connection string from Settings → Database
   - Use connection pooling for serverless

2. **Neon**:
   - Create project at neon.tech
   - Get connection string
   - Supports serverless environments

3. **Railway/Render**:
   - Add PostgreSQL addon
   - Get connection string from dashboard

---

## Troubleshooting

### Build Errors

**Error**: `PrismaClientInitializationError`
- **Solution**: Run `npx prisma generate` before building

**Error**: `Module not found`
- **Solution**: Run `npm install` to ensure all dependencies are installed

### Runtime Errors

**Error**: `Database connection failed`
- Check `DATABASE_URL` is correct
- Ensure database server is accessible
- For SQLite: ensure write permissions

**Error**: `Email not sending`
- Verify `RESEND_API_KEY` is set
- Check `FROM_EMAIL` is verified in Resend
- Check server logs for detailed error

**Error**: `Session not persisting`
- Ensure `SESSION_SECRET` is set
- Check cookie settings in browser

### Deployment Issues

**Vercel**: Build fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Node.js version compatibility

**VPS**: 502 Bad Gateway
- Check PM2 is running: `pm2 status`
- Check Nginx error logs: `tail -f /var/log/nginx/error.log`
- Verify port 3000 is not blocked

---

## Updating Your Deployment

### Vercel (Automatic)
- Push to GitHub
- Vercel auto-deploys

### VPS (Manual)
```bash
ssh root@YOUR_SERVER_IP
cd /var/www/santhosh-portfolio
./deploy.sh
```

Or setup GitHub Actions for auto-deployment.

---

## Backup Strategy

### Database Backup (VPS)
```bash
# Add to crontab (daily backup)
0 2 * * * cp /var/www/santhosh-portfolio/prisma/dev.db /backups/dev-$(date +\%Y\%m\%d).db
```

### Database Backup (Supabase)
- Enable Point-in-Time Recovery
- Schedule automated backups in dashboard

---

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong SESSION_SECRET (32+ random characters)
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up firewall (UFW)
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable 2FA on hosting accounts
- [ ] Regular database backups

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review Next.js deployment docs: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- Contact: santhoshwe2007@gmail.com
