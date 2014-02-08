/**
 * Created with JetBrains WebStorm.
 * User: sprying
 * Date: 2/3/14
 * Time: 8:15 PM
 * To change this template use File | Settings | File Templates.
 */

function createNav(){
    var wholeHolder =  document.getElementsByClassName('row')[0],
        hCollections = wholeHolder.getElementsByTagName('h3'),
        navHolder = wholeHolder.getElementsByClassName('span3')[0],
        navStr=['<ul class="nav nav-list navMenu" id="forFix">'],
        titleObj = {};
    hCollections = [].slice.call(hCollections);
    if(!hCollections.length) return;
    hCollections.forEach(function(param,index,arr){
        titleObj[param.id] = param.innerHTML;
        navStr.push('<li><a href="#'+param.id+'"> '+param.innerHTML+'</a></li>')
    });
    navStr.push('</ul>');
    $(navHolder).append(navStr.join(''));
    $(document.body).attr({
        "data-spy":"scroll",
        "data-target":".navMenu"
    });
    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy({offset: 40})
    })
    setTimeout(function () {
        $('.navMenu').affix({
            offset: 40
        })
    }, 100)

}
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
createNav();
