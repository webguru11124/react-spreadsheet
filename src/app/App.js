import React from 'react';
import Grid from './components/Grid';
import Header from './components/Header';

import './App.css';
import { COLS, ROWS } from '../config/spreadSize';



function App() {
    return (
        <div className="App">
            <div className='container mt-8 flex flex-row justify-center'>
                <div>
                    <Header />
                    <Grid rows={ROWS} cols={COLS} />
                </div>
            </div>
        </div>
    );
}

export default App;
