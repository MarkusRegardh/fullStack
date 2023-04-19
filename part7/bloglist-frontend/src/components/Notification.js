import { React, useContext } from "react"
import NotificationContext from "../NotificationContext"
import { Alert } from "react-bootstrap"

const Notification = () => {
  // eslint-disable-next-line no-unused-vars
  const [notification, dispatch] = useContext(NotificationContext)
  const variant = notification.color === "green" ? "success" : "danger"

  if (notification === "") {
    return <div></div>
  }
  return <Alert variant={variant}>{notification.message}</Alert>
}

export default Notification
