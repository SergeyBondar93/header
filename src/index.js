import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const width = 200

const columns = [
  { headerName: '1', field: 'one', width },
  { headerName: '2', field: 'two', width },
  { headerName: '3', field: 'three', width },
  { headerName: '4', field: 'four', width },
  { headerName: '5', field: 'five', width },
]


ReactDOM.render(<App columns={columns} />, document.getElementById('root'));

