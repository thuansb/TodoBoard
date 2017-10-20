import { 
    ADD_TASK, 
    MOVE_OVER_TASK, 
    MOVE_OVER_COLUMN,
    FETCH_TASK,
    SUCCEED_FETCH_TASK,
    FAILED_FETCH_TASK
} from './actions';

const reducer = (state = { taskList: [], fetchingTask: false, fetchError: null }, action) => {
    switch (action.type) {
        case ADD_TASK: {
            return Object.assign({}, state, {
                taskList: [
                    ...state.taskList,
                    action.payload.task
                ]
            });
        }
        case MOVE_OVER_TASK: {
            const { dragPos, hoverPos } = action.payload;
            return Object.assign({}, state, {
                taskList: moveToTask(dragPos, hoverPos, state.taskList)
            });
        }
        case MOVE_OVER_COLUMN: {
            const { dragPos, columnType } = action.payload;
            return Object.assign({}, state, {
                taskList: moveToColumn(dragPos, columnType, state.taskList)
            });
        }
        case FETCH_TASK: {
            return Object.assign({}, state, {
                fetchingTask: true
            });
        }
        case SUCCEED_FETCH_TASK: {
            const { taskList } = action.payload;
            return Object.assign({}, state, {
                fetchingTask: false,
                taskList: taskList
            });
        }
        case FAILED_FETCH_TASK: {
            const { error } = action.payload;
            return Object.assign({}, state, {
                fetchingTask: false,
                fetchError: error
            })
        }
        default:
            return state;
    }
}

function moveToTask(dragPos, hoverPos, taskList) {
    if (dragPos.status === hoverPos.status) {
        //swap task
        return taskList.map(task => {
            if (task.id === dragPos.id) {
                task.order = hoverPos.order;
            }

            if (task.id === hoverPos.id) {
                task.order = dragPos.order;
            }

            return task;
        })
    } else {
        // move between column
        return taskList.map(task => {
            // reindex order of old column
            if (task.status === dragPos.status && task.order >= dragPos.order) {
                task.order--;
            }

            // reindex order of new column
            if (task.status === hoverPos.status && task.order >= hoverPos.order) {
                task.order++;
            }

            // update status & order of dragging task
            if (task.id === dragPos.id) {
                task.status = hoverPos.status;
                task.order = hoverPos.order;
            }

            return task;
        })
    }
}

// move to a empty column
function moveToColumn(dragPos, columnType, taskList) {
    return taskList.map(task => {
        // reindex order of old column
        if (task.status === dragPos.status && task.order >= dragPos.order) {
            task.order--;
        }

        // update status & order of dragging task
        if (task.id === dragPos.id) {
            task.status = columnType;
            task.order = 0;
        }

        return task;
    });
}


export default reducer;