---
layout: post
title: JavaScript中事件
description: 概述了Js中事件
category: JavaScript
tags: [JavaScript]
---

# 一、事件处理程序
## 1、HTML事件处理程序
如果当前绑定事件的元素是表单的一个输入元素；则this隐性指代可描述如下

	function(){
		with(document){
			with(this.form){
				with(this){
					// 元素属性值
				}
			}
		}
	}
## 2、DOM0级事件处理程序
事件处理程序是在元素的作用域中运行的，也就this引用当前元素。
## 3、DOM2级事件处理程序
`addEventListener`、`removeEventListener`接受三个参数，最后一个参数是一个布尔值，false表示在冒泡阶段调用事件处理程序，true是在捕获阶段调用。通过addEventListener添加的匿名函数将无法移除。
> IE9、Firefox、Safari、Chrome、Opera支持Dom2级处理程序
## 4、IE事件处理程序
`attachEvent`、`detachEvent`,此方法接受两个参数，事件处理程序名称和事件处理程序函数，事件都被添加到冒泡阶段；attachEvent方法内，this = window,相比Dom方法以添加事件相反顺序执行。
>跨浏览器的事件处理程序

	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	
# 二、事件对象
## 1、Dom中事件对象
无论指定的何种事件处理程序（Dom0级或者Dom2级）都会传入event对象，在事件处理程序内部，对象this始终等于绑定事件元素的currentTarget值，target指向事件实际目标。
> 事件处理程序中删除按钮也能阻止事件冒泡。目标元素在文档中是事件冒泡的前提。

`preventDefault`方法阻止事件的默认行为。

`stopPropagation`方法用于立即停止事件在Dom层次中的传播。

只有事件处理程序执行期间，event对象才会存在；一旦事件处理程序执行完成，event对象就会被销毁。
## 2、IE中事件对象
在使用Dom0级、Dom2级方法添加事件处理程序时，event对象作为window对象的一个属性存在，如果使用attachEvent情况下，event对象还可以作为参数被传入事件处理程序函数里。这里的event的`srcElement`属性指向的事件的实际目标，即等同于Dom中事件对象的target。
> 下面是兼容处理浏览器的事件对象

	getEvent: function (event) {
		return event ? event : window.event;
	},
	getTarget: function (event) {
		return event.target || event.srcElement;
	},
	preventDefault: function (event) {
		if (event.preventDefault)
			event.preventDefault();
		else
			event.returnValue = false;
	},
	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
>jQuery中事件中，统一了event.preventDefault、event.stopPropagation为取消事件默认行为和冒泡，统一了this为当前对象，规定return false取消事件默认行为和冒泡。

# 三、事件类型
## 1、UI事件
### 1.1、load
当页面完全加载后（所有图像、JavaScript文件、CSS文件等外部资源）就会触发window上面的load事件。
对于网页load，有两种指定事件的方式

* 第一种

		window.addEventListener("load", function (event) {
		});
* 第二种

		/**
		 * 图像预加载
		 */
		varimgObj = new Image();
		EventUtil.addHandler(imgObj, 'load', function (event) {
			console.log('Image loaded');
		});
		imgObj.src = 'http://imgsrc.baidu.com/forum/pic/item/3b26ab18972bd40711fb6a887b899e510fb3098c.jpg';
script元素，设置了src属性并添加到文档后，才会开始加载。

### 1.2、unload
这个事件是在文档被完全卸载后触发，而利用这个事件最多的情况是清除引用，以避免内存泄露；注意，此时操作Dom节点或元素的样式，会导致错误；使用方式与load一样，在window上绑定事件
### 1.3、resize
当浏览器窗口被调整到一个新的高度或宽度时触发；使用方式与load一样，在window上绑定事件
### 1.4、scroll
在window对象上绑定；与resize类似，scroll元素会在文档滚动期间重复被触发，所以尽量保持代码简单。
## 2、焦点事件
* `blur` 在元素失去焦点时触发，不冒泡

* `focus` 在元素获得焦点时触发，不冒泡

## 3、鼠标与滚轮事件
### 3.1、事件执行顺序 

>
`mousedown`->`focus`->`mouseup`->`click`->`mousedown`->`mouseup`->`click`->`dbclick`

在mouseDown中阻止事件的默认行为后，IE中，依旧获得焦点并触发 Focus 事件，Firefox Safari Chrome Opera 中，没有获得焦点，focus没执行。分析：Focus 行为是这些浏览器的默认行为之一，可以被取消执行。[源](http://w3help.org/zh-cn/causes/BX9027)
任何取消mousedown或mouseup事件，就会阻止click触发；相应，阻止两次click行为也会阻止dbclick行为。
### 3.2、修改键
`shiftKey`、`ctrlKey`、`altKey`和`metaKey`（在Window键盘中是window键，在mac中是Cmd）,值都是布尔值。
IE8及之前，不支持metaKey属性。
### 3.3、相关元素
`mouseover`和`mouseout`有相关属性（event.**relatedTarget**）；

IE8及其之前版本不支持relatedTarget,取代的是:mouseover事件的**fromElement**，mouseout事件的**toElement**。

	getRelatedTarget : function (event) {
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	}
### 3.4、鼠标按键
只有在主鼠标按钮被单击（或回车键被按下）时才会触发click事件，检测按钮的信息也就没必要了。对于`mousedown`或`mouseup`事件来说，其event对象存在个**button**属性，表示按下或释放时的按键。注意：Opera只有在按主鼠标键时才会触发mousedown或mouseup。

	// 鼠标事件的按钮属性
	getButton : function (event) {
		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch (event.button) {
			case 0:
			case 1:
			case 3:
			case 5:
			case 7:
				return 0; //主鼠标按钮
			case 2:
			case 6:
				return 2; //  次鼠标按钮
			case 4:
				return 1; //滚轮
			}
		}
	}
