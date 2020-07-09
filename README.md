<!--
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2020-07-08 16:14:24
 * @LastEditTime: 2020-07-09 15:56:57
 * @github: https://github.com/tianxiangbing
 -->
# Promise-cache
Promise缓存处理，针对同一时间或时间段内的promise进行缓存。
# Npm
    npm install promiseCache
## USE
```
let PromiseCache = require('promiseCache');
let p = ()=> new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("ok..."+Date.now())
    },1000)
})

PromiseCache.cache('tianxiangbing',p,1).then(res=>{
    console.log('sucess:::',res)
})
setTimeout(()=>{
    PromiseCache.cache('tianxiangbing',p,1000).then(res=>{
        console.log('sucess:::',res)
    })
},100)
setTimeout(()=>{
    PromiseCache.cache('tianxiangbing',p,1000).then(res=>{
        console.log('sucess:::',res)
    })
},1001)
```