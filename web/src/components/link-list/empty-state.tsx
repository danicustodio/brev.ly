import { Link } from '@phosphor-icons/react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-6 border-t border-[var(--color-gray-200)]">
      <Link size={32} className="text-[var(--color-gray-400)]" />
      <p className="text-[var(--color-gray-500)] brevly-text-xs">
        AINDA NÃO EXISTEM LINKS CADASTRADOS
      </p>
    </div>
  )
}
