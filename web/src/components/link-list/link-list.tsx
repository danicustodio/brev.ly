import { DownloadSimple } from '@phosphor-icons/react'
import type { Link } from '../../api/types'
import { Loading } from '../loading'
import { SubtleLoading } from '../subtle-loading'
import { Button } from '../ui/button'
import { EmptyState } from './empty-state'
import { ListItem } from './list-item'
import { useExportLinks } from '../../hooks/useExportLinks'

interface LinksListProps {
  links?: Array<Link>
  isLoading?: boolean
  isRefetching?: boolean
  onCopy: (link: Link) => void
  onDelete: (alias: string) => void
}

export function LinkList({
  links = [],
  isLoading = false,
  isRefetching = false,
  onCopy,
  onDelete,
}: LinksListProps) {
  const { exportLinks, isExporting } = useExportLinks()

  const hasLinks = links.length > 0

  const handleCSVDownload = async () => {
    try {
      const { url } = await exportLinks()

      const link = document.createElement('a')
      link.href = url

      const filename = url.split('/').pop() || 'links-export.csv'
      link.download = filename

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  return (
    <div className="bg-[var(--color-white)] w-full rounded-lg">
      {isRefetching && <SubtleLoading />}

      <div className="p-6 lg:p-8">
        <div className="flex justify-between items-center pb-4">
          <h2 className="brevly-text-lg text-[var(--color-gray-600)]">
            Meus Links
          </h2>

          <Button
            variant="secondary"
            label="Baixar CSV"
            disabled={!hasLinks || isLoading || isExporting}
            icon={
              isExporting ? (
                <Loading
                  width={16}
                  height={16}
                  className="text-[var(--color-gray-600)]"
                />
              ) : (
                <DownloadSimple
                  size={16}
                  className="text-[var(--color-gray-600)]"
                />
              )
            }
            onClick={handleCSVDownload}
          />
        </div>

        <div>
          {isLoading && (
            <div className="p-4 text-center brevly-text-xs flex flex-col items-center gap-1">
              <Loading />
              Carregando links...
            </div>
          )}
          {!isLoading && !hasLinks && <EmptyState />}
          <div className="max-h-[calc(100dvh-33.375rem)] lg:max-h-[calc(100dvh-14.1875rem)] overflow-auto scrollbar-custom">
            {!isLoading &&
              links.map(link => (
                <ListItem
                  key={link.id}
                  link={link}
                  onCopy={onCopy}
                  onDelete={onDelete}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
