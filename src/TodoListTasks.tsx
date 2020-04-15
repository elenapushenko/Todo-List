import React from 'react';
import TodoListTask from "./TodoListTask";
import {TaskType} from "./types/entities";

type OwnPropsType = {
    idTodoList: string
    changeTitle: (task: TaskType, newTitle: string) => void
    changeStatus: (task: TaskType, status: number) => void
    tasks: Array<TaskType>
}

class TodoListTasks extends React.Component<OwnPropsType> {
    render = () => {
        let tasksEls = this.props.tasks.map(t => <TodoListTask task={t}  idTask={t.id} key={t.id}
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

