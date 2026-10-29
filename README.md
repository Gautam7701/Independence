# A little something for Akanksha 🎀

A small, interactive scrapbook built with Next.js App Router, React, TypeScript, Tailwind CSS and Framer Motion. All decorative photo placeholders are local SVGs; there is no backend, analytics, external image service, or mood data collection.

## Run locally

Install Node.js, then from this folder run:

```bash
npm install
npm run dev
```

Open http://localhost:3000. Create a production build with `npm run build`, then serve it with `npm start`.

## Replace the placeholder photos

The seven personal photos are stored in `public/images/akanksha/`:

- `photo-1.jpeg` through `photo-6.jpeg` are the six scrapbook cards.
- `final-photo.jpeg` is the small image on the closing note.

You can use JPG, PNG, WebP, or SVG. Update the corresponding `src` and `alt` values in the `photos` list for the six cards and the closing image path in `src/app/page.tsx`. Personal photos stay in this project and are not uploaded to a third party.

## Edit copy and captions

All names, photo captions and alt text, appreciation prompts and replies, mood choices and responses, gift messages, and note text live in `src/data/akanksha.ts`. The flower word list is there too. Change the content in that file to personalise the experience.

## Colours and fonts

The colour palette is defined by CSS variables at the top of `src/app/globals.css`. Typography uses DM Sans, Playfair Display, and Caveat. The stylesheet currently imports these from Google Fonts; replace the import with locally hosted font files if you prefer a fully offline asset setup.

## Deploy to Vercel

Push the project to a Git provider, import it in Vercel, and deploy with the default Next.js settings. No environment variables or external services are required.
