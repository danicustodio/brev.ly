import { useLinksStore } from '../store/linksStore'

export const useDeleteLink = () => {
  const { deleteLink, isLoading, error, clearError } = useLinksStore()

  return { deleteLink, isLoading, error, clearError }
}
