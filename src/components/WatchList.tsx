import type { WatchItem, WatchItemType } from '../types/watchItem'

type WatchListProps = {
  items: WatchItem[]
  watchedIds: Set<string>
  onToggle: (id: string) => void
}

const typeLabels: Record<WatchItemType, string> = {
  movie: 'Movie',
  animatedMovie: 'Animated movie',
  series: 'Miniseries',
  season: 'Series',
  special: 'Special',
  short: 'Short',
}

const importanceLabels: Record<WatchItem['importance'], string> = {
  essential: 'Essential',
  recommended: 'Recommended',
  optional: 'Optional',
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function WatchList({ items, watchedIds, onToggle }: WatchListProps) {
  return (
    <ol className="watch-list">
      {items.map((item) => {
        const isUpcoming = item.status === 'upcoming'
        const isWatched = watchedIds.has(item.id)

        return (
          <li className={`watch-item${isWatched ? ' watch-item--watched' : ''}`} key={item.id}>
            <label className="watch-item__check">
              <input
                type="checkbox"
                checked={isWatched}
                disabled={isUpcoming}
                onChange={() => onToggle(item.id)}
                aria-label={`Mark ${item.title} as watched`}
              />
            </label>

            <div className="watch-item__content">
              <div className="watch-item__heading">
                <h2>
                  {item.title}
                  {item.seasonNumber ? `, Season ${item.seasonNumber}` : ''}
                </h2>
                <span className={`badge badge--${item.importance}`}>
                  {importanceLabels[item.importance]}
                </span>
              </div>

              <div className="watch-item__meta">
                <span>{typeLabels[item.type]}</span>
                {item.year && <span>{item.year}</span>}
                {item.universe && <span>{item.universe}</span>}
                {isUpcoming && item.releaseDate && (
                  <span className="upcoming">Upcoming: {dateFormatter.format(new Date(item.releaseDate))}</span>
                )}
                {item.timelineStatus === 'unconfirmed' && (
                  <span>Exact timeline position unconfirmed</span>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
