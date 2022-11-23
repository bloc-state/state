import produce, { Draft, immerable } from "immer"
import { StateStatus } from "./types"

export abstract class State<T = any> {
  constructor(data: T, status = "initial" as "initial", error?: Error) {
    this.data = data
    this.status = status
    this.error = error
  }

  [immerable] = true

  readonly status: StateStatus

  readonly error: Error | undefined

  readonly stateName = this.constructor.name

  readonly isStateInstance = true

  data: T

  ready(data?: T | ((data: Draft<T>) => void)): this {
    if (data == null) {
      return produce(this, (draft) => {
        draft.status = "ready"
        draft.data = produce(draft.data, () => {})
      })
    } else if (typeof data === "function") {
      const _data = data as (data: Draft<T>) => void
      return produce(this, (draft) => {
        draft.status = "ready"
        draft.data = produce(draft.data, _data)
      })
    } else {
      const _data = data as Draft<T>
      return produce(this, (draft) => {
        draft.status = "ready"
        draft.data = _data
      })
    }
  }

  loading(): this {
    return produce(this, (draft) => {
      draft.status = "loading"
      draft.data = produce(draft.data, () => {})
    })
  }

  failed(error?: Error): this {
    return produce(this, (draft) => {
      draft.status = "failed"
      draft.error = error
      draft.data = produce(draft.data, () => {})
    })
  }
}

export const isStateInstance = (state: any): state is State => {
  return state instanceof State || Boolean(state.isStateInstance)
}
