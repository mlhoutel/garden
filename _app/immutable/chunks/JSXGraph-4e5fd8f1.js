import{_ as w}from"./preload-helper-41c905a7.js";import{S as _,i as p,s as U,k as x,l as D,m as I,h as l,n as m,p as r,b as v,B as g,o as S}from"./index-46686b93.js";let h;const V=new Uint8Array(16);function R(){if(!h&&(h=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!h))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return h(V)}const e=[];for(let n=0;n<256;++n)e.push((n+256).toString(16).slice(1));function E(n,t=0){return(e[n[t+0]]+e[n[t+1]]+e[n[t+2]]+e[n[t+3]]+"-"+e[n[t+4]]+e[n[t+5]]+"-"+e[n[t+6]]+e[n[t+7]]+"-"+e[n[t+8]]+e[n[t+9]]+"-"+e[n[t+10]]+e[n[t+11]]+e[n[t+12]]+e[n[t+13]]+e[n[t+14]]+e[n[t+15]]).toLowerCase()}const J=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:J};function b(n,t,i){if(y.randomUUID&&!t&&!n)return y.randomUUID();n=n||{};const d=n.random||(n.rng||R)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return E(d)}function j(n){let t;return{c(){t=x("div"),this.h()},l(i){t=D(i,"DIV",{id:!0,class:!0,style:!0}),I(t).forEach(l),this.h()},h(){m(t,"id",n[2]),m(t,"class","jxgbox py-3"),r(t,"width",n[0]),r(t,"height",n[1])},m(i,d){v(i,t,d)},p(i,[d]){d&1&&r(t,"width",i[0]),d&2&&r(t,"height",i[1])},i:g,o:g,d(i){i&&l(t)}}}function G(n,t,i){let{draw:d=(a,s)=>{}}=t,{width:o="100%"}=t,{heigth:u="400px"}=t;const c=b();return S(async()=>{const a=await w(()=>import("./jsxgraphcore-a03186a8.js").then(s=>s.j),["./jsxgraphcore-a03186a8.js","./_commonjsHelpers-87174ba5.js"],import.meta.url);d(a,c)}),n.$$set=a=>{"draw"in a&&i(3,d=a.draw),"width"in a&&i(0,o=a.width),"heigth"in a&&i(1,u=a.heigth)},[o,u,c,d]}class C extends _{constructor(t){super(),p(this,t,G,j,U,{draw:3,width:0,heigth:1})}}export{C as J};
