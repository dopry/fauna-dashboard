const REMOVE_OLD_NOTIFICATIONS_DELAY = 2000;
const asArray = (values) => Array.isArray(values) ? values : [values]

const Actions = {
  PUSH: 'PUSH',
  REMOVE: 'REMOVE',
  RESET: 'RESET'
}

export const NotificationType = {
  ERROR: "ERROR"
}

var notificationId = 0

export class Notification {
  constructor(type, message) {
    this.id = ++notificationId
    this.type = type
    this.message = message
  }
}

export function pushNotification(newNotifications) {
  return (dispatch, getState) => {
    const { notifications } = getState()

    setTimeout(
      () => dispatch(removeNotification(notifications)),
      REMOVE_OLD_NOTIFICATIONS_DELAY
    )

    dispatch({
      type: Actions.PUSH,
      notifications: asArray(newNotifications)
    })
  }
}

export function removeNotification(notifications) {
  return {
    type: Actions.REMOVE,
    notifications: asArray(notifications)
  }
}

export function resetNotifications() {
  return {
    type: Actions.RESET
  }
}

export function reduceNotifications(state = [], action) {
  switch (action.type) {
    case Actions.PUSH:
      return state.concat(action.notifications)

    case Actions.REMOVE:
      const toRemove = action.notifications.map(elem => elem.id)
      return state.filter(elem => !toRemove.includes(elem.id))

    case Actions.RESET:
      return []

    default:
      return state
  }
}
