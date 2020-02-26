import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import Form from "./Form"
import Tasks from "./Tasks"

export default props => {
  return (
    <Provider store={store}>
      <div>
        <h1>Hello World</h1>
        <Tasks />
        <Form />
      </div>
    </Provider>
  )
}
