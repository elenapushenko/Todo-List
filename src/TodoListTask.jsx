import React from 'react';
import {connect} from "react-redux";
import {DELETE_TODOLISTTASK, deleteTodoListTaskAC} from "./reducer";


class TodoListTask extends React.Component {

    state = {
        editMode: false
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode: false})
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };

    onTitleChangedKeyPress = (e) => {
        if (e.key === "Enter") {
            this.deactivateEditMode();
        }
    };

    deleteTodoListTask = () => {
        this.props.deleteTodoListTask(this.props.idTask, this.props.idTodolist)
    }

    render = () => {
        let classForTask = (this.props.task.isDone) ? "todoList-task done": "todoList-task";
        return (

            <div className={classForTask}>
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}
                />
                <span>{this.props.task.id}-</span>
                {this.state.editMode
                    ? <input value={this.props.task.title}
                             autoFocus={true}
                             onBlur={this.deactivateEditMode}
                             onChange={this.onTitleChanged}
                             onKeyPress={this.onTitleChangedKeyPress}
                    />
                : <span onClick={this.activateEditMode}>{this.props.task.title}</span>}
                <span> priority: {this.props.task.priority}</span>
                <button onClick={this.deleteTodoListTask}>X</button>
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodoListTask: (taskId, todoListId) => {
            dispatch(deleteTodoListTaskAC(taskId, todoListId))
        }
    }
};

const ConnectedTodoListTask = connect(null, mapDispatchToProps) (TodoListTask);

export default ConnectedTodoListTask;


