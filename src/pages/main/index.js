import React, { Component } from 'react'
import {connect} from 'react-redux'

import {AddFilter} from '../../actions'

import Header from '../../components/header'
import Filter from '../../components/filter'
import Button from '../../components/btn'

import './styles.css'

class Main extends Component {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    //Add one filter field at the beginning
    this.props.AddFilterDispatch()
  }


  //Add one more filter field
  ANDButton = () => {
    this.props.AddFilterDispatch()
  }

  render() {
    console.log(this.props);
		return (
			<div className="main">
        <Header />
        {this.props.filters.map((filter, index) => (
          <Filter key={index} filterId={index} />
        ))}
        <Button className="add_btn" text="AND" onClick={this.ANDButton} />
      </div>
		)
	}
}

const mapStateToProps = state => {
  console.log(state);
	return {
    filters: state.Filters
	}
}

const mapDispatchToProps = dispatch => {
	return {
		AddFilterDispatch: () => {
			dispatch(AddFilter())
		}
	}
}

const ConnectedMain = connect(
  mapStateToProps,
	mapDispatchToProps
)(Main)

export default ConnectedMain
