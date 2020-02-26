/*
1. imports
2. action definitions
3. initial state
4. reducer (default export)
5. action creators
6. custom hook (named export)
*/

// 1. imports
import axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GET_TASKS = "task/GET_TASKS"

// 3. initial state
const initialState = {
  tasks: []
}

// 4. reducer (default export)
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload }
    default:
      return state
  }
}

// 5. action creators
function getTasks() {
  return dispatch => {
    axios.get("/tasks").then(resp => {
      dispatch({
        type: GET_TASKS,
        payload: resp.data
      })
    })
  }
}

function addTask(task) {
  return dispatch => {
    axios.post("/tasks", { task }).then(resp => {
      dispatch(getTasks())
    })
  }
}

function deleteTask(id) {
  return dispatch => {
    axios.delete("/tasks/" + id).then(resp => {
      dispatch(getTasks())
    })
  }
}

// 6. custom hook (named export)
export function useTasks() {
  const dispatch = useDispatch()
  const tasks = useSelector(appState => appState.taskState.tasks)
  const add = task => dispatch(addTask(task))
  const remove = taskId => dispatch(deleteTask(taskId))

  useEffect(() => {
    dispatch(getTasks())
  }, [])
  return { tasks, add, remove }
}
