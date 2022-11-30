export const showNotif = (notificationText, time) => {
  window.clearTimeout(window.timeout)

  return async (dispatch) => {
    dispatch({
      type: 'SHOW',
      data: notificationText
    })

    window.timeout = setTimeout(
      () => dispatch(hideNotif()), time * 1000
    )

  }
}

const hideNotif = () => ({type: 'HIDE'})

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data

    case 'HIDE':
      return null
      
    default:
      return state
  }
}

export default reducer