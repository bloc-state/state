import produce, { Draft } from "immer"
import { BlocStateStatus } from "./types"

export class BlocState<T = any> {
  constructor(data: T, status = "initial" as "initial", error?: Error) {
    this.data = data
    this.#status = status
    this.#error = error
  }

  #status: BlocStateStatus

  #error: Error | undefined

  readonly #ctor = this.constructor as new (
    data: T,
    status?: BlocStateStatus,
    error?: Error,
  ) => this

  get status() {
    return this.#status
  }

  readonly blocStateName = this.constructor.name

  readonly isBlocStateInstance = true

  get error() {
    return this.#error
  }

  data: T

  ready(data?: T | ((data: Draft<T>) => void)): this {
    let newState: this

    if (data == null) {
      newState = new this.#ctor(
        produce(this.data, () => {}),
        "ready",
      )
    } else if (typeof data === "function") {
      const _data = data as (data: Draft<T>) => void
      newState = new this.#ctor(produce(this.data, _data), "ready")
    } else {
      const _data = data as T
      newState = new this.#ctor(_data, "ready")
    }

    return newState
  }

  loading(): this {
    const newState = new this.#ctor(
      produce(this.data, () => {}),
      "loading",
    )
    return newState
  }

  failed(error?: Error): this {
    const newState = new this.#ctor(
      produce(this.data, () => {}),
      "failed",
      error,
    )
    return newState
  }
}

export const isBlocStateInstance = (state: any): state is BlocState => {
  return state instanceof BlocState || Boolean(state.isBlocStateInstance)
}
