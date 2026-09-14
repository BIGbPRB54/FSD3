## Portfolio Website

A simple portfolio website made using React where students can showcase their personal details and projects.

Currently set up with my own info (Piyush Bansal, NIT Warangal) as an example, but the structure can be reused by replacing the content with your own details.

## Pages

* `Home` - Intro and welcome page
* `About` - Personal information and interests
* `Projects` - Displays all projects
* `Project Detail` - Displays details of a selected project
* `Contact` - Contact form

## Structure

```text
FSD3/
├── src/
│   └── pages/
│       ├── Home
│       ├── About
│       ├── Projects
│       ├── Project Detail
│       └── Contact
├── server/
│   ├── data/
│   │   └── projects.json
│   ├── .env.example
│   └── server.js
├── index.html
├── package.json
└── vite.config.js
```

## Components

* `Home` - Home page
* `About` - About page
* `Projects` - Project list
* `Project Detail` - Individual project details
* `Contact` - Contact form
* `server.js` - Express API
* `projects.json` - Project data

## How to Run

Install the dependencies:

```bash
npm install
```

Then install the backend dependencies:

```bash
cd server
npm install
```

Run the backend:

```bash
npm run dev
```

Open another terminal in the main project folder and run:

```bash
npm run dev
```

Open the local URL shown in the terminal.

For a production build:

```bash
npm run build
```

## How to Make It Your Own

Replace the personal information, interests, project details and contact information with your own.

New projects can be added to the projects list in `projects.json`.

Colors and spacing can be changed from the style files.

## Tech Used

* React
* JavaScript
* CSS
* React Router
* Node.js
* Express
* Vite

## Notes

## Notes

1. Reusable components and props are used for project cards, with `useState` managing form, theme, loading and project-card states.
2. `useEffect` handles the loading timer, theme saving and API data fetching, while `localStorage` is used for light/dark theme switching.
3. `map()` displays projects dynamically, and React Router is used for page navigation.
4. The backend provides API endpoints for project data and contact form submissions.
5. Vite handles frontend development and API requests to the server.
6. Project data is stored in `projects.json`, while contact submissions are stored temporarily in memory.
7. Server-side validation is used for contact submissions, with JSON responses for API errors and unknown routes.

