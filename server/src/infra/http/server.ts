import { env } from '@/env'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

const server = fastify()

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly - API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('🚀 Brev.ly server is running!')
})
