(this["webpackJsonpherring-web"]=this["webpackJsonpherring-web"]||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(7),r=n.n(i),l=n(2),s=n(4);var o=function(e,t,n,c){var a;c&&(a=JSON.stringify(c));var i=new XMLHttpRequest,r="http://localhost:8000/api".concat(t);i.responseType="json",i.open(e,r),i.setRequestHeader("Content-Type","application/json");var l=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");l&&(i.setRequestHeader("X-CSRFToken",l),i.setRequestHeader("X-Requested-With","XMLHttpRequest")),i.onload=function(){n(i.response,i.status)},i.onerror=function(e){console.log(e),n({message:"Request failed"},400)},i.send(a)};function u(e,t){var n="/fillets";e&&(n+="/?username=".concat(e)),o("GET",n,t)}var f=n(8),d=n(0);var b=function(e){var t=e.fillet,n=e.action,c=e.handlePerformAction,a=e.theme,i=t.like_count?t.like_count:0,r="btn btn-outline-primary btn-sm ".concat(a),l="like"===n.type?"".concat(i," ").concat(n.display):n.display,s=function(e,t){200!==t&&201!==t||!c||c(e,t)};return Object(d.jsx)("button",{className:r,onClick:function(e){e.preventDefault(),function(e,t,n){o("POST","/fillets/action/",n,{id:e,action:t})}(t.id,n.type,s)},children:l})};var j=function e(t){var n=t.fillet,a=t.handleRepost,i=n.text?n.text:"reposted",r=n.is_repost?"px-3 text-muted small":"px-3",s=Object(c.useState)(n||null),o=Object(l.a)(s,2),u=o[0],j=o[1],p=window.location.pathname.match(Object(f.a)(/([0-9]+)/,{filletId:1})),m=p?p.groups.filletId:0,h="".concat(m)==="".concat(n.id),O=function(e,t){200===t?j(e):201===t&&a(e)};return Object(d.jsxs)("div",{className:"col-12 col-md-10 mx-auto border rounded py-2 mb-4",children:[Object(d.jsxs)("div",{children:[Object(d.jsxs)("p",{className:r,children:[Object(d.jsxs)("i",{children:[n.id,":"]})," ",i]}),n.is_repost&&Object(d.jsx)("div",{className:"col-9",children:Object(d.jsx)(e,{fillet:u.parent,handleRepost:a})})]}),u&&Object(d.jsxs)("div",{className:"btn btn-group",children:[Object(d.jsx)(b,{fillet:u,action:{type:"like",display:"Likes"},handlePerformAction:O,theme:"btn-dark"}),Object(d.jsx)(b,{fillet:u,action:{type:"unlike",display:"Unlike"},handlePerformAction:O,theme:"btn-dark"}),Object(d.jsx)(b,{fillet:u,action:{type:"repost",display:"Repost"},handlePerformAction:O,theme:"btn-light"}),!h&&Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),window.location.href="/".concat(n.id)},className:"btn btn-outline-primary btn-sm btn-light",children:"View"})]})]})};var p=function(e){var t=e.newFillets,n=e.setNewFillets,a=e.username,i=Object(c.useState)([]),r=Object(l.a)(i,2),o=r[0],f=r[1],b=Object(c.useState)(t||[]),p=Object(l.a)(b,2),m=p[0],h=p[1],O=Object(c.useState)(!1),v=Object(l.a)(O,2),x=v[0],y=v[1];Object(c.useEffect)((function(){var e=Object(s.a)(t).concat(m);e.length!==o.length&&f(e)}),[o,t,m]),Object(c.useEffect)((function(){if(!x){u(a,(function(e,t){200===t?(h(e),y(!0)):alert("You have error :-D")}))}}),[m,x,a]);var g=function(e){var c=Object(s.a)(t);c.unshift(e),n(c)};return Object(d.jsx)("div",{children:o.map((function(e){return Object(d.jsx)(j,{fillet:e,handleRepost:g},e.id)}))})};var m=function(e){var t=e.newFillets,n=e.setNewFillets,c=a.a.createRef(),i=function(e,c){if(console.log(e,c),201===c){var a=Object(s.a)(t);a.unshift(e),n(a)}else alert("you have error :-D")};return Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=c.current.value;c.current.value="",o("POST","/fillets/create/",i,{text:t})},children:[Object(d.jsx)("textarea",{className:"form-control",required:!0,ref:c}),Object(d.jsx)("button",{type:"submit",className:"btn btn-outline-primary btn-sm my-3 btn-dark",children:"Post"})]})};function h(e){var t=e.username,n=e.userCanPost,a=Object(c.useState)([]),i=Object(l.a)(a,2),r=i[0],s=i[1];return n="true"===n,Object(d.jsxs)("div",{className:"col-12 mb-3",children:[n&&Object(d.jsx)(m,{newFillets:r,setNewFillets:s}),Object(d.jsx)(p,{newFillets:r,setNewFillets:s,username:t})]})}function O(e){var t=e.filletId,n=Object(c.useState)(!1),a=Object(l.a)(n,2),i=a[0],r=a[1],s=Object(c.useState)(null),u=Object(l.a)(s,2),f=u[0],b=u[1],p=function(e,t){200===t?b(e):alert("Error: could not find fillet.")};return Object(c.useEffect)((function(){!1===i&&(!function(e,t){o("GET","/fillets/".concat(e,"/"),t)}(t,p),r(!0))}),[i,r,t]),null===f?null:Object(d.jsx)(j,{fillet:f,handleRepost:function(){}})}var v=a.a.createElement,x=document.getElementById("herring");x&&r.a.render(v(h,x.dataset),x),document.querySelectorAll(".herring-detail").forEach((function(e){r.a.render(v(O,e.dataset),e)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.89b14dd8.chunk.js.map