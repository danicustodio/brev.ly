import { Button } from './ui/button'
import { Input } from './ui/input'

export function NewLink() {
  return (
    <div className="bg-[var(--color-white)] w-full rounded-lg p-6 lg:p-8">
      <div>
        <h2 className="brevly-text-lg text-[var(--color-gray-600)] mb-5">
          Novo link
        </h2>

        <div className="flex flex-col gap-5">
          <Input label="Link Original" placeholder="www.exemplo.com.br" />
          <Input label="Link encurtado" prefix="brev.ly/" />
          <Button label="Salvar link" />
        </div>
      </div>
    </div>
  )
}
