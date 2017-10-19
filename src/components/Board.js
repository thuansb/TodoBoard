import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Column from './Column';
import CounterBox from './CounterBox';
import maxBy from 'lodash/maxBy';

const taskListDefault = [{
    id: 0,
    text: 'Write a cool JS library',
    status: 0,
    order: 0
}, {
    id: 1,
    text: 'Make it generic enough',
    status: 0,
    order: 1
}, {
    id: 2,
    text: 'Write README',
    status: 1,
    order: 0
}, {
    id: 3,
    text: 'Create some examples',
    status: 1,
    order: 1
}, {
    id: 4,
    text: 'Spam in Twitter and IRC',
    status: 2,
    order: 0
}, {
    id: 5,
    text: '???',
    status: 2,
    order: 1
}, {
    id: 6,
    text: 'PROFIT',
    status: 2,
    order: 2
}];

const ColumnTypes = {
    TODO: 0,
    INPROGRESS: 1,
    DONE: 2
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: taskListDefault
        }
    }

    moveToTask = (dragPos, hoverPos) => {
        const { taskList } = this.state;
        let newTaskList;

        if (dragPos.status === hoverPos.status) {
            //swap task
            newTaskList = taskList.map(task => {
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
            newTaskList = taskList.map(task => {
                // reindex order of old column
                if (task.status === dragPos.status && task.order >= dragPos.order) {
                    task.order--;
                }

                // reindex order of new column
                if (task.status === hoverPos.status && task.order >= hoverPos.order) {
                    task.order++;
                }

                // update status & order of drag task
                if (task.id === dragPos.id) {
                    task.status = hoverPos.status;
                    task.order = hoverPos.order;
                }

                return task;
            });
        }

        this.setState({ taskList: newTaskList });
    }

    moveToColumn = (dragPos, columnType) => {
        const { taskList } = this.state;
        let newTaskList;
        newTaskList = taskList.map(task => {
            // reindex order of old column
            if (task.status === dragPos.status && task.order >= dragPos.order) {
                task.order--;
            }

            // update status & order of drag task
            if (task.id === dragPos.id) {
                task.status = columnType;
                task.order = 0;
            }

            return task;
        });

        this.setState({ taskList: newTaskList });
    }

    addTask = (e) => {
        e.preventDefault();

        if (this.inputText.value && this.inputText.value.trim()) {
            const newTaskList = this.state.taskList;
            const filtered = newTaskList.filter(task => task.status === ColumnTypes.TODO);
            const maxOrder = maxBy(filtered, task => task.order).order;
            const maxId = maxBy(newTaskList, task => task.id).id;
            newTaskList.push({
                id: maxId + 1,
                text: this.inputText.value.trim(),
                order: maxOrder + 1,
                status: ColumnTypes.TODO
            }); 
            this.inputText.value = '';
            this.setState({ taskList: newTaskList });
        }        
    }
    render() {
        //const { addTask } = this.props;
        const { taskList } = this.state;
        const taskListSorted = taskList.sort((t1, t2) => t1.order > t2.order ? 1 : -1);

        return (
            <div className="board">
                <div>
                    <form onSubmit={this.addTask}>
                        <label>Add Task</label>
                        <input ref={(input) => this.inputText = input} type="text" />
                    </form>
                </div>
                <div className="master-counter-box">
                    <CounterBox count={taskList.length} />
                </div>
                <div className="columns">
                    <Column
                        title="To do"
                        taskList={taskListSorted.filter(task => task.status === ColumnTypes.TODO)}
                        columnType={ColumnTypes.TODO}
                        moveToColumn={this.moveToColumn}
                        moveToTask={this.moveToTask}
                    />
                    <Column
                        title="In progress"
                        taskList={taskListSorted.filter(task => task.status === ColumnTypes.INPROGRESS)}
                        columnType={ColumnTypes.INPROGRESS}
                        moveToColumn={this.moveToColumn}
                        moveToTask={this.moveToTask}
                    />
                    <Column
                        title="Done"
                        taskList={taskListSorted.filter(task => task.status === ColumnTypes.DONE)}
                        columnType={ColumnTypes.DONE}
                        moveToColumn={this.moveToColumn}
                        moveToTask={this.moveToTask}
                    />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Board);