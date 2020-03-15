import React from 'react';
import './App.css';
import TodoList from "./Todolist";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, addTodoListAC} from "./reducer";

class App extends React.Component {

state = {
    todoLists: []
};

componentDidMount() {
    this.restoreState()
}

    nextTodoListId = 0;

    addTodoList = (title) => {
        let newTodoList = {
            title: title,
            tasks: [],
            id: this.nextTodoListId
        };
        this.props.addTodoList(newTodoList)
        this.nextTodoListId++;
    };

    saveState = () => {
        let sateAsString = JSON.stringify(this.state)
        localStorage.setItem('todoLists',sateAsString)
    };

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('todoLists');
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todoLists.forEach((tl) => {
                if (tl.id >= this.nextTodoListId) {
                    this.nextTodoListId = tl.id + 1
                }
            })
        })
    };


    render = () => {

    let todoLists = this.props.todoLists.map((tl) => {
        return <TodoList id={tl.id} title={tl.title} tasks={tl.tasks}/>
    })
        return (
            <>
                <AddNewItemForm addItem={this.addTodoList}/>
                <div className="App">
                    {todoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList) => {
            dispatch(addTodoListAC(newTodoList))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;






