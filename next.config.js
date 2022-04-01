/** @type {import('next').NextConfig} */

const path = require('path');
const withPlugins = require("next-compose-plugins");

const config ={
  trailingSlash: true,
  images : {
    loader:'akamai',
    path:'',
    domains: ['localhost']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    reactStrictMode: true,
  },
  env:{
    MY_ENV : process.env.MY_ENV
  },
  
}

module.exports=withPlugins([], config)

