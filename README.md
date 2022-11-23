# @bloc-state/state

![Codecov](https://badgen.net/npm/v/@bloc-state/state?color=black)
![Codecov](https://badgen.net/bundlephobia/minzip/@bloc-state/state?color=black)
![Codecov](https://badgen.net/codecov/c/github/bloc-state/state?color=black)
![Codecov](https://badgen.net/npm/license/@bloc-state/state?color=black)

## Introduction

`@bloc-state/state` is a Typescript library for creating immutable objects with loadable finite states.

## Installation

### `immer` is a `peerDependency`

```
npm install @bloc-state/state immer
```

## Quickstart

```typescript
import { State } from "@bloc-state/state"

class CounterState extends State<number> {} // class declaration for our state

/** State instances have factory methods that return new objects with one of 4 finite states
 * loading 
 * ready, 
 * failed
 * 
 new instances are always created with initial status */

const counter = new CounterState(0)

console.log(counter.status === "initial") // true

const loading = counter.loading() // loading.status === "loading"
const ready = loading.ready(10) // ready.status === "ready"
const failed = ready.failed() // failed.status === "failed"

// data stays encapsulated between transitions
console.log(failed.data) // 10

const error = new Error("Counter Exception: something bad has happened")

const failedWithError = failed.failed(error)

console.log(counter)
console.log(loading)
console.log(ready)
console.log(failed)
console.log(failedWithError)

/**
 
{
  "stateName": "CounterState",
  "isStateInstance": true,
  "data": 0,
  "status": "initial"
}
  
{
  "stateName": "CounterState",
  "isStateInstance": true,
  "data": 0,
  "status": "loading"
}
 
{
  "stateName": "CounterState",
  "isStateInstance": true,
  "data": 10,
  "status": "ready"
}
  
{
  "stateName": "CounterState",
  "isStateInstance": true,
  "data": 10,
  "status": "failed"
} 
  
{
  "stateName": "CounterState",
  "isStateInstance": true,
  "data": 10,
  "status": "failed",
  "error": {
	  message: "Counter Exception: somethind bad happend",
	  stack: SomeStackTrace,
	}
}

 */
```

## Practical Example

```ts
// domain/model/postDetails.ts

type PostDetails = {
  by: string
  descendants?: number
  id: number
  kids?: number[]
  parent: number
  score?: number
  text?: string
  time: number
  title?: string
  type: "comment" | "story"
  url?: string
}

// presentation/model/postDetailsViewModel.ts

type PostDetailsViewModel = {
  details: PostDetails
}

// presentation/store/state/postDetailsState.ts

class PostDetailsState extends State<PostDetailsViewModel> {}

const initial: PostDetailsViewModel = {
  details: {
    by: "",
    time: 0,
    type: "comment" as "comment",
  },
}

const postDetailsState = new PostDetailsState(initial)

console.log(postDetailsState) // initial state

/**
  
{
  "StateName": "PostDetailsState",
  "isStateInstance": true,
  "data": {
    "details": {
      "by": "",
      "time": 0,
      "type": "comment"
    }
  },
  "status": "initial"
}

 */

const postDetailsLoadingState = postDetailsState.loading()

console.log(postDetailsLoadingState)

/**
  
{
  "StateName": "PostDetailsState",
  "isStateInstance": true,
  "data": {
    "details": {
      "by": "",
      "time": 0,
      "type": "comment"
    }
  },
  "status": "loading"
}

 */

console.log(postDetailsState === postDetailsLoadingState) // false, objects have different status (initial, loading)

console.log(postDetailsState.data === postDetailsLoadingState.data) // true, data didn't change

console.log(Object.isFrozen(postDetailsLoadingState)) // true, all objects returned from factory methods are read-only, and cannot be mutated

console.log(postDetailsLoadingState instanceof CounterState) // true, prototype chains remain intact

const postDetailsReadyState = postDetailsLoadingState.ready((viewModel) => {
  viewModel.details.title = "title has been changed"
})

console.log(postDetailsReadyState)

/**
  
{
  "StateName": "PostDetailsState",
  "isStateInstance": true,
  "data": {
    "details": {
      "by": "",
      "time": 0,
      "type": "comment",
      "title": "title has been changed"
    }
  },
  "status": "ready"
}

 */

console.log(postDetailsReadyState === postDetailsLoadingState) // false, data was changed so new state is emitted

console.log(postDetailsReadyState.data === postDetailsLoadingState.data) // false, data was changed so new state is emitted

console.log(
  postDetailsReadyState.data.details === postDetailsLoadingState.data.details,
) // false, data was changed so new state is emitted

console.log(postDetailsReadyState === postDetailsReadyState.ready()) // true, state didn't change
```

## License

The MIT License.
