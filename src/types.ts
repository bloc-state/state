import { BlocState } from "./state"

export type BlocStateDataType<T> = T extends BlocState<infer U> ? U : T

export type BlocStateInstanceType = InstanceType<typeof BlocState>

export interface InitialWithData<T> {
  initial: true
  hasError: false
  loading: false
  error: undefined
  hasData: true
  isReady: true
  data: T
  isFailure: false
}

export interface ReadyWithData<T> {
  initial: false
  hasError: false
  loading: false
  error: undefined
  isReady: true
  hasData: true
  data: T
  isFailure: false
}

export interface Loading {
  initial: false
  hasError: false
  loading: true
  error: undefined
  isReady: false
  hasData: false
  data: undefined
  isFailure: false
}

export interface LoadingWithData<T> {
  initial: false
  hasError: false
  loading: true
  error: undefined
  isReady: false
  hasData: true
  data: T
  isFailure: false
}

export interface Failed {
  initial: false
  hasError: false
  loading: false
  error: undefined
  isReady: false
  hasData: false
  data: undefined
  isFailure: true
}

export interface FailedWithError<E extends Error> {
  initial: false
  hasError: true
  loading: false
  error: E
  hasData: false
  isReady: false
  data: undefined
  isFailure: true
}

export type StatePayload<T, E extends Error = Error> =
  | InitialWithData<T>
  | Loading
  | ReadyWithData<T>
  | Failed
  | FailedWithError<E>
