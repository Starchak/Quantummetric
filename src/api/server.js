import axios from 'axios'

class Server {
  Search (data, callback) {
    // let parsedData = 'field=' + data.field + '&option=' + data.option + '&searchText=' + data.searchText + '&from=' + data.from + '&to=' + data.to
    let parsedData = 'data=' + JSON.stringify(data)
    axios.post('http://localhost:3000/sortusers', parsedData).then(response => {
      callback(response.data)
    })
    .catch(error => {
        console.error(error)
    });
  }
}

export default Server
