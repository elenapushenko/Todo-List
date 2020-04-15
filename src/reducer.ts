import {api} from "./api/api";
import {TaskType, TodoListType, ChangeTaskType} from "./types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import { AppStateType } from "./Store";

export const ADD_TODOLIST = "Todolist/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "Todolist/Reducer/DELETE-TODOLIST";
export const DELETE_TODOLISTTASK = "Todolist/Reducer/DELETE-TODOLISTTASK";
export const ADD_TASK = "Todolist/Reducer/ADD-TASK";
export const CHANGE_TASK = "Todolist/Reducer/CHANGE-TASK";
export const SET_TODOLISTS = "Todolist/Reducer/SET-TODOLISTS";
export const SET_TODOLISTTASKS = "Todolist/Reducer/SET-TODOLISTTASKS";
export const CHANGE_TODOLIST_TITLE = "Todolist/Reducer/CHANGE_TODOLIST_TITLE";
export const LOADING = "Todolist/Reducer/LOADING";
export const LOADING_TASKS = "Todolist/Reducer/LOADING_TASKS";


type InitialStateType = {
    todoLists: Array<TodoListType>
    loading: boolean
}

const initialState: InitialStateType = {
    todoLists: [
        // {"id": 0, "title": 1,  tasks: [{"id":0,"title":"a2","isDone":false,"priority":"low"}]},
        // {"id": 1, "title": 2,  tasks: [{"id":1,"title":"wreewr","isDone":false,"priority":"low"},
        //         {"id":3,"title":"wree","isDone":false,"priority":"low"}]}
    ],
    loading: false
};

const reducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType  => {
    switch (action.type) {
        case  CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, title: action.newTitle};
                    } else {
                        return tl
                    }
                })
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todoLists: action.todoLists.map(tl => ({...tl, loading: false, tasks: []}))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
            }
        case ADD_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case  CHANGE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(tl => (tl.id !== action.todoListId)
                )
            }
        case DELETE_TODOLISTTASK:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl, tasks: tl.tasks.filter(task => (task.id !== action.taskId)
                            )
                        }
                    } else {
                        return tl
                    }
                })
            }
        case SET_TODOLISTTASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl
                    }
                })
            }
        case LOADING:
            return {
                ...state,
                loading: action.isActive
            }
        case  LOADING_TASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, loading: action.isActive};
                    } else {
                        return tl
                    }
                })
            }
    }
    return state;
};

export default reducer;

type AddTodoListACType = {
    type: typeof ADD_TODOLIST
    newTodoList: TodoListType
}

type DeleteTodoListACType = {
    type: typeof DELETE_TODOLIST
    todoListId: string
}

type DeleteTodoListTaskACType = {
    type: typeof DELETE_TODOLISTTASK
    taskId: string
    todoListId: string
}

type AddTaskACType = {
    type: typeof ADD_TASK
    newTask: TaskType
    todoListId: string
}

type ChangeTaskACType = {
    type: typeof CHANGE_TASK
    taskId: string
    obj: ChangeTaskType
    todoListId: string
}

type SetTodoListACType = {
    type: typeof SET_TODOLISTS
    todoLists: Array<TodoListType>
}

type SetTasksACType = {
    type: typeof SET_TODOLISTTASKS
    todoListId: string
    tasks: Array<TaskType>
}

type ChangeTodoListTitleACType = {
    type: typeof CHANGE_TODOLIST_TITLE
    todoList: TodoListType
    newTitle: string
    todoListId: string
}

type LoadingACType = {
    type: typeof LOADING
    isActive: boolean
}

type LoadingTasksACType = {
    type: typeof LOADING_TASKS
    isActive: boolean
    todoListId: string
}

type TodoActionTypes = AddTodoListACType | DeleteTodoListACType | DeleteTodoListTaskACType | AddTaskACType | ChangeTaskACType |
    SetTodoListACType | SetTasksACType | ChangeTodoListTitleACType | LoadingACType | LoadingTasksACType


const addTodoListAC = (newTodoList: TodoListType): AddTodoListACType => {
    return {
        type: ADD_TODOLIST,
        newTodoList
    }
};

const deleteTodoListAC = (todoListId: string): DeleteTodoListACType => {
    return {
        type: DELETE_TODOLIST,
        todoListId
    }
};

const deleteTodoListTaskAC = (taskId: string, todoListId: string): DeleteTodoListTaskACType => {
    return {
        type: DELETE_TODOLISTTASK,
        taskId,
        todoListId
    }
};

const addTaskAC = (newTask :TaskType, todoListId: string): AddTaskACType => {
    return {
        type: ADD_TASK,
        newTask,
        todoListId
    }
};

const changeTaskAC = (taskId: string, obj: ChangeTaskType, todoListId: string): ChangeTaskACType => {
    return {
        type: CHANGE_TASK,
        taskId, obj, todoListId
    }
};

const setTodoListAC = (todoLists:  Array<TodoListType>): SetTodoListACType => {
    return {
        type: SET_TODOLISTS,
        todoLists
    }
};

const setTasksAC = (todoListId: string, tasks: Array<TaskType>): SetTasksACType => {
    return {
        type: SET_TODOLISTTASKS,
        todoListId,
        tasks
    }
};

const changeTodoListTitleAC = (todoList: TodoListType, newTitle: string, todoListId: string): ChangeTodoListTitleACType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todoList, newTitle, todoListId
    }
};

const loadingAC = (isActive: boolean): LoadingACType => {
    return {
        type: LOADING,
        isActive
    }
};

const loadingTasksAC = (isActive: boolean, todoListId: string): LoadingTasksACType => {
    return {
        type: LOADING_TASKS,
        isActive,
        todoListId
    }
};

type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionTypes>

type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodoActionTypes>

export const getTodoListsTC = (): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(loadingAC(true))
    api.getTodoLists()
        .then(res => {
            dispatch(setTodoListAC(res.data));
            dispatch(loadingAC(false))
        })
};

export const createTodoListTC = (title: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.createTodoList(title)
         .then(res => {
            dispatch(addTodoListAC(res.data.data.item));
         })
};

export const getTasksTC = (todoListId: string, tasks: Array<TaskType>): ThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(loadingTasksAC(true, todoListId))
    api.getTasks(todoListId)
           .then(res => {
               tasks = res.data.items
               dispatch(setTasksAC(todoListId, tasks))
               dispatch(loadingTasksAC(false, todoListId))
           }
       )
};

export const updateTaskTC = (task: TaskType, taskId: string, obj: ChangeTaskType, todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {

    api.updateTask(task, obj, todoListId)
        .then(res => {
                dispatch(changeTaskAC(taskId, obj, todoListId))
            }
        )
};

export const createTaskTC = (newTitle: string, todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.createTask(newTitle, todoListId)
          .then(res => {
              dispatch(addTaskAC(res.data.data.item, todoListId))
              }
          )
};

export const deleteTodoListTC = (todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.deleteTodoList(todoListId)
           .then(res => {
               dispatch(deleteTodoListAC(todoListId))
           })
};

export const deleteTaskTC = (taskId: string, todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.deleteTask(taskId, todoListId)
              .then(res => {
                  dispatch(deleteTodoListTaskAC(taskId, todoListId))
              })
};

export const updateTodoListTitleTC = (todoList: TodoListType, newTitle: string, todoListId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.updateTodoListTitle(todoList, newTitle, todoListId)
        .then(res => {
            dispatch(changeTodoListTitleAC(todoList, newTitle, todoListId))
            }
        )
}

