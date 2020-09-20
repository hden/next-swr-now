import * as is from 'is'
import { singleton } from 'boundary/store'
import { transact } from 'lib/transactor'

export default (req, res) => {
  const {
    method,
    body
  } = req

  switch (method) {
    case 'POST':
      if (is.object(body) && is.string(body.command) && is.integer(body.value)) {
        // Update the shared state
        transact(singleton, body)
        res.statusCode = 200
        res.json({ status: 'OK' })
      } else {
        res.status(400).end('Bad Request')
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
