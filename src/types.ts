import { BlocState } from "./state"

export type BlocStateDataType<T> = T extends BlocState<infer U> ? U : T

export type BlocStatePayload<T, E extends Error = Error> = {
  status?: BlocStateStatus
  data: T
  error?: E
}

export enum BlocStateStatus {
  initial,
  loading,
  ready,
  failed,
}
