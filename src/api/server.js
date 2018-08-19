import axios from 'axios'

class Server {
  Search (data) {
    axios.post('http://localhost:3001/searchuser', data).then(response => {
      console.log(response);
    })
    .catch(error => {
        console.error(error)
    });
  }
}

export default Server
