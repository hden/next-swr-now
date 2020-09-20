import * as is from 'is'

// The shared state, represented as a integer for simplicity
let count = 0

export default (req, res) => {
  const {
    method,
    body
  } = req

  switch (method) {
    case 'PUT':
      // Update the shared state
      if (is.object(body) && is.integer(body.delta)) {
        count += body.delta
        res.statusCode = 200
        res.json({ count })
      } else {
        res.status(400).end('Bad Request')
      }
      break
    case 'GET':
      // Return the shared state
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
      res.statusCode = 200
      res.json({ count })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
