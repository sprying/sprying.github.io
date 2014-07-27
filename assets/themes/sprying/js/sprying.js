var codeNodes = document.getElementsByTagName('code');
code = Array.prototype.slice.call(codeNodes);
code.forEach(function(param){
    var parent = param.parentNode,children = param.childNodes;
    if(parent.nodeName.toLowerCase() !== 'pre'){
        return;
    }
    while(children.length--){
        parent.appendChild(children[0]);
    }
    parent.removeChild(param);
    parent.setAttribute('class','prettyprint linenums');
})
window.prettyPrint && prettyPrint();



apps.forEach(function (v, i) {
    if (reg.test(v.name)) // 正则的test方法
        retApps.push(v);
});
