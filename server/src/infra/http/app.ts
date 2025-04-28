import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link-route'
import { deleteLinkRoute } from './routes/delete-link-route'
import { getAllShortUrlsRoute } from './routes/get-all-shorturls-route'
import { getShortUrlRoute } from './routes/get-shorturl-route'
import { exportLinksRoute } from './routes/export-links-route'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.validation,
    })
  }

  return reply.status(500).send({
    message: `Internal server error: ${error.code}`,
  })
})

app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly - API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Register routes
app.register(createLinkRoute)
app.register(deleteLinkRoute)
app.register(getAllShortUrlsRoute)
app.register(getShortUrlRoute)
app.register(exportLinksRoute)
