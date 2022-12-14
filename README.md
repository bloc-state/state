# @bloc-state/state

![Codecov](https://badgen.net/npm/v/@bloc-state/state?color=black)
![Codecov](https://badgen.net/bundlephobia/minzip/@bloc-state/state?color=black)
![Codecov](https://badgen.net/codecov/c/github/bloc-state/state?color=black)
![Codecov](https://badgen.net/npm/license/@bloc-state/state?color=black)

## Introduction

`@bloc-state/state` is a Typescript library for creating immutable objects with loadable finite states.

## Installation

```
npm install @bloc-state/state
```

## Quickstart

```typescript
import { State } from "@bloc-state/state"

class CounterState extends State<number> {} // class declaration for our state

/** State instances have a status property that represents a finite state it can be in
 * 
 * initial
 * loading 
 * ready, 
 * failed
 * 
 * 
 new instances are always created with initial status

  */

// instantiate the State object
const counter = new CounterState(0)

console.log(counter.status === "initial") // true

/*
 use the previous state object to create a new state object by invoking their factory methods, each method uses 
 immers' produce under the hood so you will always have new immutable state objects
 */

const loading = counter.loading() // loading.status === "loading"
const ready = loading.ready(10) // ready.status === "ready"
const failed = ready.failed() // failed.status === "failed"

// data is always copied between transitions
console.log(failed.data) // 10

const error = new Error("Counter Exception: something bad has happened")

const failedWithError = failed.failed(error)

console.log(counter)
console.log(loading)
console.log(ready)
console.log(failed)
console.log(failedWithError)

/**
 * immer metadata omitted for clarity
 
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

## Instantiate State Objects

```ts
class SomeComplexState extends State<ComplexViewModel> {
  // provide intial data to super here
  constructor() {
    super({
      id: 0,
      followers: [],
      following: [],
      likes: [],
      ....,
      ......
    })
  }
}

const state = new SomeComplexState()

// or optionally provide the intial data with default constructor

// no super call, javascript will pass arguments to super implicitly
class SomeComplexState extends State<ComplexViewModel> {}

const state = new SomeComplexState({
  id: 0,
  followers: [],
  following: [],
  likes: [],
  ....,
  ......
})


// usage with a reducer
const someReducer = (state = new SomeComplexState(), action) => {
  if (action.type === "fetchComplexState") {
    return state.loading()
  }

  if (action.type === "fetchComplexStateSuccess") {
    return state.ready((draft: WritableDraft<ComplexViewModel>) => {
      draft.followers = action.payload.followers
      draft.likes = action.payload.likes
      ....
      ....
    })
  }
}

```

## copyWith

If you don't want to use the `loading`, `ready`, or `failed` methods. Or perhaps you are managing a more complex state object.
Use the `copyWith` method insted.

`copyWith` will copy the entire state object, not just the data unlike the `ready` method

```ts
type ProfileViewModel = {
  id: number
  name: string
  email: string
  followers: string[]
}

enum ProfileFollowersStatus {
  loading,
  success,
  failure,
}

class ProfileState extends State<ProfileViewModel> {
  followerStatus = ProfileFollowersStatus.loading

  constructor() {
    super({
      id: 0,
      name: "",
      email: "",
      followers: [],
    })
  }
}

const profileState = new ProfileState()

console.log(profileState)

/* 
 ProfileState {
    stateName: 'ProfileState',
    isStateInstance: true,
    data: { id: 0, name: '', email: '', followers: [] },
    status: 'initial',
    error: undefined,
    followerStatus: 0,
    [Symbol(immer-draftable)]: true
  }
  */

const followersSuccessState = profileState.copyWith(
  (state: WritableDraft<ProfileState>) => {
    state.followerStatus = ProfileFollowersStatus.success
    state.data.followers = ["Jill", "Bobby", "Nancy"]
  },
)

console.log(followersSuccessState)

/*
 ProfileState {
    stateName: 'ProfileState',
    isStateInstance: true,
    data: {
      id: 0,
      name: '',
      email: '',
      followers: [ 'Jill', 'Bobby', 'Nancy' ]
    },
    status: 'initial',
    error: undefined,
    followerStatus: 1,
    [Symbol(immer-draftable)]: true
  }
 */
```

## License

The MIT License.
