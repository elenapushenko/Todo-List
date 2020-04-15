import React from 'react';
import './App.css';
import TodoList from "./Todolist";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {createTodoListTC, getTodoListsTC} from "./reducer";
import preloader from "./preloader/preload.svg"
import {TodoListType} from "./types/entities";
import {AppStateType} from "./Store";
import {Dispatch} from "redux";

type MapDispatchToPropsType = {
    getTodoListsTC: () => void
    createTodoListTC: (newTodoList: string) => void
}

type MapStateToPropsType = {
    todoLists: Array<TodoListType>
    loading: boolean
}

type OwnPropsType = {
    todoLists: Array<TodoListType>
    loading: boolean
}

type PropsType = OwnPropsType & MapDispatchToPropsType & MapStateToPropsType



class App extends React.Component<PropsType> {


componentDidMount() {
    this.restoreState()
}


    restoreState = () => {
    this.props.getTodoListsTC()
        // api.getTodoLists()
        //     .then(res => {
        //         this.props.setTodoLists(res.data);
        //     });
    }


    addTodoLists = (title: string) => {
        this.props.createTodoListTC(title)
       // api.createTodoList(title)
       //      .then(res => {
       //          this.props.addTodoList(res.data.data.item)
       //      })
    };



    render = () => {

    let todoLists = this.props.todoLists.map((tl)=> {
        return <TodoList tl={tl} id={tl.id} title={tl.title} tasks={tl.tasks}/>
    })
        return (
            <>
                <AddNewItemForm addItem={this.addTodoLists}/>
                <div className="App">
                    {this.props.loading ? <img className="preloader" src={preloader}/>
                    : todoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todoLists: state.todoList.todoLists,
        loading: state.todoList.loading
    }
}

// const mapDispatchToProps = (dispatch: Dispatch<any> ): MapDispatchToPropsType => {
//     return {
//         getTodoLists : () => {
//             dispatch(getTodoListsTC())
//         },
//         createTodoList: (newTodoList) => {
//             dispatch(createTodoListTC(newTodoList))
//         }
//     }
// }

const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType,
    AppStateType>(mapStateToProps, {getTodoListsTC, createTodoListTC})(App);

export default ConnectedApp;






