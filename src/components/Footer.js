import React, { useState } from "react"
import { useTasks } from "../hooks"
import "../styles/Footer.css"

export default props => {
  const { filter, count, clear } = useTasks()
  const [list, setList] = useState("all")

  function changeList(status) {
    setList(status)
    filter(status)
  }

  return (
    <div className="footer">
      <p>Count: {count} items left</p>
      <div>
        <div>
          <label htmlFor="all">All</label>
          <input
            checked={list === "all" ? true : false}
            onChange={e => changeList("all")}
            name="list"
            id="all"
            type="radio"
          ></input>
          <label htmlFor="active">Active</label>
          <input
            checked={list === "active" ? true : false}
            onChange={e => changeList("active")}
            name="list"
            id="active"
            type="radio"
          ></input>
          <label htmlFor="completed">Completed</label>
          <input
            checked={list === "completed" ? true : false}
            onChange={e => changeList("completed")}
            name="list"
            id="completed"
            type="radio"
          ></input>
        </div>
        <button onClick={e => clear()}>Remove Finished Tasks</button>
      </div>
    </div>
  )
}
