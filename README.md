# Malaisha MVP development

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ryanx87s-projects/v0-malaisha-mvp-development)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/rfrdB2g590i)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/ryanx87s-projects/v0-malaisha-mvp-development](https://vercel.com/ryanx87s-projects/v0-malaisha-mvp-development)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/rfrdB2g590i](https://v0.app/chat/projects/rfrdB2g590i)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Supabase Setup

This project uses Supabase for backend services. To connect to your Supabase instance:

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Copy your project's URL and anon key from the Supabase dashboard
3. Create a `.env` file in the root of the project (copy from `.env.example`)
4. Add your Supabase credentials to the `.env` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
5. Restart your development server

## Testing the Connection

To verify that the Supabase connection is working properly, you can:

1. Start the development server: `npm run dev`
2. Visit http://localhost:3000/api/test-supabase
3. You should see a JSON response indicating whether the connection was successful

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key (public)

**Important**: Never commit your `.env` file to version control. It's already added to `.gitignore`.