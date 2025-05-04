import { z } from 'zod'

export const ALIAS = {
  min_length: 1,
  max_length: 32,
} as const

export const createLinkSchema = z.object({
  url: z
    .string({ required_error: 'Informe uma URL válida' })
    .url('Informe uma URL válida')
    .nonempty('Informe uma URL válida'),
  alias: z
    .string({
      required_error: 'A url não pode conter caracteres especias/espaços',
    })
    .nonempty('A url não pode conter caracteres especias/espaços')
    .min(
      ALIAS.min_length,
      `A short url deve ter ao menos ${ALIAS.min_length} caracteres`
    )
    .max(
      ALIAS.max_length,
      `A short url deve ter no máximo ${ALIAS.max_length} caracteres`
    ),
})

export const linkSchema = z.object({
  id: z.string(),
  shortUrl: z.string(),
  alias: z.string(),
  url: z.string().url(),
  accessCount: z.number(),
  createdAt: z
    .string()
    .or(z.date())
    .transform(val => new Date(val)),
})

export const linksArraySchema = z.array(linkSchema)

export const linksExportSchema = z.object({
  url: z.string().url(),
})

export const apiErrorSchema = z.object({
  message: z.string(),
  issues: z
    .array(
      z.object({
        keyword: z.string(),
        message: z.string(),
      })
    )
    .optional(),
})

export type CreateLinkDto = z.infer<typeof createLinkSchema>
export type Link = z.infer<typeof linkSchema>
export type LinkExport = z.infer<typeof linksExportSchema>
export type ApiError = z.infer<typeof apiErrorSchema>
