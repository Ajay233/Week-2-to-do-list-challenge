import React from 'react'
import '../stylesheets/toDoListItemStyling.css'

const ToDoListItem = (props) => {

  let textRef = React.createRef()

  const markAsDone = () => {
    textRef.current.classList.toggle('done')
  }

  return(
    <div className="todo">
      <span ref={textRef} className="todoText">{props.todo}</span>
      <input type="checkbox" onClick={markAsDone} className="checkbox"/>
      <button onClick={props.delete} className="iconBtn delete"><i className="fas fa-trash-alt"></i></button>
    </div>
  );
}

export default ToDoListItem