### 3.5、右键事件
在`mouseup`事件中，event.button === 2,（若用mousedown，有一浏览器的button值始终是0。
### 3.6、鼠标滚轮事件
将`mousewheel`事件处理程序指定给页面中的任何元素或document对象，最终会冒泡到document(IE8)或window（IE9、Opera、Chrome、及Safari中），即可以处理鼠标滚轮的交互操作。当向前滚动鼠标时,**wheelDelta**是120的倍数，向后时，是-120的倍数。
Opera9.5之前版本中，wheelDelta的正负数是颠倒的。

Firefox支持一个名为`DOMMouseScroll`的类似事件，滚轮的信息保存在detail里，向前滚动时，属性值是-3的倍数，可以将该事件添加到任意元素，该事件会冒泡到window对象。

	getWheelDelta : function (event) {
		if (event.wheelDelta) {
			return (browser.name == "opera" &&browser.version< 9.5) ?
			-event.wheelDelta : event.wheelDelta;
		} else {
			return -event.detail * 40;
		}
	},  
	
	// 浏览器绑定滚轮事件
	EventUtil.addHandler(document, 'mousewheel', wheelFns);
	EventUtil.addHandler(document, 'DOMMouseScroll', wheelFns);
## 4、键盘的DOM0级事件、文本事件
### 4.1、键盘事件
用户按下键盘上的字符键时，触发事件顺序为`keydown`->`keypress`->`keyup`;用户按一个字符键不放时，可*重复触发*keydown和keypress事件。它们的事件对象都支持keyCode属性。

发生keypress事件意味按下的键会影响到屏幕中文本的显示。能够插入和删除字符的键都会触发keypress事件。keypress的event支持字符编码charCode属性，可还没发现什么应用地方。

取得字符编码后，就可以用String.fromCharCode()将其转换成实际的字符。

键盘事件也支持修改键，键盘事件对象里面也有shiftKey、ctrlKey、altKey、和metaKey。IE不支持metaKey。

* 快捷键

		document.onkeydown = function(e) {
			e = e || window.event;
			varkeycode = e.which ? e.which: e.keyCode;
			if (keycode == 13 || keycode == 108) { //如果按下ENTER键
				//在这里设置你想绑定的事件
			}
		}
* 快捷键与修改键

		// 键盘事件和修改键组合应用
		EventUtil.addHandler(document, 'keydown',
		function(e) {
			if (e.ctrlKey&&e.keyCode == 121) {
				console.log('Ctrl + F10');
			}
		}); 
		// 取消事件的默认行为
		EventUtil.addHandler(document, 'keydown',
		function(e) {
			if (e.keyCode == 122) {
				EventUtil.preventDefault(e);
			}
		});
* 屏蔽事件

		document.onkeydown = function (event) {
			event = event || window.event;
			var key = event.which || event.keyCode;
			////屏蔽 Alt+ 方向键 → alert("不准你使用ALT+方向键前进或后退网页！")
			if ((event.altKey) && ((key == 37) || (key == 39))) { 
				event.returnValue = false;
			}
			if ((key == 8) || (key == 116)) { //屏蔽 F5 刷新键
				event.keyCode = 0;
				event.returnValue = false;
			}
		}

JS判断用户按下的按键，根据按下的按键然后执行不同的操作：

	document.body.onkeydown = window.onkeydown = function(e) {
		var keyCode;
		if (!e) e = window.event;
		if (document.all) {
			keyCode = e.keyCode;
		} else {
			keyCode = e.which;
		}
		if (keyCode == 37) {
			window.location.href = "http://www.phpernote.com";
		}
		if (keyCode == 39 || keyCode == 13) {
			window.location.href = "http://www.phpernote.com";
		}
	}
附keyCode参照表
主键盘上可输入值的按钮

![]({{ BASE_PATH }}/assets/images/article/E7982CCE-5C11-4CB3-8BE9-D0005B1E7985.png)

数字键盘上的键的键码值 功能键键码值

![]({{ BASE_PATH }}/assets/images/article/5F712693-DD9A-4AF0-90B1-E6965BCD3B00.png)

控制键键码值

