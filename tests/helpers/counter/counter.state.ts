import { BlocState } from "../../../src"

export class CounterState extends BlocState<number> {}
export class CounterIncrementState extends CounterState {}
export class CounterDecrementState extends CounterState {}
