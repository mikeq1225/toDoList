import React, { useState } from "react"
import { useTasks } from "../hooks"

export default props => {
  const [task, setTask] = useState("")
  const { add } = useTasks()

  function handleSubmits(e) {
    e.preventDefault()

    add(task)
  }

  return (
    <form onSubmit={handleSubmits}>
      <label>Task</label>
      <input
        type="text"
        placeholder="Add to ToDo List"
        onChange={e => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}
