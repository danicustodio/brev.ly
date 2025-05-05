import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { linkServices } from '../api/services'
import type { ApiError, CreateLinkDto, Link, LinkExport } from '../api/types'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

interface LinksState {
  links: Link[]
  isLoading: boolean
  isRefetching: boolean
  isFirstFetch: boolean
  isExporting: boolean

  error: ApiError | null

  fetchLinks: () => Promise<void>
  createLink: (data: CreateLinkDto) => Promise<Link>
  deleteLink: (alias: string) => Promise<boolean>
  exportLinks: () => Promise<LinkExport>
  clearError: () => void
}

export const useLinksStore = create<LinksState>()(
  devtools(
    set => ({
      links: [],
      isLoading: false,
      isRefetching: false,
      isFirstFetch: true,
      isExporting: false,
      error: null,

      clearError: () => set({ error: null }),

      fetchLinks: async () => {
        const state = useLinksStore.getState()

        if (state.isFirstFetch) {
          set({ isLoading: true, error: null })
        } else {
          set({ isRefetching: true, error: null })
        }

        try {
          const links = await linkServices.getAll()
          set({
            links,
            isLoading: false,
            isRefetching: false,
            isFirstFetch: false,
          })
        } catch (error) {
          set({
            error: error as ApiError,
            isLoading: false,
            isRefetching: false,
          })
        }
      },
      createLink: async (data: CreateLinkDto) => {
        set({ isRefetching: true, error: null })

        try {
          const newLink = await linkServices.create(data)

          set(state => ({
            links: [newLink, ...state.links],
            isRefetching: false,
          }))

          return newLink
        } catch (error) {
          set({ error: error as ApiError, isRefetching: false })
          if (
            error instanceof AxiosError &&
            error.response?.data.message === 'Short URL already exists'
          ) {
            toast.error('Essa URL encurtada já existe')
          }
          throw error
        }
      },
      deleteLink: async (alias: string) => {
        if (!window.confirm(`Você realmente quer apagar o link ${alias}`)) {
          return false
        }
        set({ isRefetching: true, error: null })

        try {
          await linkServices.delete(alias)

          set(state => ({
            links: state.links.filter(link => link.alias !== alias),
            isRefetching: false,
          }))

          return true
        } catch (error) {
          set({ error: error as ApiError, isRefetching: false })
          return false
        }
      },
      exportLinks: async () => {
        set({ isExporting: true, error: null })

        try {
          const url = await linkServices.exportCSV()
          set({ isExporting: false })
          return url
        } catch (error) {
          set({ error: error as ApiError, isExporting: false })
          throw error
        }
      },
    }),
    { name: 'links-store' }
  )
)
