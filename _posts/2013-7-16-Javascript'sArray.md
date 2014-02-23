---
layout: post
title: Javascript数组
category: Javascript
tags: [Javascript]
---
##稀疏数组
	var a1 = [,,,];


##类数组对象




	s = "JavaScript"
	
	Array.prototype.join.call(s, " ") // => "J a v a S c r i p t"
	
	Array.prototype.filter.call(s, // 过滤字符串中的字符
	    function (x) {
	        return x.match(/[^aeiou]/); // 只匹配非元音字母
	    }).join(""); //  => "JvScrpt"
	    
注意，字符串是只读的，如果使用修改调用数组的方法，会报错。譬如：`push`、`sort`、`reverse`、`splice`等数组方法。
* 数组校验

		isArray = Array.isArray || function(o){

* 类数组校验


	Object.prototype.toString.call(obj).slice(8, -1);
  >复制数组的时候，请使用`Array#slice`

		var len = items.length,
	第一个参数（从零算起），插入或删除的起始位置，第二个参数：删除的个数，第三或其它任意个参数，要插入的元素。


	返回一个新创建的数组，元素包含调用`concat`的原始数组的元素和`concat`的每个参数，如果这些参数中的任何一个自身是数组，则连接的数组的元素，而非数组本身。但要注意，`concat`不会递归扁平化数组的数组，也不会修改调用的数组。



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
	

传递的参数跟`forEach`一样，不同的是`map`调用的函数要有返回值。该函数返回新创建的数组，不修改调用的数组。

	b = a.map(function(x){
	    return x *x;
	});	  
 在ES3不支持`map`可引入以下方法

	  Array.prototype.map = Array.prototype.map || function (callback, thisArg) {


	
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
对数组进行逻辑判定，返回true或false；**注意：**当`every`和`some`确定返回值时，停止遍历数组元素。


	
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