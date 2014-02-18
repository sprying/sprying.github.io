---
layout: post
title: Javascript数组
category: Javascript
tags: [Javascript]
---
##稀疏数组
	var a1 = [,,,];	var a2 = new Array(3);	var a3 = [1,2,3];	console.log( 0 in a1);//false	console.log( 0 in a2);//false	console.log( 0 in a3);//true	delete a3[0];	console.log( 0 in a3);//false`length`设置小于原值，删除溢出的；新增一数组元素，`length`始终元素序号`+1``push/pop`在数组尾部操作，与`a[a.length]`赋值一样,支持多参数,返回数组长度`unshift/shift`在数组头部操作
	arr = [1, 2, 3, 4, 3, 4, 0]	arr.push([6,7])	// 返回8	console.log(arr)	// [1, 2, 3, 4, 3, 4, 0, Array[2]]
	
##类数组对象
可用针对真正数组遍历的代码来遍历；可用数组的通用方法。

作为数组的字符串，使用[]来调用`join、filter`方法；但是`push/sort/reverse/splice`可改变数组的方法无效的##数组遍历	if(!a[i])    //null+undefined+不存在的元素	if(a[i]!==undefined)    //undefined+不存在的元素	if(!(i in a))    //不存在的元素可用`for in`处理稀疏数组，不过数组不推荐用这个，能够枚举继承的属性名##数组校验
* 数组校验

		isArray = Array.isArray || function(o){		    return  Object.prototype.toString.call(o) === "[object Array]";		}

* 类数组校验		function isArrayLike(o){		    if(o &&		        typeof o ==='object' &&		        o.nodeType != 3 &&		        isFinite(o.length) &&		        o.length >= 0 &&		        o.length === Math.floor(o.length) &&		        o.length < 4294967296)		        return true;		    else		        return false;		}##数组方法### ES3方法
`join`,`reverse`,`sort`,`concat`,`slice`,`splice`,`push`,`pop`,`unshift`,`shift`,`toString`,`toLocalString`* `slice` 不改变原数组
  正数 第一个参数和不到第二个参数（从零算起，相对于索引）数组；负数， 倒数 第一个参数和倒数第二个参数的数组，-1倒数第2个* `splice` 改变原数组  
	第一个参数（从零算起），插入或删除的起始位置，第二个参数：删除的个数，第三或其它任意个参数，要插入的元素。
>删除数组元素，保持数组连续，就用`splice`，返回的由删除元素组成的数组>复制数组的时候，请使用`Array#slice`
	
	var len = items.length,	    itemsCopy = [],	    i;		// bad	for (i = 0; i < len; i++) {	  itemsCopy[i] = items[i];	}		// good	itemsCopy = items.slice();* `concat` 连接两数组
参数为数组元素或一维数组，另外注意，返回的是新创建的数组。如果这些参数中的任何一个自身是数组，则连接的数组的元素，而非数组本身。concat不会递归扁平化数组的数组，也不会修改调用的数组。
	var res = [1,2].concat([3,4])	// res=[1, 2, 3, 4]	res = res.concat(5,[7,8])	// [1, 2, 3, 4, 5, 7, 8]
### ES5方法
`forEach`,`map`,`filter`,`every`,`some`,`reduce`,`reduceRight`,`indexOf`,`lastIndexOf`
	  Array.prototype.forEach || (Array.prototype.forEach = function(fn, context) {	    for (var i = 0, len = this.length >>> 0; i < len; i++) {	      if (i in this) {	        fn.call(context, this[i], i, this);	      }	    }	  });
	  
	  Array.prototype.map = Array.prototype.map || function (callback, thisArg) {	            var T, A, k;	            if (this == null) {	                throw new TypeError(" this is null or not defined");	            }	            // 1. 将O赋值为调用map方法的数组.	            var O = Object(this);	            // 2.将len赋值为数组O的长度.	            var len = O.length >>> 0;	            // 4.如果callback不是函数,则抛出TypeError异常.	            if ({}.toString.call(callback) != "[object Function]") {	                throw new TypeError(callback + " is not a function");	            }	            // 5. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.	            if (thisArg) {	                T = thisArg;	            }	            // 6. 创建新数组A,长度为原数组O长度len	            A = new Array(len);	            // 7. 将k赋值为0	            k = 0;	            // 8. 当 k < len 时,执行循环.	            while (k < len) {	                var kValue, mappedValue;	                //遍历O,k为原数组索引	                if (k in O) {	                    //kValue为索引k对应的值.	                    kValue = O[ k ];	                    // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.	                    mappedValue = callback.call(T, kValue, k, O);	                    // 返回值添加到新书组A中.	                    A[ k ] = mappedValue;	                }	                // k自增1	                k++;	            }	            // 9. 返回新数组A	            return A;	        };	 