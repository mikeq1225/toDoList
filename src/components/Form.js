import React, { useState } from "react"
import { useTasks } from "../hooks"
import "../styles/Form.css"

export default props => {
  const [task, setTask] = useState("")
  const { add } = useTasks()

  function handleSubmits(e) {
    e.preventDefault()

    add(task)
    setTask("")
  }

  return (
    <form onSubmit={handleSubmits}>
      <h1>Things to Do</h1>
      {/* <label>Task</label> */}
      <input
        type="text"
        placeholder="Add a task to the list"
        onChange={e => setTask(e.target.value)}
        value={task}
      />
      {/* <button type="submit">Add Task</button> */}
    </form>
  )
}
