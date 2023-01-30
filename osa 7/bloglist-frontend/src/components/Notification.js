const Notification = ({notification}) => {

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  if (notification.message === null) {
    return null
  }

  return (
    <div id='notification' style={style}>
      {notification.message}
    </div>
  )
}

export default Notification