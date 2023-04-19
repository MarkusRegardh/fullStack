import { useState, useImperativeHandle, forwardRef } from "react"
import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id="showForm" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button id="hideForm" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object,
}
Togglable.displayName = "Togglable"

export default Togglable
