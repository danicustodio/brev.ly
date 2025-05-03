import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { linkServices } from '../api/services'

export const useRedirect = () => {
  const { alias } = useParams<{ alias: string }>()
  const [targetUrl, setTargetUrl] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!alias) {
      setError(true)
      return
    }

    const fetchLink = async () => {
      try {
        const link = await linkServices.getByAlias(alias)
        setTargetUrl(link.url)

        const channel = new BroadcastChannel('brevly-links')
        channel.postMessage('links-updated')
        channel.close()

        setTimeout(() => {
          window.location.href = link.url
        }, 2500)
      } catch (err) {
        console.error('Error fetching link:', err)
        setError(true)
      }
    }

    fetchLink()
  }, [alias])

  return { targetUrl, error }
}
