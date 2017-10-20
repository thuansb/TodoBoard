import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import flow from 'lodash/flow';

const taskSource = {
	beginDrag(props) {
		return {
			pos: props.pos
		};
	},
	isDragging(props, monitor) {
		return props.pos.id === monitor.getItem().pos.id
	}
};

const taskTarget = {
	// handle hover on another task
	hover(props, monitor, component) {
		const dragPos = monitor.getItem().pos;
		const { pos: hoverPos } = props;

		if (dragPos.id !== hoverPos.id) {
			props.moveToTask(dragPos, hoverPos);

			// Update new value of monitor
			monitor.getItem().pos = {
				id: dragPos.id,
				order: hoverPos.order,
				status: hoverPos.status
			}
		}
	}
}

class Task extends Component {
	render() {
		const { isDragging, connectDragSource, connectDropTarget, text } = this.props;
		const bc = isDragging ? '#DDD' : '';
		return connectDropTarget(
				connectDragSource(
				<div className="task" style={{ backgroundColor: bc }}>
					{text}
				</div>
			)
		);
	}
}

Task.propTypes = {
	text: PropTypes.string.isRequired,

	// Injected by React DnD:
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired
}

export default flow(
	DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})),
	DropTarget(ItemTypes.TASK, taskTarget, (connect) => ({
		connectDropTarget: connect.dropTarget()
	}))
)(Task);