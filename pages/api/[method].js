import * as is from 'is'
import { singleton } from 'boundary/store'
import { transact } from 'lib/transactor'
import { query } from 'lib/query'

export default (req, res) => {
  const {
    body,
    query: {
      // Artificial method, not to be confused with HTTP methods.
      method
    }
  } = req

  switch (method) {
    case 'command':
      if (is.object(body) && is.string(body.command) && is.integer(body.value)) {
        // Update the shared state
        transact(singleton, body)
        res.statusCode = 200
        res.json({ status: 'OK' })
      } else {
        res.status(400).end('Bad Request')
      }
      break
    case 'query':
      // Return the shared state
      res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
      res.statusCode = 200
      res.json({ count: query(singleton) })
      break
    default:
      res.status(400).end('Bad Request')
  }
}
