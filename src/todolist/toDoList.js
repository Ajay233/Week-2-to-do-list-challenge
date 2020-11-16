import React from 'react'
import ToDoListItem from './toDoListItem'
import Notification from '../notification/notification'
import '../stylesheets/toDoListStyling.css'

class ToDoList extends React.Component {

  constructor(props){
    super(props)
    this.state = ({
      todo: '',
      todos: [],
      message: '',
      messageType: '',
      showMessage: false
    })

    this.inputRef = React.createRef()
  }

  handleChange = (event) => {
    this.setState({ todo: event.target.value })
  }

  addToDo = (event) => {
    event.preventDefault()
    const { todo, todos } = this.state
    if(todos.length === 10){
      this.setState({ message: "Max limit of 10 reached", messageType: 'warning', showMessage: true })
      this.inputRef.current.value = ''
    } else if(todo !== ''){
      this.setState({ todos: [...this.state.todos, todo] })
      this.setState({ todo: '' })
      this.setState({ message: "To do added", messageType: 'success', showMessage: true })
      this.inputRef.current.value = ''
    } else {
      this.setState({ message: "You need to add some text for your todo", messageType: 'error', showMessage: true })
      this.inputRef.current.value = ''
    }
  }

  deleteTodo = (index) => {
    let currentList = this.state.todos.slice()
    currentList.splice(index, 1)
    this.setState({ todos: currentList })
    this.setState({ message: 'To do deleted', messageType: 'success', showMessage: true })
  }

  reset = (event) => {
    event.preventDefault()
    this.setState({ todos: [] })
    this.setState({ message: 'To do list cleared', messageType: 'success', showMessage: true })
  }

  renderNotification = () => {
    const { message, messageType, showMessage } = this.state;
    if(showMessage){ this.closeNotification() }  // stops an infinite loop
    return showMessage ? <Notification message={message} type={messageType}/> : null
  }

  closeNotification = () => {
    window.setTimeout(() => {
      this.setState({ showMessage: false })
    }, 2000)
  }

  // could be a separate component if React hooks was used
  renderList = () => {
    const { todos } = this.state
    let toDoList = todos.map((todo, i) => {
      return (
        <div key={i}>
          <ToDoListItem todo={todo} delete={() => this.deleteTodo(todos.indexOf(todo))}/>
          {todos.indexOf(todo) + 1 === todos.length ? null : <hr/>}
        </div>
      );
    })
    return toDoList
  }

  render(){
    const { todos } = this.state
    return(
      <div id="toDoMain">
        {this.renderNotification()}
        <div id="toDoList">
          <h1>To Do List</h1>
          <h3>Enter a to do item below</h3>
          <form>
            <input ref={this.inputRef} onChange={this.handleChange}></input>
            <button className="iconBtn add" onClick={this.addToDo}><i className="fas fa-plus"></i> <b>Add</b></button>
          </form>
          <div className={`${todos.length > 0 ? 'list' : ''}`}>
            {this.renderList()}
          </div>
          <button className="button standard" onClick={this.reset}>Clear List</button>
        </div>
      </div>
    );
  }
}

export default ToDoList
