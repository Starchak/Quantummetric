import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AddFilter } from '../../actions'
import Server from '../../api/server'

import Header from '../../components/header'
import Filter from '../../components/filter'
import Button from '../../components/btn'
import Footer from '../../components/footer'
import ErrorBox from '../../components/errorBox'

import './styles.css'

const server = new Server()

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      errorText: ''
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

  //Check existing filters (if they correct) and then search through them
  SearchButton = () => {
    let filters = this.props.filters
    for (var i = 0; i < filters.length; i++) {
      if (
        filters[i].field !== null &&
        filters[i].option !== null &&
        ((filters[i].searchText === null && filters[i].from !== '' && filters[i].to !== '') || filters[i].searchText !== '')) {
          if (filters[i].from !== '' && (isNaN(filters[i].from) || isNaN(filters[i].to))) {
            this.setState({
              errorText: 'Please use only positiv numbers in ' + filters[i].field,
              isError: true
            })
            break;
          } else if (filters[i].from !== '' && filters[i].from > filters[i].to) {
            this.setState({
              errorText: 'From must be less than to',
              isError: true
            })
            break;
          } else if (filters[i].searchText < 0 || filters[i].from < 0 || filters[i].to < 0){
            this.setState({
              errorText: 'Please use only positiv numbers in ' + filters[i].field,
              isError: true
            })
            break;
          } else{
            if ((filters[i].field === "Screen width" ||
            filters[i].field === "Screen height" ||
            filters[i].field === "# of visits" ||
            filters[i].field === "Page Response time (ms)") && isNaN(filters[i].searchText)) {
              this.setState({
                errorText: 'Please use only positiv numbers in ' + filters[i].field,
                isError: true
              })
              break;
            } else {
              server.Search(filters)
            }
          }
      } else {
        this.setState({
          isError: true,
          errorText: 'Please fill all fields before search'
        })
        break;
      }
    }
  }

  CloseError = () => {
    this.setState({isError: false})
  }

  render() {
		return (
			<div className="main">
        <Header />
        {this.props.filters.map((filter, index) => (
          <Filter key={filter.id} filterId={index} filter={filter} />
        ))}
        <Button className="add_btn" text="AND" onClick={this.ANDButton} />
        {this.state.isError ?
          <ErrorBox errorText={this.state.errorText} CloseError={this.CloseError} /> : null
        }
        <Footer searchBtn={this.SearchButton} />
      </div>
		)
	}
}

const mapStateToProps = state => {
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
