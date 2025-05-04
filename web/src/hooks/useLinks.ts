import { useEffect } from 'react'
import { useLinksStore } from '../store/linksStore'

export const useLinks = () => {
  const { links, error, isLoading, isRefetching, fetchLinks, clearError } =
    useLinksStore()

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  useEffect(() => {
    const channel = new BroadcastChannel('brevly-links')
    channel.onmessage = () => {
      fetchLinks()
    }
    return () => {
      channel.close()
    }
  }, [fetchLinks])

  return {
    links,
    isLoading,
    isRefetching,
    error,
    refetch: fetchLinks,
    clearError,
  }
}
