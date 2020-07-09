/*
 * @Descripttion: test
 * @Author: tianxiangbing
 * @Date: 2020-07-08 16:14:24
 * @LastEditTime: 2020-07-09 14:46:08
 * @github: https://github.com/tianxiangbing
 */
let PromiseCache = require('../src/index');
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