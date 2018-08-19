import axios from 'axios'

class Server {
  Search (data) {
    // let parsedData = 'field=' + data.field + '&option=' + data.option + '&searchText=' + data.searchText + '&from=' + data.from + '&to=' + data.to
    let parsedData = 'data=' + JSON.stringify(data)
    axios.post('http://localhost:3000/sortusers', parsedData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      } }).then(response => {
      console.log(response.data);
    })
    .catch(error => {
        console.error(error)
    });
  }
}

export default Server
