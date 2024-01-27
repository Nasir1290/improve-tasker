import { useReducer, useState } from "react";

import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import NoTasksFound from "./NoTasksFound";
import { taskData } from "./taskData";
import { tasksReducer } from "../reducers/TasksReducer";
import { tasksContext, tasksDispatchContext } from "../contexts/TaskContext";
let defaultTask = [...taskData];

export default function TaskBoard() {
  const [tasks, dispatch] = useReducer(tasksReducer, defaultTask);

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  //   pass the task data 👉want to updata 👈👇
  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  return (
    <tasksContext.Provider value={tasks}>
      <tasksDispatchContext.Provider value={dispatch}>
        <section className="mb-20" id="tasks">
          {showAddModal && (
            <AddTaskModal
              onCloseClick={handleCloseClick}
              taskToUpdate={taskToUpdate}
            />
          )}
          <div className="container">
            <div className="p-2 flex justify-end">
              <SearchTask />
            </div>

            <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
              <TaskActions onAddClick={() => setShowAddModal(true)} />
              {tasks.length > 0 ? (
                <TaskList tasks={tasks} onEdit={handleEditTask} />
              ) : (
                <NoTasksFound />
              )}
            </div>
          </div>
        </section>
      </tasksDispatchContext.Provider>
    </tasksContext.Provider>
  );
}
