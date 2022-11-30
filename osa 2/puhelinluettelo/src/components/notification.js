import React from 'react'

const success = {
  color: 'green',
  font_size: 20,
  padding: 10,
  margin_bottom: 10
}
const error = {
  color: 'red',
  font_size: 20,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({message}) => {
   if (message === null) {return null}
   
    if (message.includes('error')){
      return (<div style={error}>{message}</div>)
    } else {
      return (<div style={success}>{message}</div>)
    }
}

export default Notification