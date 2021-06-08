import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
