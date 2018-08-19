import React, { Component } from 'react'

import Button from '../../components/btn'

import './styles.css'

class ErrorBox extends Component {

  CloseBtn = () => {
    this.props.CloseError()
  }

  render() {
		return (
      <div className="error_box">
        <div className="opacity" onClick={this.CloseBtn} />
        <div className="error_message">
          <p className="error_text">{this.props.errorText}</p>
          <Button className="close_btn" text="Close" onClick={this.CloseBtn} />
        </div>
      </div>
		)
	}
}

export default ErrorBox
