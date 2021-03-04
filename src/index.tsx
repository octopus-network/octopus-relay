import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './common.css';
import 'antd/dist/antd.less';

import App from './App';
import { initContract } from './utils';

declare global {
  interface Window {
    accountId: string;
    walletConnection: any;
    contract: any;
  } 
}

initContract()
  .then(() => {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  })
  .catch(console.error);