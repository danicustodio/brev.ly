import type { Link } from './api/types'
import { LinkList } from './components/link-list/link-list'
import { Logo } from './components/logo'
import { NewLink } from './components/new-link'
import { useDeleteLink } from './hooks/useDeleteLink'
import { useLinks } from './hooks/useLinks'
import { ToastContainer, toast } from 'react-toastify'

function App() {
  const { links, isLoading: isLoadingLinks, isRefetching } = useLinks()
  const { deleteLink } = useDeleteLink()

  const handleCopy = (link: Link) => {
    const { shortUrl, alias } = link

    navigator.clipboard.writeText(shortUrl)
    toast.info(`O link ${alias} foi copiado para a área de transferência`)
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-gray-200)] py-8 px-4">
      <div className="flex justify-center flex-1">
        <main className="w-full max-w-[var(--main-max-width)] flex flex-col flex-1">
          <div className="flex justify-center mb-6 lg:justify-start">
            <Logo />
          </div>

          <div className="flex flex-col gap-3 flex-1 lg:flex-row">
            <div className="lg:min-w-96">
              <NewLink />
            </div>

            <div className="flex-1 min-h-0 overflow-auto">
              <LinkList
                links={links}
                isLoading={isLoadingLinks}
                isRefetching={isRefetching}
                onCopy={handleCopy}
                onDelete={deleteLink}
              />
            </div>
          </div>
        </main>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App