![]({{ BASE_PATH }}/assets/images/article/5E034CC7-5495-480E-BDB0-C452B1C08CBE.png)
### 4.2、textInput
只有在可编辑区域才会触发，其它待测试后添加
复制粘贴时，在IE678触发`onpropertychange`，其它浏览器促发`oninput`事件（HTML5）

	function input(input, callback){
	    if("onpropertychange"in input){//IE6/IE7/IE8
	        input.onpropertychange =function(){
	            if(window.event.propertyName =="value"){
	                callback.call(this, window.event)
	            }
	        }
	    }else{
	// Fix Firefox Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=195696
	        input.addEventListener("input", callback,false);
	    }
	}
## 5、变动事件
removeChild、replaceChild触发`DOMNodeRemoved`、`DOMSubtreeModified`事件

appendChild、replaceChild、insertBefore触发`DOMNodeInserted`、`DOMNodeInsertedIntoDocument`、`DOMSubtreeModified`

特性修改触发`DOMAttrModified`事件

|     Events   |     Opera 9+    |  Firefox 3+  |  Safari3+及Chrome  |    IE9+
| :----------: | :-------------: | :---------:|:---------------: |----------
| DOMSubtreeModified|    -    | 支持 |   支持  | 支持  |
| DOMNodeInserted|    支持 | 支持 | 支持 |  支持  |
| DOMNodeRemoved|    支持 | 支持 | 支持 |  支持  |
# 四、HTML5事件
## 1、contextmenu
支持的浏览器IE 、FireFox、 Safari、 Chrome 和 Opera 11+

屏蔽右键菜单`contentmenu`，细微区别见<http://jiake.iteye.com/blog/240492>

	document.getElementById("test").oncontextmenu = function (event) {
		//-- do something here
		// alert("ContextMenu Popup");
		//-- prevent the default behavior
		if (document.all)
			window.event.returnValue = false; // for IE
		else
			event.preventDefault();
	};
## 2、beforeunload
绑定时，在页面卸载前可以通过它弹出窗口，来取消卸载并继续使用原有页面。为了显示弹出窗，必须将event.returnValue的值设置为要显示给用户的字符串（对IE及FireFox而言），同时作为函数的值返回（对Safari和Chrome而言）。Opera 11 及其之前的版本不支持。

	// beforeunload事件
	EventUtil.addHandler(window, "beforeunload", function (event) {
		event = EventUtil.getEvent(event);
		var message = "I'm really going to miss you if you go."
			event.returnValue = message;
		return message;
	})
## 3、DOMContentLoaded
支持的浏览器:IE9+、FireFox、Chrome、Safari 3.1+ 和 Opera 9+（Firefox 3+，Opera 9+，Safari 3+，Chrome 2+）

形成完整的DOM树之后触发，可以将事件绑定至document或window，最终会冒泡到window，但它的实际目标是document，这个事件会在load之前触发，

模拟兼容性的addDOMLoadEvent
## 4、readystatechange
IE FireFox 4+ 和Opera支持此事件，支持此事件的对象都有一个readyState属性。可能包含下列5个值中的一个，但不一定都会经历过uninitialized、loading、loaded、interactive（交互）、complet对于document而言，interactive会在与DOMContentLoaded大致相同时刻触发,与load事件一起使用时，无法预料先后顺序；另外交互阶段也可能晚于完成阶段。

readystatechange事件可以作用于script（在IE和Opera中）link（仅IE中）;一般该事件绑定在document上。

## 5、onerror
Js容错代码

	window.onerror =  function(e){
	    return true;
	}
# 五、内存与性能
## 1、事件委托 
页面中事件处理程序的数量直接影响到页面整体的运行性能，可以通过事件委托来优化。如果可行的话，可以考虑为document对象添加一个事件处理程序。最适合采用事件委托的有click、mousedown、mouseup、keydown、keyup和keypress。
## 2、移除事件处理程序 
当页面中元素被移除或替换时，若元素绑定的事件仍没被移除，在IE中不会做出恰当处理，此时要先手工移除事件，不然会存在内存泄露。
# 六、模拟事件
## 1、DOM中的事件模拟
* 模拟鼠标事件

		varbtn = document.getElementById("myBtn");
		var event = document.createEvent("MouseEvents");
		// type bubbles cancelable view(这个参数几乎总是要设置为document.defaultView) detail screenXscreenYclientXclientYctrlKey
		// altKeyshiftKeymetaKey button relatedTarget
		event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		btn.dispatchEvent(event);
* 模拟键盘事件

		var textbox = document.getElementById("myTextbox"),
		    event;
		
		//以DOM3级方式创建
		if (document.implementation.hasFeature("KeyboardEvents", "3.0")) {
		    event = document.createEvent("KeyBoarEvent");
		    // type bubbles canclable view key location(0表示默认主键盘，1表示左，2表示右，3表示数字键盘，4表示移动设备，5表示手柄)
		    // modifiers(空格相隔的修改键列表) repeat
		event.initKeyboardEvent("keydown", true, true, document.defaultView, "a", 0, "Shift", 0);
		}
		textbox.dispatchEvent(event);
## 2、IE中的事件模拟

>要查看详细，可阅读《JavaScript高级程序设计》