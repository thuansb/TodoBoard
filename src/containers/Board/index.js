import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Column from 'components/Column';
import CounterBox from 'components/CounterBox';
import { addTask, moveOverColumn, moveOverTask, fetchTask } from './actions';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import AddNewForm from 'components/AddNewForm';

const ColumnTypes = {
    TODO: 0,
    INPROGRESS: 1,
    DONE: 2
}

class Board extends Component {
    componentWillMount() {
        this.props.fetchTask('./data.json');
    }

    render() {
        const { moveToColumn, moveToTask, taskList, addNewTask, fetchingTask } = this.props;
        const taskListSorted = taskList.sort((t1, t2) => t1.order > t2.order ? 1 : -1);

        return (
            <div className="board">
                <div className="board__add-form">
                    <AddNewForm taskList={taskList} addNewTask={addNewTask} initStatus={ColumnTypes.TODO} />
                </div>
                <div className="board__counter-box">
                    <div>{fetchingTask ? 'loading...' : ''}</div>
                    <CounterBox count={taskList.length} />
                </div>
                <div className="columns">
                    <Column
                        title="To do"
                        taskList={taskListSorted.filter(task => task.status === ColumnTypes.TODO)}
                        columnType={ColumnTypes.TODO}
                        moveToColumn={moveToColumn}
                        moveToTask={moveToTask}
                    />
                    <Column
                        title="In progress"
                        taskList={taskListSorted.filter(task => task.status === ColumnTypes.INPROGRESS)}
                        columnType={ColumnTypes.INPROGRESS}
                        moveToColumn={moveToColumn}
                        moveToTask={moveToTask}
                    />
                    <Column
                        title="Done"
                        taskList={taskListSorted.filter(task => task.status === ColumnTypes.DONE)}
                        columnType={ColumnTypes.DONE}
                        moveToColumn={moveToColumn}
                        moveToTask={moveToTask}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    taskList: store.taskList,
    fetchingTask: store.fetchingTask
});

const mapDispatchToProps = (dispatch) => ({
    addNewTask: (task) => dispatch(addTask(task)),
    moveToTask: (dragPos, hoverPos) => dispatch(moveOverTask(dragPos, hoverPos)),
    moveToColumn: (dragPos, columnType) => dispatch(moveOverColumn(dragPos, columnType)),
    fetchTask: (url) => dispatch(fetchTask(url))
})

export default flow(
    connect(mapStateToProps, mapDispatchToProps),
    DragDropContext(HTML5Backend)
)(Board);
