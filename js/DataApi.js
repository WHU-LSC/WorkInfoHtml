//引入express
const { response } = require('express')
const express = require('express')
const { request } = require('http')
//创建应用对象
const app = express()

//创建路由规则
//request 对请求报文的封装
//response 对响应保温的封装
const appData = require(' /Users/lsc/Desktop/WorkInfoHtml/js/totaldata.json')
app.all('/data', (request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send(appData)
})

//监听
app.listen(8000,()=>{
    console.log("服务已经启动，8000端口监听中")
})