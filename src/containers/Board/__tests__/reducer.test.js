import reducer from '../reducers'
import * as types from '../actions'

describe('todos reducer', () => {

    // mock data
    const initState = { taskList: [], fetchingTask: false, fetchError: null };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initState)
    })

    it('should handle ADD_TASK', () => {
        expect(
            reducer(initState, {
                type: types.ADD_TASK,
                payload: {
                    text: 'Some thing',
                    status: 0
                }
            })
        ).toEqual({ taskList: [{ id: 0, text: 'Some thing', status: 0, order: 0 }], fetchingTask: false, fetchError: null })

        expect(
            reducer(
                { taskList: [{ id: 0, text: 'Some thing', status: 0, order: 0 }] },
                {
                    type: types.ADD_TASK,
                    payload: { text: 'Some thing else', status: 0 }
                }
            )
        ).toEqual({
            taskList: [
                { id: 0, text: 'Some thing', status: 0, order: 0 },
                { id: 1, text: 'Some thing else', status: 0, order: 1 }
            ]
        })
    })

    it('should handle MOVE_OVER_TASK from column 1 -> 2', () => {
        const state = reducer({
            taskList:
            [{ id: 0, text: 'Write a cool JS library', status: 0, order: 0 },
            { id: 2, text: 'Write README', status: 1, order: 0 },
            { id: 1, text: 'Make it generic enough', status: 0, order: 1 }],
            fetchingTask: false, 
            fetchError: null
        },
            {
                type: 'board/MOVE_OVER_TASK',
                payload: {
                    dragPos: { id: 0, order: 0, status: 0 },
                    hoverPos: { id: 2, order: 0, status: 1 }
                }
            }
        );

        expect(state).toEqual({
            taskList:
            [{ id: 0, text: 'Write a cool JS library', status: 1, order: 0 },
            { id: 2, text: 'Write README', status: 1, order: 1 },
            { id: 1, text: 'Make it generic enough', status: 0, order: 0 }
            ],
            fetchingTask: false,
            fetchError: null
        });
    })

    it('should handle MOVE_OVER_TASK swap tasks in a column', () => {
        const state = reducer({
            taskList:
            [{ id: 0, text: 'Write a cool JS library', status: 0, order: 0 },
            { id: 2, text: 'Write README', status: 1, order: 0 },
            { id: 1, text: 'Make it generic enough', status: 0, order: 1 }],
            fetchingTask: false, 
            fetchError: null
        }, { type: 'board/MOVE_OVER_TASK', payload: { dragPos: { id: 0, order: 0, status: 0 }, hoverPos: { id: 1, order: 1, status: 0 } } });
        expect(state).toEqual(
            {
                taskList:
                [{ id: 0, text: 'Write a cool JS library', status: 0, order: 1 },
                { id: 2, text: 'Write README', status: 1, order: 0 },
                { id: 1, text: 'Make it generic enough', status: 0, order: 0 }],
                fetchingTask: false,
                fetchError: null
            }
        );
    })

    it('should handle MOVE_OVER_COLUMN', () => {
        const state = reducer({ taskList: [{ id: 0, text: 'Write a cool JS library', status: 0, order: 0 }, { id: 2, text: 'Write README', status: 2, order: 0 }, { id: 1, text: 'Make it generic enough', status: 0, order: 1 }], fetchingTask: false, fetchError: null }, { type: 'board/MOVE_OVER_COLUMN', payload: { dragPos: { id: 2, order: 0, status: 1 }, columnType: 2 } });
        expect(state).toEqual({ taskList: [{ id: 0, text: 'Write a cool JS library', status: 0, order: 0 }, { id: 2, text: 'Write README', status: 2, order: 0 }, { id: 1, text: 'Make it generic enough', status: 0, order: 1 }], fetchingTask: false, fetchError: null });
    })

    it('should handle FETCH_TASK', () => {
        const state = reducer({ taskList: [], fetchingTask: false, fetchError: null }, { type: 'board/FETCH_TASK' });
        expect(state).toEqual({ taskList: [], fetchingTask: true, fetchError: null });

    })

    it('should handle SUCCEED_FETCH_TASK', () => {
        const state = reducer({ taskList: [], fetchingTask: true, fetchError: null }, { type: 'board/SUCCEED_FETCH_TASK', payload: { taskList: [{ id: 0, text: 'Write a cool JS library', status: 0, order: 0 }, { id: 2, text: 'Write README', status: 1, order: 0 }, { id: 1, text: 'Make it generic enough', status: 0, order: 1 }] } });
        expect(state).toEqual({ taskList: [{ id: 0, text: 'Write a cool JS library', status: 0, order: 0 }, { id: 2, text: 'Write README', status: 1, order: 0 }, { id: 1, text: 'Make it generic enough', status: 0, order: 1 }], fetchingTask: false, fetchError: null });
    })

    it('should handle FAILED_FETCH_TASK', () => {
        const state = reducer({ taskList: [], fetchingTask: true, fetchError: null }, { type: 'board/FAILED_FETCH_TASK', payload: { error: { errorType: 'common', error: 'Unexpected token < in JSON at position 0' } } });
        expect(state).toEqual({ taskList: [], fetchingTask: false, fetchError: { errorType: 'common', error: 'Unexpected token < in JSON at position 0' } });
    })
})
