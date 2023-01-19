import{S as ls,i as rs,s as ps,k as o,q as c,a as p,l as n,m as i,r as f,h as e,c as u,n as l,b as a,E as r,B as oe}from"./index-5039aeb8.js";function us(Qe){let m,N,Mt,pt,h,j,$t,ut,d,D,Nt,ct,W,it,jt,ft,F,_,Dt,mt,v,Je=`<code class="language-bash">   $ conda create <span class="token parameter variable">-n</span> sphinx <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.7</span> <span class="token comment"># Create the env we will use for sphinx</span>
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
   <span class="token punctuation">(</span>sphinx<span class="token punctuation">)</span> $ start chrome _build/html/index.html</code>`,ht,k,G,Wt,dt,x,U,Ft,_t,b,Ve=`<code class="language-undefined">source                                          *Root*  
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
   f.write(output)</code>`,yt,g,J,Kt,Tt,C,V,Qt,St,X,lt,Jt,At,H,Y,Vt,gt,Z,rt,Xt,Ct,L,tt,Yt,Ht,et,P,Zt,Lt,R,ts='<code class="language-undefined">pygmentize -L lexers</code>',Pt,st,I,te,Rt,at,O,ee,It,ot,M,se,Ot,nt,$,ae;return{c(){m=o("h2"),N=o("a"),Mt=c("Introduction"),pt=p(),h=o("h2"),j=o("a"),$t=c("Setup"),ut=p(),d=o("h3"),D=o("a"),Nt=c("Installation with Anaconda"),ct=p(),W=o("p"),it=o("strong"),jt=c("Install Anaconda:"),ft=p(),F=o("p"),_=o("a"),Dt=c("https://docs.anaconda.com/anaconda/install/windows/"),mt=p(),v=o("pre"),ht=p(),k=o("h3"),G=o("a"),Wt=c("Website Setup"),dt=p(),x=o("h4"),U=o("a"),Ft=c("Source Folder"),_t=p(),b=o("pre"),vt=p(),E=o("h4"),B=o("a"),Gt=c("Conf File"),kt=p(),q=o("pre"),xt=p(),w=o("h2"),z=o("a"),Ut=c("Cheat Sheets"),bt=p(),y=o("h3"),K=o("a"),Bt=c("ReStructuredText (.rst)"),Et=p(),T=o("pre"),qt=p(),S=o("h3"),Q=o("a"),zt=c("Markdown"),wt=p(),A=o("pre"),yt=p(),g=o("h2"),J=o("a"),Kt=c("Themes"),Tt=p(),C=o("h3"),V=o("a"),Qt=c("Install Theme"),St=p(),X=o("blockquote"),lt=o("p"),Jt=c("TODO"),At=p(),H=o("h3"),Y=o("a"),Vt=c("Edit Style"),gt=p(),Z=o("blockquote"),rt=o("p"),Xt=c("TODO"),Ct=p(),L=o("h3"),tt=o("a"),Yt=c("Code Syntax Highlighting"),Ht=p(),et=o("p"),P=o("a"),Zt=c("https://stackoverflow.com/questions/11315504/sphinx-list-of-supported-languages-for-highlighting"),Lt=p(),R=o("pre"),Pt=p(),st=o("p"),I=o("a"),te=c("https://docs.typo3.org/m/typo3/docs-how-to-document/master/en-us/WritingReST/Codeblocks.html"),Rt=p(),at=o("p"),O=o("a"),ee=c("https://pygments.org/docs/lexers/"),It=p(),ot=o("p"),M=o("a"),se=c("https://stylishthemes.github.io/Syntax-Themes/pygments/"),Ot=p(),nt=o("p"),$=o("a"),ae=c("https://nbsphinx.readthedocs.io/en/0.7.0/installation.html"),this.h()},l(t){m=n(t,"H2",{id:!0});var s=i(m);N=n(s,"A",{href:!0});var ne=i(N);Mt=f(ne,"Introduction"),ne.forEach(e),s.forEach(e),pt=u(t),h=n(t,"H2",{id:!0});var ie=i(h);j=n(ie,"A",{href:!0});var le=i(j);$t=f(le,"Setup"),le.forEach(e),ie.forEach(e),ut=u(t),d=n(t,"H3",{id:!0});var re=i(d);D=n(re,"A",{href:!0});var pe=i(D);Nt=f(pe,"Installation with Anaconda"),pe.forEach(e),re.forEach(e),ct=u(t),W=n(t,"P",{});var ue=i(W);it=n(ue,"STRONG",{});var ce=i(it);jt=f(ce,"Install Anaconda:"),ce.forEach(e),ue.forEach(e),ft=u(t),F=n(t,"P",{});var fe=i(F);_=n(fe,"A",{href:!0,rel:!0});var me=i(_);Dt=f(me,"https://docs.anaconda.com/anaconda/install/windows/"),me.forEach(e),fe.forEach(e),mt=u(t),v=n(t,"PRE",{class:!0});var es=i(v);es.forEach(e),ht=u(t),k=n(t,"H3",{id:!0});var he=i(k);G=n(he,"A",{href:!0});var de=i(G);Wt=f(de,"Website Setup"),de.forEach(e),he.forEach(e),dt=u(t),x=n(t,"H4",{id:!0});var _e=i(x);U=n(_e,"A",{href:!0});var ve=i(U);Ft=f(ve,"Source Folder"),ve.forEach(e),_e.forEach(e),_t=u(t),b=n(t,"PRE",{class:!0});var ss=i(b);ss.forEach(e),vt=u(t),E=n(t,"H4",{id:!0});var ke=i(E);B=n(ke,"A",{href:!0});var xe=i(B);Gt=f(xe,"Conf File"),xe.forEach(e),ke.forEach(e),kt=u(t),q=n(t,"PRE",{class:!0});var as=i(q);as.forEach(e),xt=u(t),w=n(t,"H2",{id:!0});var be=i(w);z=n(be,"A",{href:!0});var Ee=i(z);Ut=f(Ee,"Cheat Sheets"),Ee.forEach(e),be.forEach(e),bt=u(t),y=n(t,"H3",{id:!0});var qe=i(y);K=n(qe,"A",{href:!0});var we=i(K);Bt=f(we,"ReStructuredText (.rst)"),we.forEach(e),qe.forEach(e),Et=u(t),T=n(t,"PRE",{class:!0});var os=i(T);os.forEach(e),qt=u(t),S=n(t,"H3",{id:!0});var ye=i(S);Q=n(ye,"A",{href:!0});var Te=i(Q);zt=f(Te,"Markdown"),Te.forEach(e),ye.forEach(e),wt=u(t),A=n(t,"PRE",{class:!0});var ns=i(A);ns.forEach(e),yt=u(t),g=n(t,"H2",{id:!0});var Se=i(g);J=n(Se,"A",{href:!0});var Ae=i(J);Kt=f(Ae,"Themes"),Ae.forEach(e),Se.forEach(e),Tt=u(t),C=n(t,"H3",{id:!0});var ge=i(C);V=n(ge,"A",{href:!0});var Ce=i(V);Qt=f(Ce,"Install Theme"),Ce.forEach(e),ge.forEach(e),St=u(t),X=n(t,"BLOCKQUOTE",{});var He=i(X);lt=n(He,"P",{});var Le=i(lt);Jt=f(Le,"TODO"),Le.forEach(e),He.forEach(e),At=u(t),H=n(t,"H3",{id:!0});var Pe=i(H);Y=n(Pe,"A",{href:!0});var Re=i(Y);Vt=f(Re,"Edit Style"),Re.forEach(e),Pe.forEach(e),gt=u(t),Z=n(t,"BLOCKQUOTE",{});var Ie=i(Z);rt=n(Ie,"P",{});var Oe=i(rt);Xt=f(Oe,"TODO"),Oe.forEach(e),Ie.forEach(e),Ct=u(t),L=n(t,"H3",{id:!0});var Me=i(L);tt=n(Me,"A",{href:!0});var $e=i(tt);Yt=f($e,"Code Syntax Highlighting"),$e.forEach(e),Me.forEach(e),Ht=u(t),et=n(t,"P",{});var Ne=i(et);P=n(Ne,"A",{href:!0,rel:!0});var je=i(P);Zt=f(je,"https://stackoverflow.com/questions/11315504/sphinx-list-of-supported-languages-for-highlighting"),je.forEach(e),Ne.forEach(e),Lt=u(t),R=n(t,"PRE",{class:!0});var is=i(R);is.forEach(e),Pt=u(t),st=n(t,"P",{});var De=i(st);I=n(De,"A",{href:!0,rel:!0});var We=i(I);te=f(We,"https://docs.typo3.org/m/typo3/docs-how-to-document/master/en-us/WritingReST/Codeblocks.html"),We.forEach(e),De.forEach(e),Rt=u(t),at=n(t,"P",{});var Fe=i(at);O=n(Fe,"A",{href:!0,rel:!0});var Ge=i(O);ee=f(Ge,"https://pygments.org/docs/lexers/"),Ge.forEach(e),Fe.forEach(e),It=u(t),ot=n(t,"P",{});var Ue=i(ot);M=n(Ue,"A",{href:!0,rel:!0});var Be=i(M);se=f(Be,"https://stylishthemes.github.io/Syntax-Themes/pygments/"),Be.forEach(e),Ue.forEach(e),Ot=u(t),nt=n(t,"P",{});var ze=i(nt);$=n(ze,"A",{href:!0,rel:!0});var Ke=i($);ae=f(Ke,"https://nbsphinx.readthedocs.io/en/0.7.0/installation.html"),Ke.forEach(e),ze.forEach(e),this.h()},h(){l(N,"href","#introduction"),l(m,"id","introduction"),l(j,"href","#setup"),l(h,"id","setup"),l(D,"href","#installation-with-anaconda"),l(d,"id","installation-with-anaconda"),l(_,"href","https://docs.anaconda.com/anaconda/install/windows/"),l(_,"rel","nofollow"),l(v,"class","language-bash"),l(G,"href","#website-setup"),l(k,"id","website-setup"),l(U,"href","#source-folder"),l(x,"id","source-folder"),l(b,"class","language-undefined"),l(B,"href","#conf-file"),l(E,"id","conf-file"),l(q,"class","language-undefined"),l(z,"href","#cheat-sheets"),l(w,"id","cheat-sheets"),l(K,"href","#restructuredtext-rst"),l(y,"id","restructuredtext-rst"),l(T,"class","language-rst"),l(Q,"href","#markdown"),l(S,"id","markdown"),l(A,"class","language-undefined"),l(J,"href","#themes"),l(g,"id","themes"),l(V,"href","#install-theme"),l(C,"id","install-theme"),l(Y,"href","#edit-style"),l(H,"id","edit-style"),l(tt,"href","#code-syntax-highlighting"),l(L,"id","code-syntax-highlighting"),l(P,"href","https://stackoverflow.com/questions/11315504/sphinx-list-of-supported-languages-for-highlighting"),l(P,"rel","nofollow"),l(R,"class","language-undefined"),l(I,"href","https://docs.typo3.org/m/typo3/docs-how-to-document/master/en-us/WritingReST/Codeblocks.html"),l(I,"rel","nofollow"),l(O,"href","https://pygments.org/docs/lexers/"),l(O,"rel","nofollow"),l(M,"href","https://stylishthemes.github.io/Syntax-Themes/pygments/"),l(M,"rel","nofollow"),l($,"href","https://nbsphinx.readthedocs.io/en/0.7.0/installation.html"),l($,"rel","nofollow")},m(t,s){a(t,m,s),r(m,N),r(N,Mt),a(t,pt,s),a(t,h,s),r(h,j),r(j,$t),a(t,ut,s),a(t,d,s),r(d,D),r(D,Nt),a(t,ct,s),a(t,W,s),r(W,it),r(it,jt),a(t,ft,s),a(t,F,s),r(F,_),r(_,Dt),a(t,mt,s),a(t,v,s),v.innerHTML=Je,a(t,ht,s),a(t,k,s),r(k,G),r(G,Wt),a(t,dt,s),a(t,x,s),r(x,U),r(U,Ft),a(t,_t,s),a(t,b,s),b.innerHTML=Ve,a(t,vt,s),a(t,E,s),r(E,B),r(B,Gt),a(t,kt,s),a(t,q,s),q.innerHTML=Xe,a(t,xt,s),a(t,w,s),r(w,z),r(z,Ut),a(t,bt,s),a(t,y,s),r(y,K),r(K,Bt),a(t,Et,s),a(t,T,s),T.innerHTML=Ye,a(t,qt,s),a(t,S,s),r(S,Q),r(Q,zt),a(t,wt,s),a(t,A,s),A.innerHTML=Ze,a(t,yt,s),a(t,g,s),r(g,J),r(J,Kt),a(t,Tt,s),a(t,C,s),r(C,V),r(V,Qt),a(t,St,s),a(t,X,s),r(X,lt),r(lt,Jt),a(t,At,s),a(t,H,s),r(H,Y),r(Y,Vt),a(t,gt,s),a(t,Z,s),r(Z,rt),r(rt,Xt),a(t,Ct,s),a(t,L,s),r(L,tt),r(tt,Yt),a(t,Ht,s),a(t,et,s),r(et,P),r(P,Zt),a(t,Lt,s),a(t,R,s),R.innerHTML=ts,a(t,Pt,s),a(t,st,s),r(st,I),r(I,te),a(t,Rt,s),a(t,at,s),r(at,O),r(O,ee),a(t,It,s),a(t,ot,s),r(ot,M),r(M,se),a(t,Ot,s),a(t,nt,s),r(nt,$),r($,ae)},p:oe,i:oe,o:oe,d(t){t&&e(m),t&&e(pt),t&&e(h),t&&e(ut),t&&e(d),t&&e(ct),t&&e(W),t&&e(ft),t&&e(F),t&&e(mt),t&&e(v),t&&e(ht),t&&e(k),t&&e(dt),t&&e(x),t&&e(_t),t&&e(b),t&&e(vt),t&&e(E),t&&e(kt),t&&e(q),t&&e(xt),t&&e(w),t&&e(bt),t&&e(y),t&&e(Et),t&&e(T),t&&e(qt),t&&e(S),t&&e(wt),t&&e(A),t&&e(yt),t&&e(g),t&&e(Tt),t&&e(C),t&&e(St),t&&e(X),t&&e(At),t&&e(H),t&&e(gt),t&&e(Z),t&&e(Ct),t&&e(L),t&&e(Ht),t&&e(et),t&&e(Lt),t&&e(R),t&&e(Pt),t&&e(st),t&&e(Rt),t&&e(at),t&&e(It),t&&e(ot),t&&e(Ot),t&&e(nt)}}}const fs={title:"Sphinx documentation generator",short:"Convert source code documentation written in the reStructuredText format into a variety of output formats, such as HTML and PDF",topic:"computer-science sphinx python"};class ms extends ls{constructor(m){super(),rs(this,m,null,us,ps,{})}}export{ms as default,fs as metadata};
