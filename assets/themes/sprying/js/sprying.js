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
