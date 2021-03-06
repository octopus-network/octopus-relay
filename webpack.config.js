const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

const ENV = process.env.NODE_ENV || 'development';
const context = __dirname;
const hasPublic = fs.existsSync(path.join(context, 'public'));

const NETWORK = process.env.OCT_NETWORK || 'testnet';
const RELAY_CONTRACT_NAME = process.env.OCT_RELAY_CONTRACT_NAME || process.env.CONTRACT_NAME || 'dev-1616819063071-1140774';
const TOKEN_CONTRACT_NAME = process.env.OCT_TOKEN_CONTRACT_NAME || 'dev-1615435740118-2637667';

module.exports = merge(
  baseConfig(ENV, context),
  {
    devtool: process.env.BUILD_ANALYZE ? 'source-map' : false,
    plugins: [
      new HtmlWebpackPlugin({
        PAGE_TITLE: 'Octopus Relay',
        NEAR_CONFIG: JSON.stringify({
          networkId: NETWORK,
          nodeUrl: `https://rpc.${NETWORK}.near.org`,
          contractName: RELAY_CONTRACT_NAME,
          walletUrl: `https://wallet.${NETWORK}.near.org`,
          helperUrl: `https://helper.${NETWORK}.near.org`,
          explorerUrl: `https://explorer.${NETWORK}.near.org`,
          tokenContract: TOKEN_CONTRACT_NAME
        }),
        inject: true,
        template: path.join(context, `${hasPublic ? 'public/' : ''}index.html`)
      })
    ]
  }
);