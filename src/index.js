/*
 * @Descripttion:
 * @Author: tianxiangbing
 * @Date: 2020-07-08 16:15:42
 * @LastEditTime: 2020-07-09 16:49:24
 * @github: https://github.com/tianxiangbing
 */

(function(definition) {
  //
  if (typeof exports === "object") {
    module.exports = definition();
    // RequireJS
  } else if (typeof define === "function" && define.amd) {
    define(definition);
  } else {
    PromiseCache = definition();
  }
})(function() {
  "use strict";
  let PromiseCache = {
    list: [],
    /**
     * @desc: 根据缓存时间返回缓存的对象，如果无缓存，则执行回调
     * @param {type} 需要作为比较的key，可以是字符串数字，也可以是js对象，或者是过滤的Fuction
     * @return: 直接返回缓存的promise，如果不存在时返回false
     */
    get(compareKey) {
      let result = false;
      let index = 0;
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        if (typeof compareKey == "function") {
          result = compareKey(this.list);
          index = i;
          break;
        } else if (typeof compareKey == "object") {
          if (JSON.stringify(compareKey) == JSON.stringify(item.key)) {
            result = item;
            index = i;
            break;
          }
        } else if (compareKey == item.key) {
          result = item;
          index = i;
          break;
        }
      }
      if(result){
          if(result.status =='success'){
              //状态为success时判断过期时间
              if(result.time+result.expireTime*1000 > Date.now()){
                //没过期
                return result;
              }else{
                  //过期的数据删除
                  this.list.splice(index,1);
              }
          }
          if(result.status =='pending'){
              //如果为pending状态，直接返回
              return result;
          }
      }
      return false;
    },
    /**
     * @desc: 缓存pomise函数
     * @param {String|Function|Object}[key] 需要作为比较的key，可以是字符串数字，也可以是js对象，或者是过滤的Fuction
     * @param {Function}[promise] 需要缓存的promise
     * @return: 
     */    
    cache(key,promise,expireTime=0){
        let cache = this.get(key);
        // console.log(cache)
        if(!cache){
            //如果存在这个promise并没过期的话,不操作，如果不存在的话，添加缓存
            return this.set(key,promise,expireTime)
        }else{
            //有缓存，执行promise，
            return cache.promise;
        }
    },
    /**
     * @desc: 设置进缓存
     * @param {string}[key] 关键区分，
     * @param {Promise}[promise] 缓存对象
     * @param {int}[expireTime] 缓存时间，0为不缓存，单位秒
     */
    set(key, promise, expireTime) {
      let item = {
        key: key,
        promise: promise(),
        expireTime: expireTime,
        time: Date.now(),
        status: "pending",
        result:null//缓存promise的结果
      };
      this.list.push(item);
      return item.promise.finally(e => {
        item.status = "success";
      });
    }
  };
  return PromiseCache;
});
