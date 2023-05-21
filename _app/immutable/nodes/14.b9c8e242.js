import{S as x,i as M,s as $,x as m,a0 as g,k as C,z as P,l as k,m as y,A as I,h as p,p as A,b as B,B as D,a1 as w,g as S,d as q,C as F}from"../chunks/index.7aa01268.js";import{A as H}from"../chunks/index.4a7c2519.js";import{a as f,v as b,C as W}from"../chunks/projects.a244b7a2.js";class E{constructor(n,e,t,i){this.ang=n,this.len=e,this.size=t,this.childs=i,this.depth=Math.max(...this.childs.map(h=>1+h.depth),1)}generate(n,e,t){const i=t+this.ang,h=new b(Math.cos(i),Math.sin(i)),l=e.plus(h.times(this.len)),_=new b(Math.sin(t),-Math.cos(t)),o=e.plus(_.times(this.size/2)),s=e.minus(_.times(this.size/2)),r=new b(Math.sin(i),-Math.cos(i)),c=l.plus(r.times(this.size/2)),u=l.minus(r.times(this.size/2));n.push(new v(!1,s,o,c,u));for(const z of this.childs)z.generate(n,l,i)}}class L{constructor(n,e,t){this.ang=n,this.len=e,this.size=t,this.ang=n,this.depth=1}generate(n,e,t){const i=t+this.ang,h=new b(Math.cos(i),Math.sin(i)),l=e.plus(h.times(this.len)),_=new b(Math.sin(i),-Math.cos(i)),o=e.plus(l.minus(e).divide(2)),s=o.plus(_.times(this.size/2)),r=o.minus(_.times(this.size/2));n.push(new v(!0,e,s,l,r))}}class v{constructor(n,e,t,i,h){this.terminal=n,this.a=e,this.b=t,this.c=i,this.d=h}}function d(a,n){const e=f(-n.branch_angle,n.branch_angle),t=[],i=f(0,1)<n.prob_next;if(a<n.max_depth&&i){let o=f(0,1)<n.prob_branch;for(;o;)o=f(0,1)<n.prob_branch,t.push(d(a+1,n));t.push(d(a+1,n))}else{const o=f(n.min_leafs_number,n.max_leafs_number);for(let s=0;s<o;s++){const r=f(-n.leaf_angle,n.leaf_angle);t.push(new L(r,n.leaf_length,n.leaf_size))}}const h=new E(e,0,0,t),l=n.min_branch_size+(n.max_branch_size-n.min_branch_size)*(1-(n.max_depth-h.depth)/n.max_depth),_=n.min_branch_length+(n.max_branch_length-n.min_branch_length)*(1-(n.max_depth-h.depth)/n.max_depth);return h.size=l,h.len=_,h}class R{constructor(){this.buffer=[],this.prob_next=.95,this.prob_branch=.25,this.max_depth=20,this.max_branch_size=30,this.min_branch_size=5,this.max_branch_length=50,this.min_branch_length=10,this.min_leafs_number=1,this.max_leafs_number=3,this.leaf_size=30,this.leaf_length=30,this.branch_angle=Math.PI/6,this.leaf_angle=Math.PI/2}generate(n,e){this.buffer=[],d(0,{prob_next:this.prob_next,prob_branch:this.prob_branch,max_depth:this.max_depth,max_branch_size:this.max_branch_size,min_branch_size:this.min_branch_size,max_branch_length:this.max_branch_length,min_branch_length:this.min_branch_length,min_leafs_number:this.min_leafs_number,max_leafs_number:this.max_leafs_number,leaf_size:this.leaf_size,leaf_length:this.leaf_length,branch_angle:this.branch_angle,leaf_angle:this.leaf_angle}).generate(this.buffer,n,e)}}function T(a){let n,e,t,i,h;function l(s){a[4](s)}function _(s){a[5](s)}let o={setup:a[2],draw:a[3]};return a[0]!==void 0&&(o.values=a[0]),a[1]!==void 0&&(o.actions=a[1]),e=new W({props:o}),m.push(()=>g(e,"values",l,a[0])),m.push(()=>g(e,"actions",_,a[1])),{c(){n=C("div"),P(e.$$.fragment),this.h()},l(s){n=k(s,"DIV",{class:!0});var r=y(n);I(e.$$.fragment,r),r.forEach(p),this.h()},h(){A(n,"class","relative")},m(s,r){B(s,n,r),D(e,n,null),h=!0},p(s,[r]){const c={};!t&&r&1&&(t=!0,c.values=s[0],w(()=>t=!1)),!i&&r&2&&(i=!0,c.actions=s[1],w(()=>i=!1)),e.$set(c)},i(s){h||(S(e.$$.fragment,s),h=!0)},o(s){q(e.$$.fragment,s),h=!1},d(s){s&&p(n),F(e)}}}function V(a,n,e){const t=new R;t.color_branch="#9C2C77",t.color_leaf="#FD841F",t.color_debug="#ff4040";function i(){const c=new b(window.innerWidth/2,window.innerHeight);t.generate(c,-Math.PI/2)}const h=c=>{c.createCanvas(window.innerWidth,window.innerHeight),i()},l=c=>{c.background(220),c.noStroke();for(const u of t.buffer)c.fill(u.terminal?t.color_leaf:t.color_branch),c.quad(u.a.x,u.a.y,u.b.x,u.b.y,u.c.x,u.c.y,u.d.x,u.d.y)};let _=t,o={reset:{label:H,function:()=>{i()}}};function s(c){_=c,e(0,_)}function r(c){o=c,e(1,o)}return[_,o,h,l,s,r]}class K extends x{constructor(n){super(),M(this,n,V,T,$,{})}}export{K as component};
