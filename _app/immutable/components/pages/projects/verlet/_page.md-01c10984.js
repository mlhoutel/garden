import{S as I,i as P,s as R,$ as g,a0 as S,k as j,w as B,l as M,m as x,x as W,h as $,n as E,b as G,y as N,a1 as C,f as T,t as V,z as D}from"../../../../chunks/index-5039aeb8.js";import{i as H,j as O,k as Y}from"../../../../chunks/index-c87b80d8.js";import{v as u,C as Z,b as F}from"../../../../chunks/projects-8fba3f03.js";const b=10,k=.5,J=.1;class m{constructor(s,t){this.cpos=s,this.lpos=s,this.static=!1,this.size=t}step(){if(this.static){this.cpos=this.lpos;return}const s=this.cpos.minus(this.lpos);this.lpos=this.cpos,this.cpos=this.cpos.plus(s)}bounds(s){const t=this.size/2;this.cpos.y<t?this.cpos.y=t+Math.abs(this.cpos.y):this.cpos.y>s.y-t&&(this.cpos.y=2*(s.y-t)-this.cpos.y),this.cpos.x<t?this.cpos.x=t+Math.abs(this.cpos.x):this.cpos.x>s.x-t&&(this.cpos.y=2*(s.x-t)-this.cpos.x)}gravity(){this.cpos.y+=J}}class _{constructor(s,t){this.a=s,this.b=t,this.size=this.a.cpos.minus(this.b.cpos).length()}step(){const s=this.a.cpos.minus(this.b.cpos).length(),t=s-this.size,i=this.a.cpos.minus(this.b.cpos).divide(s);this.a.cpos=this.a.cpos.minus(i.times(.5*t*k)),this.b.cpos=this.b.cpos.plus(i.times(.5*t*k))}}class K{constructor(s){this.bodies=[],this.constraints=[],this.size=s}step(){for(let s of this.bodies)s.gravity(),s.bounds(this.size),s.step();for(let s of this.constraints)s.step()}addBody(s){this.bodies.push(s)}addConstraint(s){this.constraints.push(s)}addStruct(s){for(let t of s.bodies)this.addBody(t);for(let t of s.constraints)this.addConstraint(t)}}function z(o,s){const t=s.divide(2),i=new u(-t.y,t.x),n={bodies:[new m(o.minus(t),b),new m(o.minus(i),b),new m(o.plus(t),b),new m(o.plus(i),b)],constraints:[]};for(let e=0;e<n.bodies.length-1;e++)for(let r=e+1;r<n.bodies.length;r++)n.constraints.push(new _(n.bodies[e],n.bodies[r]));return n}function L(o,s){return o.constraints.push(new _(s,o.bodies[o.bodies.length-1])),o.bodies.push(s),o}function Q(o,s,t){const i=new z(o,new u(40,40));for(let n=0;n<s;n++)L(i,new m(o.minus(new u(0,n*t)),b,[0,0,0]));return i.bodies[i.bodies.length-1].static=!0,i}function U(o,s,t){const i={bodies:[],constraints:[]};for(let n=0;n<s;n++)for(let e=0;e<s;e++)i.bodies.push(new m(o.plus(new u(e*t,n*t)),b,[0,0,0]));for(let n=0;n<s;n++)i.bodies[n].static=!0;for(let n=0;n<s;n++)for(let e=0;e<s-1;e++){const r=i.bodies[n*s+e],f=i.bodies[n*s+e+1];i.constraints.push(new _(r,f,[0,0,0]))}for(let n=0;n<s;n++)for(let e=0;e<s-1;e++){const r=i.bodies[n+e*s],f=i.bodies[n+(e+1)*s];i.constraints.push(new _(r,f,[0,0,0]))}return i}function X(o){let s,t,i,n,e;function r(a){o[4](a)}function f(a){o[5](a)}let p={setup:o[2],draw:o[3]};return o[0]!==void 0&&(p.values=o[0]),o[1]!==void 0&&(p.actions=o[1]),t=new Z({props:p}),g.push(()=>S(t,"values",r,o[0])),g.push(()=>S(t,"actions",f,o[1])),{c(){s=j("div"),B(t.$$.fragment),this.h()},l(a){s=M(a,"DIV",{class:!0});var h=x(s);W(t.$$.fragment,h),h.forEach($),this.h()},h(){E(s,"class","relative")},m(a,h){G(a,s,h),N(t,s,null),e=!0},p(a,[h]){const w={};!i&&h&1&&(i=!0,w.values=a[0],C(()=>i=!1)),!n&&h&2&&(n=!0,w.actions=a[1],C(()=>n=!1)),t.$set(w)},i(a){e||(T(t.$$.fragment,a),e=!0)},o(a){V(t.$$.fragment,a),e=!1},d(a){a&&$(s),D(t)}}}const os={short:"Verlet simulation",topic:"simulation verlet"};function ss(o,s,t){const i=new K(new u(0,0));let n=!1;function e(){i.size=new u(window.innerWidth,window.innerHeight),i.bodies=[],i.constraints=[],i.addStruct(U(new u(100,100),20,30));const c=600,l=200,q=Math.floor((window.innerWidth-c)/l);for(let d=1;d<q;d++)i.addStruct(Q(new u(c+d*l,0),d*5,10));const v=600,y=70,A=Math.floor((window.innerWidth-v)/y);for(let d=0;d<A;d++)i.addStruct(z(new u(v+d*y,F(500)),new u(40,40)))}const r=c=>{c.createCanvas(window.innerWidth,window.innerHeight),e()},f=c=>{c.background(220),n||i.step();for(const l of i.bodies)c.fill("#000000"),c.stroke("#000000"),c.circle(l.cpos.x,l.cpos.y,l.size);for(const l of i.constraints)c.fill("#000000"),c.stroke("#000000"),c.line(l.a.cpos.x,l.a.cpos.y,l.b.cpos.x,l.b.cpos.y)};let p=i,a={reset:{label:H,function:()=>{e()}},pause:{label:n?O:Y,function:()=>{n=!n}}};function h(c){p=c,t(0,p)}function w(c){a=c,t(1,a)}return[p,a,r,f,h,w]}class es extends I{constructor(s){super(),P(this,s,ss,X,R,{})}}export{es as default,os as metadata};
