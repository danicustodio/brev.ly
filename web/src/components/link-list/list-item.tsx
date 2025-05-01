import { Copy, Trash } from '@phosphor-icons/react'
import { Button } from '../ui/button'
import type { Link } from './link-list'

interface ListItemProps {
  link: Link
  onCopy: (id: string) => void
  onDelete: (alias: string) => void
}

export function ListItem({ link, onCopy, onDelete }: ListItemProps) {
  const { shortUrl, originalUrl, accessCount, id, alias } = link
  const access = accessCount === 1 ? 'acesso' : 'acessos'

  return (
    <div className="flex justify-between items-center gap-4 py-3 border-t border-[var(--color-gray-200)]">
      <div className="flex flex-col gap-1 shrink min-w-0">
        <p className="brevly-text-md text-[var(--color-blue-base)] truncate">
          {shortUrl}
        </p>
        <p className="brevly-text-sm text-[var(--color-gray-500)] truncate">
          {originalUrl}
        </p>
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
            onClick={() => onCopy(id)}
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
