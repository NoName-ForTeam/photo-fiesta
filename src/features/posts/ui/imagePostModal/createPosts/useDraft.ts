import { useState, useCallback, useEffect } from 'react'
import { openDB, IDBPDatabase } from 'idb'

const DB_NAME = 'PostDraftsDB'
const DB_VERSION = 1
const STORE_NAME = 'drafts'

type Draft = {
  id: string
  photos: string[]
  description?: string
  location?: string
  createdAt: string
  updatedAt: string
}

export const useDraft = () => {
  const [hasDraft, setHasDraft] = useState(false)
  const [db, setDb] = useState<IDBPDatabase | null>(null)

  // Инициализация базы данных
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, DB_VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
              store.createIndex('createdAt', 'createdAt')
            }
          },
        })
        setDb(database)

        // Проверяем есть ли черновики при инициализации
        const count = await database.count(STORE_NAME)
        setHasDraft(count > 0)
      } catch (error) {
        console.error('Error initializing IndexedDB:', error)
      }
    }

    initDB()
  }, [])

  // Сохранение черновика
  const saveDraft = useCallback(
    async (photos: string[], onSuccess?: () => void) => {
      if (!db || photos.length === 0) {
        onSuccess?.()
        return
      }

      try {
        const newDraft: Draft = {
          id: Date.now().toString(),
          photos: photos,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await db.add(STORE_NAME, newDraft)

        // Проверяем лимит (максимум 5 черновиков)
        const allDrafts = await db.getAll(STORE_NAME)
        if (allDrafts.length > 5) {
          // Сортируем по дате и удаляем самые старые
          const sorted = allDrafts.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          const draftsToDelete = sorted.slice(0, sorted.length - 5)

          for (const draft of draftsToDelete) {
            await db.delete(STORE_NAME, draft.id)
          }
        }

        setHasDraft(true)
        onSuccess?.()
      } catch (error) {
        console.error('Error saving draft:', error)
        onSuccess?.()
      }
    },
    [db]
  )

  // Получение последнего черновика (без удаления)
  const getLastDraft = useCallback(async (): Promise<Draft | null> => {
    if (!db) return null

    try {
      const allDrafts = await db.getAll(STORE_NAME)
      if (allDrafts.length === 0) return null

      // Сортируем по дате создания (новые сначала)
      const sorted = allDrafts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      return sorted[0]
    } catch (error) {
      console.error('Error getting last draft:', error)
      return null
    }
  }, [db])

  // Получение и удаление последнего черновика
  const getAndRemoveLastDraft = useCallback(async (): Promise<Draft | null> => {
    if (!db) return null

    try {
      const lastDraft = await getLastDraft()
      if (lastDraft) {
        await db.delete(STORE_NAME, lastDraft.id)

        // Проверяем остались ли еще черновики
        const remainingCount = await db.count(STORE_NAME)
        setHasDraft(remainingCount > 0)
      }

      return lastDraft
    } catch (error) {
      console.error('Error getting and removing last draft:', error)
      return null
    }
  }, [db, getLastDraft])

  return {
    hasDraft,
    saveDraft,
    getAndRemoveLastDraft,
    isDBReady: !!db,
  }
}
