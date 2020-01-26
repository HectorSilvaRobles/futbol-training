import React from 'react';
import './App.css';

import HomePage from './Components/Homepage/HomePage'
import RegisterPage from './Components/RegisterPage/RegisterPage'
import Upload from './Components/uploader'

function App() {
  return (
    <div className="App">
      {/* <RegisterPage /> */}
      <Upload />
    </div>
  );
}

export default App;
