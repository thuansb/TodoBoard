import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Task from './Task';
import ColumnHeader from './ColumnHeader';

const taskTarget = {
    // handle hover within a EMPTY column
    hover(props, monitor, component) {
        const dragPos = monitor.getItem().pos;
        const { columnType, taskList } = props;
        // check empty column
        if (columnType !== dragPos.status && taskList.length === 0) {            
            props.moveToColumn(dragPos, columnType);

            // Update new value of monitor
            monitor.getItem().pos = {
                id: dragPos.id,
                order: 0,
                status: columnType
            }
        }
    }
}

class Column extends Component {
    render() {
        const { connectDropTarget, taskList, moveToTask, title } = this.props;
        return (
            connectDropTarget(
                <div className="column">
                    <ColumnHeader title={title} count={taskList.length} />
                    <div>
                        {taskList
                            .map((task) => (
                                <Task
                                    key={task.id}
                                    pos={{ id: task.id, order: task.order, status: task.status }}
                                    text={task.text}
                                    moveToTask={moveToTask}
                                />
                            ))}
                    </div>
                </div>
            )
        )
    }
}

export default DropTarget(ItemTypes.TASK, taskTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))(Column);