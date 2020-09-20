/* eslint-env mocha */
import assert from 'assert'
import * as sinon from 'sinon'
import { query } from '../lib/query'

describe('query', () => {
  let store

  beforeEach(() => {
    store = {
      get: sinon.fake.returns(100),
      inc: sinon.fake(),
      dec: sinon.fake()
    }
  })

  it('should provide current value', () => {
    assert(query(store) === 100)
  })
})
