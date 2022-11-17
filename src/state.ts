import produce, { Draft } from "immer"
import { BlocStateStatus } from "./types"

export class BlocState<T = any> {
  constructor(data: T) {
    this.data = data
    this.status = BlocStateStatus.initial
  }

  status: BlocStateStatus
  error?: Error
  data: T

  readonly blocStateName = this.constructor.name

  readonly isBlocStateInstance = true

  ready(copy?: (data: Draft<T>) => void): typeof this {
    const ctor = this.constructor as new (data: T) => typeof this
    const newState = new ctor(produce(this.data, copy ?? (() => {})))
    newState.status = BlocStateStatus.ready
    return newState
  }

  loading(): typeof this {
    const ctor = this.constructor as new (data: T) => typeof this
    const newState = new ctor(produce(this.data, () => {}))
    newState.status = BlocStateStatus.loading
    return newState
  }

  failed(error?: Error): typeof this {
    const ctor = this.constructor as new (data: T) => typeof this
    const newState = new ctor(produce(this.data, () => {}))
    if (error) newState.error = error
    newState.status = BlocStateStatus.failed
    return newState
  }
}

export const isBlocStateInstance = (state: any): state is BlocState => {
  return state instanceof BlocState || Boolean(state.isBlocStateInstance)
}
