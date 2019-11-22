import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const width = 100

const columns = [
  { headerName: '1', field: '1', width },
  { headerName: '2', field: '2', width },
  { headerName: '3', field: '3', width },
  { headerName: '4', field: '4', width },
  { headerName: '5', field: '5', width },
  { headerName: '6', field: '6', width },
  { headerName: '7', field: '7', width },
  { headerName: '8', field: '8', width },
  { headerName: '9', field: '9', width },
  { headerName: '10', field: '10', width },
  { headerName: '11', field: '11', width },
  { headerName: '12', field: '12', width },
  { headerName: '13', field: '13', width },
  { headerName: '14', field: '14', width },
  { headerName: '15', field: '15', width },
]


ReactDOM.render(<App columns={columns} />, document.getElementById('root'));

