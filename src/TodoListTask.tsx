import React from 'react';
import {connect} from "react-redux";
import {deleteTaskTC} from "./reducer";
import {TaskType} from "./types/entities";
import {AppStateType} from "./Store";

type StateType = {
    editMode: boolean
    title: string
}

type OwnPropsType = {
    task: TaskType
    idTask: string
    key: string
    idTodolist: string
    changeStatus: (task: TaskType, status: number) => void
    changeTitle: (task: TaskType, newTitle: string) => void
}

type MapDispatchToPropsType = {
    deleteTask: (taskId: string, todoListId: string) => void
}

type PropsType = OwnPropsType & MapDispatchToPropsType

class TodoListTask extends React.Component<PropsType, StateType> {

    state: StateType = {
        editMode: false,
        title: this.props.task.title

    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task, this.state.title)
        this.setState({editMode: false})
    };

    onIsDoneChanged = (e: any) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };

    onTitleChanged = (e: any) => {
        this.setState({title: e.currentTarget.value})
    };

    onTitleChangedKeyPress = (e: any) => {
        if (e.key === "Enter") {
            this.deactivateEditMode();
        }
    };

    deleteTodoListTask = () => {
        this.props.deleteTask(this.props.idTask, this.props.idTodolist);
  // api.deleteTask(this.props.idTask, this.props.idTodolist)
  //           .then(res => {
  //               this.props.deleteTodoListTask(this.props.idTask, this.props.idTodolist)
  //           })
    }

    render = () => {
        let classForTask = this.props.task.status === 2 ? "todoList-task done": "todoList-task";
        return (

            <div className={classForTask}>
                <input type="checkbox"
                       checked={this.props.task.status === 2}
                       onChange={this.onIsDoneChanged}
                />
                <span>{this.props.task.id}-</span>
                {this.state.editMode
                    ? <input value={this.state.title}
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
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        deleteTask: (taskId, todoListId) => {
            dispatch(deleteTaskTC(taskId, todoListId))
        }
    }
};

const ConnectedTodoListTask = connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(null, mapDispatchToProps) (TodoListTask);

export default ConnectedTodoListTask;


