import{S as is,i as rs,s as ps,k as o,q as c,a as p,l as n,m as l,r as f,h as e,c as u,n as i,b as a,E as r,B as oe}from"./index-2e2fe841.js";function us(Qe){let h,N,$t,pt,m,j,Mt,ut,d,W,Nt,ct,D,lt,jt,ft,F,_,Wt,ht,v,Je=`<code class="language-bash">   $ conda create <span class="token parameter variable">-n</span> sphinx <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.7</span> <span class="token comment"># Create the env we will use for sphinx</span>
   $ conda activate sphinx 			<span class="token comment"># Activate the env (reopen a new command if error)</span>
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ conda <span class="token function">install</span> sphinx 	<span class="token comment"># Install Sphinx from the package repository</span>

   <span class="token comment"># Extentions (themes, converter, highligting etc)</span>
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ conda <span class="token function">install</span> <span class="token parameter variable">-c</span> anaconda recommonmark 		<span class="token comment"># If you want to use the .md language in addition to the .rst base one</span>
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ conda <span class="token function">install</span> <span class="token parameter variable">-c</span> anaconda sphinx_rtd_theme 	<span class="token comment"># Read The Doc theme is a cool theme to begin, see example at https://sphinx-rtd-theme.readthedocs.io/en/stable/</span>
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ conda <span class="token function">install</span> <span class="token parameter variable">-c</span> conda-forge nbsphinx		<span class="token comment"># If you want to have embedded notebooks into the documentation </span>
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ conda <span class="token function">install</span> <span class="token parameter variable">-c</span> conda-forge sphinx-copybutton <span class="token comment"># Add a copy button on the code blocks</span>

   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ <span class="token function">mkdir</span> website_folder		<span class="token comment"># Create the website folder</span>
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ <span class="token builtin class-name">cd</span> website_folder		<span class="token comment"># Go into the folder</span>
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ sphinx-quickstart		<span class="token comment"># Initialize the website</span>

   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ <span class="token function">make</span> html
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ start chrome _build/html/index.html</code>`,mt,k,G,Dt,dt,x,U,Ft,_t,b,Ve=`<code class="language-undefined">source                                          *Root*  
├─── _static                                    *Ressource*
│     ├─── main.js  
│     ├─── style.css  
│     ├─── image.png  
│     ├─── favicon.ico  
│     └─── logo.svg   
├─── _templates                                 *Templates*
│     └─── layout.html   
├─── pages                                      *Pages*
├─── conf.py                                    *Config*
└─── index.rst                                  *Main Page*</code>`,vt,E,B,Gt,kt,q,Xe=`<code class="language-undefined">   # Configuration file for the Sphinx documentation builder.

   /* ... */

   # -- Project information -----------------------------------------------------

   project = &#39;Project-Name&#39;
   copyright = &#39;Copyright text&#39;
   author = &#39;Author Name&#39;
   release = &#39;1.0.0&#39;

   /* ... */

   # -- General configuration ---------------------------------------------------

   extensions = [&#39;recommonmark&#39;,&#39;sphinx_rtd_theme&#39;,&#39;nbsphinx&#39;,&#39;sphinx_copybutton&#39;]
   templates_path = [&#39;_templates&#39;]
   exclude_patterns = []
   html_theme = &#39;sphinx_rtd_theme&#39;
   pygments_style = &#39;monokai&#39;

   html_static_path = [&#39;_static&#39;]
   html_css_files = [&#39;style.css&#39;]
   html_js_files = [&#39;main.js&#39;]

   html_title = &quot;Website Title&quot;
   html_short_title = &quot;Title&quot;
   html_logo = &quot;_static/logo.svg&quot;
   html_favicon = &quot;_static/favicon.ico&quot;

   html_show_sourcelink = False
   html_theme_options = &#123;
       &#39;logo_only&#39;: True,
       &#39;prev_next_buttons_location&#39;: &#39;both&#39;
   &#125;</code>`,xt,w,z,Ut,bt,y,K,Bt,Et,T,Ye=`<code class="language-rst">   ============================
   Main Title
   ============================

   Sub Title
   ============================

   Sub Sub Title
   ----------------------------

   Sub Sub Sub Title
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   :Title note:

   .. contents:: Table of Contents
   	:local:

   	.. toctree::
   	:maxdepth: 2
   	:caption: Maths Tree

   &#96;&#96;inline code&#96;&#96;

   Code example::

   	if (a == b) &#123; /* code */ &#125;

   .. code-block::

   	if (a == b) &#123; /* code */ &#125;

   .. code-block:: c
   	:linenos:
   	:lines: 1, 3-5
       :start-after: 3
       :end-before: 5

   	if (a == b) &#123; /* code */ &#125;

   .. literalinclude:: file.c
   	:language: c
   	:linenos:

   +---------------------+---------+---+
   | 1                   | 2       | 3 |
   +---------------------+---------+---+

   +---------+---------+-----------+
   | 1       | 2       | 3         |
   +=========+=========+===========+
   | 4                 | 5         |
   +---------+---------+-----------+
   | 6       | 7       | 10        |
   +---------+---------+           |
   | 8       | 9       |           |
   +---------+---------+-----------+

   .. csv-table:: a title
      :header: &quot;1&quot;, &quot;2&quot;, &quot;3&quot;
      :widths: 20, 20, 20

      &quot;4&quot;, &quot;5&quot;, &quot;6&quot;
      &quot;7&quot;, &quot;8&quot;, &quot;9&quot;

   .. image:: image.jpg
       :width: 200px
       :align: center
       :height: 100px
       :alt: alternate text

   .. figure:: image.jpg
       :width: 200px
       :align: center
       :height: 100px
       :alt: alternate text
       :figclass: align-center

       Caption text

   	.. todo::
   .. seealso:: Note
   .. note:: Note
   .. warning:: Note
   .. Attention:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Caution:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. DANGER:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. WARNING:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Error:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Hint:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Important:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Note:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Tip:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

   	.. admonition:: Custom Title

   	    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

   	.. topic:: Title

   		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
   	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
   	uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
   	Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

   	.. sidebar:: Sidebar Title
   	:short: Sidebar short

   		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
   	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
   	uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
   	Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

   	:download:&#96;download samplet.py &lt;sample.py&gt;&#96;
   :math:&#96;alpha &gt; \beta&#96;
   .. math::

   	n_&#123;mathrm&#123;offset&#125;&#125; = sum_&#123;k=0&#125;^&#123;N-1&#125; s_k n_k</code>`,qt,S,Q,zt,wt,A,Ze=`<code class="language-undefined">sphinx-quickstart

pip install pypandoc

import pypandoc output = pypandoc.convert_file(&#39;file.md&#39;, &#39;rst&#39;)

with open(&quot;file.rst&quot;, &quot;w&quot;, encoding=&quot;utf-8&quot;) as f:
   f.write(output)</code>`,yt,g,J,Kt,Tt,C,V,Qt,St,X,it,Jt,At,H,Y,Vt,gt,Z,rt,Xt,Ct,L,tt,Yt,Ht,et,P,Zt,Lt,R,ts='<code class="language-undefined">pygmentize -L lexers</code>',Pt,st,I,te,Rt,at,O,ee,It,ot,$,se,Ot,nt,M,ae;return{c(){h=o("h2"),N=o("a"),$t=c("Introduction"),pt=p(),m=o("h2"),j=o("a"),Mt=c("Setup"),ut=p(),d=o("h3"),W=o("a"),Nt=c("Installation with Anaconda"),ct=p(),D=o("p"),lt=o("strong"),jt=c("Install Anaconda:"),ft=p(),F=o("p"),_=o("a"),Wt=c("https://docs.anaconda.com/anaconda/install/windows/"),ht=p(),v=o("pre"),mt=p(),k=o("h3"),G=o("a"),Dt=c("Website Setup"),dt=p(),x=o("h4"),U=o("a"),Ft=c("Source Folder"),_t=p(),b=o("pre"),vt=p(),E=o("h4"),B=o("a"),Gt=c("Conf File"),kt=p(),q=o("pre"),xt=p(),w=o("h2"),z=o("a"),Ut=c("Cheat Sheets"),bt=p(),y=o("h3"),K=o("a"),Bt=c("ReStructuredText (.rst)"),Et=p(),T=o("pre"),qt=p(),S=o("h3"),Q=o("a"),zt=c("Markdown"),wt=p(),A=o("pre"),yt=p(),g=o("h2"),J=o("a"),Kt=c("Themes"),Tt=p(),C=o("h3"),V=o("a"),Qt=c("Install Theme"),St=p(),X=o("blockquote"),it=o("p"),Jt=c("TODO"),At=p(),H=o("h3"),Y=o("a"),Vt=c("Edit Style"),gt=p(),Z=o("blockquote"),rt=o("p"),Xt=c("TODO"),Ct=p(),L=o("h3"),tt=o("a"),Yt=c("Code Syntax Highlighting"),Ht=p(),et=o("p"),P=o("a"),Zt=c("https://stackoverflow.com/questions/11315504/sphinx-list-of-supported-languages-for-highlighting"),Lt=p(),R=o("pre"),Pt=p(),st=o("p"),I=o("a"),te=c("https://docs.typo3.org/m/typo3/docs-how-to-document/master/en-us/WritingReST/Codeblocks.html"),Rt=p(),at=o("p"),O=o("a"),ee=c("https://pygments.org/docs/lexers/"),It=p(),ot=o("p"),$=o("a"),se=c("https://stylishthemes.github.io/Syntax-Themes/pygments/"),Ot=p(),nt=o("p"),M=o("a"),ae=c("https://nbsphinx.readthedocs.io/en/0.7.0/installation.html"),this.h()},l(t){h=n(t,"H2",{id:!0});var s=l(h);N=n(s,"A",{href:!0});var ne=l(N);$t=f(ne,"Introduction"),ne.forEach(e),s.forEach(e),pt=u(t),m=n(t,"H2",{id:!0});var le=l(m);j=n(le,"A",{href:!0});var ie=l(j);Mt=f(ie,"Setup"),ie.forEach(e),le.forEach(e),ut=u(t),d=n(t,"H3",{id:!0});var re=l(d);W=n(re,"A",{href:!0});var pe=l(W);Nt=f(pe,"Installation with Anaconda"),pe.forEach(e),re.forEach(e),ct=u(t),D=n(t,"P",{});var ue=l(D);lt=n(ue,"STRONG",{});var ce=l(lt);jt=f(ce,"Install Anaconda:"),ce.forEach(e),ue.forEach(e),ft=u(t),F=n(t,"P",{});var fe=l(F);_=n(fe,"A",{href:!0,rel:!0});var he=l(_);Wt=f(he,"https://docs.anaconda.com/anaconda/install/windows/"),he.forEach(e),fe.forEach(e),ht=u(t),v=n(t,"PRE",{class:!0});var es=l(v);es.forEach(e),mt=u(t),k=n(t,"H3",{id:!0});var me=l(k);G=n(me,"A",{href:!0});var de=l(G);Dt=f(de,"Website Setup"),de.forEach(e),me.forEach(e),dt=u(t),x=n(t,"H4",{id:!0});var _e=l(x);U=n(_e,"A",{href:!0});var ve=l(U);Ft=f(ve,"Source Folder"),ve.forEach(e),_e.forEach(e),_t=u(t),b=n(t,"PRE",{class:!0});var ss=l(b);ss.forEach(e),vt=u(t),E=n(t,"H4",{id:!0});var ke=l(E);B=n(ke,"A",{href:!0});var xe=l(B);Gt=f(xe,"Conf File"),xe.forEach(e),ke.forEach(e),kt=u(t),q=n(t,"PRE",{class:!0});var as=l(q);as.forEach(e),xt=u(t),w=n(t,"H2",{id:!0});var be=l(w);z=n(be,"A",{href:!0});var Ee=l(z);Ut=f(Ee,"Cheat Sheets"),Ee.forEach(e),be.forEach(e),bt=u(t),y=n(t,"H3",{id:!0});var qe=l(y);K=n(qe,"A",{href:!0});var we=l(K);Bt=f(we,"ReStructuredText (.rst)"),we.forEach(e),qe.forEach(e),Et=u(t),T=n(t,"PRE",{class:!0});var os=l(T);os.forEach(e),qt=u(t),S=n(t,"H3",{id:!0});var ye=l(S);Q=n(ye,"A",{href:!0});var Te=l(Q);zt=f(Te,"Markdown"),Te.forEach(e),ye.forEach(e),wt=u(t),A=n(t,"PRE",{class:!0});var ns=l(A);ns.forEach(e),yt=u(t),g=n(t,"H2",{id:!0});var Se=l(g);J=n(Se,"A",{href:!0});var Ae=l(J);Kt=f(Ae,"Themes"),Ae.forEach(e),Se.forEach(e),Tt=u(t),C=n(t,"H3",{id:!0});var ge=l(C);V=n(ge,"A",{href:!0});var Ce=l(V);Qt=f(Ce,"Install Theme"),Ce.forEach(e),ge.forEach(e),St=u(t),X=n(t,"BLOCKQUOTE",{});var He=l(X);it=n(He,"P",{});var Le=l(it);Jt=f(Le,"TODO"),Le.forEach(e),He.forEach(e),At=u(t),H=n(t,"H3",{id:!0});var Pe=l(H);Y=n(Pe,"A",{href:!0});var Re=l(Y);Vt=f(Re,"Edit Style"),Re.forEach(e),Pe.forEach(e),gt=u(t),Z=n(t,"BLOCKQUOTE",{});var Ie=l(Z);rt=n(Ie,"P",{});var Oe=l(rt);Xt=f(Oe,"TODO"),Oe.forEach(e),Ie.forEach(e),Ct=u(t),L=n(t,"H3",{id:!0});var $e=l(L);tt=n($e,"A",{href:!0});var Me=l(tt);Yt=f(Me,"Code Syntax Highlighting"),Me.forEach(e),$e.forEach(e),Ht=u(t),et=n(t,"P",{});var Ne=l(et);P=n(Ne,"A",{href:!0,rel:!0});var je=l(P);Zt=f(je,"https://stackoverflow.com/questions/11315504/sphinx-list-of-supported-languages-for-highlighting"),je.forEach(e),Ne.forEach(e),Lt=u(t),R=n(t,"PRE",{class:!0});var ls=l(R);ls.forEach(e),Pt=u(t),st=n(t,"P",{});var We=l(st);I=n(We,"A",{href:!0,rel:!0});var De=l(I);te=f(De,"https://docs.typo3.org/m/typo3/docs-how-to-document/master/en-us/WritingReST/Codeblocks.html"),De.forEach(e),We.forEach(e),Rt=u(t),at=n(t,"P",{});var Fe=l(at);O=n(Fe,"A",{href:!0,rel:!0});var Ge=l(O);ee=f(Ge,"https://pygments.org/docs/lexers/"),Ge.forEach(e),Fe.forEach(e),It=u(t),ot=n(t,"P",{});var Ue=l(ot);$=n(Ue,"A",{href:!0,rel:!0});var Be=l($);se=f(Be,"https://stylishthemes.github.io/Syntax-Themes/pygments/"),Be.forEach(e),Ue.forEach(e),Ot=u(t),nt=n(t,"P",{});var ze=l(nt);M=n(ze,"A",{href:!0,rel:!0});var Ke=l(M);ae=f(Ke,"https://nbsphinx.readthedocs.io/en/0.7.0/installation.html"),Ke.forEach(e),ze.forEach(e),this.h()},h(){i(N,"href","#introduction"),i(h,"id","introduction"),i(j,"href","#setup"),i(m,"id","setup"),i(W,"href","#installation-with-anaconda"),i(d,"id","installation-with-anaconda"),i(_,"href","https://docs.anaconda.com/anaconda/install/windows/"),i(_,"rel","nofollow"),i(v,"class","language-bash"),i(G,"href","#website-setup"),i(k,"id","website-setup"),i(U,"href","#source-folder"),i(x,"id","source-folder"),i(b,"class","language-undefined"),i(B,"href","#conf-file"),i(E,"id","conf-file"),i(q,"class","language-undefined"),i(z,"href","#cheat-sheets"),i(w,"id","cheat-sheets"),i(K,"href","#restructuredtext-rst"),i(y,"id","restructuredtext-rst"),i(T,"class","language-rst"),i(Q,"href","#markdown"),i(S,"id","markdown"),i(A,"class","language-undefined"),i(J,"href","#themes"),i(g,"id","themes"),i(V,"href","#install-theme"),i(C,"id","install-theme"),i(Y,"href","#edit-style"),i(H,"id","edit-style"),i(tt,"href","#code-syntax-highlighting"),i(L,"id","code-syntax-highlighting"),i(P,"href","https://stackoverflow.com/questions/11315504/sphinx-list-of-supported-languages-for-highlighting"),i(P,"rel","nofollow"),i(R,"class","language-undefined"),i(I,"href","https://docs.typo3.org/m/typo3/docs-how-to-document/master/en-us/WritingReST/Codeblocks.html"),i(I,"rel","nofollow"),i(O,"href","https://pygments.org/docs/lexers/"),i(O,"rel","nofollow"),i($,"href","https://stylishthemes.github.io/Syntax-Themes/pygments/"),i($,"rel","nofollow"),i(M,"href","https://nbsphinx.readthedocs.io/en/0.7.0/installation.html"),i(M,"rel","nofollow")},m(t,s){a(t,h,s),r(h,N),r(N,$t),a(t,pt,s),a(t,m,s),r(m,j),r(j,Mt),a(t,ut,s),a(t,d,s),r(d,W),r(W,Nt),a(t,ct,s),a(t,D,s),r(D,lt),r(lt,jt),a(t,ft,s),a(t,F,s),r(F,_),r(_,Wt),a(t,ht,s),a(t,v,s),v.innerHTML=Je,a(t,mt,s),a(t,k,s),r(k,G),r(G,Dt),a(t,dt,s),a(t,x,s),r(x,U),r(U,Ft),a(t,_t,s),a(t,b,s),b.innerHTML=Ve,a(t,vt,s),a(t,E,s),r(E,B),r(B,Gt),a(t,kt,s),a(t,q,s),q.innerHTML=Xe,a(t,xt,s),a(t,w,s),r(w,z),r(z,Ut),a(t,bt,s),a(t,y,s),r(y,K),r(K,Bt),a(t,Et,s),a(t,T,s),T.innerHTML=Ye,a(t,qt,s),a(t,S,s),r(S,Q),r(Q,zt),a(t,wt,s),a(t,A,s),A.innerHTML=Ze,a(t,yt,s),a(t,g,s),r(g,J),r(J,Kt),a(t,Tt,s),a(t,C,s),r(C,V),r(V,Qt),a(t,St,s),a(t,X,s),r(X,it),r(it,Jt),a(t,At,s),a(t,H,s),r(H,Y),r(Y,Vt),a(t,gt,s),a(t,Z,s),r(Z,rt),r(rt,Xt),a(t,Ct,s),a(t,L,s),r(L,tt),r(tt,Yt),a(t,Ht,s),a(t,et,s),r(et,P),r(P,Zt),a(t,Lt,s),a(t,R,s),R.innerHTML=ts,a(t,Pt,s),a(t,st,s),r(st,I),r(I,te),a(t,Rt,s),a(t,at,s),r(at,O),r(O,ee),a(t,It,s),a(t,ot,s),r(ot,$),r($,se),a(t,Ot,s),a(t,nt,s),r(nt,M),r(M,ae)},p:oe,i:oe,o:oe,d(t){t&&e(h),t&&e(pt),t&&e(m),t&&e(ut),t&&e(d),t&&e(ct),t&&e(D),t&&e(ft),t&&e(F),t&&e(ht),t&&e(v),t&&e(mt),t&&e(k),t&&e(dt),t&&e(x),t&&e(_t),t&&e(b),t&&e(vt),t&&e(E),t&&e(kt),t&&e(q),t&&e(xt),t&&e(w),t&&e(bt),t&&e(y),t&&e(Et),t&&e(T),t&&e(qt),t&&e(S),t&&e(wt),t&&e(A),t&&e(yt),t&&e(g),t&&e(Tt),t&&e(C),t&&e(St),t&&e(X),t&&e(At),t&&e(H),t&&e(gt),t&&e(Z),t&&e(Ct),t&&e(L),t&&e(Ht),t&&e(et),t&&e(Lt),t&&e(R),t&&e(Pt),t&&e(st),t&&e(Rt),t&&e(at),t&&e(It),t&&e(ot),t&&e(Ot),t&&e(nt)}}}const fs={title:"Sphinx",short:""};class hs extends is{constructor(h){super(),rs(this,h,null,us,ps,{})}}export{hs as default,fs as metadata};
