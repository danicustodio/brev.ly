import { DownloadSimple } from '@phosphor-icons/react'
import { Button } from '../ui/button'
import { EmptyState } from './empty-state'
import { ListItem } from './list-item'

export interface Link {
  id: string
  shortUrl: string
  alias: string
  originalUrl: string
  accessCount: number
  createdAt: Date
}

interface LinksListProps {
  links?: Array<Link>
  onDownloadCSV?: () => void
  onCopy: (id: string) => void
  onDelete: (alias: string) => void
}

export function LinkList({
  links = [],
  onDownloadCSV,
  onCopy,
  onDelete,
}: LinksListProps) {
  const hasLinks = links.length > 0

  return (
    <div className="bg-[var(--color-white)] w-full rounded-lg">
      <div className="p-6 lg:p-8">
        <div className="flex justify-between items-center pb-4">
          <h2 className="brevly-text-lg text-[var(--color-gray-600)]">
            Meus Links
          </h2>

          <Button
            variant="secondary"
            label="Baixar CSV"
            disabled={!hasLinks}
            icon={
              <DownloadSimple
                size={16}
                className="text-[var(--color-gray-600)]"
              />
            }
            onClick={onDownloadCSV}
          />
        </div>

        <div>
          {!hasLinks && <EmptyState />}
          <div className="max-h-[calc(100dvh-33.375rem)] lg:max-h-[calc(100dvh-14.1875rem)] overflow-auto scrollbar-custom">
            {links.map(link => (
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
