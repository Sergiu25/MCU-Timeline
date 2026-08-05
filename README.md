# Marvel Watchlist

A local web application for tracking Marvel movies and series in the recommended viewing order.

The project contains three main lists:

- **MCU Timeline**
- **X-Men Universe**
- **Spider-Man Universes**

Users can mark productions as watched, track progress separately for each list, and switch between light and dark themes.

## Features

- Ordered lists of movies, animated movies, series, seasons, specials, and shorts
- Release year, production type, universe, and importance displayed for each item
- Three importance levels: `Essential`, `Recommended`, and `Optional`
- Progress calculated separately for each universe
- Checkboxes for marking productions as watched
- Automatic synchronization for productions that appear in multiple lists
- Upcoming productions displayed in their corresponding lists with disabled checkboxes
- Light and dark themes with a sliding toggle
- Local persistence for viewing progress and theme preference

## How synchronization works

Every production has a unique `id`. When the same production appears in multiple lists, it uses the same ID everywhere.

For example, `Deadpool & Wolverine` appears in both the MCU Timeline and the X-Men Universe. Marking it as watched in one list automatically marks it as watched in the other.

The lists are not written directly inside the React components. Their data is stored separately in:

```text
src/data/mcu.ts
src/data/xmen.ts
src/data/spiderman.ts
```

The data structure for each item is defined in `src/types/watchItem.ts`.

## Data persistence

The application does not use a backend, database, or user accounts. All data is stored directly in the browser through `localStorage`.

The following keys are used:

- `marvel-watchlist:watched` — IDs of productions marked as watched
- `marvel-watchlist:theme` — selected theme (`light` or `dark`)

The data remains available after closing and restarting the application as long as:

- the application is opened in the same browser and browser profile
- the website data is not cleared
- the application continues to use the same local address

Clearing browser data or running the application on a different port or origin may create a separate `localStorage` area.

To manually reset viewing progress, open the browser console and run:

```js
localStorage.removeItem('marvel-watchlist:watched')
```

To reset the theme preference:

```js
localStorage.removeItem('marvel-watchlist:theme')
```

Reload the page afterward.

## Technologies

- React 19
- TypeScript
- Vite
- Plain CSS
- Oxlint

No external services or UI libraries are used.

## Local requirements

The following software must be installed:

- Node.js
- npm

Check the installed versions with:

```powershell
node --version
npm.cmd --version
```

On Windows, using `npm.cmd` is recommended. It also works when the PowerShell execution policy blocks the `npm.ps1` script.

## Installation

Open PowerShell in the project directory:

```powershell
cd D:\MCU_Timeline
npm.cmd install
```

This installs the dependencies declared in `package.json`.

## Running the application

Start the development server with:

```powershell
npm.cmd run dev
```

Vite will display the local address in the terminal, usually:

```text
http://localhost:5173
```

Open that address in a browser. The terminal must remain open while using the application.

To stop the development server, press `Ctrl+C` in the terminal.

## Project checks

Run the static code checks with:

```powershell
npm.cmd run lint
```

Create a local production build with:

```powershell
npm.cmd run build
```

The build is generated in the `dist` directory. This is only a local compilation result and does not publish the application online.

Preview the generated build locally with:

```powershell
npm.cmd run preview
```

## Project structure

```text
src/
  components/
    WatchList.tsx          # Item list and checkboxes
  data/
    mcu.ts                 # MCU Timeline data
    xmen.ts                # X-Men Universe data
    spiderman.ts           # Spider-Man Universes data
  hooks/
    useWatchedItems.ts     # Reading and saving viewing progress
  types/
    watchItem.ts           # TypeScript data types
  App.tsx                  # Navigation, progress, and theme control
  App.css                  # Component styles
  index.css                # Global styles and theme colors
```

## Deployment

This project is intended to run locally. It does not include or require deployment, hosting, Docker, a backend, or a database.
