import React from "react"
import { useTasks } from "../hooks"
import "../styles/Tasks.css"

export default props => {
  const { tasks, remove, change } = useTasks()

  return (
    <div className="tasks">
      {tasks.map(task => (
        <div key={"task" + task.id}>
          <input type="checkbox" onClick={e => change(task.id)}></input>
          <p className={task.status === "completed" ? "completed" : ""}>
            {task.task}
          </p>
          <button onClick={e => remove(task.id)}>X</button>
        </div>
      ))}
    </div>
  )
}
