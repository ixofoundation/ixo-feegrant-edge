import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'

export interface Bindings {
  feegrantkeys: KVNamespace
}


const app = new Hono()

app.use('*', poweredBy())

app.get('/', (c) => {
  return c.text('Api up and running')
})

app.get('/status', (c) => {
  return c.text('Api up and running')
})

app.post('/createfeegrant', async (c) => {

  const mnemonic = await c.env.feegrantkeys.get("mnemonic");





  return c.text('Hello Hono!')


})

export default app
