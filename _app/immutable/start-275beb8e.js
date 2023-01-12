import{S as at,i as ot,s as it,a as st,e as D,c as lt,b as J,g as Z,t as U,d as Q,f as V,h as C,j as ct,o as Pe,k as ft,l as ut,m as pt,n as $e,p as H,q as dt,r as ht,u as mt,v as M,w as G,x as oe,y as K,z,A as pe}from"./chunks/index-ed2ae908.js";import{S as nt,I as W,g as We,f as Ye,a as Re,b as de,s as X,i as Xe,c as _e,P as Ze,d as _t,e as gt}from"./chunks/singletons-0ded4d19.js";import{_ as N}from"./chunks/preload-helper-41c905a7.js";import{s as wt}from"./chunks/paths-b4419565.js";function yt(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function bt(r){return r.split("%25").map(decodeURI).join("%25")}function vt(r){for(const e in r)r[e]=decodeURIComponent(r[e]);return r}const Et=["href","pathname","search","searchParams","toString","toJSON"];function kt(r,e){const n=new URL(r);for(const i of Et){let a=n[i];Object.defineProperty(n,i,{get(){return e(),a},enumerable:!0,configurable:!0})}return $t(n),n}function $t(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Rt="/__data.json";function Ot(r){return r.replace(/\/$/,"")+Rt}function It(r){let e=5381;if(typeof r=="string"){let n=r.length;for(;n;)e=e*33^r.charCodeAt(--n)}else if(ArrayBuffer.isView(r)){const n=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let i=n.length;for(;i;)e=e*33^n[--i]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const ge=window.fetch;window.fetch=(r,e)=>((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"&&re.delete(Ne(r)),ge(r,e));const re=new Map;function St(r,e){const n=Ne(r,e),i=document.querySelector(n);if(i!=null&&i.textContent){const{body:a,...d}=JSON.parse(i.textContent),t=i.getAttribute("data-ttl");return t&&re.set(n,{body:a,init:d,ttl:1e3*Number(t)}),Promise.resolve(new Response(a,d))}return ge(r,e)}function Lt(r,e,n){if(re.size>0){const i=Ne(r,n),a=re.get(i);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(a.body,a.init);re.delete(i)}}return ge(e,n)}function Ne(r,e){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;return(e==null?void 0:e.body)&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(i+=`[data-hash="${It(e.body)}"]`),i}const Pt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function At(r){const e=[];return{pattern:r==="/"?/^\/$/:new RegExp(`^${Tt(r).map(i=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(i);if(a)return e.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const d=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(i);if(d)return e.push({name:d[1],matcher:d[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!i)return;const t=i.split(/\[(.+?)\](?!\])/);return"/"+t.map((u,p)=>{if(p%2){if(u.startsWith("x+"))return Oe(String.fromCharCode(parseInt(u.slice(2),16)));if(u.startsWith("u+"))return Oe(String.fromCharCode(...u.slice(2).split("-").map(P=>parseInt(P,16))));const g=Pt.exec(u);if(!g)throw new Error(`Invalid param: ${u}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,v,j,k,F]=g;return e.push({name:k,matcher:F,optional:!!v,rest:!!j,chained:j?p===1&&t[0]==="":!1}),j?"(.*?)":v?"([^/]*)?":"([^/]+?)"}return Oe(u)}).join("")}).join("")}/?$`),params:e}}function jt(r){return!/^\([^)]+\)$/.test(r)}function Tt(r){return r.slice(1).split("/").filter(jt)}function Nt(r,e,n){const i={},a=r.slice(1);let d="";for(let t=0;t<e.length;t+=1){const f=e[t];let u=a[t];if(f.chained&&f.rest&&d&&(u=u?d+"/"+u:d),d="",u===void 0)f.rest&&(i[f.name]="");else{if(f.matcher&&!n[f.matcher](u)){if(f.optional&&f.chained){let p=a.indexOf(void 0,t);if(p===-1){const g=e[t+1];if((g==null?void 0:g.rest)&&g.chained)d=u;else return}for(;p>=t;)a[p]=a[p-1],p-=1;continue}return}i[f.name]=u}}if(!d)return i}function Oe(r){return r.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Dt(r,e,n,i){const a=new Set(e);return Object.entries(n).map(([f,[u,p,g]])=>{const{pattern:v,params:j}=At(f),k={id:f,exec:F=>{const P=v.exec(F);if(P)return Nt(P,j,i)},errors:[1,...g||[]].map(F=>r[F]),layouts:[0,...p||[]].map(t),leaf:d(u)};return k.errors.length=k.layouts.length=Math.max(k.errors.length,k.layouts.length),k});function d(f){const u=f<0;return u&&(f=~f),[u,r[f]]}function t(f){return f===void 0?f:[a.has(f),r[f]]}}function Ut(r){let e,n,i;var a=r[0][0];function d(t){return{props:{data:t[2],form:t[1]}}}return a&&(e=M(a,d(r))),{c(){e&&G(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,f){e&&K(e,t,f),J(t,n,f),i=!0},p(t,f){const u={};if(f&4&&(u.data=t[2]),f&2&&(u.form=t[1]),a!==(a=t[0][0])){if(e){Z();const p=e;U(p.$$.fragment,1,0,()=>{z(p,1)}),Q()}a?(e=M(a,d(t)),G(e.$$.fragment),V(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else a&&e.$set(u)},i(t){i||(e&&V(e.$$.fragment,t),i=!0)},o(t){e&&U(e.$$.fragment,t),i=!1},d(t){t&&C(n),e&&z(e,t)}}}function Vt(r){let e,n,i;var a=r[0][0];function d(t){return{props:{data:t[2],$$slots:{default:[Bt]},$$scope:{ctx:t}}}}return a&&(e=M(a,d(r))),{c(){e&&G(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,f){e&&K(e,t,f),J(t,n,f),i=!0},p(t,f){const u={};if(f&4&&(u.data=t[2]),f&1051&&(u.$$scope={dirty:f,ctx:t}),a!==(a=t[0][0])){if(e){Z();const p=e;U(p.$$.fragment,1,0,()=>{z(p,1)}),Q()}a?(e=M(a,d(t)),G(e.$$.fragment),V(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else a&&e.$set(u)},i(t){i||(e&&V(e.$$.fragment,t),i=!0)},o(t){e&&U(e.$$.fragment,t),i=!1},d(t){t&&C(n),e&&z(e,t)}}}function qt(r){let e,n,i;var a=r[0][1];function d(t){return{props:{data:t[3],form:t[1]}}}return a&&(e=M(a,d(r))),{c(){e&&G(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,f){e&&K(e,t,f),J(t,n,f),i=!0},p(t,f){const u={};if(f&8&&(u.data=t[3]),f&2&&(u.form=t[1]),a!==(a=t[0][1])){if(e){Z();const p=e;U(p.$$.fragment,1,0,()=>{z(p,1)}),Q()}a?(e=M(a,d(t)),G(e.$$.fragment),V(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else a&&e.$set(u)},i(t){i||(e&&V(e.$$.fragment,t),i=!0)},o(t){e&&U(e.$$.fragment,t),i=!1},d(t){t&&C(n),e&&z(e,t)}}}function Ct(r){let e,n,i;var a=r[0][1];function d(t){return{props:{data:t[3],$$slots:{default:[Ft]},$$scope:{ctx:t}}}}return a&&(e=M(a,d(r))),{c(){e&&G(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,f){e&&K(e,t,f),J(t,n,f),i=!0},p(t,f){const u={};if(f&8&&(u.data=t[3]),f&1043&&(u.$$scope={dirty:f,ctx:t}),a!==(a=t[0][1])){if(e){Z();const p=e;U(p.$$.fragment,1,0,()=>{z(p,1)}),Q()}a?(e=M(a,d(t)),G(e.$$.fragment),V(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else a&&e.$set(u)},i(t){i||(e&&V(e.$$.fragment,t),i=!0)},o(t){e&&U(e.$$.fragment,t),i=!1},d(t){t&&C(n),e&&z(e,t)}}}function Ft(r){let e,n,i;var a=r[0][2];function d(t){return{props:{data:t[4],form:t[1]}}}return a&&(e=M(a,d(r))),{c(){e&&G(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,f){e&&K(e,t,f),J(t,n,f),i=!0},p(t,f){const u={};if(f&16&&(u.data=t[4]),f&2&&(u.form=t[1]),a!==(a=t[0][2])){if(e){Z();const p=e;U(p.$$.fragment,1,0,()=>{z(p,1)}),Q()}a?(e=M(a,d(t)),G(e.$$.fragment),V(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else a&&e.$set(u)},i(t){i||(e&&V(e.$$.fragment,t),i=!0)},o(t){e&&U(e.$$.fragment,t),i=!1},d(t){t&&C(n),e&&z(e,t)}}}function Bt(r){let e,n,i,a;const d=[Ct,qt],t=[];function f(u,p){return u[0][2]?0:1}return e=f(r),n=t[e]=d[e](r),{c(){n.c(),i=D()},l(u){n.l(u),i=D()},m(u,p){t[e].m(u,p),J(u,i,p),a=!0},p(u,p){let g=e;e=f(u),e===g?t[e].p(u,p):(Z(),U(t[g],1,1,()=>{t[g]=null}),Q(),n=t[e],n?n.p(u,p):(n=t[e]=d[e](u),n.c()),V(n,1),n.m(i.parentNode,i))},i(u){a||(V(n),a=!0)},o(u){U(n),a=!1},d(u){t[e].d(u),u&&C(i)}}}function Qe(r){let e,n=r[6]&&xe(r);return{c(){e=ft("div"),n&&n.c(),this.h()},l(i){e=ut(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var a=pt(e);n&&n.l(a),a.forEach(C),this.h()},h(){$e(e,"id","svelte-announcer"),$e(e,"aria-live","assertive"),$e(e,"aria-atomic","true"),H(e,"position","absolute"),H(e,"left","0"),H(e,"top","0"),H(e,"clip","rect(0 0 0 0)"),H(e,"clip-path","inset(50%)"),H(e,"overflow","hidden"),H(e,"white-space","nowrap"),H(e,"width","1px"),H(e,"height","1px")},m(i,a){J(i,e,a),n&&n.m(e,null)},p(i,a){i[6]?n?n.p(i,a):(n=xe(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&C(e),n&&n.d()}}}function xe(r){let e;return{c(){e=dt(r[7])},l(n){e=ht(n,r[7])},m(n,i){J(n,e,i)},p(n,i){i&128&&mt(e,n[7])},d(n){n&&C(e)}}}function Jt(r){let e,n,i,a,d;const t=[Vt,Ut],f=[];function u(g,v){return g[0][1]?0:1}e=u(r),n=f[e]=t[e](r);let p=r[5]&&Qe(r);return{c(){n.c(),i=st(),p&&p.c(),a=D()},l(g){n.l(g),i=lt(g),p&&p.l(g),a=D()},m(g,v){f[e].m(g,v),J(g,i,v),p&&p.m(g,v),J(g,a,v),d=!0},p(g,[v]){let j=e;e=u(g),e===j?f[e].p(g,v):(Z(),U(f[j],1,1,()=>{f[j]=null}),Q(),n=f[e],n?n.p(g,v):(n=f[e]=t[e](g),n.c()),V(n,1),n.m(i.parentNode,i)),g[5]?p?p.p(g,v):(p=Qe(g),p.c(),p.m(a.parentNode,a)):p&&(p.d(1),p=null)},i(g){d||(V(n),d=!0)},o(g){U(n),d=!1},d(g){f[e].d(g),g&&C(i),p&&p.d(g),g&&C(a)}}}function Mt(r,e,n){let{stores:i}=e,{page:a}=e,{components:d}=e,{form:t}=e,{data_0:f=null}=e,{data_1:u=null}=e,{data_2:p=null}=e;ct(i.page.notify);let g=!1,v=!1,j=null;return Pe(()=>{const k=i.page.subscribe(()=>{g&&(n(6,v=!0),n(7,j=document.title||"untitled page"))});return n(5,g=!0),k}),r.$$set=k=>{"stores"in k&&n(8,i=k.stores),"page"in k&&n(9,a=k.page),"components"in k&&n(0,d=k.components),"form"in k&&n(1,t=k.form),"data_0"in k&&n(2,f=k.data_0),"data_1"in k&&n(3,u=k.data_1),"data_2"in k&&n(4,p=k.data_2)},r.$$.update=()=>{r.$$.dirty&768&&i.page.set(a)},[d,t,f,u,p,g,v,j,i,a]}class Gt extends at{constructor(e){super(),ot(this,e,Mt,Jt,it,{stores:8,page:9,components:0,form:1,data_0:2,data_1:3,data_2:4})}}const Kt={},we=[()=>N(()=>import("./chunks/0-001271b4.js"),["./chunks/0-001271b4.js","./chunks/_layout-da46b06b.js","./components/pages/_layout.svelte-3d7a7cd1.js","./chunks/index-ed2ae908.js","./chunks/paths-b4419565.js","./chunks/index-7f063db5.js","./chunks/index-12744ae5.js","./chunks/ScrollTo-113085a1.js","./assets/_layout-254105d8.css"],import.meta.url),()=>N(()=>import("./chunks/1-555fde60.js"),["./chunks/1-555fde60.js","./components/error.svelte-4a2a8908.js","./chunks/index-ed2ae908.js","./chunks/stores-fdf5a58f.js","./chunks/singletons-0ded4d19.js","./chunks/index-7f063db5.js","./chunks/paths-b4419565.js"],import.meta.url),()=>N(()=>import("./chunks/2-0c94b08b.js"),["./chunks/2-0c94b08b.js","./components/pages/posts/_layout.svelte-836a961d.js","./chunks/index-ed2ae908.js"],import.meta.url),()=>N(()=>import("./chunks/3-bcaa2d9e.js"),["./chunks/3-bcaa2d9e.js","./components/pages/sheets/_layout.svelte-836a961d.js","./chunks/index-ed2ae908.js"],import.meta.url),()=>N(()=>import("./chunks/4-a69d6ee1.js"),["./chunks/4-a69d6ee1.js","./components/pages/snippets/_layout.svelte-836a961d.js","./chunks/index-ed2ae908.js"],import.meta.url),()=>N(()=>import("./chunks/5-c382bd32.js"),["./chunks/5-c382bd32.js","./chunks/_page-01d17a57.js","./chunks/paths-b4419565.js","./components/pages/_page.svelte-5828b5e4.js","./chunks/index-ed2ae908.js"],import.meta.url),()=>N(()=>import("./chunks/6-57a2e73b.js"),["./chunks/6-57a2e73b.js","./components/pages/portfolio/_page.svelte-54247798.js","./chunks/index-ed2ae908.js","./chunks/ScrollTo-113085a1.js","./chunks/index-7f063db5.js","./chunks/paths-b4419565.js","./chunks/index-12744ae5.js","./chunks/TopicPill-59b1583d.js"],import.meta.url),()=>N(()=>import("./chunks/7-1a05375c.js"),["./chunks/7-1a05375c.js","./chunks/_page-f8ccc2d9.js","./chunks/paths-b4419565.js","./components/pages/posts/_page.svelte-bf7cfa26.js","./chunks/index-ed2ae908.js","./chunks/ContentList-c736f7bc.js","./chunks/TopicPill-59b1583d.js","./chunks/index-12744ae5.js"],import.meta.url),()=>N(()=>import("./chunks/8-044ae669.js"),["./chunks/8-044ae669.js","./chunks/_page-101f58c2.js","./chunks/preload-helper-41c905a7.js","./chunks/dynamic-import-helper-be004503.js","./components/pages/posts/_slug_/_page.svelte-2f411a97.js","./chunks/index-ed2ae908.js"],import.meta.url),()=>N(()=>import("./chunks/9-4b65a73e.js"),["./chunks/9-4b65a73e.js","./components/pages/projects/_page.svelte-837df2e2.js","./chunks/index-ed2ae908.js"],import.meta.url),()=>N(()=>import("./chunks/10-064e61d6.js"),["./chunks/10-064e61d6.js","./chunks/_page-4e49c980.js","./chunks/paths-b4419565.js","./components/pages/sheets/_page.svelte-a65f47fd.js","./chunks/index-ed2ae908.js","./chunks/ContentList-c736f7bc.js","./chunks/TopicPill-59b1583d.js","./chunks/index-12744ae5.js"],import.meta.url),()=>N(()=>import("./chunks/11-fa7bd3fd.js"),["./chunks/11-fa7bd3fd.js","./chunks/_page-8bcea8ec.js","./chunks/preload-helper-41c905a7.js","./chunks/dynamic-import-helper-be004503.js","./components/pages/sheets/_slug_/_page.svelte-447968d3.js","./chunks/index-ed2ae908.js","./chunks/BreadCrumbs-209f0fdc.js","./chunks/stores-fdf5a58f.js","./chunks/singletons-0ded4d19.js","./chunks/index-7f063db5.js","./chunks/paths-b4419565.js"],import.meta.url),()=>N(()=>import("./chunks/12-e44a69b9.js"),["./chunks/12-e44a69b9.js","./chunks/_page-6b598108.js","./chunks/paths-b4419565.js","./components/pages/snippets/_page.svelte-33cc1577.js","./chunks/index-ed2ae908.js","./chunks/ContentList-c736f7bc.js","./chunks/TopicPill-59b1583d.js","./chunks/index-12744ae5.js"],import.meta.url),()=>N(()=>import("./chunks/13-152a19b1.js"),["./chunks/13-152a19b1.js","./chunks/_page-c36cc69b.js","./chunks/preload-helper-41c905a7.js","./chunks/dynamic-import-helper-be004503.js","./components/pages/snippets/_slug_/_page.svelte-447968d3.js","./chunks/index-ed2ae908.js","./chunks/BreadCrumbs-209f0fdc.js","./chunks/stores-fdf5a58f.js","./chunks/singletons-0ded4d19.js","./chunks/index-7f063db5.js","./chunks/paths-b4419565.js"],import.meta.url)],zt=[],Ht={"/":[5],"/portfolio":[6],"/posts":[7,[2]],"/posts/[slug]":[8,[2]],"/projects":[9],"/sheets":[10,[3]],"/sheets/[slug]":[11,[3]],"/snippets":[12,[4]],"/snippets/[slug]":[13,[4]]},Wt={handleError:({error:r})=>{console.error(r)}};class Ae{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class et{constructor(e,n){this.status=e,this.location=n}}async function Yt(r){var e;for(const n in r)if(typeof((e=r[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([i,a])=>[i,await a])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Xt=-1,Zt=-2,Qt=-3,xt=-4,en=-5,tn=-6;function nn(r){if(typeof r=="number")return i(r,!0);if(!Array.isArray(r)||r.length===0)throw new Error("Invalid input");const e=r,n=Array(e.length);function i(a,d=!1){if(a===Xt)return;if(a===Qt)return NaN;if(a===xt)return 1/0;if(a===en)return-1/0;if(a===tn)return-0;if(d)throw new Error("Invalid input");if(a in n)return n[a];const t=e[a];if(!t||typeof t!="object")n[a]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":n[a]=new Date(t[1]);break;case"Set":const u=new Set;n[a]=u;for(let v=1;v<t.length;v+=1)u.add(i(t[v]));break;case"Map":const p=new Map;n[a]=p;for(let v=1;v<t.length;v+=2)p.set(i(t[v]),i(t[v+1]));break;case"RegExp":n[a]=new RegExp(t[1],t[2]);break;case"Object":n[a]=Object(t[1]);break;case"BigInt":n[a]=BigInt(t[1]);break;case"null":const g=Object.create(null);n[a]=g;for(let v=1;v<t.length;v+=2)g[t[v]]=i(t[v+1]);break}else{const f=new Array(t.length);n[a]=f;for(let u=0;u<t.length;u+=1){const p=t[u];p!==Zt&&(f[u]=i(p))}}else{const f={};n[a]=f;for(const u in t){const p=t[u];f[u]=i(p)}}return n[a]}return i(0)}const Ie=Dt(we,zt,Ht,Kt),je=we[0],Te=we[1];je();Te();let ae={};try{ae=JSON.parse(sessionStorage[nt])}catch{}function Se(r){ae[r]=_e()}function rn({target:r,base:e}){var Ke;const n=document.documentElement,i=[];let a=null;const d={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},f=!1,u=!1,p=!0,g=!1,v=!1,j=!1,k=!1,F,P=(Ke=history.state)==null?void 0:Ke[W];P||(P=Date.now(),history.replaceState({...history.state,[W]:P},"",location.href));const ye=ae[P];ye&&(history.scrollRestoration="manual",scrollTo(ye.x,ye.y));let Y,De,ie;async function Ue(){ie=ie||Promise.resolve(),await ie,ie=null;const o=new URL(location.href),s=ce(o,!0);a=null,await qe(s,o,[])}async function be(o,{noScroll:s=!1,replaceState:c=!1,keepFocus:l=!1,state:m={},invalidateAll:h=!1},_,b){return typeof o=="string"&&(o=new URL(o,We(document))),fe({url:o,scroll:s?_e():null,keepfocus:l,redirect_chain:_,details:{state:m,replaceState:c},nav_token:b,accepted:()=>{h&&(k=!0)},blocked:()=>{},type:"goto"})}async function Ve(o){const s=ce(o,!1);if(!s)throw new Error(`Attempted to preload a URL that does not belong to this app: ${o}`);return a={id:s.id,promise:Be(s).then(c=>(c.type==="loaded"&&c.state.error&&(a=null),c))},a.promise}async function se(...o){const c=Ie.filter(l=>o.some(m=>l.exec(m))).map(l=>Promise.all([...l.layouts,l.leaf].map(m=>m==null?void 0:m[1]())));await Promise.all(c)}async function qe(o,s,c,l,m={},h){var b,y;De=m;let _=o&&await Be(o);if(_||(_=await Ge(s,{id:null},await ne(new Error(`Not found: ${s.pathname}`),{url:s,params:{},route:{id:null}}),404)),s=(o==null?void 0:o.url)||s,De!==m)return!1;if(_.type==="redirect")if(c.length>10||c.includes(s.pathname))_=await le({status:500,error:await ne(new Error("Redirect loop"),{url:s,params:{},route:{id:null}}),url:s,route:{id:null}});else return be(new URL(_.location,s).href,{},[...c,s.pathname],m),!1;else((y=(b=_.props)==null?void 0:b.page)==null?void 0:y.status)>=400&&await X.updated.check()&&await ue(s);if(i.length=0,k=!1,g=!0,l&&l.details){const{details:w}=l,O=w.replaceState?0:1;w.state[W]=P+=O,history[w.replaceState?"replaceState":"pushState"](w.state,"",s)}if(a=null,u){t=_.state,_.props.page&&(_.props.page.url=s);const w=me();F.$set(_.props),w()}else Ce(_);if(l){const{scroll:w,keepfocus:O}=l;if(O||Le(),await pe(),p){const I=s.hash&&document.getElementById(s.hash.slice(1));w?scrollTo(w.x,w.y):I?I.scrollIntoView():scrollTo(0,0)}}else await pe();p=!0,_.props.page&&(Y=_.props.page),h&&h(),g=!1}function Ce(o){var m;t=o.state;const s=document.querySelector("style[data-sveltekit]");s&&s.remove(),Y=o.props.page;const c=me();F=new Gt({target:r,props:{...o.props,stores:X},hydrate:!0}),c();const l={from:null,to:he("to",{params:t.params,route:{id:((m=t.route)==null?void 0:m.id)??null},url:new URL(location.href)}),willUnload:!1,type:"enter"};d.after_navigate.forEach(h=>h(l)),u=!0}async function ee({url:o,params:s,branch:c,status:l,error:m,route:h,form:_}){const b=c.filter(Boolean);let y="never";for(const R of c)(R==null?void 0:R.slash)!==void 0&&(y=R.slash);o.pathname=yt(o.pathname,y),o.search=o.search;const w={type:"loaded",state:{url:o,params:s,branch:c,error:m,route:h},props:{components:b.map(R=>R.node.component)}};_!==void 0&&(w.props.form=_);let O={},I=!Y;for(let R=0;R<b.length;R+=1){const E=b[R];O={...O,...E.data},(I||!t.branch.some(A=>A===E))&&(w.props[`data_${R}`]=O,I=I||Object.keys(E.data??{}).length>0)}if(I||(I=Object.keys(Y.data).length!==Object.keys(O).length),!t.url||o.href!==t.url.href||t.error!==m||_!==void 0||I){w.props.page={error:m,params:s,route:h,status:l,url:new URL(o),form:_??null,data:I?O:Y.data},Object.defineProperty(w.props.page,"routeId",{get(){throw new Error("$page.routeId has been replaced by $page.route.id")},enumerable:!1});const R=(E,A)=>{Object.defineProperty(w.props.page,E,{get:()=>{throw new Error(`$page.${E} has been replaced by $page.url.${A}`)}})};R("origin","origin"),R("path","pathname"),R("query","searchParams")}return w}async function ve({loader:o,parent:s,url:c,params:l,route:m,server_data_node:h}){var w,O,I;let _=null;const b={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},y=await o();if((w=y.shared)!=null&&w.load){let B=function(...E){for(const A of E){const{href:q}=new URL(A,c);b.dependencies.add(q)}};const R={route:{get id(){return b.route=!0,m.id}},params:new Proxy(l,{get:(E,A)=>(b.params.add(A),E[A])}),data:(h==null?void 0:h.data)??null,url:kt(c,()=>{b.url=!0}),async fetch(E,A){let q;E instanceof Request?(q=E.url,A={body:E.method==="GET"||E.method==="HEAD"?void 0:await E.blob(),cache:E.cache,credentials:E.credentials,headers:E.headers,integrity:E.integrity,keepalive:E.keepalive,method:E.method,mode:E.mode,redirect:E.redirect,referrer:E.referrer,referrerPolicy:E.referrerPolicy,signal:E.signal,...A}):q=E;const $=new URL(q,c).href;return B($),u?Lt(q,$,A):St(q,A)},setHeaders:()=>{},depends:B,parent(){return b.parent=!0,s()}};Object.defineProperties(R,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},routeId:{get(){throw new Error("routeId has been replaced by route.id")},enumerable:!1}}),_=await y.shared.load.call(null,R)??null,_=_?await Yt(_):null}return{node:y,loader:o,server:h,shared:(O=y.shared)!=null&&O.load?{type:"data",data:_,uses:b}:null,data:_??(h==null?void 0:h.data)??null,slash:((I=y.shared)==null?void 0:I.trailingSlash)??(h==null?void 0:h.slash)}}function Fe(o,s,c,l,m){if(k)return!0;if(!l)return!1;if(l.parent&&o||l.route&&s||l.url&&c)return!0;for(const h of l.params)if(m[h]!==t.params[h])return!0;for(const h of l.dependencies)if(i.some(_=>_(new URL(h))))return!0;return!1}function Ee(o,s){return(o==null?void 0:o.type)==="data"?{type:"data",data:o.data,uses:{dependencies:new Set(o.uses.dependencies??[]),params:new Set(o.uses.params??[]),parent:!!o.uses.parent,route:!!o.uses.route,url:!!o.uses.url},slash:o.slash}:(o==null?void 0:o.type)==="skip"?s??null:null}async function Be({id:o,invalidating:s,url:c,params:l,route:m}){if((a==null?void 0:a.id)===o)return a.promise;const{errors:h,layouts:_,leaf:b}=m,y=[..._,b];h.forEach($=>$==null?void 0:$().catch(()=>{})),y.forEach($=>$==null?void 0:$[1]().catch(()=>{}));let w=null;const O=t.url?o!==t.url.pathname+t.url.search:!1,I=t.route?o!==t.route.id:!1,B=y.reduce(($,L,T)=>{var te;const S=t.branch[T],x=!!(L!=null&&L[0])&&((S==null?void 0:S.loader)!==L[1]||Fe($.some(Boolean),I,O,(te=S.server)==null?void 0:te.uses,l));return $.push(x),$},[]);if(B.some(Boolean)){try{w=await tt(c,B)}catch($){return le({status:500,error:await ne($,{url:c,params:l,route:{id:m.id}}),url:c,route:m})}if(w.type==="redirect")return w}const R=w==null?void 0:w.nodes;let E=!1;const A=y.map(async($,L)=>{var te;if(!$)return;const T=t.branch[L],S=R==null?void 0:R[L];if((!S||S.type==="skip")&&$[1]===(T==null?void 0:T.loader)&&!Fe(E,I,O,(te=T.shared)==null?void 0:te.uses,l))return T;if(E=!0,(S==null?void 0:S.type)==="error")throw S;return ve({loader:$[1],url:c,params:l,route:m,parent:async()=>{var He;const ze={};for(let ke=0;ke<L;ke+=1)Object.assign(ze,(He=await A[ke])==null?void 0:He.data);return ze},server_data_node:Ee(S===void 0&&$[0]?{type:"skip"}:S??null,T==null?void 0:T.server)})});for(const $ of A)$.catch(()=>{});const q=[];for(let $=0;$<y.length;$+=1)if(y[$])try{q.push(await A[$])}catch(L){if(L instanceof et)return{type:"redirect",location:L.location};let T=500,S;R!=null&&R.includes(L)?(T=L.status??T,S=L.error):L instanceof Ae?(T=L.status,S=L.body):S=await ne(L,{params:l,url:c,route:{id:m.id}});const x=await Je($,q,h);return x?await ee({url:c,params:l,branch:q.slice(0,x.idx).concat(x.node),status:T,error:S,route:m}):await Ge(c,{id:m.id},S,T)}else q.push(void 0);return await ee({url:c,params:l,branch:q,status:200,error:null,route:m,form:s?void 0:null})}async function Je(o,s,c){for(;o--;)if(c[o]){let l=o;for(;!s[l];)l-=1;try{return{idx:l+1,node:{node:await c[o](),loader:c[o],data:{},server:null,shared:null}}}catch{continue}}}async function le({status:o,error:s,url:c,route:l}){const m={},h=await je();let _=null;if(h.server)try{const w=await tt(c,[!0]);if(w.type!=="data"||w.nodes[0]&&w.nodes[0].type!=="data")throw 0;_=w.nodes[0]??null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||f)&&await ue(c)}const b=await ve({loader:je,url:c,params:m,route:l,parent:()=>Promise.resolve({}),server_data_node:Ee(_)}),y={node:await Te(),loader:Te,shared:null,server:null,data:null};return await ee({url:c,params:m,branch:[b,y],status:o,error:s,route:null})}function ce(o,s){if(Xe(o,e))return;const c=bt(o.pathname.slice(e.length)||"/");for(const l of Ie){const m=l.exec(c);if(m)return{id:o.pathname+o.search,invalidating:s,route:l,params:vt(m),url:o}}}function Me({url:o,type:s,intent:c,delta:l}){var b,y;let m=!1;const h={from:he("from",{params:t.params,route:{id:((b=t.route)==null?void 0:b.id)??null},url:t.url}),to:he("to",{params:(c==null?void 0:c.params)??null,route:{id:((y=c==null?void 0:c.route)==null?void 0:y.id)??null},url:o}),willUnload:!c,type:s};l!==void 0&&(h.delta=l);const _={...h,cancel:()=>{m=!0}};return v||d.before_navigate.forEach(w=>w(_)),m?null:h}async function fe({url:o,scroll:s,keepfocus:c,redirect_chain:l,details:m,type:h,delta:_,nav_token:b,accepted:y,blocked:w}){const O=ce(o,!1),I=Me({url:o,type:h,delta:_,intent:O});if(!I){w();return}Se(P),y(),v=!0,u&&X.navigating.set(I),await qe(O,o,l,{scroll:s,keepfocus:c,details:m},b,()=>{v=!1,d.after_navigate.forEach(B=>B(I)),X.navigating.set(null)})}async function Ge(o,s,c,l){return o.origin===location.origin&&o.pathname===location.pathname&&!f?await le({status:l,error:c,url:o,route:s}):await ue(o)}function ue(o){return location.href=o.href,new Promise(()=>{})}function rt(){let o;n.addEventListener("mousemove",h=>{const _=h.target;clearTimeout(o),o=setTimeout(()=>{l(_,2)},20)});function s(h){l(h.composedPath()[0],1)}n.addEventListener("mousedown",s),n.addEventListener("touchstart",s,{passive:!0});const c=new IntersectionObserver(h=>{for(const _ of h)_.isIntersecting&&(se(new URL(_.target.href).pathname),c.unobserve(_.target))},{threshold:0});function l(h,_){const b=Ye(h,n);if(!b)return;const{url:y,external:w}=Re(b,e);if(w)return;const O=de(b);O.reload||(_<=O.preload_data?Ve(y):_<=O.preload_code&&se(y.pathname))}function m(){c.disconnect();for(const h of n.querySelectorAll("a")){const{url:_,external:b}=Re(h,e);if(b)continue;const y=de(h);y.reload||(y.preload_code===Ze.viewport&&c.observe(h),y.preload_code===Ze.eager&&se(_.pathname))}}d.after_navigate.push(m),m()}return{after_navigate:o=>{Pe(()=>(d.after_navigate.push(o),()=>{const s=d.after_navigate.indexOf(o);d.after_navigate.splice(s,1)}))},before_navigate:o=>{Pe(()=>(d.before_navigate.push(o),()=>{const s=d.before_navigate.indexOf(o);d.before_navigate.splice(s,1)}))},disable_scroll_handling:()=>{(g||!u)&&(p=!1)},goto:(o,s={})=>{if("keepfocus"in s&&!("keepFocus"in s))throw new Error("`keepfocus` has been renamed to `keepFocus` (note the difference in casing)");if("noscroll"in s&&!("noScroll"in s))throw new Error("`noscroll` has been renamed to `noScroll` (note the difference in casing)");return be(o,s,[])},invalidate:o=>{if(o===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof o=="function")i.push(o);else{const{href:s}=new URL(o,location.href);i.push(c=>c.href===s)}return Ue()},invalidateAll:()=>(k=!0,Ue()),preload_data:async o=>{const s=new URL(o,We(document));await Ve(s)},preload_code:se,apply_action:async o=>{if(o.type==="error"){const s=new URL(location.href),{branch:c,route:l}=t;if(!l)return;const m=await Je(t.branch.length,c,l.errors);if(m){const h=await ee({url:s,params:t.params,branch:c.slice(0,m.idx).concat(m.node),status:500,error:o.error,route:l});t=h.state;const _=me();F.$set(h.props),_(),pe().then(Le)}}else if(o.type==="redirect")be(o.location,{invalidateAll:!0},[]);else{const s={form:o.data,page:{...Y,form:o.data,status:o.status}},c=me();F.$set(s),c(),o.type==="success"&&pe().then(Le)}},_start_router:()=>{var o;history.scrollRestoration="manual",addEventListener("beforeunload",s=>{var l;let c=!1;if(!v){const m={from:he("from",{params:t.params,route:{id:((l=t.route)==null?void 0:l.id)??null},url:t.url}),to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};d.before_navigate.forEach(h=>h(m))}c?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Se(P);try{sessionStorage[nt]=JSON.stringify(ae)}catch{}}}),(o=navigator.connection)!=null&&o.saveData||rt(),n.addEventListener("click",s=>{if(s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const c=Ye(s.composedPath()[0],n);if(!c)return;const{url:l,external:m,has:h}=Re(c,e),_=de(c);if(!l||!(c instanceof SVGAElement)&&l.protocol!==location.protocol&&!(l.protocol==="https:"||l.protocol==="http:")||h.download)return;if(m||_.reload){Me({url:l,type:"link"})||s.preventDefault(),v=!0;return}const[y,w]=l.href.split("#");if(w!==void 0&&y===location.href.split("#")[0]){j=!0,Se(P),t.url=l,X.page.set({...Y,url:l}),X.page.notify();return}fe({url:l,scroll:_.noscroll?_e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:l.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault(),type:"link"})}),n.addEventListener("submit",s=>{var y;if(s.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(s.target),l=s.submitter;if(((l==null?void 0:l.formMethod)||c.method)!=="get")return;const h=new URL(((y=s.submitter)==null?void 0:y.hasAttribute("formaction"))&&(l==null?void 0:l.formAction)||c.action);if(Xe(h,e))return;const{noscroll:_,reload:b}=de(s.target);b||(s.preventDefault(),s.stopPropagation(),h.search=new URLSearchParams(new FormData(s.target)).toString(),fe({url:h,scroll:_?_e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"}))}),addEventListener("popstate",s=>{var c;if((c=s.state)!=null&&c[W]){if(s.state[W]===P)return;const l=s.state[W]-P;fe({url:new URL(location.href),scroll:ae[s.state[W]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{P=s.state[W]},blocked:()=>{history.go(-l)},type:"popstate",delta:l})}}),addEventListener("hashchange",()=>{j&&(j=!1,history.replaceState({...history.state,[W]:++P},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&X.navigating.set(null)})},_hydrate:async({status:o=200,error:s,node_ids:c,params:l,route:m,data:h,form:_})=>{f=!0;const b=new URL(location.href);({params:l={},route:m={id:null}}=ce(b,!1)||{});let y;try{const w=c.map(async(O,I)=>{const B=h[I];return ve({loader:we[O],url:b,params:l,route:m,parent:async()=>{const R={};for(let E=0;E<I;E+=1)Object.assign(R,(await w[E]).data);return R},server_data_node:Ee(B)})});y=await ee({url:b,params:l,branch:await Promise.all(w),status:o,error:s,form:_,route:Ie.find(({id:O})=>O===m.id)??null})}catch(w){if(w instanceof et){await ue(new URL(w.location,location.href));return}y=await le({status:w instanceof Ae?w.status:500,error:await ne(w,{url:b,params:l,route:m}),url:b,route:m})}Ce(y)}}}async function tt(r,e){var d;const n=new URL(r);n.pathname=Ot(r.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const i=await ge(n.href),a=await i.json();if(!i.ok)throw new Error(a);return(d=a.nodes)==null||d.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=nn(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),a}function ne(r,e){return r instanceof Ae?r.body:Wt.handleError({error:r,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}const an=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function he(r,e){for(const n of an)Object.defineProperty(e,n,{get(){throw new Error(`The navigation shape changed - ${r}.${n} should now be ${r}.url.${n}`)},enumerable:!1});return Object.defineProperty(e,"routeId",{get(){throw new Error(`The navigation shape changed - ${r}.routeId should now be ${r}.route.id`)},enumerable:!1}),e}function me(){return()=>{}}function Le(){const r=document.querySelector("[autofocus]");if(r)r.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var i;(i=getSelection())==null||i.removeAllRanges()}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex")}}async function fn({env:r,hydrate:e,paths:n,target:i,version:a}){wt(n),gt(a);const d=rn({target:i,base:n.base});_t({client:d}),e?await d._hydrate(e):d.goto(location.href,{replaceState:!0}),d._start_router()}export{fn as start};
