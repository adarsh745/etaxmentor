# Deployment Guide for eTaxMentor

This guide explains how to deploy the **eTaxMentor** application (Next.js + Prisma + PostgreSQL) to Vercel, which is the recommended platform for Next.js.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3.  **Neon Database**: You seem to be using Neon for the database. Ensure your database is active and accessible.

## Step 1: Push Code to GitHub

If you haven't already, push your code to a GitHub repository:

1.  Create a new repository on GitHub (e.g., `etaxmentor`).
2.  Run these commands in your terminal (if not already initialized):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/etaxmentor.git
    git push -u origin main
    ```

## Step 2: Deploy on Vercel

1.  Go to your **Vercel Dashboard**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the `etaxmentor` repository you just created.
4.  **Configure Project**:
    *   **Framework Preset**: Select **Next.js**.
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `next build` (default).
    *   **Install Command**: `npm install` (default).

5.  **Environment Variables**:
    Expand the "Environment Variables" section. You need to copy the values from your local `.env` file, but **update the URLs**. Add the following:

    | Variable Name | Value | Note |
    | :--- | :--- | :--- |
    | `DATABASE_URL` | `postgresql://...` | Copy exact value from your `.env`. |
    | `NEXTAUTH_SECRET` | `...` | Use a command like `openssl rand -base64 32` to generate a secure random string. |
    | `JWT_SECRET` | `...` | Use a secure random string (can be same as above). |
    | `NEXTAUTH_URL` | `https://your-project-name.vercel.app` | **Important**: Update this to your Vercel URL after deployment. Initially, you can leave it blank or put a placeholder. |
    | `NEXT_PUBLIC_APP_URL` | `https://your-project-name.vercel.app` | Same as above. |
    | `SMTP_HOST` | `smtp.gmail.com` | Copy from `.env`. |
    | `SMTP_PORT` | `587` | Copy from `.env`. |
    | `SMTP_USER` | `...` | Copy from `.env`. |
    | `SMTP_PASS` | `...` | Copy from `.env`. |
    | `EMAIL_FROM` | `...`| Copy from `.env`. |

    *Note: For `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`, Vercel provides a domain after deployment (e.g., `etaxmentor.vercel.app`). You will need to update these variables in the Vercel dashboard **after** the first deployment and redeploy.*

6.  Click **"Deploy"**.

## Step 3: Post-Deployment Steps

1.  **Wait for Build**: Vercel will build your app. It might take a minute or two.
2.  **Database Migration**: Vercel usually doesn't run `prisma migrate deploy` automatically.
    *   **Option A (Recommended)**: Add a "build" script in `package.json` that includes migration: `"build": "prisma migrate deploy && next build"`.
    *   **Option B (Manual)**: You can connect to your database locally and run `npx prisma migrate deploy` pointing to the **production** database URL.
3.  **Update URLs**: Once you have your `https://etaxmentor.vercel.app` domain:
    *   Go to Vercel Project Settings -> Environment Variables.
    *   Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to the real domain.
    *   Go to the "Deployments" tab and click "Redeploy" on the latest deployment to apply changes.

## Important Note on File Uploads

Your current project saves files to `./public/uploads`.
**This will NOT work correctly on Vercel.**

Vercel uses a "serverless" environment where the file system is temporary (ephemeral). Files uploaded there will disappear after a short time or on the next deployment.

**Solution**: You must use a cloud storage provider like:
*   **Vercel Blob** (Easiest integration with Next.js)
*   **AWS S3**
*   **Cloudinary**
*   **UploadThing**

You will need to refactor your upload logic to save files to one of these services instead of the local disk.
