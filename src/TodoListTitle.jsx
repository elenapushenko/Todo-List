import React from 'react';



class TodoListTitle extends React.Component  {

    render() {
        return (
            <div>
            <h3 className="todoList-header__title">{this.props.title}</h3>
                <h2> id: {this.props.id}</h2>
            </div>
        )
    }
}

export default TodoListTitle;