import { createLinkSchema } from '../api/types'
import { useCreateLink } from '../hooks/useCreateLink'
import { useForm } from '../hooks/useForm'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function NewLink() {
  const { createLink, isLoading } = useCreateLink()

  const { values, errors, handleChange, handleSubmit } =
    useForm(createLinkSchema)

  const onSubmit = handleSubmit(async data => {
    await createLink(data)
  })

  return (
    <div className="bg-[var(--color-white)] w-full rounded-lg p-6 lg:p-8">
      <div>
        <h2 className="brevly-text-lg text-[var(--color-gray-600)] mb-5">
          Novo link
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <Input
            name="url"
            label="Link Original"
            placeholder="www.exemplo.com.br"
            value={values.url || ''}
            error={errors.url}
            onChange={handleChange}
          />
          <Input
            name="alias"
            label="Link encurtado"
            prefix="brev.ly/"
            value={values.alias || ''}
            error={errors.alias}
            onChange={handleChange}
          />
          <Button
            label={isLoading ? 'Salvando...' : 'Salvar link'}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  )
}
