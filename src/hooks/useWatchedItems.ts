import { useState } from 'react'

const STORAGE_KEY = 'marvel-watchlist:watched'

function readWatchedItems(): Set<string> {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY)
    if (!storedValue) return new Set()

    const parsedValue: unknown = JSON.parse(storedValue)
    return Array.isArray(parsedValue) && parsedValue.every((id) => typeof id === 'string')
      ? new Set(parsedValue)
      : new Set()
  } catch {
    return new Set()
  }
}

export function useWatchedItems() {
  const [watchedIds, setWatchedIds] = useState(readWatchedItems)

  const toggleWatched = (id: string) => {
    setWatchedIds((currentIds) => {
      const nextIds = new Set(currentIds)
      if (nextIds.has(id)) nextIds.delete(id)
      else nextIds.add(id)

      localStorage.setItem(STORAGE_KEY, JSON.stringify([...nextIds]))
      return nextIds
    })
  }

  return { watchedIds, toggleWatched }
}

