# 🚀 Vercel Deployment Guide

## Quick Deploy Steps

### 1. Test Local Build
```bash
npm run build
npm run preview
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Click "Import Project"
4. Select your `LMS-MVP` repository
5. Configure environment variables (see below)
6. Click "Deploy"

## Environment Variables Setup

In your Vercel dashboard, go to **Settings > Environment Variables** and add:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Custom Domain (Optional)
1. In Vercel dashboard, go to **Settings > Domains**
2. Add your custom domain
3. Follow DNS setup instructions

## Build Settings (Auto-detected)
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## Post-Deployment Checklist
- [ ] Test all course pages
- [ ] Verify image loading (course covers)
- [ ] Test user authentication (if implemented)
- [ ] Check responsive design on mobile
- [ ] Verify Supabase connection

## Monitoring
- Check Vercel dashboard for build logs
- Monitor Supabase dashboard for database usage
- Set up Vercel Analytics (optional)

Your LMS is now live! 🎉