module.exports=function(n){function e(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return n[t].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var o={};return e.m=n,e.c=o,e.i=function(n){return n},e.d=function(n,o,t){e.o(n,o)||Object.defineProperty(n,o,{configurable:!1,enumerable:!0,get:t})},e.n=function(n){var o=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(o,"a",o),o},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=1)}([function(n,e){n.exports=require("electron")},function(n,e,o){"use strict";function t(){i=new r.BrowserWindow({height:600,width:1e3,webPreferences:{webSecurity:!1,nodeIntegration:!0,allowDisplayingInsecureContent:!0}}),i.loadURL(u),i.openDevTools(),i.on("closed",function(){i=null}),console.log("mainWindow opened")}var r=o(0),i=void 0,u="file://"+__dirname+"/index.html";r.app.on("ready",t),r.app.on("window-all-closed",function(){"darwin"!==process.platform&&r.app.quit()}),r.app.on("activate",function(){null===i&&t()})}]);