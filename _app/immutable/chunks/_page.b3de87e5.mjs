import{b as a}from"./paths.80c7acbc.mjs";const n=async({fetch:o})=>{const r=(await(await o(`${a}/api/posts`)).json()||[]).reduce((e,t)=>{const s=new Date(t.meta.date).getFullYear();return e[s]=e[s]||[],e[s].push(t),e},{});return{years:Object.entries(r).sort((e,t)=>e[0]-t[0]).map(e=>({date:e[0],posts:e[1]}))}},i=Object.freeze(Object.defineProperty({__proto__:null,load:n},Symbol.toStringTag,{value:"Module"}));export{i as _,n as l};
