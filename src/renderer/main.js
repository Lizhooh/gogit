import React from 'react';
import { render } from 'react-dom';
import App from './';
import Storage from '@/storage';
import './style/app.css';
import './style/icons/material/material-icons.css';
import './style/buttons.css';

render(
    <App />,
    document.getElementById('app'),
);

const config = Storage.get('APP-CONFIG');

if (!config) {
    Storage.set('APP-CONFIG', { port: 5000 });
}

