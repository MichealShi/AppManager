# app-manager

> 这是一个APP综合管理平台项目，分为首页、应用管理、补丁管理、异常统计、日志分析、SQL查询、用户中心几个部分

## Environment

`Node: 14.16.1`

## Start


``` bash
npm install
```

## Develop

``` bash
# serve with hot reload at localhost:8010
npm run dev
```

#### Build

``` bash
# build for production with minification
npm run build
```

#### 可能会遇到的问题
>Error: error:0308010C:digital envelope routines::unsupported<br>
解决方案：export NODE_OPTIONS=--openssl-legacy-provider

>Module build failed (from ./node_modules/sass-loader/lib/loader.js):<br>
解决方案：npm rebuild node-sass
