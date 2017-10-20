import React, { Component } from 'react';

class AddNewForm extends Component {
    addTask = (e) => {
        e.preventDefault();

        const { addNewTask, initStatus } = this.props;

        if (this.inputText.value && this.inputText.value.trim()) {            
            addNewTask(this.inputText.value.trim(), initStatus)
            this.inputText.value = '';
        }
    }

    render() {
        return (
            <form onSubmit={this.addTask} >
                <label>Add Task</label>
                <input ref={(input) => this.inputText = input} type="text" placeholder="task name" />
            </form>
        )
    }
}

export default AddNewForm;