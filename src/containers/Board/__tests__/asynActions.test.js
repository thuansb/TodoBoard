import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions'
import fetchMock from 'fetch-mock'

const mockStore = configureMockStore([thunk])

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('dispatch FETCH_TASK & SUCCEED_FETCH_TASK when fetching done', () => {
        const taskList = [
            { id: 1 },
            { id: 2 },
            { id: 3 }
        ];
        fetchMock
            .getOnce('./data.json', { body: taskList, headers: { 'content-type': 'application/json' } })


        const expectedActions = [
            { type: actions.FETCH_TASK },
            { type: actions.SUCCEED_FETCH_TASK, payload: { taskList: taskList } }
        ]
        const store = mockStore({ todos: [] })

        return store.dispatch(actions.fetchTask('./data.json')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('dispatch FETCH_TASK & FAILED_FETCH_TASK when fetching error', () => {

        fetchMock
            .getOnce('./data.json', { body: 'wrong response format', headers: { 'content-type': 'application/json' } })


        const expectedActions = [
            { type: actions.FETCH_TASK },
            { type: actions.FAILED_FETCH_TASK, payload: { error: { errorType: 'common', error: 'invalid json response body at ./data.json reason: Unexpected token w in JSON at position 0' } } }
        ]
        const store = mockStore({ taskList: [] })

        return store.dispatch(actions.fetchTask('./data.json')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})