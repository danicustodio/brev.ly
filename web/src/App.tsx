import Logo from './assets/Logo.svg'
import { Button } from './components/Button'
import { Input } from './components/Input'

function App() {
  return (
    <div className="h-dvh flex align-middle justify-center bg-[var(--color-gray-200)]">
      <main className="w-full max-w-[var(--main-max-width)] h-full max-h-[var(--main-max-height)] mt-8 lg:mt-16 flex flex-col">
        <img
          src={Logo}
          alt="brev.ly logo"
          className="h-6 w-24 ml-[-4px] self-center lg:self-start mb-6 lg:mb-8"
        />

        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-5 w-full px-3 lg:px-0">
          <div className="bg-[var(--color-white)] w-full max-w-96 min-h-[var(--new-link-min-height)] lg:min-h-[var(--new-link-min-height-lg)] rounded-lg p-6 lg:p-8 my-auto">
            <div className="flex flex-col gap-5 lg:gap-6">
              <h2 className="brevly-text-lg">Novo Link</h2>
              <Input label="Link Original" placeholder="www.exemplo.com.br" />
              <Input label="Link encurtado" prefix="brev.ly/" />
              <Button>
                <p>Salvar link</p>
              </Button>
            </div>
          </div>

          <div className="bg-[var(--color-white)] w-full h-60 rounded-lg">
            list
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
