import React from 'react';
import {connect} from "react-redux";
import {updateTodoListTitleTC} from "./reducer";
import {TodoListType} from "./types/entities";
import {AppStateType} from "./Store";


type StateType = {
    editMode: boolean
    title: string
}

type OwnPropsType = {
    tl: TodoListType
    title: string
    id: string
}

type MapDispatchToPropsType = {
    updateTodoListTitleTC: (todoList: TodoListType, newTitle: string, todoListId: string) => void
}

type PropsType = OwnPropsType & MapDispatchToPropsType

class TodoListTitle extends React.Component<PropsType, StateType>  {

    state: StateType = {
        editMode: false,
        title: this.props.title

    };

    changeTodoListTitle = (todoList: TodoListType, newTitle: string) => {
        this.props.updateTodoListTitleTC(todoList, newTitle, this.props.id)

        // api.updateTodoListTitle(todoList, newTitle, this.props.id)
        //     .then(res => {
        //             this.props.changeTodoListTitle(todoList, newTitle, this.props.id)
        //         }
        //     )
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.changeTodoListTitle(this.props.tl, this.state.title)
        this.setState({editMode: false})
    };

    onTitleChanged = (e: any) => {
        this.setState({title: e.currentTarget.value})
    };

    onTitleChangedKeyPress = (e: any) => {
        if (e.key === "Enter") {
            this.deactivateEditMode();
        }
    };
    render() {
        return (
            <div className="todoList-header__title">
                {this.state.editMode
                    ? <input value={this.state.title}
                             autoFocus={true}
                             onBlur={this.deactivateEditMode}
                             onChange={this.onTitleChanged}
                             onKeyPress={this.onTitleChangedKeyPress}
                    />
                    : <span onClick={this.activateEditMode}>{this.props.title}</span>}
            </div>
        )
    }
}
/*
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        updateTodoListTitle: (todoList, newTitle,todoListId) => {
            dispatch(updateTodoListTitleTC(todoList, newTitle,todoListId))
        }
    }
};*/

const ConnectedTodoListTitle = connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(null, {updateTodoListTitleTC}) (TodoListTitle);

export default ConnectedTodoListTitle;