import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react'
import { z } from 'zod'

type ValidationResult<T> = {
  success: boolean
  data?: T
  errors?: Record<string, string>
}

export function useForm<T extends z.ZodType<unknown, z.ZodTypeDef>>(schema: T) {
  type FormValues = z.infer<T>

  const [values, setValues] = useState<FormValues>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setValues(prev => ({ ...(prev || {}), [name]: value }))

      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors]
  )

  const validate = useCallback((): ValidationResult<FormValues> => {
    try {
      const result = schema.parse(values)
      setErrors({})
      return { success: true, data: result }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}

        for (const err of error.errors) {
          const path = err.path.join('.')
          fieldErrors[path] = err.message
        }

        setErrors(fieldErrors)
        return { success: false, errors: fieldErrors }
      }
      return { success: false, errors: { form: 'Validation failed' } }
    }
  }, [values, schema])

  const handleSubmit = useCallback(
    (onSubmit: (data: FormValues) => Promise<void> | void) => {
      return async (e: FormEvent) => {
        e.preventDefault()

        const validation = validate()
        if (!validation.success) return

        try {
          await onSubmit(validation.data as FormValues)
          setValues({})
          setErrors({})
        } catch (error) {
          console.error('Form submission error:', error)
        }
      }
    },
    [validate]
  )

  return { values, errors, setValues, handleChange, handleSubmit }
}
