import{S as _,i as h,s as g,k as f,q as $,a as y,w as x,l as d,m as u,r as C,h as c,c as E,x as b,b as v,E as m,y as B,B as q,f as w,t as L,z as R}from"../../../chunks/index-46686b93.js";import{C as S}from"../../../chunks/ContentList-84489a74.js";function k(i){let a,n,o,l,s,e;return s=new S({props:{items:i[0],label:z}}),{c(){a=f("article"),n=f("h1"),o=$("Blog"),l=y(),x(s.$$.fragment)},l(t){a=d(t,"ARTICLE",{});var r=u(a);n=d(r,"H1",{});var p=u(n);o=C(p,"Blog"),p.forEach(c),l=E(r),b(s.$$.fragment,r),r.forEach(c)},m(t,r){v(t,a,r),m(a,n),m(n,o),m(a,l),B(s,a,null),e=!0},p:q,i(t){e||(w(s.$$.fragment,t),e=!0)},o(t){L(s.$$.fragment,t),e=!1},d(t){t&&c(a),R(s)}}}const z="Read full post »";function A(i,a,n){let{data:o}=a;const s=(o.years??[]).map(e=>({label:e.date,items:e.posts.map(t=>({...t,title:t.meta.title,topic:t.meta.topic,short:t.meta.short}))}));return i.$$set=e=>{"data"in e&&n(1,o=e.data)},[s,o]}class P extends _{constructor(a){super(),h(this,a,A,k,g,{data:1})}}export{P as default};