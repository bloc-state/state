import { BlocState } from "../../../src/state"

export class CounterState extends BlocState<number> {
  constructor(data: number = 0) {
    super(data)
  }
}
