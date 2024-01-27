import { taskData } from "../task/taskData";

export const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case "addEdit": {
            if (action.isAdd) {
                return ([...tasks, action.newTask])
            }
            return (tasks.map((task) => {
                if (task.id === action.newTask.id) {
                    return action.newTask;
                }
                return task;
            }))

        }

        case "delete": {
            return (tasks.filter((task) => task.id !== action.taskId))
        }

        case "deleteAll": {
            return (tasks.length = 0)
        }
        case "favourite": {
            return (tasks.map((task) => {
                if (task.id === action.taskId) {
                    return { ...task, isFavorite: !task.isFavorite };
                } else {
                    return task;
                }
            }))
        }
        case "search": {
            if (action.searchTerm.length > 0) {
                return (tasks.filter((task) =>
                    task.title.toLowerCase().includes(action.searchTerm.toLowerCase())
                ))
            }
            if (action.searchTerm.length < 1) {
                return tasks = taskData;
            }
        }


        default:
            break;
    }
}