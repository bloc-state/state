import { isBlocStateInstance } from "../src"
import { CounterState } from "./helpers/counter/counter.state"
import { TodoState } from "./helpers/todo/todo.state"

describe("BlocState", () => {
  let state: CounterState

  beforeEach(() => {
    state = new CounterState(0)
  })

  describe("BlocState creation", () => {
    it("should set state to initial", () => {
      expect(state).toBeInstanceOf(CounterState)
      expect(state.status).toBe("initial")
      expect(state.data).toBe(0)
    })
  })

  describe("BlocState.ready", () => {
    it("should set state to ready", () => {
      const readyState = state.ready(state.data + 3)
      expect(readyState).toBeInstanceOf(CounterState)
      expect(readyState.status).toBe("ready")
      expect(readyState.data).toBe(3)
      expect(readyState === state).toBe(false)

      const readyState2 = readyState.ready()
      console.log(readyState2)
      expect(readyState2).toBeInstanceOf(CounterState)
      expect(readyState2.status).toBe("ready")
      expect(readyState2.data).toBe(3)
      expect(readyState2 === readyState).toBe(false)

      const referenceTypeState = new TodoState({
        id: 0,
        title: "go to work",
      })

      expect(referenceTypeState).toBeInstanceOf(TodoState)
      expect(referenceTypeState.data.id).toBe(0)
      expect(referenceTypeState.data.title).toBe("go to work")

      const referenceTypeState2 = referenceTypeState.ready()
      expect(referenceTypeState !== referenceTypeState2)
      expect(referenceTypeState2.data !== referenceTypeState.data)

      const primitiveState = state.ready(2)
      expect(primitiveState.data).toBe(2)
      expect(primitiveState.status).toBe("ready")
      expect(primitiveState !== state).toBe(true)

      const nonPrimitiveWithFunctionState = referenceTypeState.ready((todo) => {
        todo.id = 5
      })

      expect(nonPrimitiveWithFunctionState.data !== referenceTypeState.data)
    })
  })

  describe("BlocState.loading", () => {
    it("should set state to loading", () => {
      const loading = state.loading()
      expect(loading).toBeInstanceOf(CounterState)
      expect(loading.status).toBe("loading")
      expect(loading.data).toBe(0)
      expect(loading === state).toBe(false)
    })
  })

  describe("BlocState.failed", () => {
    it("should set state to failed", () => {
      const failed = state.failed(new Error("operation has failed"))
      expect(failed).toBeInstanceOf(CounterState)
      expect(failed.error).toBeDefined()
      expect(failed.error?.message).toBe("operation has failed")
      expect(failed.data).toBe(state.data)
      expect(failed === state).toBe(false)

      const failed2 = failed.failed()
      expect(failed2).toBeInstanceOf(CounterState)
      expect(failed2.error).toBeUndefined()
      expect(failed2.error?.message).toBeUndefined()
      expect(failed2.data).toBe(failed.data)
      expect(failed2 === failed).toBe(false)
    })
  })

  describe("isBlocStateInstance function", () => {
    it("should return true only if an object is an instance of BlocState", () => {
      class Test {}
      const test = new Test()
      expect(isBlocStateInstance(state)).toBe(true)
      expect(isBlocStateInstance(test)).toBe(false)
    })
  })
})
