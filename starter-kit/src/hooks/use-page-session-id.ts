import { useState } from 'react'

const sessionStoragePrefix = 'flexshop-sales-page-session-id'

function createSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `fallback-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function readOrCreateSessionId(scope: string) {
  if (typeof window === 'undefined') {
    return createSessionId()
  }

  try {
    const sessionStorageKey = `${sessionStoragePrefix}:${scope}`
    const existingSessionId = window.sessionStorage.getItem(sessionStorageKey)
    if (existingSessionId) {
      return existingSessionId
    }

    const newSessionId = createSessionId()
    window.sessionStorage.setItem(sessionStorageKey, newSessionId)
    return newSessionId
  } catch {
    return createSessionId()
  }
}

export function usePageSessionId(scope: string) {
  const [sessionId] = useState(() => readOrCreateSessionId(scope))
  return sessionId
}
