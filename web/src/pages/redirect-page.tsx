import { Link } from 'react-router-dom'
import Logo from '../assets/brevly.svg'
import FourZeroFour from '../assets/404.svg'
import { useRedirect } from '../hooks/useRedirect'

export function RedirectPage() {
  const { targetUrl, error } = useRedirect()
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-gray-200)] items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-xl py-12 px-5 flex flex-col items-center lg:py-16 lg:px-12">
        {error ? (
          <div className="text-center flex flex-col justify-center items-center gap-6">
            <img
              src={FourZeroFour}
              alt="código para página não encontrada"
              className="w-48 h-20"
            />
            <p className="brevly-text-xl text-[var(--color-gray-600)]">
              Link não encontrado
            </p>
            <p className="brevly-text-md text-[var(--color-gray-500)]">
              O link que você está tentando acessar não existe, foi removido ou
              é uma URL inválida. Saiba mais em{' '}
              <Link
                to="/"
                className="text-[var(--color-blue-base)] hover:underline"
              >
                brev.ly
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center gap-6">
            <img src={Logo} alt="brevly logo" className="w-12 h-12" />

            <h2 className="brevly-text-xl text-[var(--color-gray-600)]">
              Redirecionando...
            </h2>
            <div className="brevly-text-md text-[var(--color-gray-500)]">
              <p className="mb-1">
                O link será aberto automaticamente em alguns instantes.
              </p>
              {targetUrl && (
                <p>
                  Não foi redirecionado?{' '}
                  <a
                    href={targetUrl}
                    className="text-[var(--color-blue-base)] hover:underline"
                  >
                    Acesse aqui
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
