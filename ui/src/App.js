import './App.css';

import {useState} from 'react';
import Login from './views/login/login';
import Dashboard from './views/dash/dash';

function App() {
  const [auth, setAuth] = useState(false);
  
  return (
    <div className="App">
      {(auth)?<Dashboard/>:<Login auth={setAuth}/>}
    </div>
  );
}

export default App;
