// An in-memory data store
import assert from 'assert'
import * as is from 'is'

export class Store {
  constructor (init = 0) {
    this.n = init
  }

  get () {
    return this.n
  }

  inc (x = 1) {
    assert(is.integer(x) && (x > 0), 'input must be a positive integer')
    this.n += x
  }

  dec (x = 1) {
    assert(is.integer(x) && (x > 0), 'input must be a positive integer')
    this.n -= x
  }
}

export const singleton = new Store()
