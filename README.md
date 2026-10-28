# NITS Eco Club Website

The official website for the Eco Club at the National Institute of Technology
Silchar. The site presents the club's activities, events, achievements, team,
Noixorgo environmental magazine, blog posts, gallery, and upcoming merchandise
in a responsive React application.

## Live site

[Open the deployed website](https://prokriti-5-0.vercel.app/)

## Highlights

- Responsive pages for the Eco Club's public content
- Home page hero, highlights, events, achievements, and announcements
- Noixorgo issue carousel with:
  - Verified issue metadata from JSON
  - Cover and environmental-tip image pairs
  - Layered responsive presentation
  - Click-to-reveal issue tips
  - Keyboard, wheel, reduced-motion, and accessible controls
- Blog listing with category filters and search
- Blog detail pages at `/blog/:blogId`
- External blog-submission flow at `/blog/submit`
- Events and gallery pages backed by local JSON data
- Team page with batch-based member filtering
- Merch page with a reduced-motion-aware product video
- Lazy-loaded routes and Vite production code splitting
- Shared navigation, footer, transitions, cards, and section components
- Persistent light/dark theme toggle with contrast-aware dark styling

## Technology

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://motion.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Lucide React](https://lucide.dev/)
- [Swiper](https://swiperjs.com/)
- [Sharp](https://sharp.pixelplumbing.com/) for local image optimization
- [ESLint](https://eslint.org/)

## Repository structure

```text
ECO-Website/
├── frontend/
│   ├── public/
│   │   ├── achievements/       Achievement images
│   │   ├── blogs/              Blog images
│   │   ├── events/             Event images
│   │   ├── gallery/            Gallery images
│   │   ├── home/               Home page hero images
│   │   ├── merch/              Product poster and video
│   │   ├── noixorgo/           Noixorgo cover/tip image pairs
│   │   └── team/               Faculty and batch member photos
│   ├── scripts/
│   │   └── optimize-images.mjs Sharp-based image optimizer
│   ├── src/
│   │   ├── components/         Shared UI components
│   │   ├── data/               JSON content sources
│   │   ├── pages/              Routed page components
│   │   ├── App.jsx             Routes, lazy loading, scroll restoration
│   │   ├── index.css           Tailwind and shared CSS utilities
│   │   └── main.jsx            React entry point
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/noixorgo` | Noixorgo issue carousel |
| `/events` | Events |
| `/blog` | Blog listing, filters, and search |
| `/blog/:blogId` | Individual blog post |
| `/blog/submit` | External blog submission information |
| `/gallery` | Event and activity gallery |
| `/team` | Team members and batch filters |
| `/merch` | Eco Club merchandise preview |

Unknown routes redirect to `/`.

## Content and assets

The application keeps its content in local JSON files under
`frontend/src/data/`:

- `achievements.json`
- `blogs.json`
- `events.json`
- `gallery.json`
- `noixorgo.json`
- `team.json`

Public image and media files are stored under `frontend/public/` and referenced
with root-relative paths such as `/events/greenx.webp`.

### Adding a Noixorgo issue

Noixorgo issue metadata belongs in
[`frontend/src/data/noixorgo.json`](frontend/src/data/noixorgo.json). Each issue
must contain its cover and the immediately following environmental-tip image:

```json
{
  "week": 209,
  "date": "26th July, 2026",
  "coverImage": "/noixorgo/19.webp",
  "quoteImage": "/noixorgo/20.webp"
}
```

Place the cover and tip assets in `frontend/public/noixorgo/`, verify the date
and week printed on the images, and keep the issue metadata ordered by date.
The page combines `featured` and `previous`, then determines the newest issue
from the dates.

## Getting started

### Prerequisites

- Node.js with npm
- Git

No ImageMagick installation is required. Image optimization uses the `sharp`
package installed with the frontend dependencies.

### Install and run

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173/
```

On Windows PowerShell, the equivalent commands are:

```powershell
Set-Location frontend
npm install
npm run dev
```

## Available scripts

Run these commands from `frontend/`.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `frontend/dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the frontend |
| `npm run optimize:images:dry` | Preview image optimization without changing files |
| `npm run optimize:images` | Optimize eligible images in `public/` |
| `npm run optimize:images:content` | Force-process gallery, events, blogs, and achievements |
| `npm run optimize:images:force` | Force-reencode eligible source images in all folders |

### Image optimization

The optimizer uses Sharp to:

- Resize images without upscaling
- Convert regular PNG/JPEG assets to WebP
- Preserve designated logo files as PNG
- Replace a file only when the result is smaller
- Update matching paths in JSON, JSX, JavaScript, CSS, and `index.html`
- Support dry runs before modifying assets

The normal optimizer intentionally skips already-small WebP files. To process
the content folders explicitly:

```powershell
cd frontend
npm run optimize:images:content
```

To preview changes first:

```powershell
npm run optimize:images:content -- --dry-run
```

Keep the generated image files and updated JSON references together when
committing an optimization change.

## Production build and deployment

Create and inspect a production build:

```bash
cd frontend
npm run lint
npm run build
npm run preview
```

The application is deployed on Vercel. Configure the deployment with:

- **Root directory:** `frontend`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

For client-side routes to work on a static host, configure the host to serve
`index.html` as the fallback for application routes.

## Development guidelines

- Keep page content in the relevant JSON file rather than duplicating it in
  JSX.
- Reuse shared components and existing color, spacing, typography, and motion
  conventions.
- Preserve image aspect ratios and avoid cropping artwork containing text.
- Run `npm run lint` and `npm run build` before submitting changes.
- Test both light and dark themes when changing shared components or colors.
- Run the image optimizer in dry-run mode before applying bulk asset changes.
- Do not commit local `node_modules`, `dist`, `.env` files, or other ignored
  development artifacts.

## Contributing

1. Fork the repository or create a feature branch.
2. Install dependencies from `frontend/`.
3. Make focused changes that preserve the existing website structure.
4. Run lint and build checks.
5. Commit and push your branch.
6. Open a pull request describing the change and validation performed.

## Repository

[GitHub repository](https://github.com/sakib-ashraf-05/ECO-Website)

## License

No separate license file is currently included in the repository. Contact the
project maintainers before redistributing the code or assets.

---

Built with React, Vite, and Tailwind CSS for the NITS Eco Club.
