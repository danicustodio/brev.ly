import { useLinksStore } from '../store/linksStore'

export const useCreateLink = () => {
  const { createLink, isLoading, error, clearError } = useLinksStore()

  return { createLink, isLoading, error, clearError }
}
