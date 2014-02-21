---
layout: post
title: Javascript数组
category: Javascript
tags: [Javascript]
---
##稀疏数组
	var a1 = [,,,];	var a2 = new Array(3);	var a3 = [1,2,3];	console.log( 0 in a1);//false	console.log( 0 in a2);//false	console.log( 0 in a3);//true	delete a3[0];	console.log( 0 in a3);//false`length`设置小于原值，删除溢出的；新增一数组元素，`length`始终元素序号`+1``push`、`pop`在数组尾部操作，与`a[a.length]`赋值一样,支持多参数,返回数组长度`unshift`、`shift`在数组头部操作
	arr = [1, 2, 3, 4, 3, 4, 0]	arr.push([6,7])	// 返回8	console.log(arr)	// [1, 2, 3, 4, 3, 4, 0, Array[2]]
	
##类数组对象
可用针对真正数组遍历的代码来遍历；可用数组的通用方法。

在ES5(包括IE8)中，字符串行为类似只读数组。除了用charAt访问单个的字符外，还可以使用方括号;可以使用[]来调用`join`、`filter`方法。例如：

	s = "JavaScript"
	
	Array.prototype.join.call(s, " ") // => "J a v a S c r i p t"
	
	Array.prototype.filter.call(s, // 过滤字符串中的字符
	    function (x) {
	        return x.match(/[^aeiou]/); // 只匹配非元音字母
	    }).join(""); //  => "JvScrpt"
	    
注意，字符串是只读的，如果使用修改调用数组的方法，会报错。譬如：`push`、`sort`、`reverse`、`splice`等数组方法。	##数组遍历	if(!a[i])    //null+undefined+不存在的元素	if(a[i]!==undefined)    //undefined+不存在的元素	if(!(i in a))    //不存在的元素可用`for in`处理稀疏数组，不过数组不推荐用这个，能够枚举继承的属性名##数组校验
* 数组校验

		isArray = Array.isArray || function(o){		    return  Object.prototype.toString.call(o) === "[object Array]";		}

* 类数组校验		function isArrayLike(o){		    if(o &&		        typeof o ==='object' &&		        o.nodeType != 3 &&		        isFinite(o.length) &&		        o.length >= 0 &&		        o.length === Math.floor(o.length) &&		        o.length < 4294967296)		        return true;		    else		        return false;		}##数组ES3方法`join`、`reverse`、`sort`,`concat`、`slice`、`splice`、`push`、`pop`、`unshift`、`shift`、`toString`、`toLocalString``concat`—结果返回、`sort` 、`reverse` 、`join`—结果返回、`slice`—结果返回、`splice`、`push`、`pop`、`unshift`、`shift`* `slice` 不改变原数组
  正数 第一个参数和不到第二个参数（从零算起，相对于索引）数组；负数， 倒数 第一个参数和倒数第二个参数的数组。
  
	Object.prototype.toString.call(obj).slice(8, -1);
  >复制数组的时候，请使用`Array#slice`
	
		var len = items.length,		    itemsCopy = [],		    i;				// bad		for (i = 0; i < len; i++) {		  itemsCopy[i] = items[i];		}				// good		itemsCopy = items.slice();* `splice` 改变原数组  
	第一个参数（从零算起），插入或删除的起始位置，第二个参数：删除的个数，第三或其它任意个参数，要插入的元素。
	>删除数组元素，保持数组连续，就用`splice`，返回的由删除元素组成的数组* `concat` 连接两数组

	返回一个新创建的数组，元素包含调用`concat`的原始数组的元素和`concat`的每个参数，如果这些参数中的任何一个自身是数组，则连接的数组的元素，而非数组本身。但要注意，`concat`不会递归扁平化数组的数组，也不会修改调用的数组。
		var res = [1,2].concat([3,4])		// res=[1, 2, 3, 4]		res = res.concat(5,[7,8])		// [1, 2, 3, 4, 5, 7, 8]
## 数组ES5方法
`forEach`、`map`、`filter`、`every`、`some`、`reduce`、`reduceRight`、`indexOf`、`lastIndexOf`
###forEach
	var data = [1,2,3,4,5];
	data.forEach(function(v,i,a){
	    a[i] = v + 1;
	})
	
