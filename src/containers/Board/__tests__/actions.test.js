import * as actions from '../actions';

describe('actions', () => {
    it('should create an action to add a task', function () {
        const expectedAction = {
            type: actions.ADD_TASK,
            payload: {
                text: 'Doing something',
                status: 0                
            }
        }
        expect(actions.addTask('Doing something', 0)).toEqual(expectedAction)
    })

    it('should create an action to moveOverTask', function () {
        const dragPos = {
            id: 1,
            order: 10,
            status: 0
        };

        const hoverPos = {
            id: 5,
            order: 5,
            status: 0
        }

        const expectedAction = {
            type: actions.MOVE_OVER_TASK,
            payload: {
                dragPos,
                hoverPos
            }
        }
        expect(actions.moveOverTask(dragPos, hoverPos)).toEqual(expectedAction)
    })

    it('should create an action to moveOverColumn', function () {
        const dragPos = {
            id: 1,
            order: 10,
            status: 0
        };

        const columnType = 1;

        const expectedAction = {
            type: actions.MOVE_OVER_COLUMN,
            payload: {
                dragPos,
                columnType
            }
        }
        expect(actions.moveOverColumn(dragPos, columnType)).toEqual(expectedAction)
    })

    it('should create an action to requestFetchTask', function () {

        const expectedAction = {
            type: actions.FETCH_TASK
        }
        expect(actions.requestFetchTask()).toEqual(expectedAction)
    })

    it('should create an action to succeedFetchTask', function () {
        const taskList = [
            { id: 1 },
            { id: 2 },
            { id: 3 }
        ];

        const expectedAction = {
            type: actions.SUCCEED_FETCH_TASK,
            payload: {
                taskList
            }
        }
        expect(actions.succeedFetchTask(taskList)).toEqual(expectedAction)
    })

    it('should create an action to failedFetchTask', function () {
        const error = {
            message: 'st went wrong!'
        };

        const expectedAction = {
            type: actions.FAILED_FETCH_TASK,
            payload: {
                error
            }
        }
        expect(actions.failedFetchTask(error)).toEqual(expectedAction)
    })
})