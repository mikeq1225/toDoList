import React from "react"
import { useTasks } from "../hooks"

export default props => {
  const { tasks, remove } = useTasks()

  return (
    <div>
      <h1>Things to Do</h1>
      {tasks.map(task => (
        <p>
          {task.id}: {task.task}
          <button onClick={e => remove(task.id)}>Delete</button>
        </p>
      ))}
    </div>
  )
}
