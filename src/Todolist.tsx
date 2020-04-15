import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {createTaskTC, deleteTodoListTC, getTasksTC, updateTaskTC} from "./reducer";
import preloader from "./preloader/preload.svg";
import {ChangeTaskType, TaskType, TodoListType} from "./types/entities";
import { AppStateType } from './Store';

type StateType = {
    tasks: Array<TaskType>,
    filterValue: string,
}

export type ButtonsTitle = {
    title: string
}

type OwnPropsType = {
    tl: TodoListType
    id: string
    title: string
    tasks: Array<TaskType>
}

type MapDispatchToPropsType = {
    getTasksTC: (todoListId: string, tasks: Array<TaskType>) => void
    updateTaskTC: (task: TaskType, taskId: string, obj: ChangeTaskType, todoListId: string) => void
    createTaskTC: (newTitle: string, todoListId: string) => void
    deleteTodoListTC: (todoListId: string) => void
}

type PropsType = OwnPropsType & MapDispatchToPropsType


class TodoList extends React.Component<PropsType, StateType> {
    componentDidMount() {
        this.restoreState();
    }


    state: StateType = {
        tasks: [],
        filterValue: "All",

    };
    buttons: Array<ButtonsTitle> = [
        {title: "All"},
        {title: "Completed"},
        {title: "Active"}
    ];

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem(`our-state- ${this.props.id}`, stateAsString);
    };

    restoreState = () => {
        this.props.getTasksTC(this.props.id, this.props.tasks)
     // api.getTasks(this.props.id)
     //        .then(res => {
     //            let allTasks = res.data.items;
     //            this.props.setTasks(this.props.id, allTasks)
     //        }
     //    )
    }

    // __restoreState = () => {
    //     let state = this.state;
    //     let stateAsString = localStorage.getItem(`our-state- ${this.props.id}`);
    //     if (stateAsString != null) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     this.setState(state, () => {
    //         this.state.tasks.forEach(t => {
    //             if(t.id > this.nextTaskId) {
    //                 this.nextTaskId = t.id + 1;
    //             }
    //         })
    //     });
    // };

    changeTask = (task: TaskType, obj: ChangeTaskType) => {
        this.props.updateTaskTC(task, task.id, obj, this.props.id);
        // api.updateTask(task, obj, this.props.id)
        //     .then(res => {
        //             this.props.changeTask(task.id, obj, this.props.id)
        //         }
        //     )
    };


    changeStatus = (task: TaskType, status: number) => {
        this.changeTask(task, {status: status ? 2 : 0});
    };

    changeTitle = (task: TaskType, newTitle: string) => {
        this.changeTask(task, {title: newTitle});
    };

    changeFilter = (newFilterValue: string) => {
        this.setState({filterValue: newFilterValue}, this.saveState);
    }

    addTask = (newTitle: string) => {
        this.props.createTaskTC(newTitle, this.props.id);
      // api.createTask(newTitle, this.props.id)
      //       .then(res => {
      //               this.props.addTask(res.data.data.item, this.props.id)
      //           }
      //       )
    };



    deleteTodoList = () => {
        this.props.deleteTodoListTC(this.props.id)
     // api.deleteTodoList(this.props.id)
     //        .then(res => {
     //            this.props.deleteTodoList(this.props.id)
     //        })
    };

    render() {
        let {tasks =[]} = this.props;
        return (
            <div className="todoList">
                <div className="todoListHeader">
                {/*<TodoListTitle tl={this.props.tl} title={this.props.title} id={this.props.id} />*/}
                <TodoListTitle  tl={this.props.tl} title={this.props.title} id={this.props.id} />
                <AddNewItemForm addItem={this.addTask}/>
                <button onClick={this.deleteTodoList}>X</button>
                </div>
                {this.props.tl.loading ? <img className="preloader" src={preloader}/>
                :                 <TodoListTasks
                        idTodoList={this.props.id}
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        tasks={tasks.filter(t => {
                                if (this.state.filterValue === this.buttons[0].title) {
                                    return true;
                                }
                                if (this.state.filterValue === this.buttons[1].title) {
                                    return t.status === 2;
                                }
                                if (this.state.filterValue === this.buttons[2].title) {
                                    return t.status !== 2;
                                }
                            }
                        )}/>}

                <TodoListFooter
                    filterValue={this.state.filterValue}
                    buttons={this.buttons}
                    changeFilter={this.changeFilter}/>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
//     return {
//         getTasks: (todoListId, tasks) => {
//             dispatch(getTasksTC(todoListId, tasks))
//         },
//         updateTask: (task, taskId, obj, todoListId) => {
//             dispatch(updateTaskTC(task, taskId, obj, todoListId))
//         },
//         createTask: (newTitle, todoListId) => {
//             dispatch(createTaskTC(newTitle, todoListId))
//         },
//         deleteTodoList: (todoListId) => {
//             dispatch(deleteTodoListTC(todoListId))
//         }
//     }
// }

const ConnectedTodoList = connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(null,
    {createTaskTC, deleteTodoListTC, getTasksTC, updateTaskTC}) (TodoList);

export default ConnectedTodoList;