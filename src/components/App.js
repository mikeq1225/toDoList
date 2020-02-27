import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import Form from "./Form"
import Tasks from "./Tasks"
import Footer from "./Footer"
import "../styles/App.css"

export default props => {
  return (
    <Provider store={store}>
      <div className="home">
        <Form />
        <Tasks />
        <Footer />
      </div>
    </Provider>
  )
}
