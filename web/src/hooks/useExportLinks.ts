import { useLinksStore } from '../store/linksStore'

export const useExportLinks = () => {
  const { exportLinks, isExporting, error, clearError } = useLinksStore()

  return { exportLinks, isExporting, error, clearError }
}
