import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {ADD_TASK, addTaskAC, CHANGE_TASK, changeTaskAC, DELETE_TODOLIST, deleteTodoListAC} from "./reducer";


class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };
    buttons = [
        {title: "All"},
        {title: "Completed"},
        {title: "Active"}
    ];

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem(`our-state- ${this.props.id}`, stateAsString);
    };

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem(`our-state- ${this.props.id}`);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if(t.id > this.nextTaskId) {
                    this.nextTaskId = t.id + 1;
                }
            })
        });
    };

    changeTask = (taskId, obj) => {
        this.props.changeTask(taskId, obj, this.props.id)
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    };

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle});
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState);
    }

    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        this.props.addTask(newTask, this.props.id)
    };

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    };

    render() {
        return (
            <div className="todoList">
                <div className="todoListHeader">
                <TodoListTitle title={this.props.title} id={this.props.id} />
                <AddNewItemForm addItem={this.addTask}/>
                <button onClick={this.deleteTodoList}>X</button>
                </div>
                <TodoListTasks
                    idTodoList={this.props.id}
                    changeTitle={this.changeTitle}
                    changeStatus={this.changeStatus}
                    tasks={this.props.tasks.filter(t => {
                            if (this.state.filterValue === this.buttons[0].title) {
                                return true;
                            }
                            if (this.state.filterValue === this.buttons[1].title) {
                                return t.isDone === true;
                            }
                            if (this.state.filterValue === this.buttons[2].title) {
                                return t.isDone === false;
                            }
                        }
                    )}/>
                <TodoListFooter
                    filterValue={this.state.filterValue}
                    buttons={this.buttons}
                    changeFilter={this.changeFilter}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todoListId) => {
            dispatch(addTaskAC(newTask, todoListId))
        },
        changeTask: (taskId, obj, todoListId) => {
            dispatch(changeTaskAC(taskId, obj, todoListId))
        },
        deleteTodoList: (todoListId) => {
            dispatch(deleteTodoListAC(todoListId))
        }
    }
}

const ConnectedTodoList = connect(null, mapDispatchToProps) (TodoList);

export default ConnectedTodoList;