---
layout: post
title: 全面解析JavaScript中的this
category: JavaScript
tags: [JavaScript]
---
## 使用this的几种场合
---
1. 执行函数时，判断函数是对象方法还是一个单独的函数？
单独的函数this===window;
对象方法，this == 对象。

		function UseThis(){
		    console.log(this === window);
		    this.instancePro = 1;
		}
		UseThis.objPro = 2;
		UseThis.objMethod = function(){
		    console.log(this.objPro);
		}
		UseThis();//true 不管嵌套多深，执行函数时，函数内的this === window
		console.log(instancePro);// 1
		
		var useThis = new UseThis();//false 当前是A是个构造函数，构造函数内的this，是new创建的实例
		console.log(useThis.instancePro);// 1
		
		UseThis.objMethod();//2 当前函数是对象方法，this===UseThis
		var fn = UseThis.objMethod;
		fn();//undefined
	点击查看[Demo](http://sprying.github.io/webtest/jsLearning/simpleThis.html)
2. 函数由bind方法返回后，this指向bind的第一个参数
3. 通过call(apply)执行函数,this指向call(apply)的第一个参数。

	    /*函数两次调用call*/
        function doubleBind() {
            console.log(this.doubleVariable);
        }
        (function () {
            console.log(this.doubleCalendar);//2
            doubleBind.call({doubleVariable: 1});// 1
        }).call({doubleVariable: 2});

4. 一个函数，先调用bind，再使用call执行时，this指向bind的第一个参数。

        /*由函数Bind绑定返回函数再调用call*/
        function funBind() {
            console.log(this.pro);
        }
        var relFun = funBind.bind({pro: 2});
        relFun.call({pro: 3});// 2
## 最后出道题
---

* 题一：
		   var con_inObj = {
		       variable :"sprying",
		       cons_fun:function(){
		           console.log(this.variable);
		       }
		   }
		   var new_obj = new con_inObj.cons_fun();//?
		   
		    <!-- from 前端乱炖 -->
	        var x = 5;
	        var example = {
	            x: 100,
	            a: function () {
	                var x = 200;
	                console.log('a context: %s, var x = %s', this.x, x);
	            },
	            b: function () {
	                var x = 300;
	                return function () {
	                    var x = 400;
	                    console.log('b context: %s, var x = %s', this.x, x);
	                };
	            },
	            c: function () {
	                var other = {
	                    x: 500
	                };
	                var execB = this.b().bind(other);
	                execB();
	                return execB;
	            }
	        }
	        console.log('example.x:' + example.x);
	        example.a();
	        example.b()();
	        example.a.call({
	            x: 9999
	        });
	
	        var execB = example.c(); 
	        execB.call({
	            x: 9999
	        }); 
  想知道结果的同学，点击[链接](http://sprying.github.io/webtest/jsLearning/this.html)，打开调试器
 
* 题二： 

	    function test(fn){
	        fn();  
	        arguments[0]();
	    }
	
	    test(function(){
	        alert(this.length)
	    }, length);
	    
	    
* 题三：

	    var foo = {
	        bar: function () {
	           console.log(this);
	        }
	    };
	                 
	    foo.bar();
	    (foo.bar)();
	                 
	    (foo.bar = foo.bar)();
	    (foo.bar, foo.bar)();
	题二、题三[来源](http://www.imf2e.com/snippets/2014/02/24/na-xie-niu-bi-de-ti-mu.html)，不过题目内容都太偏了。