不能像for中使用break跳出循环，在`forEach`传入参数的函数中抛出`foreach.break`异常。

	function foreachFun(a, f, t) { // a为数组，f为函数，t为函数f的执行环境
	    try {
	        a.forEach(f, t);
	    } catch (e) {
	        if (e === foreach.break)
	            return;
	        else
	            throw e;
	    }
	}
	
	foreach.break = new Error("StopIteration");
在ES3不支持`forEach`可引入以下方法
		  Array.prototype.forEach || (Array.prototype.forEach = function(fn, context) {	    for (var i = 0, len = this.length >>> 0; i < len; i++) {	      if (i in this) {	        fn.call(context, this[i], i, this);	      }	    }	  });
###map
传递的参数跟`forEach`一样，不同的是`map`调用的函数要有返回值。该函数返回新创建的数组，不修改调用的数组。
	a = [1,2,3];
	b = a.map(function(x){
	    return x *x;
	});	  
 在ES3不支持`map`可引入以下方法

	  Array.prototype.map = Array.prototype.map || function (callback, thisArg) {	            var T, A, k;	            if (this == null) {	                throw new TypeError(" this is null or not defined");	            }	            // 1. 将O赋值为调用map方法的数组.	            var O = Object(this);	            // 2.将len赋值为数组O的长度.	            var len = O.length >>> 0;	            // 4.如果callback不是函数,则抛出TypeError异常.	            if ({}.toString.call(callback) != "[object Function]") {	                throw new TypeError(callback + " is not a function");	            }	            // 5. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.	            if (thisArg) {	                T = thisArg;	            }	            // 6. 创建新数组A,长度为原数组O长度len	            A = new Array(len);	            // 7. 将k赋值为0	            k = 0;	            // 8. 当 k < len 时,执行循环.	            while (k < len) {	                var kValue, mappedValue;	                //遍历O,k为原数组索引	                if (k in O) {	                    //kValue为索引k对应的值.	                    kValue = O[ k ];	                    // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.	                    mappedValue = callback.call(T, kValue, k, O);	                    // 返回值添加到新书组A中.	                    A[ k ] = mappedValue;	                }	                // k自增1	                k++;	            }	            // 9. 返回新数组A	            return A;	        };###filter	
调用和`forEach`一样，返回的数组元素是调用的数组的一个子集
	a = [5,4,3,2,1];
	
	smallvalues = a.filter(function(x){
	    return x<3;
	});// [2,1]
	
	everyother = a.filter(function(x,i){
	    return i%2 ==0;
	});// [5,3,1]
	
	// 跳过稀疏数组中缺少的元素，返回的数组总是稠密的
	var dense = sparse.filter(function(){
	    return true;
	});
	
	// 压缩空缺并删除undefined和null元素
	a = a.filter(function(x){
	    return x != null;
	})
	
### every和some
对数组进行逻辑判定，返回true或false；**注意：**当`every`和`some`确定返回值时，停止遍历数组元素。 ### reduce和reduceRight
使用指定的函数将数组元素进行组合，生成单个值。这在函数式编程中是常见的操作，称为“注入”和“折叠”。reduce需要两个参数，第一个参数是执行化简的函数，函数的参数分别为：回调的化简累计结果值、数组元素、元素的索引、数组的本身；第二个参数（可选）是传递给函数的初始值
	var a = [1,2,3,4,5];
	
	var sum = a.reduce(function(x,y){
	    return x + y;
	},0);
	
	var product = a.reduce(function(x,y){
	    return x * y;
	},1);
	
	var max = a.reduce(function(x,y){
	    return x>y?x:y;
	});
`reduceRight`的工作原理和`reduce`一样，不同的是它按照数组索引从高到低（从右到左）处理数组。
###indexOf和lastIndexOf
第一个参数代表要搜索的元素，第二个元素代表搜索的起始位置。可为负数，它代表相对数组末尾的偏移量，-1时，指定数组的最后一个元素。

	var a = [0, 1, 2, 1, 0];
	
	a.indexOf(1); // => 1:a[1]是1
	
	a.lastIndexOf(1) // => 3:a[3]是1
	
	a.indexOf(3) // =>-1: 没有值为3的元素
	
	// 找出数组a中所有值为x的位置
	function findAll(a, x) {
	
	    var result = [],
	        len = a.length,
	        pos = 0;
	
	    while (pos < len) {
	        pos = a.indexOf(x, pos);
	        if (pos === -1) {
	            break;
	        }
	        result.push(pos);
	        pos++;
	    }
		return result;
	}
字符串也有`indexOf`和`lastIndexOf`方法