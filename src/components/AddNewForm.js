import React, { Component } from 'react';
import maxBy from 'lodash/maxBy';

class AddNewForm extends Component {
    addTask = (e) => {
        e.preventDefault();

        const { addNewTask, taskList, initStatus } = this.props;

        if (this.inputText.value && this.inputText.value.trim()) {
            const filtered = taskList.filter(task => task.status === initStatus);
            const maxOrder = maxBy(filtered, task => task.order);
            const maxId = maxBy(taskList, task => task.id);

            addNewTask({
                id: maxId ? maxId.id + 1 : 0,
                text: this.inputText.value.trim(),
                order: maxOrder ? maxOrder.order + 1 : 0,
                status: initStatus
            })

            this.inputText.value = '';
        }
    }

    render() {
        return (
            <form onSubmit={this.addTask} >
                <label>Add Task</label>
                <input ref={(input) => this.inputText = input} type="text" />
            </form>
        )
    }
}

export default AddNewForm;