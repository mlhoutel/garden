import{D as et,S as xe,i as Le,s as Se,k as n,a as E,l as i,m as u,c as w,h as s,E as tt,p as o,b as H,F as l,G as ye,w as Qe,d as K,f as Ze,g as q,H as lt,r as M,u as C,n as _e,z as ce,A as ue,B as fe,C as de,I as st,q as rt,J as at,K as ot,L as nt,M as it,N as ct}from"../chunks/index.73c741f7.mjs";import{b as F}from"../chunks/paths.35ca2f55.mjs";import{I as Te,S as ut,M as ft,C as dt}from"../chunks/index.61d60e66.mjs";import{w as mt}from"../chunks/index.8e5b1c0d.mjs";import{s as ht,g as pt}from"../chunks/ScrollTo.20ad40bc.mjs";const _t=(f,e)=>{const r=mt(e),t=localStorage.getItem(f);return t!=null&&r.set(JSON.parse(t)),r.subscribe(a=>{a==null?localStorage.removeItem(f):localStorage.setItem(f,JSON.stringify(a))}),window.addEventListener("storage",()=>{const a=localStorage.getItem(f);if(a==null)return;const d=JSON.parse(a);d!==et(r)&&r.set(d)}),r},Be=_t("theme",!1);function Ke(f,e,r){const t=f.slice();return t[3]=e[r],t}function We(f){let e,r=f[3].label+"",t;return{c(){e=n("a"),t=M(r),this.h()},l(a){e=i(a,"A",{href:!0,class:!0});var d=u(e);t=C(d,r),d.forEach(s),this.h()},h(){o(e,"href",f[3].link),o(e,"class","background-primary md:background-dark font-serif px-1 w-[100%] md:w-5 block md:inline")},m(a,d){H(a,e,d),l(e,t)},p:_e,d(a){a&&s(e)}}}function vt(f){let e,r;return e=new Te({props:{src:ut,theme:"solid",class:"h-7"}}),{c(){ce(e.$$.fragment)},l(t){ue(e.$$.fragment,t)},m(t,a){fe(e,t,a),r=!0},p:_e,i(t){r||(q(e.$$.fragment,t),r=!0)},o(t){K(e.$$.fragment,t),r=!1},d(t){de(e,t)}}}function gt(f){let e,r;return e=new Te({props:{src:ft,theme:"solid",class:"h-6"}}),{c(){ce(e.$$.fragment)},l(t){ue(e.$$.fragment,t)},m(t,a){fe(e,t,a),r=!0},p:_e,i(t){r||(q(e.$$.fragment,t),r=!0)},o(t){K(e.$$.fragment,t),r=!1},d(t){de(e,t)}}}function bt(f){let e,r,t,a,d,h,p,_,j,y,R,T,I,O,g,c,v,$,D,P,B,U,Z,le,ee,z=f[0](),x=[];for(let m=0;m<z.length;m+=1)x[m]=We(Ke(f,z,m));const se=[gt,vt],V=[];function W(m,k){return m[1]?1:0}return v=W(f),$=V[v]=se[v](f),{c(){e=n("nav"),r=n("a"),t=n("div"),a=n("img"),h=E(),p=n("div"),_=n("div"),j=E(),y=n("div"),R=E(),T=n("div"),I=n("div");for(let m=0;m<x.length;m+=1)x[m].c();O=E(),g=n("div"),c=n("button"),$.c(),D=E(),P=n("div"),B=E(),U=n("div"),this.h()},l(m){e=i(m,"NAV",{class:!0});var k=u(e);r=i(k,"A",{href:!0});var S=u(r);t=i(S,"DIV",{class:!0});var b=u(t);a=i(b,"IMG",{src:!0,alt:!0,class:!0}),h=w(b),p=i(b,"DIV",{class:!0});var Y=u(p);_=i(Y,"DIV",{class:!0}),u(_).forEach(s),j=w(Y),y=i(Y,"DIV",{class:!0}),u(y).forEach(s),Y.forEach(s),b.forEach(s),S.forEach(s),R=w(k),T=i(k,"DIV",{class:!0});var re=u(T);I=i(re,"DIV",{class:!0});var te=u(I);for(let N=0;N<x.length;N+=1)x[N].l(te);te.forEach(s),re.forEach(s),O=w(k),g=i(k,"DIV",{class:!0});var ae=u(g);c=i(ae,"BUTTON",{class:!0});var oe=u(c);$.l(oe),oe.forEach(s),ae.forEach(s),D=w(k),P=i(k,"DIV",{class:!0}),u(P).forEach(s),k.forEach(s),B=w(m),U=i(m,"DIV",{class:!0}),u(U).forEach(s),this.h()},h(){tt(a.src,d=F+"/logos/sumblack.svg")||o(a,"src",d),o(a,"alt","logo"),o(a,"class","h-8 anti-skewed"),o(_,"class","background-dark h-8 w-1 mx-0.5"),o(y,"class","background-dark h-8 w-2 mx-0.5"),o(p,"class","absolute left-[55px] top-3 pl-5 flex"),o(t,"class","flex items-center flex-shrink-0 background-secondary px-5 py-2 absolute w-[100px] left-[-6px] top-0 skewed z-30"),o(r,"href",F+"/"),o(I,"class","anti-skewed pt-1 mt-10 md:ml-[125px] md:mt-0 overflow-hidden"),o(T,"class","background-dark md:w-full absolute top-3 h-9 skewed left-[-20px] z-20"),o(c,"class","flex items-center h-auto w-12 anti-skewed"),o(g,"class","absolute top-3 right-4 h-9 inline-flex bg-grey text-white skewed z-30"),o(P,"class","w-full block pt-12"),o(e,"class","background-tertiary flex items-center justify-between flex-wrap"),o(U,"class","w-full block h-[130px] md:h-0")},m(m,k){H(m,e,k),l(e,r),l(r,t),l(t,a),l(t,h),l(t,p),l(p,_),l(p,j),l(p,y),l(e,R),l(e,T),l(T,I);for(let S=0;S<x.length;S+=1)x[S].m(I,null);l(e,O),l(e,g),l(g,c),V[v].m(c,null),l(e,D),l(e,P),H(m,B,k),H(m,U,k),Z=!0,le||(ee=ye(c,"click",f[2]),le=!0)},p(m,[k]){if(k&1){z=m[0]();let b;for(b=0;b<z.length;b+=1){const Y=Ke(m,z,b);x[b]?x[b].p(Y,k):(x[b]=We(Y),x[b].c(),x[b].m(I,null))}for(;b<x.length;b+=1)x[b].d(1);x.length=z.length}let S=v;v=W(m),v===S?V[v].p(m,k):(Qe(),K(V[S],1,1,()=>{V[S]=null}),Ze(),$=V[v],$?$.p(m,k):($=V[v]=se[v](m),$.c()),q($,1),$.m(c,null))},i(m){Z||(q($),Z=!0)},o(m){K($),Z=!1},d(m){m&&s(e),lt(x,m),V[v].d(),m&&s(B),m&&s(U),le=!1,ee()}}}function $t(f,e,r){let t;Be.subscribe(h=>{r(1,t=h)});function a(){Be.set(!t),t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}function d(){return[{label:"Posts",link:`${F}/posts`},{label:"Sheets",link:`${F}/sheets`},{label:"Snippets",link:`${F}/snippets`},{label:"Projects",link:`${F}/projects`}]}return[d,t,a]}class kt extends xe{constructor(e){super(),Le(this,e,$t,bt,Se,{getMenuItems:0})}get getMenuItems(){return this.$$.ctx[0]}}const Et=pt(),wt=async f=>{const e=Object.assign(Et,f),r=0,{duration:t,offset:a,onStart:d,onDone:h}=e;d&&d({offset:a,duration:t,endPosition:r}),await ht(r,e),h&&h({offset:a,duration:t,endPosition:r})};function Xe(f){let e,r,t,a,d;return r=new Te({props:{src:dt,size:"35px"}}),{c(){e=n("button"),ce(r.$$.fragment),this.h()},l(h){e=i(h,"BUTTON",{class:!0,style:!0});var p=u(e);ue(r.$$.fragment,p),p.forEach(s),this.h()},h(){o(e,"class","z-30 fixed bottom-10 right-10 background-primary p-2 rounded-full"),rt(e,"box-shadow","rgba(0,0,0,0.5) 0px 3px 5px 0px")},m(h,p){H(h,e,p),fe(r,e,null),t=!0,a||(d=ye(e,"click",f[0]),a=!0)},p:_e,i(h){t||(q(r.$$.fragment,h),t=!0)},o(h){K(r.$$.fragment,h),t=!1},d(h){h&&s(e),de(r),a=!1,d()}}}function It(f){let e=!1,r=()=>{e=!1},t,a,d,h,p,_,j,y,R,T,I,O,g,c,v,$,D,P,B,U,Z,le,ee,z,x,se,V,W,m,k,S,b,Y,re,te,ae,oe,N,X,ve,ge,ne,be,$e,ke,Q,Ee,me,we,Ae;st(f[3]);let L=f[1]>50&&Xe(f);return{c(){L&&L.c(),a=E(),d=n("div"),h=n("article"),p=n("div"),_=n("ul"),j=n("li"),y=n("a"),R=M("home"),T=E(),I=n("li"),O=n("a"),g=M("posts"),c=E(),v=n("li"),$=n("a"),D=M("sheets"),P=E(),B=n("li"),U=n("a"),Z=M("snippets"),le=E(),ee=n("li"),z=n("a"),x=M("projects"),se=E(),V=n("li"),W=n("a"),m=M("portfolio"),k=E(),S=n("div"),b=n("h2"),Y=M("About"),re=E(),te=n("p"),ae=M("This website was made with sveltekit / tailwind / mdsvex"),oe=E(),N=n("div"),X=n("a"),ve=M("COPYLEFT"),ge=E(),ne=n("span"),be=M(f[2]),$e=M(" MAEL LHOUTELLIER"),ke=E(),Q=n("a"),Ee=M("SOURCE"),this.h()},l(A){L&&L.l(A),a=w(A),d=i(A,"DIV",{class:!0});var G=u(d);h=i(G,"ARTICLE",{class:!0});var he=u(h);p=i(he,"DIV",{class:!0});var Oe=u(p);_=i(Oe,"UL",{class:!0});var J=u(_);j=i(J,"LI",{});var De=u(j);y=i(De,"A",{href:!0});var Ve=u(y);R=C(Ve,"home"),Ve.forEach(s),De.forEach(s),T=w(J),I=i(J,"LI",{});var Ne=u(I);O=i(Ne,"A",{href:!0});var Me=u(O);g=C(Me,"posts"),Me.forEach(s),Ne.forEach(s),c=w(J),v=i(J,"LI",{});var Ce=u(v);$=i(Ce,"A",{href:!0});var je=u($);D=C(je,"sheets"),je.forEach(s),Ce.forEach(s),P=w(J),B=i(J,"LI",{});var Ue=u(B);U=i(Ue,"A",{href:!0});var ze=u(U);Z=C(ze,"snippets"),ze.forEach(s),Ue.forEach(s),le=w(J),ee=i(J,"LI",{});var Fe=u(ee);z=i(Fe,"A",{href:!0});var Pe=u(z);x=C(Pe,"projects"),Pe.forEach(s),Fe.forEach(s),se=w(J),V=i(J,"LI",{});var Ge=u(V);W=i(Ge,"A",{href:!0});var Je=u(W);m=C(Je,"portfolio"),Je.forEach(s),Ge.forEach(s),J.forEach(s),Oe.forEach(s),k=w(he),S=i(he,"DIV",{class:!0});var pe=u(S);b=i(pe,"H2",{class:!0});var Re=u(b);Y=C(Re,"About"),Re.forEach(s),re=w(pe),te=i(pe,"P",{});var Ye=u(te);ae=C(Ye,"This website was made with sveltekit / tailwind / mdsvex"),Ye.forEach(s),pe.forEach(s),he.forEach(s),oe=w(G),N=i(G,"DIV",{class:!0});var ie=u(N);X=i(ie,"A",{class:!0,href:!0,target:!0,rel:!0});var He=u(X);ve=C(He,"COPYLEFT"),He.forEach(s),ge=w(ie),ne=i(ie,"SPAN",{});var Ie=u(ne);be=C(Ie,f[2]),$e=C(Ie," MAEL LHOUTELLIER"),Ie.forEach(s),ke=w(ie),Q=i(ie,"A",{class:!0,href:!0,target:!0,rel:!0});var qe=u(Q);Ee=C(qe,"SOURCE"),qe.forEach(s),ie.forEach(s),G.forEach(s),this.h()},h(){o(y,"href",F+"/"),o(O,"href",F+"/posts"),o($,"href",F+"/sheets"),o(U,"href",F+"/snippets"),o(z,"href",F+"/projects"),o(W,"href",F+"/portfolio"),o(_,"class","list-none underline"),o(p,"class","px-10"),o(b,"class","pt-0"),o(S,"class","px-10"),o(h,"class","flex margin-auto"),o(X,"class","underline px-1"),o(X,"href","https://creativecommons.org/licenses/by-sa/3.0/"),o(X,"target","_blank"),o(X,"rel","noreferrer"),o(Q,"class","underline px-1"),o(Q,"href","https://github.com/mlhoutel/garden"),o(Q,"target","_blank"),o(Q,"rel","noreferrer"),o(N,"class","flex justify-center pt-10 px-20 flex-col md:flex-row"),o(d,"class","background-tertiary w-full bottom-0 py-10 px-5 pointer-events-auto")},m(A,G){L&&L.m(A,G),H(A,a,G),H(A,d,G),l(d,h),l(h,p),l(p,_),l(_,j),l(j,y),l(y,R),l(_,T),l(_,I),l(I,O),l(O,g),l(_,c),l(_,v),l(v,$),l($,D),l(_,P),l(_,B),l(B,U),l(U,Z),l(_,le),l(_,ee),l(ee,z),l(z,x),l(_,se),l(_,V),l(V,W),l(W,m),l(h,k),l(h,S),l(S,b),l(b,Y),l(S,re),l(S,te),l(te,ae),l(d,oe),l(d,N),l(N,X),l(X,ve),l(N,ge),l(N,ne),l(ne,be),l(ne,$e),l(N,ke),l(N,Q),l(Q,Ee),me=!0,we||(Ae=ye(window,"scroll",()=>{e=!0,clearTimeout(t),t=setTimeout(r,100),f[3]()}),we=!0)},p(A,[G]){G&2&&!e&&(e=!0,clearTimeout(t),scrollTo(window.pageXOffset,A[1]),t=setTimeout(r,100)),A[1]>50?L?(L.p(A,G),G&2&&q(L,1)):(L=Xe(A),L.c(),q(L,1),L.m(a.parentNode,a)):L&&(Qe(),K(L,1,1,()=>{L=null}),Ze())},i(A){me||(q(L),me=!0)},o(A){K(L),me=!1},d(A){L&&L.d(A),A&&s(a),A&&s(d),we=!1,Ae()}}}function xt(f,e,r){let t;function a(){wt()}const d=new Date().getFullYear();function h(){r(1,t=window.pageYOffset)}return[a,t,d,h]}class Lt extends xe{constructor(e){super(),Le(this,e,xt,It,Se,{navigateTop:0})}get navigateTop(){return this.$$.ctx[0]}}function St(f){let e,r,t,a,d,h,p,_,j,y,R,T,I;_=new kt({});const O=f[1].default,g=at(O,f,f[0],null);return T=new Lt({}),{c(){e=n("link"),r=E(),t=n("link"),a=n("script"),d=M(`if (document) {
			if (
				localStorage.theme === 'true' ||
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				document.documentElement.classList.add('dark');
				localStorage.theme = true;
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.theme = false;
			}
		}`),h=E(),p=n("body"),ce(_.$$.fragment),j=E(),y=n("main"),g&&g.c(),R=E(),ce(T.$$.fragment),this.h()},l(c){e=i(c,"LINK",{rel:!0,href:!0,integrity:!0,crossorigin:!0}),r=w(c);const v=ot("svelte-sv2z6z",document.head);t=i(v,"LINK",{rel:!0,href:!0}),a=i(v,"SCRIPT",{});var $=u(a);d=C($,`if (document) {
			if (
				localStorage.theme === 'true' ||
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				document.documentElement.classList.add('dark');
				localStorage.theme = true;
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.theme = false;
			}
		}`),$.forEach(s),v.forEach(s),h=w(c),p=i(c,"BODY",{class:!0});var D=u(p);ue(_.$$.fragment,D),j=w(D),y=i(D,"MAIN",{});var P=u(y);g&&g.l(P),P.forEach(s),R=w(D),ue(T.$$.fragment,D),D.forEach(s),this.h()},h(){o(e,"rel","stylesheet"),o(e,"href","https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"),o(e,"integrity","sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"),o(e,"crossorigin","anonymous"),o(t,"rel","icon"),o(t,"href",F+"/favicon/favicon.png"),document.title="Garden - Maël Lhoutellier",o(p,"class","background-primary")},m(c,v){H(c,e,v),H(c,r,v),l(document.head,t),l(document.head,a),l(a,d),H(c,h,v),H(c,p,v),fe(_,p,null),l(p,j),l(p,y),g&&g.m(y,null),l(p,R),fe(T,p,null),I=!0},p(c,[v]){g&&g.p&&(!I||v&1)&&nt(g,O,c,c[0],I?ct(O,c[0],v,null):it(c[0]),null)},i(c){I||(q(_.$$.fragment,c),q(g,c),q(T.$$.fragment,c),I=!0)},o(c){K(_.$$.fragment,c),K(g,c),K(T.$$.fragment,c),I=!1},d(c){c&&s(e),c&&s(r),s(t),s(a),c&&s(h),c&&s(p),de(_),g&&g.d(c),de(T)}}}function yt(f,e,r){let{$$slots:t={},$$scope:a}=e;return f.$$set=d=>{"$$scope"in d&&r(0,a=d.$$scope)},[a,t]}class Nt extends xe{constructor(e){super(),Le(this,e,yt,St,Se,{})}}export{Nt as default};
