import React, { Component } from 'react'

import Button from '../../components/btn'

import './styles.css'

class Footer extends Component {

  SearchBtn = () => {
    this.props.searchBtn()
  }

  render() {
		return (
      <div className="footer">
        <p className="returned_results">Returned 4999 results</p>
        <div className="footer_right">
          <Button className="disabled_btn" text="Export" />
          <Button className="save_btn" text="Save Presets" />
          <Button className="search_btn" text="Search" onClick={this.SearchBtn} />
        </div>
      </div>
		)
	}
}

export default Footer
