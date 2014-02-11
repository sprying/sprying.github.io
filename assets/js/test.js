/**
 * Created with JetBrains WebStorm.
 * User: sprying
 * Date: 2/3/14
 * Time: 8:15 PM
 * To change this template use File | Settings | File Templates.
 */
(function($,undefined){
    var navMenu = (function(){
        var navMenu = {
            collectH:[],
            targetArr : {
                'h1':['h1','h2'],
                'h2':['h2','h3']
            },
            holdWith : 200,
            hasChild : false,
            navMenu :'',
            pos:{
                left:0,
                top:0
            },
            outId:'navMenu',
            relObj:'',
            init:function(wrapper,pos){
                var targetArr = this.targetArr,
                    collectH = this.collectH,
                    that = this;
                for(var parentH in targetArr){
                    $(wrapper).find(parentH).each(function(){
                        var h = {parentH : this, children : []}
                        if(!this.id) this.id=(new Date()).getTime();
                        h.id = this.id;
                        var children = $(this).nextUntil(targetArr[parentH][0],targetArr[parentH][1]);
                        children.each(function(){
                            h.children.push({
                                id:this.id || (this.id = (new Date()).getTime()),
                                parentH:this,
                                children:[]
                            });
                        });
                        if(h.children.length) that.hasChild = true;
                        collectH.push(h);
                    });
                    if(collectH.length) break;
                }
                if(!collectH.length) return;
                this.relObj = pos;
                if(pos){
                    this.holdWith = $(pos)[0].offsetLeft - 45;
                    this.pos.left = $(pos)[0].offsetLeft + $(pos)[0].offsetWidth+5;
                }
                this.buildHtml().bindEvent();
            },
            buildHtml : function(){
                var cache = ['<div  id="'+this.outId+'" style="width:'+this.holdWith+'px;left:'+this.pos.left+'px;top:'+this.pos.top+'px ">'],
                    hasChild = this.hasChild;
                cache.push('<h3>目录<small>【隐藏】</small></h3>');
                cache.push('<ul class="nav nav-list scrollspy">');
                this.collectH.forEach(function(node){
                    cache.push('<li id="nav_'+node.id+'" ');
                    if(hasChild&&!node.children.length){
                        cache.push(' style="font-weight:bold;"')
                    }
                    cache.push('>');
                    cache.push(hasChild&&node.children.length?'<strong>':'');
                    cache.push('<a href="#'+ node.parentH.id + '">'+$(node.parentH).text()+'</a>');
                    cache.push(hasChild&&node.children.length?'</strong>':'');
                    cache.push('</li>');
                    node.children.forEach(function(node){
                        cache.push('<li class="sub" id="nav_'+node.id+'"><a href="#'+ node.id + '">'+ $(node.parentH).text() + '</a></li>');
                    });
                })
                cache.push("</ul></div>");
                $(document.body).append(cache.join(''));
                this.navMenu = $('#'+this.outId);
                this.pos.top = ($(window).height() - this.navMenu.height())/3;
                this.navMenu.css({
                    top:this.pos.top
                });
                return this;
            },
            bindEvent : function(){
                var that = this;
                $(document.body).attr({
                    "data-spy":"scroll",
                    "data-target":".scrollspy"
                });
                $('[data-spy="scroll"]').each(function () {
                    var $spy = $(this).scrollspy({offset: 40})
                });

                this.navMenu.affix({
                    offset: {
                        top:40,
                        bottom:200
                    }
                });
                if(!this.navMenu.find('li').is('.active')) {
                    var node = this.collectH[0];
                    if(node.children.length){
                        $('#nav_'+node.children[0].id).addClass('active');
                    }else{
                        $('#nav_'+node.id).addClass('active');
                    }
                }
                (function(){
                    var timer;
                    $(window).on('resize',function(){
                        clearTimeout(timer);
                        timer  = setTimeout(function(){
                            that.resize();
                        },50)
                    });
                })();
            },
            resize:function(){
                var relObj = this.relObj;
                this.navMenu = $('#'+this.outId);
                this.pos.top = ($(window).height() - this.navMenu.height())/2;
                this.holdWith = $(relObj)[0].offsetLeft - 45;
                this.pos.left = $(relObj)[0].offsetLeft + $(relObj)[0].offsetWidth+5;
                this.navMenu.css({
                    top:this.pos.top,
                    left:this.pos.left,
                    width:this.holdWith
                });
            }
        };

        return {
            init:function(wrapper,pos){
                navMenu.init(wrapper,pos);
            }
        }
    })();
    navMenu.init($('#article'),$('.content'))
})(jQuery,undefined);
function doAct(){
    var container = document.getElementById('zpdd_demo'),
        imgSource1 = document.createElement('img'),
        imgSource2 = document.createElement('img'),
        imgTarget;
    imgSource1.src='/assets/images/xitang.jpg';
    imgSource2.src='/assets/images/xitang.jpg';
    window.setTimeout(function(){
        imgTarget = overFns('zpdd',imgSource1,imgSource2);
        imgTarget.width = imgSource1.width=imgSource2.width=300;
        container.innerHTML = '';
        container.style.display='block';
        container.appendChild(imgSource1);
        container.appendChild(imgSource2);
        container.appendChild(imgTarget);
    },0);
}
var overFns =  (function(){
    var typeCache={
            'zpdd':['正片叠底',function(a,b){
                var c = 0;
                c = a*b/255;
                return c;
            }],
            'ysjs':['颜色加深',function(a,b){
                var c = 0;
                c = a - (255-a)*(255-b)/b;
                c = c>0?c:0;
            }],
            'xxjs':['线性加深',function(a,b){
                var c = 0;
                c = a+b-255;
                c = c>0?c:0;
                return c;
            }],
            'ba':['变暗',function(a,b){
                c = a>b?b:a;
                return c;
            }],
            'ls':['滤色',function(a,b){
                var c;
                c =  a + b - a*b/255;
                return c;
            }],
            'ysjd':['颜色减淡',function(a,b){
                var c;
                c =  a + a*b/(255-b);
                c = (c>255?255:c);
                return c;

            }],
            'xxjd':['线性减淡',function(a,b){
                var c;
                c =  a + b;
                c = (c>255?255:c);
                return c;

            }],
            'bl':['变亮',function(a,b){
                var c;
                c =  a>b?a:b;
                return c;

            }]
        },
        overId = 0;
    var canvasHolder = document.createElement('canvas');
    document.body.appendChild(canvasHolder);
    canvasHolder.width=0;
    canvasHolder.height=0;
    canvasHolder.style.display='none';

    return function(type,img1,img2){
        var time1 = (new Date()).getTime();
        var c = canvasHolder.getContext('2d'),
            img1Width = img1.width,
            img1Height = img1.height,
            img2Width = img2.width,
            img2Height = img2.height,
            minWidth = (img1Width>img2Width?img2Width:img1Width),
            minHeight = (img1Height>img2Height?img2Height:img1Height);
        canvasHolder.width = img1Width>img2Width?img1Width:img2Width;
        canvasHolder.height = img1Height+img2Height;
        if(!typeCache[type]) return;
        c.drawImage(img1,0,0,img1Width,img1Height);
        c.drawImage(img2,0,img1Height,img2Width,img2Height);
        var imgData1 = c.getImageData(0,0,img1Width,img1Height),
            imgData2 = c.getImageData(0,img1Height,minWidth,minHeight),
            arrData1 = imgData1.data,
            arrData2 = imgData2.data;
        for(var i= 0,l=arrData2.length;i<l;i=i+4){
            arrData1[i] = typeCache[type][1](arrData1[i],arrData2[i]);
            arrData1[i+1] = typeCache[type][1](arrData1[i+1],arrData2[i+1]);
            arrData1[i+2] = typeCache[type][1](arrData1[i+2],arrData2[i+2]);
        }
        canvasHolder.width = img1Width;
        canvasHolder.height = img1Height;
        c.putImageData(imgData1,0,0);
        c.fillStyle = "#ccc";
        c.font = ""+12+'px lighter';
        c.fillText(typeCache[type][0],10,20);
        var newImg = new Image();
        newImg.src = canvasHolder.toDataURL();
        newImg.className= 'calculate';
        newImg.id = 'over_'+overId;
        canvasHolder.width=0;
        canvasHolder.height=0;
        canvasHolder.style.display='none';
        return newImg;
    };
})();
var isPsCanvas = !!document.getElementById('ps-canvas');
if(isPsCanvas){
    doAct();
}
//createNav();
//left();
