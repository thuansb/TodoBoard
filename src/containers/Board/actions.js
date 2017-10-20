export const ADD_TASK = "board/ADD_TASK";
export const MOVE_OVER_TASK = "board/MOVE_OVER_TASK";
export const MOVE_OVER_COLUMN = "board/MOVE_OVER_COLUMN";

export const FETCH_TASK = "board/FETCH_TASK";
export const SUCCEED_FETCH_TASK = "board/SUCCEED_FETCH_TASK";
export const FAILED_FETCH_TASK = "board/FAILED_FETCH_TASK";

export function addTask(task) {
  return {
    type: ADD_TASK,
    payload: {
        task
    }
  }
}

export function moveOverTask(dragPos, hoverPos) {
  return {
    type: MOVE_OVER_TASK,
    payload: {
      dragPos,
      hoverPos
    }
  }
}

export function moveOverColumn(dragPos, columnType) {
  return {
    type: MOVE_OVER_COLUMN,
    payload: {
      dragPos,
      columnType
    }
  }
}

export function fetchTask() {
  return {
    type: FETCH_TASK
  }
}

export function succeedFetchTask(taskList) {
  return {
    type: SUCCEED_FETCH_TASK,
    payload: {
      taskList
    }
  }
}

export function failedFetchTask(error) {
  return {
    type: FAILED_FETCH_TASK,
    payload: {
      error
    }
  }
}


