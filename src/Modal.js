import React, { Component } from 'react'

export default class Modal extends Component {
  render() {
    const modalClass = this.props.show ? "modal" : "modal display-none"
    return (
      <div className={modalClass}>
        <div className="modal__text">
          <h2>Whoops, this category/difficulty doesn't have enough questions.</h2>
          <h2>Please choose another!</h2>
        </div>
        <div className="modal__imgBox">
          <img alt="whoops" src="https://images.unsplash.com/photo-1533374206871-33b8f07c216c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80" />
        </div>
        <button onClick={this.props.toggle}>Close</button>
      </div>
    )
  }
}
