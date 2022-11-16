import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import  feeGrantFunction  from "./feegrant";
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

app.post('/createfeegrant/:address', async (c) => {

  const body = await c.req.json();
  
  const address = c.req.param('address')

  const mnemonic = await c.env.FEEGRANT_MNEMONIC;

  let result = await feeGrantFunction (address,mnemonic);

  try {
    return c.text(result.transactionHash)
  } catch (error) {
    return c.text(error)
  }



})

export default app
