const initialState = []
let filterId = 0

const Filters = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      let filterPreset = {
        field: null,
        option: null,
        searchText: '',
        from: '',
        to: '',
        id: 0
      }
      filterPreset.id = filterId
      filterId++
      return [...state, filterPreset]
    case 'DELETE_FILTER':
      let newState = []
      for (var i = 0; i < state.length; i++) {
        if (i !== action.id) {
          newState.push(state[i])
        }
      }
      state = newState
      return [...state]
    case 'CHANGE_FILTER':
      state[action.data.id] = action.data.filter
      return [...state]
    default:
      return state
  }
}

export default Filters
