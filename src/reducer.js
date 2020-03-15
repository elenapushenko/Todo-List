
export const ADD_TODOLIST = "Todolist/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "Todolist/Reducer/DELETE-TODOLIST";
export const DELETE_TODOLISTTASK = "Todolist/Reducer/DELETE-TODOLISTTASK";
export const ADD_TASK = "Todolist/Reducer/ADD-TASK";
export const CHANGE_TASK = "Todolist/Reducer/CHANGE-TASK";


const initialState = {
    todoLists: [
        // {"id": 0, "title": 1,  tasks: [{"id":0,"title":"a2","isDone":false,"priority":"low"}]},
        // {"id": 1, "title": 2,  tasks: [{"id":1,"title":"wreewr","isDone":false,"priority":"low"},
        //         {"id":3,"title":"wree","isDone":false,"priority":"low"}]}
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                            ...tl, tasks: tl.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task;
                                } else {
                                    return {...task, ...action.obj}
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
            debugger
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
    }
    return state;
};
export const addTodoListAC = (newTodoList) => {
    return {
        type: ADD_TODOLIST,
        newTodoList
    }
};

export const deleteTodoListAC = (todoListId) => {
    return {
        type: DELETE_TODOLIST,
        todoListId
    }
};

export const deleteTodoListTaskAC = (taskId, todoListId) => {
    return {
        type: DELETE_TODOLISTTASK,
        taskId,
        todoListId
    }
};

export const addTaskAC = (newTask, todoListId) => {
    return {
        type: ADD_TASK,
        newTask,
        todoListId
    }
};

export const changeTaskAC = (taskId, obj, todoListId) => {
    return {
        type: CHANGE_TASK,
        taskId,
        obj,
        todoListId
    }
}





export default reducer;