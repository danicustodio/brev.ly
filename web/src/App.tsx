import Logo from './assets/Logo.svg'

function App() {
  return (
    <div className="h-dvh flex align-middle justify-center bg-[var(--color-gray-200)]">
      <main className="w-full max-w-[var(--main-max-width)] h-full max-h-[var(--main-max-height)] mt-8 lg:mt-16 flex flex-col">
        <img
          src={Logo}
          alt="Logo"
          className="h-6 w-24 ml-[-4px] self-center lg:self-start mb-6 lg:mb-8"
        />

        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-5 w-full px-3 lg:px-0">
          <div className="bg-[var(--color-white)] w-full h-80 lg:h-96 rounded-lg">
            <h1>Brev.ly</h1>
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
