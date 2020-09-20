import { singleton } from 'boundary/store'
import { query } from 'lib/query'

export default (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      // Return the shared state
      res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
      res.statusCode = 200
      res.json({ count: query(singleton) })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
