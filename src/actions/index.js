export const AddFilter = () => {
  return {
    type: 'ADD_FILTER'
  }
}

export const DeleteFilter = id => {
  return {
    type: 'DELETE_FILTER',
    id
  }
}

export const ChangeFilter = data => {
  return {
    type: 'CHANGE_FILTER',
    data
  }
}
