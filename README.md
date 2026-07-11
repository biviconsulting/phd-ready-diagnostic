# The PhD-Ready Diagnostic — Deployment

This folder contains everything needed to deploy the interactive diagnostic to Vercel and embed it on biviconsulting.com.

## What's inside

- `src/PhDReadyDiagnostic.jsx` — The React component (the tool itself)
- `src/main.jsx` — React entry point
- `index.html` — HTML shell
- `api/interpret.js` — Serverless function that calls Claude securely
- `package.json` — Dependencies list
- `vite.config.js` — Build configuration

## Before you deploy

You'll need three things:

1. **A GitHub account** (free) — github.com
2. **A Vercel account** (free) — vercel.com (sign up with GitHub)
3. **An Anthropic API key** — console.anthropic.com (create an account, add $5-10 credit to start)
4. **A Formspree account** (free) — formspree.io (creates the form endpoint for email capture)

## Deployment steps

### Step 1: Get a Formspree form ID

1. Sign up at formspree.io
2. Click "New Form"
3. Name it "PhD-Ready Diagnostic Leads"
4. Set your notification email (where you want lead alerts sent)
5. Copy the form endpoint URL (looks like `https://formspree.io/f/xyzabcde`)
6. Save the form ID (the `xyzabcde` part)

### Step 2: Upload to GitHub

1. Create a new GitHub repository named `phd-ready-diagnostic`
2. Upload all files from this folder (drag and drop into GitHub's web interface works)
3. Commit the files

### Step 3: Deploy to Vercel

1. Go to vercel.com and click "Add New Project"
2. Import your GitHub repo (`phd-ready-diagnostic`)
3. Vercel will auto-detect it as a Vite project
4. Before clicking Deploy, click "Environment Variables" and add:
   - Name: `ANTHROPIC_API_KEY`, Value: your Anthropic API key
   - Name: `VITE_FORM_ENDPOINT`, Value: your Formspree URL from Step 1
5. Click Deploy
6. Wait 60-90 seconds for the build
7. Vercel gives you a URL like `phd-ready-diagnostic.vercel.app`

### Step 4: Test the live tool

1. Open your Vercel URL
2. Walk through the diagnostic end-to-end
3. Submit your email at the results screen
4. Confirm you receive the Formspree notification email
5. Confirm the AI interpretation renders

### Step 5: Embed on biviconsulting.com

1. In Squarespace, create a new page: "The PhD-Ready Diagnostic"
2. Add a Code Block to the page
3. Paste this HTML (replace the URL with your Vercel URL):

```html
<iframe
  src="https://phd-ready-diagnostic.vercel.app"
  style="width: 100%; height: 1600px; border: none;"
  title="The PhD-Ready Diagnostic"
></iframe>
```

4. Save and publish

### Step 6: Add navigation and calls to action

1. Add the new page to your main site navigation
2. Add a prominent button on your homepage: "Take the PhD-Ready Diagnostic (Free)"
3. Update your Substack, LinkedIn, and Instagram bios with the new URL
4. Add the link to your email signature

## Custom domain (optional, adds 15 minutes)

If you want the tool at `diagnostic.biviconsulting.com` instead of the Vercel default URL:

1. In Vercel: Project Settings > Domains > Add
2. Enter `diagnostic.biviconsulting.com`
3. Vercel gives you DNS records to add
4. In your domain registrar (wherever you bought biviconsulting.com), add those DNS records
5. Wait 5-30 minutes for DNS to propagate
6. Update the iframe src in Squarespace to the new domain

## Cost expectations

- Vercel: Free tier (unless you exceed 100GB bandwidth/month, which won't happen at launch)
- Formspree: Free tier gives you 50 submissions/month. Upgrade to $10/month if you exceed
- Anthropic API: Roughly $0.02-0.05 per interpretation. 500 completions = $10-25
- Total monthly cost at launch: $0-25 depending on volume

## What to change over time

- The tool's welcome copy is in `src/PhDReadyDiagnostic.jsx`, search for "welcome"
- The AI prompt for interpretation is in the same file, search for "You are Bianca"
- Brand colors are at the top of the file in the BRAND object
- To update copy, edit the file in GitHub, and Vercel auto-redeploys within 60 seconds

## If something breaks

- Check Vercel's "Deployments" tab for build errors
- Check Vercel's "Logs" tab for runtime errors
- Test the Formspree endpoint directly by sending a test form
- Verify environment variables are set in Vercel project settings
