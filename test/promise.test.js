/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2020-07-09 14:53:50
 * @LastEditTime: 2020-07-09 16:50:22
 * @github: https://github.com/tianxiangbing
 */
let PromiseCache = require('../src/index');
let returnValue = ['a','b','c','d','e','f','g']
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
    it('测试关键key为对象',done=>{
        PromiseCache.cache({a:1,b:2},p).then(res=>{
            expect(res).toBe('e');//仍然返回之前的值
        })
        PromiseCache.cache({a:1,b:2},p).then(res=>{
            expect(res).toBe('e');//
            expect(PromiseCache.list.length).toBe(2);
        })
        PromiseCache.cache({a:1,b:3},p).then(res=>{
            expect(res).toBe('f');//
            expect(PromiseCache.list.length).toBe(3);
            done();
        })
    })
});