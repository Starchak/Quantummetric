import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DeleteFilter, ChangeFilter } from '../../actions'

import Button from '../btn'
import Input from '../input'
import Select from 'react-select'

import './styles.css'

class Filter extends Component {

  constructor (props) {
    super(props)

    this.state = {
      options: [],
      filterSelect: null,
      optionsSelect: null,
      optionDisabled: true,
      filterValues: {
        field: null,
        option: null,
        searchText: '',
        from: '',
        to: '',
        id: 0
      },
      isNumbers: false,
      isRange: false,
      inputPlaceholder: '',
      inputDisable: 'disabled'
    }

    //Predicate fields
    this.category = [
      { value: 'User email', label: 'User email' },
      { value: 'Screen width', label: 'Screen width' },
      { value: 'Screen height', label: 'Screen height' },
      { value: '# of visits', label: '# of visits' },
      { value: 'First Name', label: 'First Name' },
      { value: 'Last Name', label: 'Last Name' },
      { value: 'Page Response time (ms)', label: 'Page Response time (ms)' },
      { value: 'Domain', label: 'Domain' },
      { value: 'Page Path', label: 'Page Path' }
    ]

    this.isNumbers = [
      { value: 'Range', label: 'Range' },
      { value: 'Less than or equal', label: 'Less than or equal' },
      { value: 'Equals', label: 'Equals' },
      { value: 'Does not equals', label: 'Does not equals' },
      { value: 'Greater than or equals', label: 'Greater than or equals' },
    ]

    this.isString = [
      { value: 'Starts with', label: 'Starts with' },
      { value: 'Does not starts with', label: 'Does not starts with' },
      { value: 'Equals', label: 'Equals' },
      { value: 'Does not equals', label: 'Does not equals' },
      { value: 'Contains', label: 'Contains' },
      { value: 'Does not contains', label: 'Does not contains' },
      { value: 'In list', label: 'In list' },
      { value: 'Not in list', label: 'Not in list' }
    ]
  }

  componentDidMount () {
    this.setState({filterValues: this.props.filter})
  }

  DeleteFilter = () => {
    this.props.DeleteFilterDispatch(this.props.filterId)
  }

  HandleFilterSelectChange = (selectedOption) => {
    this.setState({ filterSelect: selectedOption });
    this.setState({ optionDisabled: false });
    let saveFilterValues = this.state.filterValues
    saveFilterValues.field = selectedOption.value
    saveFilterValues.options = null
    saveFilterValues.searchText = ''
    for (var i = 0; i < this.filter.getElementsByClassName('input').length; i++) {
      this.filter.getElementsByClassName('input')[i].value = ''
    }
    this.setState({ filterValues: saveFilterValues })
    this.props.ChangeFilterDispatch({
      filter: this.state.filterValues,
      id: this.props.filterId
    })
    switch (selectedOption.value) {
      case 'User email':
        this.setState({
          options: this.isString,
          isNumbers: false,
          inputPlaceholder: 'Enter email...'
        })
        break;
      case 'Screen width':
        this.setState({
          options: this.isNumbers,
          isNumbers: true,
          inputPlaceholder: 'Enter screen width...'
        })
        break;
      case 'Screen height':
        this.setState({
          options: this.isNumbers,
          isNumbers: true,
          inputPlaceholder: 'Enter screen hight...'
        })
        break;
      case '# of visits':
        this.setState({
          options: this.isNumbers,
          isNumbers: true,
          inputPlaceholder: 'Enter # of visits...'
        })
        break;
      case 'First Name':
        this.setState({
          options: this.isString,
          isNumbers: false,
          inputPlaceholder: 'Enter first name...'
        })
        break;
      case 'Last Name':
        this.setState({
          options: this.isString,
          isNumbers: false,
          inputPlaceholder: 'Enter last name...'
        })
        break;
      case 'Page Response time (ms)':
        this.setState({
          options: this.isNumbers,
          isNumbers: true,
          inputPlaceholder: 'Enter response time (ms)...'
        })
        break;
      case 'Domain':
        this.setState({
          options: this.isString,
          isNumbers: false,
          inputPlaceholder: 'Enter domain...'
        })
        break;
      case 'Page Path':
        this.setState({
          options: this.isString,
          isNumbers: false,
          inputPlaceholder: 'Enter page path...'
        })
        break;

      default:
    }
    this.setState({
      inputDisable: 'disabled',
      optionsSelect: null,
    })
  }

  HandleOptionSelectChange = (selectedOption) => {
    this.setState({
      optionsSelect: selectedOption,
      inputDisable: ''
    });
    for (var i = 0; i < this.filter.getElementsByClassName('input').length; i++) {
      this.filter.getElementsByClassName('input')[i].value = ''
    }
    let saveFilterValues = this.state.filterValues
    saveFilterValues.option = selectedOption.value
    saveFilterValues.searchText = ''
    this.setState({ filterValues: saveFilterValues })
    this.props.ChangeFilterDispatch({
      filter: this.state.filterValues,
      id: this.props.filterId
    })
    switch (selectedOption.value) {
      case 'Range':
        this.setState({isRange: true})
        break;
      default:
        this.setState({isRange: false})
    }
  }

  SingleInputChange = (evt) => {
    let saveFilterValues = this.state.filterValues
    saveFilterValues.searchText = evt.target.value
    this.setState({filterValues: saveFilterValues})
  }

  InputLoosFocus = () => {
    this.props.ChangeFilterDispatch({
      filter: this.state.filterValues,
      id: this.props.filterId
    })
  }

  FirstRangeChange = (evt) => {
    let saveFilterValues = this.state.filterValues
    saveFilterValues.from = evt.target.value
    this.setState({filterValues: saveFilterValues})
  }

  SecondRangeChange = (evt) => {
    let saveFilterValues = this.state.filterValues
    saveFilterValues.to = evt.target.value
    this.setState({filterValues: saveFilterValues})
  }

  render() {
		return (
			<div className="filter" ref={el => (this.filter = el)}>
        <Button className="delete_btn" text="-" onClick={this.DeleteFilter} />
          <Select
            className="filter_select"
            value={this.state.filterSelect}
            onChange={this.HandleFilterSelectChange}
            options={this.category}
          />
        { this.state.isNumbers ?
          <Button className="is_box" text="is" />
          :
          null
          }
          <Select
            className="options_select"
            value={this.state.optionsSelect}
            onChange={this.HandleOptionSelectChange}
            options={this.state.options}
            isDisabled={this.state.optionDisabled}
          />
        { this.state.isRange ?
          <div className="range">
            <Input
              type="text"
              className="range_input"
              disabled={this.state.inputDisable}
              onChange={this.FirstRangeChange}
              onBlur={this.InputLoosFocus}
              placeholder="from" />
            <Button className="is_box" text="and" />
            <Input
              type="text"
              className="range_input"
              disabled={this.state.inputDisable}
              onChange={this.SecondRangeChange}
              onBlur={this.InputLoosFocus}
              placeholder="to" />
          </div>
          :
          <Input
            type="text"
            className="string_input"
            disabled={this.state.inputDisable}
            onChange={this.SingleInputChange}
            onBlur={this.InputLoosFocus}
            placeholder={this.state.inputPlaceholder} />
        }
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
		DeleteFilterDispatch: (id) => {
			dispatch(DeleteFilter(id))
		},
    ChangeFilterDispatch: (data) => {
      dispatch(ChangeFilter(data))
    }
	}
}

const ConnectedFilter = connect(
  mapStateToProps,
	mapDispatchToProps
)(Filter)

export default ConnectedFilter
