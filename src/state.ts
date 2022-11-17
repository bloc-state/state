import produce, { Draft } from "immer"
import { BlocStateStatus } from "./types"
import { isPrimitive } from "./util"

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

  ready(copy?: ((data: T) => T) | ((data: Draft<T>) => void) | T): this {
    const ctor = this.constructor as new (data: T) => this
    const primitive = isPrimitive(this.data)
    const copyExists = copy != null

    if (!copyExists && primitive) {
      const newState = new ctor(this.data)
      newState.status = BlocStateStatus.ready
      return newState
    } else if (!copyExists) {
      const newState = new ctor(produce(this.data, () => {}))
      newState.status = BlocStateStatus.ready
      return newState
    }

    if (primitive && typeof copy === "function") {
      const _copy = copy as (data: T) => T
      const newState = new ctor(_copy(this.data))
      newState.status = BlocStateStatus.ready
      return newState
    }

    if (primitive) {
      const data = copy as T
      const newState = new ctor(data)
      newState.status = BlocStateStatus.ready
      return newState
    } else {
      const _copy = copy as (data: Draft<T>) => void
      const newState = new ctor(produce(this.data, _copy))
      newState.status = BlocStateStatus.ready
      return newState
    }
  }

  loading(): this {
    const ctor = this.constructor as new (data: T) => this
    const newState = new ctor(produce(this.data, () => {}))
    newState.status = BlocStateStatus.loading
    return newState
  }

  failed(error?: Error): this {
    const ctor = this.constructor as new (data: T) => this
    const newState = new ctor(produce(this.data, () => {}))
    if (error) newState.error = error
    newState.status = BlocStateStatus.failed
    return newState
  }
}

export const isBlocStateInstance = (state: any): state is BlocState => {
  return state instanceof BlocState || Boolean(state.isBlocStateInstance)
}
