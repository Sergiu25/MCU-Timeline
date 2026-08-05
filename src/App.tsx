import { useEffect, useState } from 'react'
import { WatchList } from './components/WatchList'
import { mcuTimeline } from './data/mcu'
import { spidermanTimeline } from './data/spiderman'
import { xmenTimeline } from './data/xmen'
import { useWatchedItems } from './hooks/useWatchedItems'
import type { WatchItem } from './types/watchItem'
import './App.css'

type TimelineId = 'mcu' | 'xmen' | 'spiderman'
type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'marvel-watchlist:theme'

function readTheme(): Theme {
  return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
}

const timelines: Record<TimelineId, { title: string; description: string; items: WatchItem[] }> = {
  mcu: {
    title: 'MCU Timeline',
    description: 'Ordinea recomandată de vizionare pentru filmele și serialele din MCU.',
    items: mcuTimeline,
  },
  xmen: {
    title: 'X-Men Universe',
    description: 'Ordinea recomandată de vizionare pentru universul cinematografic X-Men.',
    items: xmenTimeline,
  },
  spiderman: {
    title: 'Spider-Man Universes',
    description: 'Ordinea recomandată de vizionare pentru universurile Spider-Man.',
    items: spidermanTimeline,
  },
}

function App() {
  const [activeTimelineId, setActiveTimelineId] = useState<TimelineId>('mcu')
  const [theme, setTheme] = useState<Theme>(readTheme)
  const { watchedIds, toggleWatched } = useWatchedItems()
  const activeTimeline = timelines[activeTimelineId]
  const releasedCount = activeTimeline.items.filter((item) => item.status === 'released').length
  const watchedCount = activeTimeline.items.filter(
    (item) => item.status === 'released' && watchedIds.has(item.id),
  ).length
  const progress = releasedCount === 0 ? 0 : Math.round((watchedCount / releasedCount) * 100)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  return (
    <main className="app-shell">
      <header className="page-header">
        <div className="page-header__top">
          <p className="eyebrow">Marvel Watchlist</p>
          <button
            className="theme-toggle"
            type="button"
            aria-pressed={theme === 'dark'}
            aria-label={`Activează tema ${theme === 'light' ? 'întunecată' : 'luminoasă'}`}
            onClick={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}
          >
            <span className="theme-toggle__track" aria-hidden="true">
              <span className="theme-toggle__icon theme-toggle__icon--sun">☀</span>
              <svg
                className="theme-toggle__icon theme-toggle__icon--moon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.3 15.1A8.5 8.5 0 0 1 8.9 3.7 8.5 8.5 0 1 0 20.3 15.1Z" />
              </svg>
              <span className="theme-toggle__thumb" />
            </span>
          </button>
        </div>
        <h1>{activeTimeline.title}</h1>
        <p>{activeTimeline.description}</p>
      </header>

      <nav className="timeline-nav" aria-label="Selectează universul">
        <button
          className={activeTimelineId === 'mcu' ? 'timeline-nav__button timeline-nav__button--active' : 'timeline-nav__button'}
          type="button"
          onClick={() => setActiveTimelineId('mcu')}
        >
          MCU Timeline
        </button>
        <button
          className={activeTimelineId === 'xmen' ? 'timeline-nav__button timeline-nav__button--active' : 'timeline-nav__button'}
          type="button"
          onClick={() => setActiveTimelineId('xmen')}
        >
          X-Men Universe
        </button>
        <button
          className={activeTimelineId === 'spiderman' ? 'timeline-nav__button timeline-nav__button--active' : 'timeline-nav__button'}
          type="button"
          onClick={() => setActiveTimelineId('spiderman')}
        >
          Spider-Man Universes
        </button>
      </nav>

      <section className="progress" aria-label={`Progres ${activeTimeline.title}`}>
        <div className="progress__text">
          <strong>{progress}% vizionat</strong>
          <span>{watchedCount} din {releasedCount}</span>
        </div>
        <progress value={watchedCount} max={releasedCount} />
      </section>

      <WatchList items={activeTimeline.items} watchedIds={watchedIds} onToggle={toggleWatched} />
    </main>
  )
}

export default App
