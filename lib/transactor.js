import assert from 'assert'
import * as is from 'is'

export const transact = (store, tx = {}) => {
  assert(is.object(tx) && is.string(tx.command), 'invalid transaction')
  const value = tx.value || 1

  switch (tx.command) {
    case 'INC':
      store.inc(value)
      break
    case 'DEC':
      store.dec(value)
      break
    default:
      // noop
  }
}
