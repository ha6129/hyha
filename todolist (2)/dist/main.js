(()=>{"use strict";window.Widget={button:function(n){var e=document.createElement("button");return e.textContent=n.label,e.onclick=n.onClick,{el:e}},span:function(n){var e=document.createElement("span");return e.textContent=n.contents,{el:e}},list:function(n){var e=document.createElement("ul");return e.style.listStyle="none",e.style.padding="0",t(n.datas,n.columns),{el:e,reload:function(c){e.innerHTML="",t(c,n.columns)},getValue:function(){return e.value}};function t(n,t){n.forEach((function(n){var c=document.createElement("li");t.forEach((function(e){var t=e.render(n);c.append(t)})),e.append(c)}))}},checkbox:function(n){var e=document.createElement("input");return e.type="checkbox",e.checked=n.done,e.onchange=n.onChange,{el:e}},getControl:function(){}}})();