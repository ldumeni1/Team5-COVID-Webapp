import Button from '@mui/material/Button';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  //return <Button variant="contained">Hello World</Button>;

 
  const [uid, setUId] = useState('');
  const [uname, setUName] = useState('');

  // this function sends the data to backend
  const submitForm = () => {
    Axios.post('http://localhost:3001/insert', {
      uid: uid, uname: uname,
    }).then(() => {
      alert("Successful insert");
    });
  };

  return (

    // this is a simple form
    <div>
      <div>
        <h1>This is a test!!!</h1>
      </div>
      <form>
        <div>
          <label>Id: </label>
          <input type="text" onChange={(e) => {
            setUId(e.target.value)
          }} />
        </div>
        <br />
        <div>
          <label>Name: </label>
          <input type="text" onChange={(e) => {
            setUName(e.target.value)
          }} />
        </div>
        <br />

        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );


}

export default App;
