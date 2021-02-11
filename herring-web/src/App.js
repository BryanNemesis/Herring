import React, {useEffect, useState} from 'react';
import './App.css';


function loadFillets(callback) {
  let xhr = new XMLHttpRequest(),
  method = 'GET',
  url = 'http://localhost:8000/api/fillets/',
  responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = () => {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = (e) => {
    callback({'message': 'Request failed'}, 400)
  }
  xhr.send()
}

function Fillet({fillet}) {
  return <div className='col-10 mx-auto col-md-6 my-5 py-2 border bg-dark text-light'>
    <p>
      {fillet.id} - {fillet.text}
    </p>
  </div>
}

function App() {

  const [fillets, setFillets] = useState([])

  useEffect(() => {
    const myCallback = (response, status) => {
      console.log(response, status)
      if (status === 200)
      {
      setFillets(response)
      } else {
        alert('Error :D')
      }
    };
    loadFillets(myCallback)
  }, [])

  return (
    <div> 
      <h1>herring</h1>
        {fillets.map((x, i) => {
          return <Fillet fillet={x} key={i} />
        })}
    </div>
  );
}

export default App;
