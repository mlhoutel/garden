import{S as ye,i as Ee,s as xe,k as c,r as N,a as T,l as u,m as g,u as j,h as f,c as w,p as a,q as se,b as ie,F as t,Z as H,G as A,_ as $,v as Ie,n as ne,$ as ke,x as De,E as be}from"../chunks/index.7aa01268.js";function Le(r){let e,l;return{c(){e=c("p"),l=N("no input image..."),this.h()},l(s){e=u(s,"P",{class:!0});var n=g(e);l=j(n,"no input image..."),n.forEach(f),this.h()},h(){a(e,"class","text-sm text-center italic")},m(s,n){ie(s,e,n),t(e,l)},p:ne,d(s){s&&f(e)}}}function Pe(r){let e,l,s,n;return{c(){e=c("img"),this.h()},l(o){e=u(o,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){a(e,"class","max-h-[200px]"),be(e.src,l=r[4])||a(e,"src",l),a(e,"alt","")},m(o,h){ie(o,e,h),r[14](e),s||(n=A(e,"load",r[8]),s=!0)},p(o,h){h&16&&!be(e.src,l=o[4])&&a(e,"src",l)},d(o){o&&f(e),r[14](null),s=!1,n()}}}function Te(r){let e,l,s,n,o,h,E,x,C,_,U,v,D,O,S,b,W,m,I,L,R,k,i,M,y,ee,V,te,B,ae,le,q,Z,z,J,re,oe;function ce(d,p){return d[4]?Pe:Le}let K=ce(r),P=K(r);return{c(){e=c("article"),l=c("div"),s=c("div"),n=c("label"),o=N("image:"),h=T(),E=c("label"),x=N("Click to select a file"),C=T(),_=c("input"),U=T(),v=c("div"),D=c("label"),O=N("gradient:"),S=T(),b=c("input"),W=T(),m=c("div"),I=c("label"),L=N("scale:"),R=T(),k=c("div"),i=c("input"),M=T(),y=c("input"),ee=T(),V=c("div"),P.c(),te=T(),B=c("button"),ae=N("copy"),le=T(),q=c("div"),Z=c("pre"),z=c("code"),J=N(r[6]),this.h()},l(d){e=u(d,"ARTICLE",{});var p=g(e);l=u(p,"DIV",{class:!0});var G=g(l);s=u(G,"DIV",{class:!0});var F=g(s);n=u(F,"LABEL",{for:!0,class:!0});var ue=g(n);o=j(ue,"image:"),ue.forEach(f),h=w(F),E=u(F,"LABEL",{for:!0,class:!0});var fe=g(E);x=j(fe,"Click to select a file"),fe.forEach(f),C=w(F),_=u(F,"INPUT",{type:!0,accept:!0,id:!0,class:!0}),F.forEach(f),U=w(G),v=u(G,"DIV",{class:!0});var Q=g(v);D=u(Q,"LABEL",{for:!0,class:!0});var de=g(D);O=j(de,"gradient:"),de.forEach(f),S=w(Q),b=u(Q,"INPUT",{type:!0,id:!0,class:!0,style:!0}),Q.forEach(f),W=w(G),m=u(G,"DIV",{class:!0});var X=g(m);I=u(X,"LABEL",{for:!0,class:!0});var pe=g(I);L=j(pe,"scale:"),pe.forEach(f),R=w(X),k=u(X,"DIV",{class:!0});var Y=g(k);i=u(Y,"INPUT",{type:!0,min:!0,max:!0,id:!0,style:!0}),M=w(Y),y=u(Y,"INPUT",{type:!0,min:!0,max:!0,style:!0}),Y.forEach(f),X.forEach(f),G.forEach(f),ee=w(p),V=u(p,"DIV",{class:!0});var he=g(V);P.l(he),he.forEach(f),te=w(p),B=u(p,"BUTTON",{class:!0});var me=g(B);ae=j(me,"copy"),me.forEach(f),le=w(p),q=u(p,"DIV",{class:!0});var ge=g(q);Z=u(ge,"PRE",{});var _e=g(Z);z=u(_e,"CODE",{});var ve=g(z);J=j(ve,r[6]),ve.forEach(f),_e.forEach(f),ge.forEach(f),p.forEach(f),this.h()},h(){a(n,"for","image"),a(n,"class","text-sm"),a(E,"for","image"),a(E,"class","underline cursor-pointer"),a(_,"type","file"),a(_,"accept",".jpg, .jpeg, .png"),a(_,"id","image"),a(_,"class","hidden"),a(s,"class","flex flex-col px-2"),a(D,"for","gradient"),a(D,"class","text-sm"),a(b,"type","text"),a(b,"id","gradient"),a(b,"class","w-28"),se(b,"background-color","transparent"),a(v,"class","flex flex-col px-2"),a(I,"for","scaling"),a(I,"class","text-sm"),a(i,"type","number"),a(i,"min","1"),a(i,"max","100"),a(i,"id","scaling"),se(i,"background-color","transparent"),a(y,"type","number"),a(y,"min","1"),a(y,"max","100"),se(y,"background-color","transparent"),a(k,"class","inline-flex"),a(m,"class","flex flex-col px-2"),a(l,"class","p-3 inline-flex"),a(V,"class","min-h-[200px] flex justify-center items-center"),a(B,"class","text-sm underline"),a(q,"class","font-mono overflow-auto mt-1 mb-10 p-3 rounded max-h-[600px] flex justify-center items-center")},m(d,p){ie(d,e,p),t(e,l),t(l,s),t(s,n),t(n,o),t(s,h),t(s,E),t(E,x),t(s,C),t(s,_),t(l,U),t(l,v),t(v,D),t(D,O),t(v,S),t(v,b),H(b,r[1]),t(l,W),t(l,m),t(m,I),t(I,L),t(m,R),t(m,k),t(k,i),H(i,r[2]),t(k,M),t(k,y),H(y,r[3]),t(e,ee),t(e,V),P.m(V,null),t(e,te),t(e,B),t(B,ae),t(e,le),t(e,q),t(q,Z),t(Z,z),t(z,J),re||(oe=[A(_,"change",r[10]),A(_,"change",r[7]),A(b,"input",r[11]),A(b,"change",r[8]),A(i,"input",r[12]),A(i,"change",r[8]),A(y,"input",r[13]),A(y,"change",r[8]),A(B,"click",r[9])],re=!0)},p(d,[p]){p&2&&b.value!==d[1]&&H(b,d[1]),p&4&&$(i.value)!==d[2]&&H(i,d[2]),p&8&&$(y.value)!==d[3]&&H(y,d[3]),K===(K=ce(d))&&P?P.p(d,p):(P.d(1),P=K(d),P&&(P.c(),P.m(V,null))),p&64&&Ie(J,d[6])},i:ne,o:ne,d(d){d&&f(e),P.d(),re=!1,ke(oe)}}}function we(r){const e=document.createElement("canvas");e.width=r.naturalWidth,e.height=r.naturalHeight;const l=e.getContext("2d");return l.drawImage(r,0,0),l.getImageData(0,0,e.width,e.height).data}function Ae(r,e,l){return Math.floor((r+e+l)/3)}function Ce(r,e,l,s,n,o,h){let E=0;const x=e-Math.floor(s/2),C=l-Math.floor(n/2);for(let _=0;_<n;_++){const U=C+_;for(let v=0;v<s;v++){const D=x+v;E+=r[D+U*o]}}return E/(s*n)}function Me(r,e,l){let s,n="▓▓▒▒░░  ",o=10,h=25,E,x,C=("□ ■ ".repeat(30)+`
`+"■ □ ".repeat(30)+`
`).repeat(10);function _(m){const I=new FileReader;I.readAsDataURL(m.target.files[0]),I.onload=L=>{l(4,E=L.target.result)}}async function U(){const m=x.naturalWidth,I=x.naturalHeight,L=we(x),R=new Uint8Array(L.length/4);for(let i=0;i<L.length;i+=4){const M=Ae(L[i],L[i+1],L[i+2]);R[i/4]=M}let k="";for(let i=Math.round(h/2);i<I-h;i+=h){for(let M=Math.round(o/2);M<m-o;M+=o){const y=Ce(R,M,i,o,h,m);k+=n[Math.floor(y/255*(n.length-1))]}k+=`
`}l(6,C=k)}function v(){navigator.clipboard.writeText(C)}function D(){s=this.files,l(0,s)}function O(){n=this.value,l(1,n)}function S(){o=$(this.value),l(2,o)}function b(){h=$(this.value),l(3,h)}function W(m){De[m?"unshift":"push"](()=>{x=m,l(5,x)})}return[s,n,o,h,E,x,C,_,U,v,D,O,S,b,W]}class Ve extends ye{constructor(e){super(),Ee(this,e,Me,Te,xe,{})}}export{Ve as component};
