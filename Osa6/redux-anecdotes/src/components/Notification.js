import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
  const style = {
    color: 'green',
    font_size: 20,
    padding: 10,
    margin_bottom: 10
  }
  return props.notification && 
  <div 
    style={style}>{props.notification}
  </div>
}

const mapStateToProps = (state) => {
  return {notification: state.notification}
}

const ConnectedNotification = connect(mapStateToProps) (Notification)
export default ConnectedNotification