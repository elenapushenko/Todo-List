import axios from "axios";
import {ChangeTaskType, TaskType, TodoListType} from "../types/entities";


type AddUpdateTaskResponseType = {
    data: {
        item: TaskType
    }
    resultCode: number
    messages: Array<string>
}

type AddTodoListResponseType = {
    data: {
        item: TodoListType
    }
    resultCode: number
    messages: Array<string>
}

type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

type DeleteItemResponseType = {
    resultCode: number
    messages: Array<string>
    data: any
}




const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "6b339d61-e01c-44bb-a36c-b8d56e95c5c9"}
});


export const api = {
    createTask(newTaskTitle: string, todoListId: string) {
        return instance.post<AddUpdateTaskResponseType>(
            `/${todoListId}/tasks`,
            {title: newTaskTitle}
        )
    },
    createTodoList(title: string) {
        return instance.post<AddTodoListResponseType>(
            "",
            {title: title}
        )
    },
    getTodoLists() {
       return instance.get<Array<TodoListType>>("")
    },
    updateTask(task: TaskType, obj: ChangeTaskType, todoListId: string) {
        return instance.put<AddUpdateTaskResponseType>(
            `/${todoListId}/tasks/${task.id}`,
            {
                ...task,
                ...obj
            },
        )
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<DeleteItemResponseType>(
            `/${todoListId}`,
        )
    },
    deleteTask(taskId: string, todoListId: string) {
        return instance.delete<DeleteItemResponseType>(
            `/${todoListId}/tasks/${taskId}`
        )
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`/${todoListId}/tasks`
        )
    },
    updateTodoListTitle(todoList: TodoListType, newTitle: string, todoListId: string) {
        return instance.put(
            `/${todoListId}`,
            {...todoList,
                title: newTitle}
        )
    }
};

