(this["webpackJsonpherring-web"]=this["webpackJsonpherring-web"]||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),l=n(5),r=n.n(l),s=(n(14),n(2)),i=n(3);var o=function(e,t,n,c){var a;c&&(a=JSON.stringify(c));var l=new XMLHttpRequest,r="".concat(window.location.protocol,"//").concat(window.location.host,"/api").concat(t);l.responseType="json",l.open(e,r),l.setRequestHeader("Content-Type","application/json");var s=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");l.setRequestHeader("X-CSRFToken",s),l.setRequestHeader("X-Requested-With","XMLHttpRequest"),l.onload=function(){403===l.status&&"Authentication credentials were not provided."===l.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"),n(l.response,l.status)},l.onerror=function(e){n({message:"Request failed"},400)},l.send(a)};function u(e,t,n){var c="/fillets";e&&(c+="/?username=".concat(e)),n&&(c=n.replace("http://localhost:8000/api","")),o("GET",c,t)}function j(e,t){var n="/fillets/feed";t&&(n=t.replace("http://localhost:8000/api","")),o("GET",n,e)}var b=n(9),f=n(0);var d=function(e){var t=e.fillet,n=e.action,c=e.handlePerformAction,a=e.theme,l=t.like_count?t.like_count:0,r="btn btn-outline-primary btn-sm ".concat(a),s="like"===n.type?"".concat(l," ").concat(n.display):n.display,i=function(e,t){200!==t&&201!==t||!c||c(e,t)};return Object(f.jsx)("button",{className:r,onClick:function(e){e.preventDefault(),function(e,t,n){o("POST","/fillets/action/",n,{id:e,action:t})}(t.id,n.type,i)},children:s})};function O(e){var t=e.username,n=e.children;return Object(f.jsx)("span",{onClick:function(e){e.preventDefault(),window.location.href="/profiles/".concat(t)},className:"pointer",children:n})}function m(e){var t=e.user;return Object(f.jsx)(O,{username:t.username,children:Object(f.jsx)("span",{className:"badge bg-dark",children:t.username[0]})})}function h(e){var t=e.user,n=e.includeFullName,c="".concat(t.first_name," ").concat(t.last_name);return Object(f.jsxs)(f.Fragment,{children:[n&&" "!==c&&Object(f.jsxs)(f.Fragment,{children:[c,"\xa0"]}),Object(f.jsxs)(O,{username:t.username,children:["@",Object(f.jsx)("b",{children:t.username})]})]})}var p=n(8),x=n.n(p);function v(e){var t=e.className,n=e.children;return Object(f.jsx)("span",{className:t,children:x()(n).format("0a")})}function g(e){var t=e.user,n=e.didFollowToggle,c=e.profileLoading,a=t&&t.is_followed?"Unfollow":"Follow";a=c?"Loading...":a;return t?Object(f.jsxs)("div",{children:[Object(f.jsxs)("p",{children:[Object(f.jsx)(m,{user:t}),"\xa0",Object(f.jsx)(h,{user:t,includeFullName:!0})]}),Object(f.jsx)("p",{className:"small",children:t.country}),Object(f.jsxs)("p",{className:"small",children:["Followers: ",Object(f.jsx)(v,{children:t.follower_count})]}),Object(f.jsxs)("p",{className:"small",children:["Following: ",Object(f.jsx)(v,{children:t.following_count})]}),Object(f.jsx)("p",{className:"small",children:t.bio}),Object(f.jsx)("button",{onClick:function(e){e.preventDefault(),n&&!c&&n(a)},className:"btn btn-sm btn-dark",children:a})]}):null}function w(e){var t=e.username,n=Object(c.useState)(!1),a=Object(s.a)(n,2),l=a[0],r=a[1],i=Object(c.useState)(null),u=Object(s.a)(i,2),j=u[0],b=u[1],d=Object(c.useState)(!1),O=Object(s.a)(d,2),m=O[0],h=O[1],p=function(e,t){200===t&&b(e)};Object(c.useEffect)((function(){!1===l&&(!function(e,t){o("GET","/profiles/".concat(e,"/"),t)}(t,p),r(!0))}),[l,r,t]);return l?j?Object(f.jsx)(g,{user:j,didFollowToggle:function(e){h(!0),function(e,t,n){var c={action:n.toLowerCase()};o("POST","/profiles/".concat(e,"/follow/"),t,c)}(t,(function(e,t){200===t&&(console.log(e,t),b(e)),h(!1)}),e)},profileLoading:m}):null:"Loading..."}var N=function e(t){var n=t.fillet,a=t.handleRepost,l=n.text?n.text:"",r=n.text?" said:":" reposted:",i=Object(c.useState)(n||null),o=Object(s.a)(i,2),u=o[0],j=o[1],O=window.location.pathname.match(Object(b.a)(/([0-9]+)/,{filletId:1})),p=O?O.groups.filletId:0,x="".concat(p)==="".concat(n.id),v=function(e,t){200===t?j(e):201===t&&a(e)};return Object(f.jsxs)("div",{className:"col-12 col-md-10 mx-auto py-2",children:[Object(f.jsxs)("div",{className:"px-3 text-muted small",children:[Object(f.jsx)(m,{user:n.user}),"\xa0",Object(f.jsx)(h,{user:n.user,includeFullName:!0}),r]}),""!==n.text&&Object(f.jsx)("p",{className:"px-3 mb-0 py-2",children:Object(f.jsx)("b",{children:l})}),n.is_repost&&Object(f.jsx)("div",{className:"col-10",children:Object(f.jsx)(e,{fillet:u.parent,handleRepost:a})}),u&&Object(f.jsxs)("div",{className:"btn btn-group",children:[Object(f.jsx)(d,{fillet:u,action:{type:"like",display:"Likes"},handlePerformAction:v,theme:"btn-dark"}),Object(f.jsx)(d,{fillet:u,action:{type:"unlike",display:"Unlike"},handlePerformAction:v,theme:"btn-dark"}),Object(f.jsx)(d,{fillet:u,action:{type:"repost",display:"Repost"},handlePerformAction:v,theme:"btn-light"}),!x&&Object(f.jsx)("button",{onClick:function(e){e.preventDefault(),window.location.href="/".concat(n.id)},className:"btn btn-outline-primary btn-sm btn-light",children:"View"})]})]})};var F=function(e){var t=e.newFillets,n=e.setNewFillets,a=e.username,l=Object(c.useState)([]),r=Object(s.a)(l,2),o=r[0],j=r[1],b=Object(c.useState)(t||[]),d=Object(s.a)(b,2),O=d[0],m=d[1],h=Object(c.useState)(!1),p=Object(s.a)(h,2),x=p[0],v=p[1],g=Object(c.useState)(null),w=Object(s.a)(g,2),F=w[0],k=w[1];Object(c.useEffect)((function(){var e=Object(i.a)(t).concat(O);e.length!==o.length&&j(e)}),[o,t,O]),Object(c.useEffect)((function(){if(!x){u(a,(function(e,t){200===t?(k(e.next),m(e.results),v(!0)):alert("You have error :-D")}))}}),[O,x,a]);var y=function(e){var c=Object(i.a)(t);c.unshift(e),n(c)};return Object(f.jsxs)(f.Fragment,{children:[o.map((function(e){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(N,{fillet:e,handleRepost:y},e.id),Object(f.jsx)("hr",{})]})})),null!==F&&Object(f.jsx)("button",{onClick:function(e){if(e.preventDefault(),null!==F){u(a,(function(e,t){if(200===t){k(e.next);var n=Object(i.a)(o).concat(e.results);j(n),m(n)}else alert("You have error :-D")}),F)}},className:"btn btn-outline-primary btn-sm btn-dark",children:"More"})]})};var k=function(e){var t=e.newFillets,n=e.setNewFillets,a=e.username,l=Object(c.useState)([]),r=Object(s.a)(l,2),o=r[0],u=r[1],b=Object(c.useState)(t||[]),d=Object(s.a)(b,2),O=d[0],m=d[1],h=Object(c.useState)(!1),p=Object(s.a)(h,2),x=p[0],v=p[1],g=Object(c.useState)(null),w=Object(s.a)(g,2),F=w[0],k=w[1];Object(c.useEffect)((function(){var e=Object(i.a)(t).concat(O);e.length!==o.length&&u(e)}),[o,t,O]),Object(c.useEffect)((function(){if(!x){j((function(e,t){200===t&&(k(e.next),m(e.results),v(!0))}))}}),[O,x,a]);var y=function(e){var c=Object(i.a)(t);c.unshift(e),n(c)};return Object(f.jsxs)(f.Fragment,{children:[o.map((function(e){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(N,{fillet:e,handleRepost:y},e.id),Object(f.jsx)("hr",{})]})})),null!==F&&Object(f.jsx)("button",{onClick:function(e){if(e.preventDefault(),null!==F){j((function(e,t){if(200===t){k(e.next);var n=Object(i.a)(o).concat(e.results);u(n),m(n)}else alert("You have error :-D")}),F)}},className:"btn btn-outline-primary btn-sm btn-dark",children:"More"})]})};var y=function(e){var t=e.newFillets,n=e.setNewFillets,c=a.a.createRef(),l=function(e,c){if(console.log(e,c),201===c){var a=Object(i.a)(t);a.unshift(e),n(a)}else alert("you have error :-D")};return Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=c.current.value;c.current.value="",o("POST","/fillets/create/",l,{text:t})},children:[Object(f.jsx)("textarea",{className:"form-control",required:!0,ref:c}),Object(f.jsx)("button",{type:"submit",className:"btn btn-outline-primary btn-sm my-3 btn-dark",children:"Post"})]})};function S(e){var t=e.username,n=e.userCanPost,a=Object(c.useState)([]),l=Object(s.a)(a,2),r=l[0],i=l[1];return n="true"===n,Object(f.jsxs)("div",{className:"col-12 mb-3",children:[n&&Object(f.jsx)(y,{newFillets:r,setNewFillets:i}),Object(f.jsx)(F,{newFillets:r,setNewFillets:i,username:t})]})}function R(e){var t=e.filletId,n=Object(c.useState)(!1),a=Object(s.a)(n,2),l=a[0],r=a[1],i=Object(c.useState)(null),u=Object(s.a)(i,2),j=u[0],b=u[1],d=function(e,t){200===t?b(e):alert("Error: could not find fillet.")};return Object(c.useEffect)((function(){!1===l&&(!function(e,t){o("GET","/fillets/".concat(e,"/"),t)}(t,d),r(!0))}),[l,r,t]),null===j?null:Object(f.jsx)(N,{fillet:j,handleRepost:function(){}})}var E=a.a.createElement,C=document.getElementById("herring");C&&r.a.render(E(S,C.dataset),C);var T=document.getElementById("herring-feed");T&&r.a.render(E((function(e){var t=e.username,n=e.userCanPost,a=Object(c.useState)([]),l=Object(s.a)(a,2),r=l[0],i=l[1];return n="true"===n,Object(f.jsxs)("div",{className:"col-12 mb-3",children:[n&&Object(f.jsx)(y,{newFillets:r,setNewFillets:i}),Object(f.jsx)(k,{newFillets:r,setNewFillets:i,username:t})]})}),T.dataset),T),document.querySelectorAll(".herring-detail").forEach((function(e){r.a.render(E(R,e.dataset),e)})),document.querySelectorAll(".herring-profile-badge").forEach((function(e){r.a.render(E(w,e.dataset),e)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.78177e44.chunk.js.map