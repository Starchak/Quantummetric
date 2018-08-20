import React, { Component } from 'react'

import './styles.css'

class Users extends Component {

  render() {
		return (
      <div className="users">
        <div className="users_raw">
          <div className="users_column">id</div>
          <div className="users_column">First Name</div>
          <div className="users_column">Last Name</div>
          <div className="users_column">User email</div>
          <div className="users_column">visits</div>
          <div className="users_column">Screen width</div>
          <div className="users_column">Screen height</div>
          <div className="users_column">Responce time</div>
          <div className="users_column">Domain</div>
          <div className="users_column">Path</div>
        </div>
        {this.props.users.map((user, index)=>(
          <div className="users_raw">
            <div className="users_column">{user.id}</div>
            <div className="users_column">{user.user_first_name}</div>
            <div className="users_column">{user.user_last_name}</div>
            <div className="users_column email">{user.user_email}</div>
            <div className="users_column">{user.visits}</div>
            <div className="users_column">{user.screen_width}</div>
            <div className="users_column">{user.screen_height}</div>
            <div className="users_column">{user.page_response}</div>
            <div className="users_column">{user.domain}</div>
            <div className="users_column">{user.path}</div>
          </div>
        ))}
      </div>
		)
	}
}

export default Users
