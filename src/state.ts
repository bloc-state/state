import produce, { Draft, immerable } from "immer"
import { StateStatus } from "./types"

export abstract class State<Data = any> {
  constructor(data: Data, status = "initial" as "initial", error?: Error) {
    this.data = data
    this.status = status
    this.error = error
  }

  [immerable] = true

  readonly status: StateStatus

  readonly error: Error | undefined

  readonly stateName = this.constructor.name

  readonly isStateInstance = true

  data: Data

  private produceWithData(
    status: StateStatus,
    data?: Data | ((data: Draft<Data>) => void),
  ): this {
    if (data == null) {
      return produce(this, (draft) => {
        draft.status = status
        draft.error = undefined
        draft.data = produce(draft.data, () => {})
      })
    } else if (typeof data === "function") {
      const _data = data as (data: Draft<Data>) => void
      return produce(this, (draft) => {
        draft.status = status
        draft.error = undefined
        draft.data = produce(draft.data, _data)
      })
    } else {
      const _data = data as Draft<Data>
      return produce(this, (draft) => {
        draft.error = undefined
        draft.status = status
        draft.data = _data
      })
    }
  }

  copyWith(draft: (state: Draft<this>) => void): this {
    return produce(this, draft)
  }

  loading(): this {
    return produce(this, (draft) => {
      draft.status = "loading"
      draft.error = undefined
      draft.data = produce(draft.data, () => {})
    })
  }

  ready(data?: Data | ((data: Draft<Data>) => void)): this {
    return this.produceWithData("ready", data)
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
