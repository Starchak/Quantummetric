import React, { Component } from 'react'

import Button from '../btn'

import './styles.css'

class Header extends Component {

  //OnClick on Tooday btn
  ToodayBtn = () => {
  }

  render() {
		return (
			<div className="header">
        <h1 className="title">SEARCH FRO SESSIONS</h1>
        <Button className="header-btn" text="Tooday" onClick={this.ToodayBtn} />
      </div>
		)
	}
}

export default Header
