import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineEpics } from 'redux-observable'
import 'rxjs'
const epicRegistry = []
const epic$ = new BehaviorSubject(combineEpics(...epicRegistry))

export const registerEpic = (epic) => {
  // don't add an epic that is already registered/running
  if (epicRegistry.indexOf(epic) === -1) {
    epicRegistry.push(epic)
    epic$.next(epic)
  }
}

export const rootEpic = (action$, store) =>
  epic$.mergeMap(epic =>
    epic(action$, store)
)
