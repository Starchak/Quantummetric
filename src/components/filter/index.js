import React, { Component } from 'react'

import Button from '../btn'
import Select from 'react-select'

import './styles.css'

class Filter extends Component {

  constructor (props) {
    super(props)

    this.state = {
      options: [],
      filterSelect: null,
      optionsSelect: null,
      optionDisabled: true
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
      { value: 'greater than or equals', label: 'greater than or equals' },
    ]

    this.isString = [
      { value: 'Select option: ', label: 'Select option: ' },
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

  DeleteFilter = () => {

  }

  HandleFilterSelectChange = (selectedOption) => {
    this.setState({ filterSelect: selectedOption });
    this.setState({ optionDisabled: false });
    switch (selectedOption.value) {
      case 'User email':
        this.setState({options: this.isString})
        break;
      case 'Screen width':
        this.setState({options: this.isNumbers})
        break;
      case 'Screen height':
        this.setState({options: this.isNumbers})
        break;
      case '# of visits':
        this.setState({options: this.isNumbers})
        break;
      case 'First Name':
        this.setState({options: this.isString})
        break;
      case 'Last Name':
        this.setState({options: this.isString})
        break;
      case 'Page Response time (ms)':
        this.setState({options: this.isNumbers})
        break;
      case 'Domain':
        this.setState({options: this.isString})
        break;
      case 'Page Path':
        this.setState({options: this.isString})
        break;

      default:
    }
    console.log(selectedOption);
  }

  HandleOptionSelectChange = (selectedOption) => {
    this.setState({ optionsSelect: selectedOption });
  }

  render() {
		return (
			<div className="filter">
        <Button className="delete_btn" text="-" onClick={this.DeleteFilter} />
          <Select
            className="filter_select"
            value={this.state.filterSelect}
            onChange={this.HandleFilterSelectChange}
            options={this.category}
          />
          <Select
            className="options_select"
            value={this.state.optionsSelect}
            onChange={this.HandleOptionSelectChange}
            options={this.state.options}
            isDisabled={this.state.optionDisabled}
          />
      </div>
		)
	}
}

export default Filter
