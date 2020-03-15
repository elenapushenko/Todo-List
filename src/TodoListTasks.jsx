import React from 'react';
import TodoListTask from "./TodoListTask";



class TodoListTasks extends React.Component {
    render = () => {
        let tasksEls = this.props.tasks.map(t => <TodoListTask task={t}  idTask={t.id}
                                                               idTodolist={this.props.idTodoList}
                                                               changeStatus={this.props.changeStatus}
                                                               changeTitle={this.props.changeTitle}/>);
        return (
            <div className="todoList-tasks">
                {tasksEls}
            </div>
        );
    }
}


export default TodoListTasks;

