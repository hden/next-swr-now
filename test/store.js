/* eslint-env mocha */
import assert from 'assert'
import { Store } from '../boundary/store'

describe('store', () => {
  let store

  beforeEach(() => {
    store = new Store()
  })

  it('should init', () => {
    // default value
    assert(store.get() === 0)

    // user-defined value
    store = new Store(100)
    assert(store.get() === 100)
  })

  it('should increase', () => {
    store.inc()
    assert(store.get() === 1)

    store.inc(10)
    assert(store.get() === 11)
  })

  it('should decrease', () => {
    store.dec()
    assert(store.get() === -1)

    store.dec(10)
    assert(store.get() === -11)
  })
})
