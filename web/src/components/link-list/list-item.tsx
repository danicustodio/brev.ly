import { Copy, Trash } from '@phosphor-icons/react'
import type { Link } from '../../api/types'
import { Button } from '../ui/button'

interface ListItemProps {
  link: Link
  onCopy: (link: Link) => void
  onDelete: (alias: string) => void
}

export function ListItem({ link, onCopy, onDelete }: ListItemProps) {
  const { shortUrl, url, accessCount, id, alias } = link
  const access = accessCount === 1 ? 'acesso' : 'acessos'

  return (
    <div className="flex justify-between items-center gap-4 py-3 border-t border-[var(--color-gray-200)]">
      <div className="shrink min-w-0">
        <a href={`/${alias}`} target="_blank" rel="noopener noreferrer">
          <div className="flex flex-col gap-1">
            <p className="brevly-text-md text-[var(--color-blue-base)] truncate">
              {shortUrl}
            </p>
            <p className="brevly-text-sm text-[var(--color-gray-500)] truncate">
              {url}
            </p>
          </div>
        </a>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <p className="brevly-text-sm text-[var(--color-gray-500)]">
          {accessCount} {access}
        </p>

        <div className="flex gap-1">
          <Button
            variant="secondary"
            icon={<Copy size={16} />}
            className="text-[var(--color-gray-600)]"
            onClick={() => onCopy(link)}
          />
          <Button
            variant="secondary"
            icon={<Trash size={16} />}
            className="text-[var(--color-gray-600)]"
            onClick={() => onDelete(alias)}
          />
        </div>
      </div>
    </div>
  )
}
