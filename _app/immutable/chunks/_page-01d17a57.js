import{b as f}from"./paths-b4419565.js";class h{constructor(s,o){this.x=s,this.y=o}add(s){return new h(this.x+s.x,this.y+s.y)}times(s){return new h(this.x*s,this.y*s)}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get normalized(){return this.times(1/this.length)}get negated(){return new h(-this.x,-this.y)}}class u{constructor(s,o){this.label=s,this.count=o,this.pos=new h(0,0)}}class m{constructor(s,o,t){this.nodeA=s,this.nodeB=o,this.count=t}}function _(e){const s=[];for(let o=0;o<e.length-1;o++)for(let t=o+1;t<e.length;t++)s.push([e[o],e[t]]);return s}function w(e){const s=e.map(n=>n.sort()),o={};for(const n of s)for(const r of n)o[r]=o[r]?o[r]+1:1;const t={};for(const n of s){const r=_(n);for(const p of r)t[p]=t[p]?t[p]+1:1}const a=Object.entries(o).map(([n,r])=>new u(n,r)),c={};for(const n of a)c[n.label]=n;const i=Object.entries(t).map(([n,r])=>{const[p,d]=n.split(","),l=c[p],g=c[d];return new m(l,g,r)});return{nodes:a,edges:i}}function b(e,s){for(let t=0;t<e.length-1;t++)for(let a=t+1;a<e.length;a++){const c=e[t],i=e[a],n=i.pos.add(c.pos.negated),r=Math.sqrt(n.length);if(r<12){const p=(12-r)/2,l=n.normalized.times(p);c.pos=c.pos.add(l.negated),i.pos=i.pos.add(l)}}for(const t of s){const a=t.nodeA,c=t.nodeB,i=c.pos.add(a.pos.negated),n=Math.sqrt(i.length);if(n>12){const r=(n-12)/2,d=i.normalized.times(r);a.pos=a.pos.add(d),c.pos=c.pos.add(d.negated)}}}function A(e){const{nodes:s,edges:o}=w(e);for(const t of s)t.pos=new h(Math.random()*300,Math.random()*300);for(let t=0;t<300;t++)b(s,o);return{nodes:s,edges:o}}const y=async({fetch:e})=>{const o=await(await e(`${f}/api/posts`)).json(),a=await(await e(`${f}/api/sheets`)).json(),i=await(await e(`${f}/api/snippets`)).json(),n=[...o,...a,...i].map(d=>{var l;return((l=d.meta.topic)==null?void 0:l.split(" "))||[]}),{nodes:r,edges:p}=A(n);return{nodes:r,edges:p}},x=Object.freeze(Object.defineProperty({__proto__:null,load:y},Symbol.toStringTag,{value:"Module"}));export{x as _,y as l};
