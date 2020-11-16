import React from 'react'
import '../stylesheets/notifications.css'

const Notification = (props) => {
  
  return(
    <div id="notification" className={props.type}>
      {props.message}
    </div>
  );
}

export default Notification
