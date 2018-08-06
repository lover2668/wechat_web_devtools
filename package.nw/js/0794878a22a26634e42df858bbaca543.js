'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){async function a(a,b){let c=n.qcloudFileInfo,{data:d,fileMd5Info:e}=await k(a,b,{ignore:[],cwd:a,needMd5:!0,ignoreFileMd5:c});return{data:d,fileMd5Info:e}}async function b(a,b,c={}){if('nodejs'===c.devEnv&&!c.node_modules&&!c.src){let a=new Error;throw a.code=z,a.message=`请选择需要上传的代码。错误：${z}`,a}let d=[];if(c.node_modules||d.push(h.join(a,'node_modules/**/*')),c.packagejson||d.push(h.join(a,'package.json')),!c.src){let b=j.readdirSync(a);b.forEach((b)=>{if('node_modules'!==b&&'.'!==b&&'package.json'!==b){let c=j.lstatSync(h.join(a,b));c.isDirectory()?d.push(h.join(a,`${b}/**/*`)):d.push(h.join(a,`${b}`))}})}'php'===c.devEnv&&(d=[]);let{data:e,fileMd5Info:f}=await k(a,b,{ignore:d,cwd:a,needMd5:!0});return{data:e,fileMd5Info:f}}async function c(c,f={}){if(!c.qcloudRoot){let a=new Error;throw a.code=w,a.message=`未找到 project.config.json 中的 qcloudRoot 字段。错误：${w}`,a}let g=h.join(c.projectpath,c.qcloudRoot);if(!j.existsSync(g)){let a=new Error;throw a.code=w,a.message=`project.config.json 中的 qcloudRoot 字段指定的目录不存在。错误：${w}`,a}let k=j.statSync(g);if(!k.isDirectory()){let a=new Error;throw a.code=w,a.message=`project.config.json 中的 qcloudRoot 字段指定的目录不存在。错误：${w}`,a}let l,m={},o=Date.now(),p=`${parseInt(1e5*Math.random())}_${Date.now()}_qcloud.wx`,q=h.join(A,p);l=f.cleverPack?await a(g,q,f):await b(g,q,f),m.packTime=Date.now()-o;let s=Date.now(),t=i.gzipSync(l.data);m.zilbTime=Date.now()-s,m.dataLength=l.data.length,m.pDataLength=t.length;let u=await d(_extends({},f,{language:'php'===f.devEnv?2:1,filename:p}));f.onBeforeUpload&&f.onBeforeUpload(m);let{host:v,url:x,sign:y}=u.body;x=`https://${v}${x}/${p}`;let z=Date.now(),B=await e(x,y,t);if(m.upLoadTime=Date.now()-z,r('client_upload_cos_time',c.appid,`${m.upLoadTime}`),B=JSON.parse(B.body),0===B.code)return n.qcloudFileInfo=_extends({},n.qcloudFileInfo,l.fileMd5Info),{destPath:q,ext:m,upCosRes:B,sign:y,host:v,url:x,fileName:p};throw`UP TO COS ERROR: code: ${B.code} ${B.message}`}async function d(a){return new Promise(async(b,c)=>{try{let c=await l({url:s,body:JSON.stringify({env:a.env||m.CLOUD_ENV_DEVLOPE,filename:a.filename||'',version:a.version||'',remark:a.remark||'',language:a.language||1}),method:'post',needToken:1,needAppID:1});return q.info('getCosInfo:',c.body),b(c)}catch(a){q.error('getCosInfo:',a),c(a)}})}async function e(a,b,c){return new Promise(async(d,f)=>{try{let e=await l({url:a,needToken:-1,needParse:-1,method:'POST',headers:{Authorization:b},formData:{op:'upload',filecontent:c}});q.info(`upToCos: fileDataLength: ${c.length} resBody:`,e.body),d(e)}catch(a){q.error('upToCos:',a),f(a)}})}async function f(a){let b=a.env||m.CLOUD_ENV_DEVLOPE,c=a.action,d=a.fileName||'';return new Promise(async(e,f)=>{if(B[c]){let a=new Error;return a.code=y,q.error(`operatecvm: ${c}, QCLOUD_SVR_POLL_DOING`),f(a)}B[c]=!0,c===m.CLOUD_ACTION_RESET_SERVICE&&(n.qcloudFileInfo={});try{let h=await l({url:t,method:'post',needToken:1,needAppID:1,body:JSON.stringify({action:c,env:b,filename:d})});q.info(`operatecvm: action: ${c}; env: ${b}; resBody:`,h.body),a.beforePoll&&a.beforePoll();let i=h.body.event_uuid,j=await g({uuid:i});return j=JSON.parse(j.body.resp_data),B[c]=!1,0===j.code?e(j):f(j)}catch(a){B[c]=!1,q.error(`operatecvm: action: ${c}; env: ${b}; error:`,a),f(a)}})}async function g(a){async function b(c,d){a.beiginTime||(a.beiginTime=Date.now());let e=a.uuid;if(Date.now()-a.beiginTime>m.POLL_MAX_TIME){let a=new Error;return a.code=x,q.error(`polleventresp: event_uuid: ${e}, QCLOUD_SVR_POLL_TIMEOUT`),d(a)}try{let a=await l({url:u,method:'post',needToken:1,needAppID:1,body:JSON.stringify({event_uuid:e})});q.info(`polleventresp: event_uuid: ${e}, resBody:`,a.body);let f=a.body.state;f===m.CLOUD_EVENT_CREATED?setTimeout(()=>{b(c,d)},m.POLL_TIME):f===m.CLOUD_EVENT_RESPONSED?c(a):d(a)}catch(a){return d(a)}}return new Promise(async(a,c)=>{b(a,c)})}const h=require('path'),i=require('zlib'),j=require('fs'),k=require('./e5fa35c3c8e81bc6466b4b8eb436113b.js'),l=require('./15ba1827c7f6564a45df6bd44da3a977.js'),m=require('./72410b6d4968336cd8b2fc1d41f52cdf.js'),n=require('./84858de8a097c9cf84ff2c2e3d86e2a9.js'),o=require('./948f9199c1cd0ba6cb9d19ad84972410.js'),p=require('./bcb48ae14d243711d3b31cb0f602d209.js'),q=require('./72653d4b93cdd7443296229431a7aa9a.js'),r=require('./da7c31daaf542cf1796023d8e344b98a.js'),{getcosinfoURL:s,operatecvmURL:t,polleventrespURL:u,selectLanguage:v}=require('./f171257bbcaef547a3cf27266ccb0db2.js'),{QCLOUD_SVR_NO_FOUND_ERR:w,QCLOUD_SVR_POLL_TIMEOUT:x,QCLOUD_SVR_POLL_DOING:y,QCLOUD_SVR_UP_DIR_CHECK:z}=require('./949d8235c744ced2a80121e4dba34c28.js'),{Weappdest:A}=require('./92320c1386e6db6a6f2556736a9bc280.js');var B={};module.exports={addToNotificationCenter:async function(a){await o.open(),await o.insert([{type:p.DBType.cloud,timestamp:Date.now()/1e3,content:a}]),await o.close()},operatecvm:f,forMatDebugURL:function(a,b){let c=b.replace('ws://0.0.0.0',a);return q.info(`forMatDebugURL: chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=${c}`),`chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=${c}`},uploadSvrCode:c,polleventresp:g,operate:async function(a,b){let{action:d}=b;return d===m.CLOUD_ACTION_UPLOAD?c(a,b):d===m.CLOUD_ACTION_POLL?g(b):f(b)},selectLanguageEnv:async function(a){return new Promise(async(b,c)=>{try{const c=await l({url:s+'?hook=select',body:JSON.stringify({language:'php'===a?2:1}),method:'post',needToken:1,needAppID:1});return q.info('selectLanguageEnv:',c.body),b(c)}catch(a){q.error('selectLanguageEnv:',a),c(a)}})}}}(require('lazyload'),require);