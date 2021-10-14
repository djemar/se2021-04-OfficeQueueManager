import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QueueSet from './QueueSet.js';
import { useState } from 'react';

function App() {
  let [counter, setCounter] = useState(2);

  return (
    <div className="App">
      <strong>Queues branch</strong>
      <h1>Counter: {counter}</h1>
      <QueueSet counter={counter} user={0} />
    </div>
  );
}

export default App;
