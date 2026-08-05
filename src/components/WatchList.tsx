import type { WatchItem, WatchItemType } from '../types/watchItem'

type WatchListProps = {
  items: WatchItem[]
  watchedIds: Set<string>
  onToggle: (id: string) => void
}

const typeLabels: Record<WatchItemType, string> = {
  movie: 'Film',
  animatedMovie: 'Film animat',
  series: 'Miniserie',
  season: 'Serial',
  special: 'Special',
  short: 'Scurtmetraj',
}

const importanceLabels: Record<WatchItem['importance'], string> = {
  essential: 'Esențial',
  recommended: 'Recomandat',
  optional: 'Opțional',
}

const dateFormatter = new Intl.DateTimeFormat('ro-RO', {
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
                aria-label={`Marchează ${item.title} ca vizionat`}
              />
            </label>

            <div className="watch-item__content">
              <div className="watch-item__heading">
                <h2>
                  {item.title}
                  {item.seasonNumber ? `, Sezonul ${item.seasonNumber}` : ''}
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
                  <span>Poziție exactă în timeline neconfirmată</span>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
