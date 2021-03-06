import React from 'react';
import './styles/App.css';
import Visualizer from './pages/Visualizer'

function App() {
  return (
    <div className="App">
      <Visualizer></Visualizer>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default App;
