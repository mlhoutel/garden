import{S as ac,i as dc,s as lc,k as r,q as n,a as l,l as o,m as a,r as s,h as t,c,n as h,b as E,E as e,B as Fa}from"./index-46686b93.js";function cc(ql){let p,g,Wr,Xt,f,m,fe,qr,Fr,ie,Ur,Nr,b,Ee,_e,jr,Jr,ve,he,Kr,Qr,k,ue,pe,Xr,Yr,me,be,Zr,$r,T,ke,Te,gr,eo,De,Re,to,ro,D,we,Ce,oo,ao,Be,Oe,lo,co,R,xe,ye,no,so,Pe,He,fo,io,w,Me,Le,Eo,_o,Se,Ve,vo,ho,C,Ie,ze,uo,po,Ae,Ge,mo,bo,B,We,qe,ko,To,Fe,Ue,Do,Ro,O,Ne,je,wo,Co,Je,Ke,Bo,Oo,x,Qe,Xe,xo,yo,Ye,Ze,Po,Ho,y,$e,ge,Mo,Lo,et,tt,So,Vo,P,rt,ot,Io,zo,at,dt,Ao,Go,H,lt,ct,Wo,qo,nt,st,Fo,Uo,M,ft,it,No,jo,Et,_t,Jo,Ko,L,vt,ht,Qo,Xo,ut,pt,Yo,Zo,S,mt,bt,$o,go,kt,Tt,ea,ta,V,Dt,Rt,ra,oa,wt,Ct,aa,da,I,Bt,Ot,la,ca,xt,yt,na,sa,z,Pt,Ht,fa,ia,Mt,Lt,Ea,Yt,A,ee,_a,Zt,v,G,St,va,ha,Vt,ua,pa,W,It,zt,ma,ba,At,Gt,ka,Ta,q,Wt,qt,Da,Ra,Ft,wa,Ca,F,Ut,Nt,Ba,Oa,jt,xa,ya,U,Jt,Kt,Pa,Ha,Qt,Ma,$t,te,La,gt,N,re,Sa,er,j,Fl=`<code class="language-undefined">user: docker
pwd: tcuser</code>`,tr,oe,Va,rr,J,Ul='<code class="language-undefined">ifconfig eth1</code>',or,ae,Ia,ar,K,Nl=`<code class="language-undefined">su docker
tce-load -wi kmaps
sudo loadkmap &lt; /usr/share/kmap/azerty/fr-latin9.kmap</code>`,dr,de,za,lr,Q,jl=`<code class="language-undefined">SessionWindowSelectionAction = Compromise
paste : ctrl + shift + V</code>`,cr,le,Aa,nr,X,Jl='<code class="language-undefined">ssh docker@ip_machine</code>',sr,ce,Ga,fr,Y,Kl=`<code class="language-undefined">install nginx server: docker run -d -p 8080:80 nginx
open webpage: http://ip_machine:8080/</code>`,ir,ne,Wa,Er,Z,Ql='<code class="language-undefined">cd /usr/share/nginx/html</code>',_r,se,qa,vr,$,Xl=`<code class="language-undefined">apt-get update
apt-get install apt-file
apt-file update
apt-get install nano</code>`;return{c(){p=r("h2"),g=r("a"),Wr=n("Fast Help"),Xt=l(),f=r("table"),m=r("tr"),fe=r("th"),qr=n("Instruction"),Fr=l(),ie=r("th"),Ur=n("Command"),Nr=l(),b=r("tr"),Ee=r("td"),_e=r("b"),jr=n("Pull image"),Jr=l(),ve=r("td"),he=r("code"),Kr=n("docker pull hello-world"),Qr=l(),k=r("tr"),ue=r("td"),pe=r("b"),Xr=n("List of containers images"),Yr=l(),me=r("td"),be=r("code"),Zr=n("docker images -a"),$r=l(),T=r("tr"),ke=r("td"),Te=r("b"),gr=n("Create container"),eo=l(),De=r("td"),Re=r("code"),to=n("docker create --name container_name ubuntu"),ro=l(),D=r("tr"),we=r("td"),Ce=r("b"),oo=n("Run container"),ao=l(),Be=r("td"),Oe=r("code"),lo=n("docker run hello-world"),co=l(),R=r("tr"),xe=r("td"),ye=r("b"),no=n("Get container id"),so=l(),Pe=r("td"),He=r("code"),fo=n('sudo docker ps -aqf "name=container_name"'),io=l(),w=r("tr"),Me=r("td"),Le=r("b"),Eo=n("Run a saved image"),_o=l(),Se=r("td"),Ve=r("code"),vo=n("code>docker run -it -p 8091:8091 container_name"),ho=l(),C=r("tr"),Ie=r("td"),ze=r("b"),uo=n("Operational bash cmd"),po=l(),Ae=r("td"),Ge=r("code"),mo=n("docker exec -ti 2769d51daeb2 bash"),bo=l(),B=r("tr"),We=r("td"),qe=r("b"),ko=n("Commit container"),To=l(),Fe=r("td"),Ue=r("code"),Do=n("docker commit 2769d51daeb2"),Ro=l(),O=r("tr"),Ne=r("td"),je=r("b"),wo=n("Stop container"),Co=l(),Je=r("td"),Ke=r("code"),Bo=n("docker stop 2769d51daeb2"),Oo=l(),x=r("tr"),Qe=r("td"),Xe=r("b"),xo=n("Remove container"),yo=l(),Ye=r("td"),Ze=r("code"),Po=n("docker rm 2769d51daeb2"),Ho=l(),y=r("tr"),$e=r("td"),ge=r("b"),Mo=n("Remove image"),Lo=l(),et=r("td"),tt=r("code"),So=n("docker rmi 2769d51daeb2"),Vo=l(),P=r("tr"),rt=r("td"),ot=r("b"),Io=n("List of running container"),zo=l(),at=r("td"),dt=r("code"),Ao=n("docker ps"),Go=l(),H=r("tr"),lt=r("td"),ct=r("b"),Wo=n("Clean and remove all containers"),qo=l(),nt=r("td"),st=r("code"),Fo=n("docker system prune"),Uo=l(),M=r("tr"),ft=r("td"),it=r("b"),No=n("Rename image"),jo=l(),Et=r("td"),_t=r("code"),Jo=n('docker tag 18455f1ec44d "container_name"'),Ko=l(),L=r("tr"),vt=r("td"),ht=r("b"),Qo=n("Create VM"),Xo=l(),ut=r("td"),pt=r("code"),Yo=n('docker-machine create \\--driver virtualbox --virtualbox-disk-size "40000" default'),Zo=l(),S=r("tr"),mt=r("td"),bt=r("b"),$o=n("Delete VM"),go=l(),kt=r("td"),Tt=r("code"),ea=n("docker rm default"),ta=l(),V=r("tr"),Dt=r("td"),Rt=r("b"),ra=n("Docker login"),oa=l(),wt=r("td"),Ct=r("code"),aa=n('docker login -u "myusername" -p "mypassword" docker.io'),da=l(),I=r("tr"),Bt=r("td"),Ot=r("b"),la=n("Docker ID"),ca=l(),xt=r("td"),yt=r("code"),na=n("docker tag 18455f1ec44d myusername/ubuntu_container_name:latest"),sa=l(),z=r("tr"),Pt=r("td"),Ht=r("b"),fa=n("Docker push"),ia=l(),Mt=r("td"),Lt=r("code"),Ea=n("docker push docker.io/mlhoutel/ubuntu_container_name:latest"),Yt=l(),A=r("h3"),ee=r("a"),_a=n("Docker Setup"),Zt=l(),v=r("table"),G=r("tr"),St=r("th"),va=n("OS"),ha=l(),Vt=r("th"),ua=n("Installation Link"),pa=l(),W=r("tr"),It=r("td"),zt=r("b"),ma=n("Linux"),ba=l(),At=r("td"),Gt=r("code"),ka=n("sudo apt-get install docker-ce docker-ce-cli containerd.io"),Ta=l(),q=r("tr"),Wt=r("td"),qt=r("b"),Da=n("Mac"),Ra=l(),Ft=r("td"),wa=n("https://hub.docker.com/editions/community/docker-ce-desktop-mac/"),Ca=l(),F=r("tr"),Ut=r("td"),Nt=r("b"),Ba=n("Windows Pro"),Oa=l(),jt=r("td"),xa=n("https://hub.docker.com/editions/community/docker-ce-desktop-windows/"),ya=l(),U=r("tr"),Jt=r("td"),Kt=r("b"),Pa=n("Windows Family"),Ha=l(),Qt=r("td"),Ma=n("https://github.com/docker/toolbox/releases"),$t=l(),te=r("em"),La=n("https://www.docker.com/ - https://hub.docker.com/"),gt=l(),N=r("h3"),re=r("a"),Sa=n("Connect to the VM"),er=l(),j=r("pre"),tr=l(),oe=r("p"),Va=n("Get the VM ip with"),rr=l(),J=r("pre"),or=l(),ae=r("p"),Ia=n("Set the azert keyboard"),ar=l(),K=r("pre"),dr=l(),de=r("p"),za=n("Use Putty"),lr=l(),Q=r("pre"),cr=l(),le=r("p"),Aa=n("Use SSH"),nr=l(),X=r("pre"),sr=l(),ce=r("p"),Ga=n("Install nginx server"),fr=l(),Y=r("pre"),ir=l(),ne=r("p"),Wa=n("Edit nginx webpage:"),Er=l(),Z=r("pre"),_r=l(),se=r("p"),qa=n("Get Nano:"),vr=l(),$=r("pre"),this.h()},l(d){p=o(d,"H2",{id:!0});var i=a(p);g=o(i,"A",{href:!0});var Ua=a(g);Wr=s(Ua,"Fast Help"),Ua.forEach(t),i.forEach(t),Xt=c(d),f=o(d,"TABLE",{});var _=a(f);m=o(_,"TR",{});var hr=a(m);fe=o(hr,"TH",{});var Na=a(fe);qr=s(Na,"Instruction"),Na.forEach(t),Fr=c(hr),ie=o(hr,"TH",{});var ja=a(ie);Ur=s(ja,"Command"),ja.forEach(t),hr.forEach(t),Nr=c(_),b=o(_,"TR",{});var ur=a(b);Ee=o(ur,"TD",{});var Ja=a(Ee);_e=o(Ja,"B",{});var Ka=a(_e);jr=s(Ka,"Pull image"),Ka.forEach(t),Ja.forEach(t),Jr=c(ur),ve=o(ur,"TD",{});var Qa=a(ve);he=o(Qa,"CODE",{});var Xa=a(he);Kr=s(Xa,"docker pull hello-world"),Xa.forEach(t),Qa.forEach(t),ur.forEach(t),Qr=c(_),k=o(_,"TR",{});var pr=a(k);ue=o(pr,"TD",{});var Ya=a(ue);pe=o(Ya,"B",{});var Za=a(pe);Xr=s(Za,"List of containers images"),Za.forEach(t),Ya.forEach(t),Yr=c(pr),me=o(pr,"TD",{});var $a=a(me);be=o($a,"CODE",{});var ga=a(be);Zr=s(ga,"docker images -a"),ga.forEach(t),$a.forEach(t),pr.forEach(t),$r=c(_),T=o(_,"TR",{});var mr=a(T);ke=o(mr,"TD",{});var ed=a(ke);Te=o(ed,"B",{});var td=a(Te);gr=s(td,"Create container"),td.forEach(t),ed.forEach(t),eo=c(mr),De=o(mr,"TD",{});var rd=a(De);Re=o(rd,"CODE",{});var od=a(Re);to=s(od,"docker create --name container_name ubuntu"),od.forEach(t),rd.forEach(t),mr.forEach(t),ro=c(_),D=o(_,"TR",{});var br=a(D);we=o(br,"TD",{});var ad=a(we);Ce=o(ad,"B",{});var dd=a(Ce);oo=s(dd,"Run container"),dd.forEach(t),ad.forEach(t),ao=c(br),Be=o(br,"TD",{});var ld=a(Be);Oe=o(ld,"CODE",{});var cd=a(Oe);lo=s(cd,"docker run hello-world"),cd.forEach(t),ld.forEach(t),br.forEach(t),co=c(_),R=o(_,"TR",{});var kr=a(R);xe=o(kr,"TD",{});var nd=a(xe);ye=o(nd,"B",{});var sd=a(ye);no=s(sd,"Get container id"),sd.forEach(t),nd.forEach(t),so=c(kr),Pe=o(kr,"TD",{});var fd=a(Pe);He=o(fd,"CODE",{});var id=a(He);fo=s(id,'sudo docker ps -aqf "name=container_name"'),id.forEach(t),fd.forEach(t),kr.forEach(t),io=c(_),w=o(_,"TR",{});var Tr=a(w);Me=o(Tr,"TD",{});var Ed=a(Me);Le=o(Ed,"B",{});var _d=a(Le);Eo=s(_d,"Run a saved image"),_d.forEach(t),Ed.forEach(t),_o=c(Tr),Se=o(Tr,"TD",{});var vd=a(Se);Ve=o(vd,"CODE",{});var hd=a(Ve);vo=s(hd,"code>docker run -it -p 8091:8091 container_name"),hd.forEach(t),vd.forEach(t),Tr.forEach(t),ho=c(_),C=o(_,"TR",{});var Dr=a(C);Ie=o(Dr,"TD",{});var ud=a(Ie);ze=o(ud,"B",{});var pd=a(ze);uo=s(pd,"Operational bash cmd"),pd.forEach(t),ud.forEach(t),po=c(Dr),Ae=o(Dr,"TD",{});var md=a(Ae);Ge=o(md,"CODE",{});var bd=a(Ge);mo=s(bd,"docker exec -ti 2769d51daeb2 bash"),bd.forEach(t),md.forEach(t),Dr.forEach(t),bo=c(_),B=o(_,"TR",{});var Rr=a(B);We=o(Rr,"TD",{});var kd=a(We);qe=o(kd,"B",{});var Td=a(qe);ko=s(Td,"Commit container"),Td.forEach(t),kd.forEach(t),To=c(Rr),Fe=o(Rr,"TD",{});var Dd=a(Fe);Ue=o(Dd,"CODE",{});var Rd=a(Ue);Do=s(Rd,"docker commit 2769d51daeb2"),Rd.forEach(t),Dd.forEach(t),Rr.forEach(t),Ro=c(_),O=o(_,"TR",{});var wr=a(O);Ne=o(wr,"TD",{});var wd=a(Ne);je=o(wd,"B",{});var Cd=a(je);wo=s(Cd,"Stop container"),Cd.forEach(t),wd.forEach(t),Co=c(wr),Je=o(wr,"TD",{});var Bd=a(Je);Ke=o(Bd,"CODE",{});var Od=a(Ke);Bo=s(Od,"docker stop 2769d51daeb2"),Od.forEach(t),Bd.forEach(t),wr.forEach(t),Oo=c(_),x=o(_,"TR",{});var Cr=a(x);Qe=o(Cr,"TD",{});var xd=a(Qe);Xe=o(xd,"B",{});var yd=a(Xe);xo=s(yd,"Remove container"),yd.forEach(t),xd.forEach(t),yo=c(Cr),Ye=o(Cr,"TD",{});var Pd=a(Ye);Ze=o(Pd,"CODE",{});var Hd=a(Ze);Po=s(Hd,"docker rm 2769d51daeb2"),Hd.forEach(t),Pd.forEach(t),Cr.forEach(t),Ho=c(_),y=o(_,"TR",{});var Br=a(y);$e=o(Br,"TD",{});var Md=a($e);ge=o(Md,"B",{});var Ld=a(ge);Mo=s(Ld,"Remove image"),Ld.forEach(t),Md.forEach(t),Lo=c(Br),et=o(Br,"TD",{});var Sd=a(et);tt=o(Sd,"CODE",{});var Vd=a(tt);So=s(Vd,"docker rmi 2769d51daeb2"),Vd.forEach(t),Sd.forEach(t),Br.forEach(t),Vo=c(_),P=o(_,"TR",{});var Or=a(P);rt=o(Or,"TD",{});var Id=a(rt);ot=o(Id,"B",{});var zd=a(ot);Io=s(zd,"List of running container"),zd.forEach(t),Id.forEach(t),zo=c(Or),at=o(Or,"TD",{});var Ad=a(at);dt=o(Ad,"CODE",{});var Gd=a(dt);Ao=s(Gd,"docker ps"),Gd.forEach(t),Ad.forEach(t),Or.forEach(t),Go=c(_),H=o(_,"TR",{});var xr=a(H);lt=o(xr,"TD",{});var Wd=a(lt);ct=o(Wd,"B",{});var qd=a(ct);Wo=s(qd,"Clean and remove all containers"),qd.forEach(t),Wd.forEach(t),qo=c(xr),nt=o(xr,"TD",{});var Fd=a(nt);st=o(Fd,"CODE",{});var Ud=a(st);Fo=s(Ud,"docker system prune"),Ud.forEach(t),Fd.forEach(t),xr.forEach(t),Uo=c(_),M=o(_,"TR",{});var yr=a(M);ft=o(yr,"TD",{});var Nd=a(ft);it=o(Nd,"B",{});var jd=a(it);No=s(jd,"Rename image"),jd.forEach(t),Nd.forEach(t),jo=c(yr),Et=o(yr,"TD",{});var Jd=a(Et);_t=o(Jd,"CODE",{});var Kd=a(_t);Jo=s(Kd,'docker tag 18455f1ec44d "container_name"'),Kd.forEach(t),Jd.forEach(t),yr.forEach(t),Ko=c(_),L=o(_,"TR",{});var Pr=a(L);vt=o(Pr,"TD",{});var Qd=a(vt);ht=o(Qd,"B",{});var Xd=a(ht);Qo=s(Xd,"Create VM"),Xd.forEach(t),Qd.forEach(t),Xo=c(Pr),ut=o(Pr,"TD",{});var Yd=a(ut);pt=o(Yd,"CODE",{});var Zd=a(pt);Yo=s(Zd,'docker-machine create \\--driver virtualbox --virtualbox-disk-size "40000" default'),Zd.forEach(t),Yd.forEach(t),Pr.forEach(t),Zo=c(_),S=o(_,"TR",{});var Hr=a(S);mt=o(Hr,"TD",{});var $d=a(mt);bt=o($d,"B",{});var gd=a(bt);$o=s(gd,"Delete VM"),gd.forEach(t),$d.forEach(t),go=c(Hr),kt=o(Hr,"TD",{});var el=a(kt);Tt=o(el,"CODE",{});var tl=a(Tt);ea=s(tl,"docker rm default"),tl.forEach(t),el.forEach(t),Hr.forEach(t),ta=c(_),V=o(_,"TR",{});var Mr=a(V);Dt=o(Mr,"TD",{});var rl=a(Dt);Rt=o(rl,"B",{});var ol=a(Rt);ra=s(ol,"Docker login"),ol.forEach(t),rl.forEach(t),oa=c(Mr),wt=o(Mr,"TD",{});var al=a(wt);Ct=o(al,"CODE",{});var dl=a(Ct);aa=s(dl,'docker login -u "myusername" -p "mypassword" docker.io'),dl.forEach(t),al.forEach(t),Mr.forEach(t),da=c(_),I=o(_,"TR",{});var Lr=a(I);Bt=o(Lr,"TD",{});var ll=a(Bt);Ot=o(ll,"B",{});var cl=a(Ot);la=s(cl,"Docker ID"),cl.forEach(t),ll.forEach(t),ca=c(Lr),xt=o(Lr,"TD",{});var nl=a(xt);yt=o(nl,"CODE",{});var sl=a(yt);na=s(sl,"docker tag 18455f1ec44d myusername/ubuntu_container_name:latest"),sl.forEach(t),nl.forEach(t),Lr.forEach(t),sa=c(_),z=o(_,"TR",{});var Sr=a(z);Pt=o(Sr,"TD",{});var fl=a(Pt);Ht=o(fl,"B",{});var il=a(Ht);fa=s(il,"Docker push"),il.forEach(t),fl.forEach(t),ia=c(Sr),Mt=o(Sr,"TD",{});var El=a(Mt);Lt=o(El,"CODE",{});var _l=a(Lt);Ea=s(_l,"docker push docker.io/mlhoutel/ubuntu_container_name:latest"),_l.forEach(t),El.forEach(t),Sr.forEach(t),_.forEach(t),Yt=c(d),A=o(d,"H3",{id:!0});var vl=a(A);ee=o(vl,"A",{href:!0});var hl=a(ee);_a=s(hl,"Docker Setup"),hl.forEach(t),vl.forEach(t),Zt=c(d),v=o(d,"TABLE",{});var u=a(v);G=o(u,"TR",{});var Vr=a(G);St=o(Vr,"TH",{});var ul=a(St);va=s(ul,"OS"),ul.forEach(t),ha=c(Vr),Vt=o(Vr,"TH",{});var pl=a(Vt);ua=s(pl,"Installation Link"),pl.forEach(t),Vr.forEach(t),pa=c(u),W=o(u,"TR",{});var Ir=a(W);It=o(Ir,"TD",{});var ml=a(It);zt=o(ml,"B",{});var bl=a(zt);ma=s(bl,"Linux"),bl.forEach(t),ml.forEach(t),ba=c(Ir),At=o(Ir,"TD",{});var kl=a(At);Gt=o(kl,"CODE",{});var Tl=a(Gt);ka=s(Tl,"sudo apt-get install docker-ce docker-ce-cli containerd.io"),Tl.forEach(t),kl.forEach(t),Ir.forEach(t),Ta=c(u),q=o(u,"TR",{});var zr=a(q);Wt=o(zr,"TD",{});var Dl=a(Wt);qt=o(Dl,"B",{});var Rl=a(qt);Da=s(Rl,"Mac"),Rl.forEach(t),Dl.forEach(t),Ra=c(zr),Ft=o(zr,"TD",{});var wl=a(Ft);wa=s(wl,"https://hub.docker.com/editions/community/docker-ce-desktop-mac/"),wl.forEach(t),zr.forEach(t),Ca=c(u),F=o(u,"TR",{});var Ar=a(F);Ut=o(Ar,"TD",{});var Cl=a(Ut);Nt=o(Cl,"B",{});var Bl=a(Nt);Ba=s(Bl,"Windows Pro"),Bl.forEach(t),Cl.forEach(t),Oa=c(Ar),jt=o(Ar,"TD",{});var Ol=a(jt);xa=s(Ol,"https://hub.docker.com/editions/community/docker-ce-desktop-windows/"),Ol.forEach(t),Ar.forEach(t),ya=c(u),U=o(u,"TR",{});var Gr=a(U);Jt=o(Gr,"TD",{});var xl=a(Jt);Kt=o(xl,"B",{});var yl=a(Kt);Pa=s(yl,"Windows Family"),yl.forEach(t),xl.forEach(t),Ha=c(Gr),Qt=o(Gr,"TD",{});var Pl=a(Qt);Ma=s(Pl,"https://github.com/docker/toolbox/releases"),Pl.forEach(t),Gr.forEach(t),u.forEach(t),$t=c(d),te=o(d,"EM",{});var Hl=a(te);La=s(Hl,"https://www.docker.com/ - https://hub.docker.com/"),Hl.forEach(t),gt=c(d),N=o(d,"H3",{id:!0});var Ml=a(N);re=o(Ml,"A",{href:!0});var Ll=a(re);Sa=s(Ll,"Connect to the VM"),Ll.forEach(t),Ml.forEach(t),er=c(d),j=o(d,"PRE",{class:!0});var Yl=a(j);Yl.forEach(t),tr=c(d),oe=o(d,"P",{});var Sl=a(oe);Va=s(Sl,"Get the VM ip with"),Sl.forEach(t),rr=c(d),J=o(d,"PRE",{class:!0});var Zl=a(J);Zl.forEach(t),or=c(d),ae=o(d,"P",{});var Vl=a(ae);Ia=s(Vl,"Set the azert keyboard"),Vl.forEach(t),ar=c(d),K=o(d,"PRE",{class:!0});var $l=a(K);$l.forEach(t),dr=c(d),de=o(d,"P",{});var Il=a(de);za=s(Il,"Use Putty"),Il.forEach(t),lr=c(d),Q=o(d,"PRE",{class:!0});var gl=a(Q);gl.forEach(t),cr=c(d),le=o(d,"P",{});var zl=a(le);Aa=s(zl,"Use SSH"),zl.forEach(t),nr=c(d),X=o(d,"PRE",{class:!0});var ec=a(X);ec.forEach(t),sr=c(d),ce=o(d,"P",{});var Al=a(ce);Ga=s(Al,"Install nginx server"),Al.forEach(t),fr=c(d),Y=o(d,"PRE",{class:!0});var tc=a(Y);tc.forEach(t),ir=c(d),ne=o(d,"P",{});var Gl=a(ne);Wa=s(Gl,"Edit nginx webpage:"),Gl.forEach(t),Er=c(d),Z=o(d,"PRE",{class:!0});var rc=a(Z);rc.forEach(t),_r=c(d),se=o(d,"P",{});var Wl=a(se);qa=s(Wl,"Get Nano:"),Wl.forEach(t),vr=c(d),$=o(d,"PRE",{class:!0});var oc=a($);oc.forEach(t),this.h()},h(){h(g,"href","#fast-help"),h(p,"id","fast-help"),h(ee,"href","#docker-setup"),h(A,"id","docker-setup"),h(re,"href","#connect-to-the-vm"),h(N,"id","connect-to-the-vm"),h(j,"class","language-undefined"),h(J,"class","language-undefined"),h(K,"class","language-undefined"),h(Q,"class","language-undefined"),h(X,"class","language-undefined"),h(Y,"class","language-undefined"),h(Z,"class","language-undefined"),h($,"class","language-undefined")},m(d,i){E(d,p,i),e(p,g),e(g,Wr),E(d,Xt,i),E(d,f,i),e(f,m),e(m,fe),e(fe,qr),e(m,Fr),e(m,ie),e(ie,Ur),e(f,Nr),e(f,b),e(b,Ee),e(Ee,_e),e(_e,jr),e(b,Jr),e(b,ve),e(ve,he),e(he,Kr),e(f,Qr),e(f,k),e(k,ue),e(ue,pe),e(pe,Xr),e(k,Yr),e(k,me),e(me,be),e(be,Zr),e(f,$r),e(f,T),e(T,ke),e(ke,Te),e(Te,gr),e(T,eo),e(T,De),e(De,Re),e(Re,to),e(f,ro),e(f,D),e(D,we),e(we,Ce),e(Ce,oo),e(D,ao),e(D,Be),e(Be,Oe),e(Oe,lo),e(f,co),e(f,R),e(R,xe),e(xe,ye),e(ye,no),e(R,so),e(R,Pe),e(Pe,He),e(He,fo),e(f,io),e(f,w),e(w,Me),e(Me,Le),e(Le,Eo),e(w,_o),e(w,Se),e(Se,Ve),e(Ve,vo),e(f,ho),e(f,C),e(C,Ie),e(Ie,ze),e(ze,uo),e(C,po),e(C,Ae),e(Ae,Ge),e(Ge,mo),e(f,bo),e(f,B),e(B,We),e(We,qe),e(qe,ko),e(B,To),e(B,Fe),e(Fe,Ue),e(Ue,Do),e(f,Ro),e(f,O),e(O,Ne),e(Ne,je),e(je,wo),e(O,Co),e(O,Je),e(Je,Ke),e(Ke,Bo),e(f,Oo),e(f,x),e(x,Qe),e(Qe,Xe),e(Xe,xo),e(x,yo),e(x,Ye),e(Ye,Ze),e(Ze,Po),e(f,Ho),e(f,y),e(y,$e),e($e,ge),e(ge,Mo),e(y,Lo),e(y,et),e(et,tt),e(tt,So),e(f,Vo),e(f,P),e(P,rt),e(rt,ot),e(ot,Io),e(P,zo),e(P,at),e(at,dt),e(dt,Ao),e(f,Go),e(f,H),e(H,lt),e(lt,ct),e(ct,Wo),e(H,qo),e(H,nt),e(nt,st),e(st,Fo),e(f,Uo),e(f,M),e(M,ft),e(ft,it),e(it,No),e(M,jo),e(M,Et),e(Et,_t),e(_t,Jo),e(f,Ko),e(f,L),e(L,vt),e(vt,ht),e(ht,Qo),e(L,Xo),e(L,ut),e(ut,pt),e(pt,Yo),e(f,Zo),e(f,S),e(S,mt),e(mt,bt),e(bt,$o),e(S,go),e(S,kt),e(kt,Tt),e(Tt,ea),e(f,ta),e(f,V),e(V,Dt),e(Dt,Rt),e(Rt,ra),e(V,oa),e(V,wt),e(wt,Ct),e(Ct,aa),e(f,da),e(f,I),e(I,Bt),e(Bt,Ot),e(Ot,la),e(I,ca),e(I,xt),e(xt,yt),e(yt,na),e(f,sa),e(f,z),e(z,Pt),e(Pt,Ht),e(Ht,fa),e(z,ia),e(z,Mt),e(Mt,Lt),e(Lt,Ea),E(d,Yt,i),E(d,A,i),e(A,ee),e(ee,_a),E(d,Zt,i),E(d,v,i),e(v,G),e(G,St),e(St,va),e(G,ha),e(G,Vt),e(Vt,ua),e(v,pa),e(v,W),e(W,It),e(It,zt),e(zt,ma),e(W,ba),e(W,At),e(At,Gt),e(Gt,ka),e(v,Ta),e(v,q),e(q,Wt),e(Wt,qt),e(qt,Da),e(q,Ra),e(q,Ft),e(Ft,wa),e(v,Ca),e(v,F),e(F,Ut),e(Ut,Nt),e(Nt,Ba),e(F,Oa),e(F,jt),e(jt,xa),e(v,ya),e(v,U),e(U,Jt),e(Jt,Kt),e(Kt,Pa),e(U,Ha),e(U,Qt),e(Qt,Ma),E(d,$t,i),E(d,te,i),e(te,La),E(d,gt,i),E(d,N,i),e(N,re),e(re,Sa),E(d,er,i),E(d,j,i),j.innerHTML=Fl,E(d,tr,i),E(d,oe,i),e(oe,Va),E(d,rr,i),E(d,J,i),J.innerHTML=Ul,E(d,or,i),E(d,ae,i),e(ae,Ia),E(d,ar,i),E(d,K,i),K.innerHTML=Nl,E(d,dr,i),E(d,de,i),e(de,za),E(d,lr,i),E(d,Q,i),Q.innerHTML=jl,E(d,cr,i),E(d,le,i),e(le,Aa),E(d,nr,i),E(d,X,i),X.innerHTML=Jl,E(d,sr,i),E(d,ce,i),e(ce,Ga),E(d,fr,i),E(d,Y,i),Y.innerHTML=Kl,E(d,ir,i),E(d,ne,i),e(ne,Wa),E(d,Er,i),E(d,Z,i),Z.innerHTML=Ql,E(d,_r,i),E(d,se,i),e(se,qa),E(d,vr,i),E(d,$,i),$.innerHTML=Xl},p:Fa,i:Fa,o:Fa,d(d){d&&t(p),d&&t(Xt),d&&t(f),d&&t(Yt),d&&t(A),d&&t(Zt),d&&t(v),d&&t($t),d&&t(te),d&&t(gt),d&&t(N),d&&t(er),d&&t(j),d&&t(tr),d&&t(oe),d&&t(rr),d&&t(J),d&&t(or),d&&t(ae),d&&t(ar),d&&t(K),d&&t(dr),d&&t(de),d&&t(lr),d&&t(Q),d&&t(cr),d&&t(le),d&&t(nr),d&&t(X),d&&t(sr),d&&t(ce),d&&t(fr),d&&t(Y),d&&t(ir),d&&t(ne),d&&t(Er),d&&t(Z),d&&t(_r),d&&t(se),d&&t(vr),d&&t($)}}}const sc={title:"Docker container manager",short:"How to deploy and manage containerized applications",topic:"computer-science docker"};class fc extends ac{constructor(p){super(),dc(this,p,null,cc,lc,{})}}export{fc as default,sc as metadata};