const initialState = [];

const Filters = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      let filterPreset = {
        field: null,
        option: null,
        searchText: null
      }
      return [...state, filterPreset]
    default:
      return state
  }
}

export default Filters
