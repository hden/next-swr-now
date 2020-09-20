/* eslint-env mocha */
import assert from 'assert'
import * as sinon from 'sinon'
import { transact } from '../lib/transactor'

describe('transactor', () => {
  let store

  beforeEach(() => {
    store = {
      get: sinon.fake(),
      inc: sinon.fake(),
      dec: sinon.fake()
    }
  })

  it('should INC', () => {
    transact(store, { command: 'INC', value: 100 })
    assert(store.inc.calledOnce)
    assert.deepStrictEqual(store.inc.firstCall.args, [100])
  })

  it('should INC with default value', () => {
    transact(store, { command: 'INC' })
    assert(store.inc.calledOnce)
    assert.deepStrictEqual(store.inc.firstCall.args, [1])
  })

  it('should DEC', () => {
    transact(store, { command: 'DEC', value: 100 })
    assert(store.dec.calledOnce)
    assert.deepStrictEqual(store.dec.firstCall.args, [100])
  })

  it('should DEC with default value', () => {
    transact(store, { command: 'DEC' })
    assert(store.dec.calledOnce)
    assert.deepStrictEqual(store.dec.firstCall.args, [1])
  })
})
