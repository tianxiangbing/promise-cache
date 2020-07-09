/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2020-07-09 14:53:50
 * @LastEditTime: 2020-07-09 15:48:57
 * @github: https://github.com/tianxiangbing
 */
let PromiseCache = require('../src/index');
let returnValue = ['a','b','c','d']
let i  =0 ;
let p = ()=> new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(returnValue[i++]);
    },1000)
})

describe('test开始',()=>{
    it("测试无缓存的情况",done=>{
        PromiseCache.cache('tianxiangbing',p).then(res=>{
            expect(res).toBe('a');//仍然返回之前的值
            done();
        })
    });
    it("测试在缓存内发起同一个方法",done=>{
        PromiseCache.cache('tianxiangbing',p).then(res=>{
            expect(res).toBe('b');//仍然返回之前的值
        })
        PromiseCache.cache('tianxiangbing',p).then(res=>{
            expect(res).toBe('b');//仍然返回之前的值
            expect(PromiseCache.list.length).toBe(1);
            done();
        })
    });
    it("测试在缓存过期后发起同一个方法",done=>{
        PromiseCache.cache('tianxiangbing',p).then(res=>{
            expect(res).toBe('c');//仍然返回之前的值
        })
        setTimeout(()=>{
            console.log(PromiseCache.list)
            PromiseCache.cache('tianxiangbing',p).then(res=>{
                expect(res).toBe('d');//不返回之前的值
                expect(PromiseCache.list.length).toBe(1);
                done();
            })
        },1010)
    });
});