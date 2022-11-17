import { BlocState } from "../../../src"

export type Todo = {
  id: number
  title: string
}

export class TodoState extends BlocState<Todo> {}
