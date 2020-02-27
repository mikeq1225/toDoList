// 1. imports
import axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GET_TASKS = "task/GET_TASKS"
const SET_COUNT = "task/SET_COUNT"

// 3. initial state
const initialState = {
  tasks: [],
  count: 0
}

// 4. reducer (default export)
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload }
    case SET_COUNT:
      return { ...state, count: action.payload }
    default:
      return state
  }
}

// 5. action creators
function getTasks() {
  return dispatch => {
    axios.get("/tasks").then(resp => {
      dispatch(getCount())
      dispatch({
        type: GET_TASKS,
        payload: resp.data
      })
    })
  }
}

function addTask(task) {
  return dispatch => {
    axios.post("/tasks", { task, status: "active" }).then(resp => {
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

function changeTask(id) {
  return dispatch => {
    axios.get("/tasks/" + id).then(resp => {
      const task = resp.data
      if (task.status === "completed") {
        axios.patch("/tasks/" + id, { status: "active" }).then(resp => {
          dispatch(getTasks())
        })
      } else {
        axios.patch("/tasks/" + id, { status: "completed" }).then(resp => {
          dispatch(getTasks())
        })
      }
    })
  }
}

function filterTasks(filter) {
  return dispatch => {
    let query = ""

    if (filter === "all") {
      query = ""
    } else if (filter === "active") {
      query = "?status=active"
    } else if (filter === "completed") {
      query = "?status=completed"
    }
    axios.get(`/tasks${query}`).then(resp => {
      dispatch({
        type: GET_TASKS,
        payload: resp.data
      })
      dispatch(getCount())
    })
  }
}

function getCount() {
  return dispatch => {
    axios.get("/tasks?status=active").then(resp => {
      dispatch({
        type: SET_COUNT,
        payload: resp.data.length
      })
    })
  }
}

function clearTasks() {
  return dispatch => {
    axios.get("/tasks?status=completed").then(resp => {
      Promise.all(
        resp.data.map(
          task =>
            new Promise((resolve, reject) => {
              axios.delete("/tasks/" + task.id).then(resp => {
                resolve()
              })
            })
        )
      ).then(values => {
        dispatch(getTasks())
      })
    })
  }
}

// 6. custom hook (named export)
export function useTasks() {
  const dispatch = useDispatch()
  const tasks = useSelector(appState => appState.taskState.tasks)
  const add = task => dispatch(addTask(task))
  const remove = taskId => dispatch(deleteTask(taskId))
  const change = id => dispatch(changeTask(id))
  const filter = filter => dispatch(filterTasks(filter))
  const count = useSelector(appState => appState.taskState.count)
  const clear = () => dispatch(clearTasks())

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])
  return { tasks, add, remove, change, filter, count, clear }
}
