var codeNodes = document.getElementsByTagName('code');
code = Array.prototype.slice.call(codeNodes);
code.forEach(function(param){
    var parent = param.parentNode,children = param.childNodes;
    while(children.length--){
        parent.appendChild(children[0]);
    }
    parent.removeChild(param);
    parent.setAttribute('class','prettyprint linenums');
})
window.prettyPrint && prettyPrint();
