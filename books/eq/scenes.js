/* مشاهد كتاب معادلات إيلان ثلاثية الأبعاد — مجسمات تطلع من الصفحة بأسلوب الرسم بالقلم.
   كل مشهد: build(K, eq) يرجّع {root, update(vals), tick(t,dt), tap(obj)}.
   الإحداثيات: مركز الصفحة (0,0,0)، x بين −0.44 و 0.44، z بين −0.62 و 0.62، y لفوق. */
import * as THREE from 'three';
import {MORE} from './scenes2.js';
window.__THREE=THREE;

export function kit(lang){
 const K={THREE};
 const mats={};
 K.M=(color,o={})=>{const key=color+JSON.stringify(o);return mats[key]||(mats[key]=new THREE.MeshStandardMaterial({color,roughness:o.r??.82,metalness:o.m??0,transparent:!!o.op,opacity:o.op??1,emissive:o.e??0x000000,emissiveIntensity:o.ei??1,side:o.ds?THREE.DoubleSide:THREE.FrontSide,depthWrite:o.op?false:true}))};
 K.paper=K.M(0xf4f0e6);K.paper2=K.M(0xe9e3d4);K.dark=K.M(0x2b2d36,{r:.6});K.metal=K.M(0xb9bcc6,{r:.35,m:.6});
 K.blue=K.M(0x1E44C8,{r:.5});K.blueL=K.M(0x8fa7f0);K.green=K.M(0x0F6B44,{r:.6});K.greenL=K.M(0x8cc7a6);K.purple=K.M(0x4A2A8F,{r:.6});K.gold=K.M(0xC9A227,{r:.35,m:.5});K.red=K.M(0xC8463C,{r:.6});
 /* زجاج ومختبر واقعي: لمعان وانعكاسات حقيقية بدون تكلفة عالية على الآيباد */
 K.glass=new THREE.MeshPhysicalMaterial({color:0xf4f8ff,roughness:.03,metalness:0,transparent:true,opacity:.14,clearcoat:1,clearcoatRoughness:.02,ior:1.5,specularIntensity:1,side:THREE.DoubleSide,depthWrite:false});K.glass.userData.env=1.6;
 K.water=new THREE.MeshPhysicalMaterial({color:0x4f8ae6,roughness:.06,metalness:0,transparent:true,opacity:.62,clearcoat:1,clearcoatRoughness:.05,ior:1.33,depthWrite:false});K.water.userData.env=1.1;
 K.liq=(c,op=.66)=>{const m=new THREE.MeshPhysicalMaterial({color:c,roughness:.07,metalness:0,transparent:true,opacity:op,clearcoat:1,clearcoatRoughness:.05,ior:1.33,depthWrite:false});m.userData.env=1.1;return m};
 K.steel=new THREE.MeshPhysicalMaterial({color:0xc9ccd4,roughness:.28,metalness:.92,clearcoat:.3});K.steel.userData.env=1.4;
 K.bench=(()=>{const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');g.fillStyle='#2c2f36';g.fillRect(0,0,512,256);for(let i=0;i<2600;i++){const v=40+Math.random()*30|0;g.fillStyle=`rgba(${v},${v+2},${v+6},.5)`;g.fillRect(Math.random()*512,Math.random()*256,1.5,1.5)}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.MeshPhysicalMaterial({map:t,roughness:.38,metalness:0,clearcoat:.6,clearcoatRoughness:.25});m.userData.env=.9;return m})();
 K.grad=(n=6,lab=true)=>{const c=document.createElement('canvas');c.width=128;c.height=256;const g=c.getContext('2d');g.strokeStyle='rgba(255,255,255,.92)';g.fillStyle='rgba(255,255,255,.92)';g.font='bold 18px sans-serif';for(let i=0;i<=n*2;i++){const y=236-i*(200/(n*2));g.lineWidth=i%2?2:3;g.beginPath();g.moveTo(8,y);g.lineTo(i%2?30:46,y);g.stroke();if(lab&&!(i%2)&&i)g.fillText(String(i/2*50),50,y+6)}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false,side:THREE.DoubleSide});return m};
 K.gradOn=(r,h,y0=0)=>{const g=new THREE.CylinderGeometry(r*1.004,r*1.004,h,24,1,true,-.55,1.1);const m=new THREE.Mesh(g,K.grad());m.position.y=y0+h/2;m.userData.noShadow=1;m.castShadow=false;return m};
 K.ink=new THREE.LineBasicMaterial({color:0x26282f});K.inkSoft=new THREE.LineBasicMaterial({color:0x26282f,transparent:true,opacity:.45});
 K.hullM=new THREE.MeshBasicMaterial({color:0x26282f,side:THREE.BackSide});
 K.sk=(geo,mat=K.paper,o={})=>{const g=new THREE.Group();const m=new THREE.Mesh(geo,mat);m.castShadow=o.cast!==false;m.receiveShadow=true;g.add(m);g.userData.mesh=m;
  if(o.hull){const h=new THREE.Mesh(geo,K.hullM);h.scale.setScalar(o.hull===true?1.045:o.hull);g.add(h)}
  else if(o.edge!==false){const e=new THREE.LineSegments(new THREE.EdgesGeometry(geo,o.edge||28),o.soft?K.inkSoft:K.ink);g.add(e)}return g};
 K.box=(w,h,d,mat,o)=>{const g=new THREE.BoxGeometry(w,h,d);g.translate(0,h/2,0);return K.sk(g,mat,o)};
 K.cyl=(rt,rb,h,mat,o={})=>{const g=new THREE.CylinderGeometry(rt,rb,h,o.seg||28,1,!!o.open);g.translate(0,h/2,0);return K.sk(g,mat,o)};
 K.sph=(r,mat,o={})=>{const g=new THREE.SphereGeometry(r,o.seg||28,Math.round((o.seg||28)*.7));g.translate(0,o.center?0:r,0);return K.sk(g,mat,{hull:o.hull??1.06,...o})};
 K.tor=(R,r,mat,o={})=>K.sk(new THREE.TorusGeometry(R,r,10,o.seg||48,o.arc||Math.PI*2),mat,{hull:o.hull??false,edge:false,...o});
 K.tube=(pts,r,mat,o={})=>{const cv=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)),!!o.closed);return K.sk(new THREE.TubeGeometry(cv,o.seg||64,r,8,!!o.closed),mat,{edge:false,hull:o.hull??false,...o})};
 K.helix=(R,r,h,turns,mat)=>{const pts=[];for(let i=0;i<=turns*24;i++){const a=i/24*Math.PI*2;pts.push([Math.cos(a)*R,i/(turns*24)*h,Math.sin(a)*R])}return K.tube(pts,r,mat,{seg:turns*40})};
 K.lathe=(prof,mat,o={})=>{const g=new THREE.LatheGeometry(prof.map(([x,y])=>new THREE.Vector2(x,y)),o.seg||36);return K.sk(g,mat,{edge:o.edge??40,...o})};
 K.line=(pts,mat=K.ink)=>{const g=new THREE.BufferGeometry().setFromPoints(pts.map(p=>new THREE.Vector3(...p)));return new THREE.Line(g,mat)};
 K.place=(root,obj,x=0,z=0,ry=0,y=0)=>{const p=new THREE.Group();p.position.set(x,y,z);p.rotation.y=ry;p.add(obj);root.add(p);p.userData.pop=true;return p};
 K.arrow=(len,mat=K.red,r=.008)=>{const g=new THREE.Group();const sh=K.cyl(r,r,Math.max(.001,len-.04),mat,{edge:false,seg:10});const hd=K.cyl(0,r*2.6,.04,mat,{edge:false,seg:12});hd.position.y=Math.max(.001,len-.04);g.add(sh,hd);g.userData.set=l=>{l=Math.max(.05,l);sh.scale.y=(l-.04)/Math.max(.001,len-.04);hd.position.y=l-.04};return g};
 K.canvasTex=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');draw(x,w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;t.userData={c,x,draw};return t};
 K.font=(px,b)=>`${b?'700 ':''}${px}px ${lang==='ar'?'Tajawal':'system-ui,-apple-system,Segoe UI'},sans-serif`;
 K.card=(w,h,draw,o={})=>{const tex=K.canvasTex(Math.round(512*w/h),512,(x,W,H)=>{x.fillStyle=o.bg||'#fbf8f0';x.fillRect(0,0,W,H);x.strokeStyle='#26282f';x.lineWidth=6;x.strokeRect(3,3,W-6,H-6);draw(x,W,H)});
  const g=new THREE.Group();const geo=new THREE.PlaneGeometry(w,h);geo.translate(0,h/2,0);const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:tex,roughness:.9,side:THREE.DoubleSide,emissive:0xffffff,emissiveMap:tex,emissiveIntensity:.45}));m.castShadow=true;g.add(m);
  const st=new THREE.Mesh(new THREE.BoxGeometry(w*.5,.004,h*.35),K.paper2);st.position.set(0,.002,-h*.17);st.castShadow=true;g.add(st);
  g.userData.tex=tex;g.userData.redraw=fn=>{const {c,x}=tex.userData;x.clearRect(0,0,c.width,c.height);x.fillStyle=o.bg||'#fbf8f0';x.fillRect(0,0,c.width,c.height);x.strokeStyle='#26282f';x.lineWidth=6;x.strokeRect(3,3,c.width-6,c.height-6);fn(x,c.width,c.height);tex.needsUpdate=true};return g};
 K.txt=(x,s,X,Y,px,col='#26282f',b=true,al='center',ltr)=>{x.font=K.font(px,b);x.fillStyle=col;x.textAlign=al;x.textBaseline='middle';x.direction=ltr?'ltr':(lang==='ar'?'rtl':'ltr');x.fillText(s,X,Y)};
 K.L=(a,e)=>lang==='ar'?a:e;
 K.fit=(x,s,W,H,col='#14286f')=>{s=String(s).replace(/_\{([^}]+)\}|_/g,(m,a)=>a||'');let px=H*.5;x.font=`italic 700 ${px}px 'Times New Roman',serif`;while(x.measureText(s).width>W*.9&&px>10){px*=.92;x.font=`italic 700 ${px}px 'Times New Roman',serif`}x.fillStyle=col;x.textAlign='center';x.textBaseline='middle';x.direction='ltr';x.fillText(s,W/2,H/2)};
 K.num=(v)=>{if(v===undefined||v===null||!isFinite(v))return '—';const a=Math.abs(v);if(a!==0&&(a>=1e5||a<1e-3))return v.toExponential(2);return (+v.toFixed(a<1?4:a<100?3:1)).toLocaleString('en-US')};
 K.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 K.lg=(v,a=1)=>K.clamp(Math.log10(1+Math.abs(v||0)/a)/4,0,1);
 return K;
}

const has=(v,k)=>v&&typeof v[k]==='number'&&isFinite(v[k]);
const pick=(v,keys,d)=>{for(const k of keys)if(has(v,k))return v[k];return d};

export const SCENES={
/* ===== energy: shelf of jars like the reference ===== */
energy(K,eq){const T=K.THREE,root=new T.Group();
 const stores=[['kin','الحركة','Kinetic'],['grav','الجاذبية','Gravity'],['chem','الكيميائية','Chemical'],['therm','الحرارية','Thermal'],['elas','المرونة','Elastic'],['elec','الكهربائية','Electric'],['nuc','النووية','Nuclear'],['light','الضوء','Light']];
 const shelf=new T.Group();const SW=.82,SH=.34;
 [-SW/2,SW/2].forEach(x=>{const s=K.box(.014,SH,.16);s.position.set(x,0,0);shelf.add(s)});
 [0,.17].forEach(y=>{const b=K.box(SW,.012,.16);b.position.set(0,y,0);shelf.add(b)});
 const jars=[];stores.forEach((s,i)=>{const row=Math.floor(i/4),col=i%4,x=-SW/2+.11+col*.2,y=.012+(1-row)*.17;
  const j=K.cyl(.055,.055,.13,K.glass,{open:true,soft:true});j.position.set(x,y,0);shelf.add(j);
  const liq=K.cyl(.05,.05,.12,K.M([0x1E44C8,0x0F6B44,0x4A2A8F,0xC8463C,0x0F6B44,0xC9A227,0x4A2A8F,0xC9A227][i],{op:.75}),{edge:false});liq.position.set(x,y+.002,0);liq.scale.y=.02;shelf.add(liq);
  const lab=K.card(.09,.045,(c,W,H)=>{K.txt(c,K.L(s[1],s[2]),W/2,H*.32,64,'#5a5c66',true);K.txt(c,'0 J',W/2,H*.7,100,'#26282f',true,'center',true)});lab.position.set(x,y+.012,.085);lab.rotation.x=-.25;shelf.add(lab);
  jars.push({liq,lab,key:s[0],name:s,glow:0,v:0})});
 K.place(root,shelf,0,-.34);
 const things=[];const add=(obj,x,z,key)=>{const p=K.place(root,obj,x,z);obj.traverse(o=>o.userData.store=key);things.push(p);return p};
 const bike=new T.Group();[-.07,.07].forEach(x=>{const w=K.tor(.045,.004,K.dark,{hull:false});w.position.set(x,.05,0);bike.add(w)});bike.add(K.line([[-.07,.05,0],[-.01,.11,0],[.05,.11,0],[.07,.05,0],[0,.05,0],[-.01,.11,0]]));bike.add(K.line([[.05,.11,0],[.06,.13,0]]));add(bike,-.3,.12,'kin');
 const cup=new T.Group();cup.add(K.cyl(.04,.032,.08,K.paper));const hd=K.tor(.02,.005,K.paper,{hull:false,arc:Math.PI});hd.rotation.z=-Math.PI/2;hd.position.set(.042,.04,0);cup.add(hd);const tea=K.cyl(.036,.036,.003,K.M(0x8a5a3c),{edge:false});tea.position.y=.07;cup.add(tea);add(cup,-.1,.14,'therm');
 const bat=new T.Group();bat.add(K.cyl(.028,.028,.11,K.paper));const tip=K.cyl(.01,.01,.012,K.metal);tip.position.y=.11;bat.add(tip);const band=K.cyl(.0285,.0285,.03,K.green,{edge:false});band.position.y=.07;bat.add(band);add(bat,.07,.15,'chem');
 add(K.sph(.05,K.paper),.27,.12,'grav');
 const spr=new T.Group();spr.add(K.box(.18,.01,.04,K.paper2));const coil=K.helix(.014,.0025,.11,7,K.dark);coil.rotation.z=Math.PI/2;coil.position.set(.055,.03,0);spr.add(coil);[-.08,.08].forEach(x=>{const b=K.box(.012,.05,.04);b.position.x=x;spr.add(b)});add(spr,-.12,.38,'elas');
 const mag=new T.Group();const m1=K.box(.05,.025,.03,K.red);m1.position.x=-.026;const m2=K.box(.05,.025,.03,K.blue);m2.position.x=.026;mag.add(m1,m2);add(mag,.12,.4,'elec');
 const sun=new T.Group();const pole=K.cyl(.004,.004,.36,K.dark,{edge:false});sun.add(pole);const ball=K.sph(.045,K.M(0xfff3c4,{e:0xffd36b,ei:.6}),{center:true});ball.position.y=.4;sun.add(ball);for(let i=0;i<10;i++){const a=i/10*Math.PI*2;sun.add(K.line([[Math.cos(a)*.06,.4+Math.sin(a)*.06,0],[Math.cos(a)*.085,.4+Math.sin(a)*.085,0]]))}add(sun,.36,-.12,'light');
 const map={Ek:'kin',Ep:'grav',Es:'elas',Qh:'therm',Ue:'elec',Eph:'light',E:'kin',W:'kin'};const mainKey=map[eq.out]||'kin';
 const setJar=(j,val)=>{j.v=val;j.lab.userData.redraw((c,W,H)=>{K.txt(c,K.L(j.name[1],j.name[2]),W/2,H*.32,64,'#5a5c66',true);K.txt(c,K.num(val)+' J',W/2,H*.7,90,'#26282f',true,'center',true)})};
 return{root,
  update(v){const val=has(v,eq.out)?v[eq.out]:pick(v,['E','Ek','Ep','W'],50);jars.forEach(j=>{if(j.key===mainKey){setJar(j,val);j.target=K.lg(val,1)*1+.05}else if(j.target===undefined){j.target=.02;setJar(j,0)}})},
  tick(t,dt){jars.forEach(j=>{j.liq.scale.y+=((j.target||.02)-j.liq.scale.y)*Math.min(1,dt*4);j.glow=Math.max(0,j.glow-dt*.8);j.liq.children[0].material.emissive?.setScalar?.(0)});ball.rotation.y=t*.4},
  tap(o){const key=o.userData.store;if(!key)return false;const j=jars.find(j=>j.key===key);if(j){j.target=.9;setJar(j,j.v||+(Math.random()*100).toFixed(1))}return true}}},

/* ===== motion: track + cart(s) + force arrow ===== */
motion(K,eq){const T=K.THREE,root=new T.Group();const two=eq.cat==='mom';
 const track=new T.Group();track.add(K.box(.84,.02,.12,K.paper2));for(let i=0;i<=10;i++){track.add(K.line([[-.4+i*.08,.021,.06],[-.4+i*.08,.021,.06-(i%5?.015:.03)]]))}
 [-.42,.42].forEach(x=>{const st=K.box(.02,.05,.12);st.position.x=x;track.add(st)});K.place(root,track,0,.05);
 const mkCart=(mat)=>{const c=new T.Group();const body=K.box(.12,.05,.08,mat);body.position.y=.02;c.add(body);[[-.04,-.035],[.04,-.035],[-.04,.035],[.04,.035]].forEach(([x,z])=>{const w=K.cyl(.016,.016,.01,K.dark,{edge:false,seg:16});w.rotation.x=Math.PI/2;w.position.set(x,.016,z+(z>0?.006:-.006));c.add(w)});return c};
 const c1=mkCart(two?K.blueL:K.paper),p1=K.place(root,c1,-.2,.05,0,.02);let p2;if(two){p2=K.place(root,mkCart(K.greenL),.2,.05,0,.02)}
 const arr=K.arrow(.2);arr.rotation.z=-Math.PI/2;arr.position.set(-.08,.06,0);c1.add(arr);
 const cardF=K.card(.36,.13,()=>{});K.place(root,cardF,0,-.36);
 const st={v:.15,a:0,x:-.2,x2:.2,v2:-.12,mode:0};
 return{root,
  update(v){const F=pick(v,['F','Fn','Ff','Fc','Fg','J','p'],10),vv=pick(v,['v','vf','v1','u','v0'],5),a=pick(v,['a','ac'],2);arr.userData.set(K.clamp(.05+K.lg(F,1)*.5,.06,.32));st.v=K.clamp(K.lg(vv,1)*.6+.05,.05,.5);st.a=a;
   cardF.userData.redraw((c,W,H)=>{K.fit(c,eq.f,W,H)})},
  tick(t,dt){if(two){st.x+=st.v*dt;st.x2+=(-st.v*.8)*dt;if(st.x2-st.x<.13){const tmp=st.v;st.v=-st.v*.8;}if(st.x<-.32){st.x=-.2;st.x2=.2;st.v=Math.abs(st.v)}p1.position.x=st.x;p2.position.x=st.x2}
   else{st.x+=st.v*dt;if(st.x>.3)st.x=-.32;p1.position.x=st.x}}}},

/* ===== fall / projectile ===== */
fall(K,eq){const T=K.THREE,root=new T.Group();const tower=new T.Group();tower.add(K.box(.12,.32,.12,K.paper));const top=K.box(.16,.012,.14,K.paper2);top.position.y=.32;tower.add(top);
 for(let i=0;i<4;i++)tower.add(K.line([[.061,.06+i*.07,.03],[.061,.06+i*.07,-.03]]));K.place(root,tower,-.32,.02);
 const pole=new T.Group();pole.add(K.cyl(.006,.006,.42,K.dark,{edge:false}));for(let i=0;i<=8;i++){pole.add(K.line([[0,i*.05,0],[.02,i*.05,0]]))}K.place(root,pole,.4,-.2);
 const ball=K.sph(.03,K.blue);const bp=K.place(root,ball,-.3,.02,0,.33);
 const ground=K.box(.84,.006,.06,K.paper2);K.place(root,ground,0,.45);
 let trail=null;const st={vx:.2,vy:0,t:0,dur:1.2,y0:.33,g:.6};
 const draw=()=>{if(trail)root.remove(trail);const pts=[];for(let i=0;i<=30;i++){const tt=i/30*st.dur;const x=-.3+st.vx*tt,y=st.y0+st.vy*tt-.5*st.g*tt*tt;if(y<0)break;pts.push(new T.Vector3(x,Math.max(y,0)+.03,.02))}trail=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineDashedMaterial({color:0x4A2A8F,dashSize:.012,gapSize:.01}));trail.computeLineDistances();root.add(trail)};
 return{root,update(v){const th=pick(v,['th'],0),v0=pick(v,['v0','u','v'],5);const s=K.clamp(K.lg(v0,1)*.9,.08,.6);st.vx=s*Math.cos(th*Math.PI/180)*.9+.08;st.vy=s*Math.sin(th*Math.PI/180)*1.2;
  const disc=st.vy*st.vy+2*st.g*st.y0;st.dur=(st.vy+Math.sqrt(disc))/st.g;if(-.3+st.vx*st.dur>.4){st.vx=.7/st.dur}draw()},
  tick(t,dt){st.t+=dt;const tt=st.t%(st.dur+.6);const k=Math.min(tt,st.dur);bp.position.x=-.3+st.vx*k;bp.position.y=Math.max(0,st.y0+st.vy*k-.5*st.g*k*k)}}},

/* ===== wheel / rotation / gears ===== */
wheel(K,eq){const T=K.THREE,root=new T.Group();const stand=new T.Group();stand.add(K.box(.36,.015,.14,K.paper2));[-.06,.06].forEach(z=>{const p=K.box(.02,.2,.02);p.position.set(0,.015,z);stand.add(p)});
 const wh=new T.Group();wh.position.y=.2;const rim=K.tor(.13,.012,K.paper,{hull:1.12});wh.add(rim);for(let i=0;i<6;i++){const s=K.box(.006,.13,.006,K.dark,{edge:false});s.rotation.z=i/6*Math.PI*2;wh.add(s)}const hub=K.cyl(.02,.02,.04,K.metal);hub.rotation.x=Math.PI/2;hub.position.z=-.02;wh.add(hub);
 const mass=K.sph(.018,K.red);mass.position.set(.13,0,0);wh.add(mass);stand.add(wh);K.place(root,stand,-.08,0);
 const gear=(R,n,mat)=>{const s=new T.Shape();for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,r=i%2?R:R*.82;const a2=a+Math.PI/(n*2);i?s.lineTo(Math.cos(a)*r,Math.sin(a)*r):s.moveTo(Math.cos(a)*r,Math.sin(a)*r);s.lineTo(Math.cos(a2)*r,Math.sin(a2)*r)}const g=new T.ExtrudeGeometry(s,{depth:.02,bevelEnabled:false});return K.sk(g,mat)};
 const g1=gear(.07,12,K.blueL),g2=gear(.045,8,K.greenL);const gs=new T.Group();g1.position.set(0,.09,0);g2.position.set(.112,.09,0);gs.add(g1,g2);const gb=K.box(.24,.012,.06,K.paper2);gs.add(gb);[0,.112].forEach(x=>{const p=K.cyl(.005,.005,.09,K.dark,{edge:false});p.position.set(x,0,.01);gs.add(p)});K.place(root,gs,.18,.32);
 const tau=K.tor(.17,.005,K.red,{arc:Math.PI*1.2});tau.position.y=.2;tau.rotation.z=.3;stand.add(tau);
 const st={w:2};return{root,update(v){const w=pick(v,['w','w0','f','alpha'],2);st.w=K.clamp(K.lg(w,.5)*8,.4,6)},tick(t,dt){wh.rotation.z-=st.w*dt;g1.rotation.z+=st.w*dt*.6;g2.rotation.z-=st.w*dt*.6*12/8}}},

/* ===== orbit ===== */
orbit(K,eq){const T=K.THREE,root=new T.Group();const base=K.cyl(.05,.07,.03,K.paper2);K.place(root,base,0,0);
 const sun=K.sph(.08,K.M(0xffe08a,{e:0xffb030,ei:.9}),{center:true,hull:false});sun.position.y=.18;base.add(sun);const rod=K.cyl(.004,.004,.1,K.dark,{edge:false});rod.position.y=.03;base.add(rod);
 const sys=new T.Group();sys.position.y=.18;base.add(sys);const orb=[];
 [[.2,.025,0x1E44C8,1],[.32,.018,0xC8463C,.55],[.4,.03,0xC9A227,.32]].forEach(([r,s,c,sp],i)=>{const ring=K.tor(r,.0018,K.dark,{seg:96});ring.rotation.x=Math.PI/2;sys.add(ring);const pv=new T.Group();const pl=K.sph(s,K.M(c),{center:true,hull:1.08});pl.position.x=r;pv.add(pl);if(i===0){const moon=K.sph(.008,K.paper,{center:true});moon.position.set(r+.045,0,0);pv.add(moon);pl.userData.moonPv=moon}pv.rotation.y=i*2;sys.add(pv);orb.push({pv,sp,pl})});
 const st={k:1};return{root,update(v){const T0=pick(v,['T'],0);st.k=T0?K.clamp(2/Math.log10(10+T0),.15,1.5):1},tick(t,dt){orb.forEach(o=>o.pv.rotation.y+=o.sp*st.k*dt);sun.rotation.y+=dt*.2}}},

/* ===== مختبر البندول والنابض الواقعي: حامل حديد، بندول نحاسي بخيط، منقلة شفافة، نابض فولاذي بأثقال مشقوقة، مسطرة خشب، ساعة إيقاف ===== */
pendulum(K,eq){const T=K.THREE,root=new T.Group();const PM=(c,o={})=>{const m=new T.MeshPhysicalMaterial({color:c,roughness:o.r??.3,metalness:o.m??0,clearcoat:o.cc??.6,clearcoatRoughness:o.ccr??.15,...(o.x||{})});m.userData.env=o.env??1.2;return m};
 const brass=PM(0xc9a227,{r:.22,m:.9,cc:.5,env:1.5}),iron=PM(0x2a2d33,{r:.45,m:.6,cc:.8,ccr:.3,env:.8}),knobM=PM(0x15171c,{r:.35,cc:.9});
 /* 1) الحامل: قاعدة حديد زهر على طاولة المختبر، عمود فولاذ، ذراع أفقي ومشابك */
 const stand=new T.Group();const base=K.box(.22,.022,.16,iron,{edge:false});base.position.set(-.29,0,-.08);stand.add(base);[[-.38,-.15],[-.2,-.15],[-.38,-.01],[-.2,-.01]].forEach(([x,z])=>{const f=K.cyl(.008,.008,.004,knobM,{edge:false,seg:12});f.position.set(x,-.004,z);stand.add(f)});
 const rod=K.cyl(.007,.007,.52,K.steel,{edge:false,seg:20});rod.position.set(-.33,.022,-.1);stand.add(rod);
 const arm=K.cyl(.0055,.0055,.6,K.steel,{edge:false,seg:18});arm.rotation.z=Math.PI/2;arm.position.set(.265,.52,-.1);stand.add(arm);
 const boss=(x,y)=>{const g=new T.Group();g.add(K.box(.026,.026,.026,iron,{edge:false}));const s=K.cyl(.004,.004,.022,K.steel,{edge:false,seg:10});s.rotation.x=Math.PI/2;s.position.set(0,.013,.022);g.add(s);const kn=K.cyl(.009,.009,.008,knobM,{edge:false,seg:16});kn.rotation.x=Math.PI/2;kn.position.set(0,.013,.034);g.add(kn);g.position.set(x,y-.013,-.1);return g};stand.add(boss(-.33,.52));
 K.place(root,stand,0,0);
 /* 2) المنقلة الشفافة خلف نقطة التعليق */
 const PX=-.1,PY=.51,PZ=-.1;const ptex=K.canvasTex(512,280,(x,W,H)=>{x.clearRect(0,0,W,H);x.fillStyle='rgba(235,245,255,.18)';x.beginPath();x.arc(W/2,8,248,0,Math.PI);x.fill();x.strokeStyle='rgba(20,40,111,.9)';x.fillStyle='rgba(20,40,111,.9)';x.font='bold 16px sans-serif';x.textAlign='center';for(let d=0;d<=180;d+=5){const a=d*Math.PI/180,r1=248,r2=d%10?236:d%30?228:218;x.lineWidth=d%30?1.5:2.5;x.beginPath();x.moveTo(W/2+Math.cos(a)*r1,8+Math.sin(a)*r1);x.lineTo(W/2+Math.cos(a)*r2,8+Math.sin(a)*r2);x.stroke();if(!(d%30)){const lbl=Math.abs(90-d);x.fillText(String(lbl),W/2+Math.cos(a)*200,8+Math.sin(a)*200+6)}}x.lineWidth=1;x.beginPath();x.moveTo(W/2,8);x.lineTo(W/2,256);x.stroke()});
 const prot=new T.Group();const pg=new T.PlaneGeometry(.26,.142);const pm=new T.Mesh(pg,new T.MeshBasicMaterial({map:ptex,transparent:true,depthWrite:false,side:T.DoubleSide}));pm.position.y=-.071;prot.add(pm);const pedge=new T.Mesh(new T.TorusGeometry(.126,.0016,6,48,Math.PI),PM(0xdfe9ff,{x:{transparent:true,opacity:.5}}));pedge.rotation.z=Math.PI;prot.add(pedge);
 const protP=K.place(root,prot,PX,PZ-.012,0,PY);
 /* 3) البندول: مشبك تعليق، خيط قطني، كرة نحاس بخطّاف */
 const pend=new T.Group();const clip=K.box(.03,.016,.022,iron,{edge:false});clip.position.y=-.004;pend.add(clip);const pv=new T.Group();pend.add(pv);
 const thread=K.cyl(.0011,.0011,1,K.M(0xf1e7cf,{r:.9}),{edge:false,seg:6});thread.rotation.z=Math.PI;pv.add(thread);
 const bob=new T.Group();const ball=new T.Mesh(new T.SphereGeometry(.026,40,28),brass);ball.castShadow=true;bob.add(ball);const hook=K.cyl(.004,.004,.012,brass,{edge:false,seg:12});hook.position.y=.022;bob.add(hook);const eye=new T.Mesh(new T.TorusGeometry(.004,.0012,6,16),brass);eye.position.y=.037;bob.add(eye);pv.add(bob);
 const pendP=K.place(root,pend,PX,PZ,0,PY);
 /* 4) النابض الفولاذي مع حامل الأثقال المشقوقة */
 const SX=.17;const spr=new T.Group();const sHook=K.cyl(.002,.002,.012,K.steel,{edge:false,seg:8});sHook.position.y=-.012;spr.add(sHook);const coil=K.helix(.016,.0018,1,13,K.steel);coil.rotation.z=Math.PI;spr.add(coil);
 const hanger=new T.Group();const hRod=K.cyl(.0025,.0025,.07,K.steel,{edge:false,seg:10});hRod.position.y=-.07;hanger.add(hRod);const hBase=K.cyl(.02,.02,.005,K.steel,{edge:false,seg:28});hBase.position.y=-.075;hanger.add(hBase);
 const discs=[];for(let i=0;i<6;i++){const d=new T.Mesh(new T.CylinderGeometry(.019,.019,.007,32),brass);d.castShadow=true;d.position.y=-.068+i*.0075;hanger.add(d);const slot=K.box(.016,.0072,.005,K.M(0x07080C),{edge:false});slot.position.set(.011,d.position.y-.0036,0);hanger.add(slot);discs.push(d,slot)}spr.add(hanger);
 const sprP=K.place(root,spr,SX,PZ,0,PY);
 /* 5) مسطرة خشب مترية واقفة جنب النابض */
 const rtex=K.canvasTex(64,1024,(x,W,H)=>{x.fillStyle='#e2c48e';x.fillRect(0,0,W,H);for(let i=0;i<30;i++){x.strokeStyle=`rgba(140,95,45,${.08+Math.random()*.12})`;x.beginPath();x.moveTo(Math.random()*W,0);x.lineTo(Math.random()*W,H);x.stroke()}x.fillStyle='#26282f';x.font='bold 16px sans-serif';x.textAlign='left';for(let mm=0;mm<=500;mm+=5){const y=8+mm*2;const l=mm%50?(mm%10?10:18):30;x.fillRect(0,y,l,mm%50?1.5:2.5);if(!(mm%50)&&mm)x.fillText(String(mm/10),34,y+6)}});
 const ruler=new T.Group();const rm=new T.Mesh(new T.BoxGeometry(.03,.5,.006),[K.M(0xd9b77c),K.M(0xd9b77c),K.M(0xd9b77c),K.M(0xd9b77c),new T.MeshStandardMaterial({map:rtex,roughness:.7}),K.M(0xd9b77c)]);rm.position.y=.264;rm.castShadow=true;ruler.add(rm);const rFoot=K.box(.06,.012,.04,iron,{edge:false});ruler.add(rFoot);
 K.place(root,ruler,SX+.07,PZ+.02,0,.012);
 /* 6) ساعة الإيقاف الرقمية: تعدّ الزمن والاهتزازات */
 const sw=new T.Group();const swc=new T.Mesh(new T.CylinderGeometry(.055,.055,.018,48),PM(0x1b1d22,{r:.4,cc:1}));swc.position.y=.009;swc.castShadow=true;sw.add(swc);const ring=new T.Mesh(new T.TorusGeometry(.055,.004,10,48),K.steel);ring.rotation.x=Math.PI/2;ring.position.y=.018;sw.add(ring);
 const crown=K.cyl(.007,.007,.012,K.steel,{edge:false,seg:16});crown.rotation.x=Math.PI/2;crown.position.set(0,.009,-.062);sw.add(crown);
 const ftex=K.canvasTex(256,256,()=>{});const face=new T.Mesh(new T.CircleGeometry(.047,48),new T.MeshStandardMaterial({map:ftex,emissive:0xffffff,emissiveMap:ftex,emissiveIntensity:.25,roughness:.2}));face.rotation.x=-Math.PI/2;face.position.y=.0185;sw.add(face);
 const swP=K.place(root,sw,.3,.26,-.3);sw.rotation.x=.35;
 /* 7) بطاقة المعادلة */
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.12,.36);
 const isSpr=eq.ins.some(k=>['k','ks1','ks2','plms'].includes(k))||eq.out==='k'||/spring|نابض/i.test(eq.n[1]+eq.n[0]);
 const st={L:.28,T:2,amp:.3,ext:.12,kT:1.4,n:0,t0:0,last:-1,ph:0,ph2:0,nm:3};
 const drawFace=(sec,n)=>{const {x}=ftex.userData;x.fillStyle='#d9e6d2';x.fillRect(0,0,256,256);x.fillStyle='#0b1f12';x.textAlign='center';x.textBaseline='middle';x.font='700 54px "Courier New",monospace';x.direction='ltr';x.fillText(sec.toFixed(2),128,112);x.font='600 22px system-ui,sans-serif';x.fillText((K.L('اهتزازات ','osc ')+n),128,172);x.font='700 16px system-ui';x.fillStyle='#0F6B44';x.fillText('EILAN',128,212);ftex.needsUpdate=true};drawFace(0,0);
 return{root,update(v){let Tp=pick(v,['Tp','plT'],0);const Lm=pick(v,['Lp','plL','plLe'],1),gv=pick(v,['g','plgE'],9.8);if(!Tp||!isFinite(Tp))Tp=2*Math.PI*Math.sqrt(Math.max(Lm,.01)/Math.max(gv,.1));st.T=K.clamp(Tp,.5,6);st.L=K.clamp(.14+Math.log10(1+Math.abs(Lm))*.4,.14,.38);
   const th=pick(v,['th','plth0'],15);st.amp=K.clamp(Math.abs(th)*Math.PI/180,.08,.6);
   const m=pick(v,['m','plm'],1),k=pick(v,['k','plk'],200);st.kT=K.clamp(2*Math.PI*Math.sqrt(Math.max(m,.01)/Math.max(k,.01)),.5,4);st.nm=K.clamp(Math.round(1+K.lg(m,.05)*5),1,6);st.ext=K.clamp(.13+K.lg(m*9.8/Math.max(k,.01),.005)*.2,.13,.28);
   discs.forEach((d,i)=>{d.visible=(i>>1)<st.nm});thread.scale.y=st.L-.026;bob.position.y=-st.L;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H));const per=isSpr?st.kT:st.T;if(Math.abs(per-(st.per||0))>1e-3){st.per=per;st.t0=-1}},
  tick(t,dt){const pOn=pendP.visible!==false,sOn=sprP.visible!==false,wOn=swP.visible!==false;
   if(pOn){st.ph+=dt*2*Math.PI/st.T;pv.rotation.z=st.amp*Math.cos(st.ph)}else pv.rotation.z=0;
   if(sOn){st.ph2+=dt*2*Math.PI/st.kT;const e=st.ext*(1+.25*Math.sin(st.ph2));coil.scale.y=e;hanger.position.y=-e-.012}
   const per=isSpr?st.kT:st.T,run=(isSpr?sOn:pOn)&&wOn&&dt>0;if(!run&&st.t0>=0){st.t0=-1;drawFace(0,0)}if(run){if(st.t0<0)st.t0=t;const el=t-st.t0;if(el>60){st.t0=t}const n=Math.floor((t-st.t0)/per);if(Math.floor(el*20)!==st.last){st.last=Math.floor(el*20);drawFace(t-st.t0,n)}}}}},

/* ===== fluids: مختبر الموائع الواقعي — حوض زجاج بإطار ألمنيوم وماء يتموّج، قطعة خشب تطفو، ميزان نابضي بثقل غاطس، مقياس ضغط بمجس عمق، مخبار مدرّج ===== */
fluid(K,eq){const T=K.THREE,root=new T.Group();const PM=(c,o={})=>{const m=new T.MeshPhysicalMaterial({color:c,roughness:o.r??.3,metalness:o.m??0,clearcoat:o.cc??.6,clearcoatRoughness:o.ccr??.15,transparent:!!o.op,opacity:o.op??1,depthWrite:o.op?false:true,side:o.ds?T.DoubleSide:T.FrontSide});m.userData.env=o.env??1.2;return m};
 const alu=PM(0xc4c9d1,{r:.28,m:.85,cc:.4,env:1.4}),chrome=PM(0xe8ecf2,{r:.12,m:1,cc:.8,env:1.8}),glassM=PM(0xdcefff,{r:.05,op:.18,cc:1,ds:1,env:2}),waterM=PM(0x2f7fd6,{r:.08,op:.5,cc:1,env:1.6}),brass=PM(0xc9a227,{r:.22,m:.9,env:1.5}),dark=PM(0x1b1d22,{r:.4,cc:.9});
 const W=.4,H=.3,D=.22,LV=.2;
 /* 1) الحوض والماء */
 const tank=new T.Group();const gl=new T.Mesh(new T.BoxGeometry(W,H,D),glassM);gl.position.y=H/2;tank.add(gl);
 const fr=(w,h,d,x,y,z)=>{const b=new T.Mesh(new T.BoxGeometry(w,h,d),alu);b.position.set(x,y,z);b.castShadow=true;tank.add(b)};const e=.012;
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>fr(e,H+e,e,a*W/2,H/2,b*D/2));[0,H].forEach(y=>{fr(W+e,e,e,0,y,-D/2);fr(W+e,e,e,0,y,D/2);fr(e,e,D+e,-W/2,y,0);fr(e,e,D+e,W/2,y,0)});
 const wat=new T.Mesh(new T.BoxGeometry(W-.01,1,D-.01),waterM);wat.scale.y=LV;wat.position.y=LV/2+.003;tank.add(wat);
 const sg=new T.PlaneGeometry(W-.01,D-.01,24,14);sg.rotateX(-Math.PI/2);const surf=new T.Mesh(sg,PM(0x6fb6ff,{r:.02,op:.55,cc:1,ds:1,env:2.2}));surf.position.y=LV+.003;tank.add(surf);const sp=sg.attributes.position,s0=sp.array.slice();
 const stk=K.canvasTex(64,512,(x,w,h)=>{x.fillStyle='rgba(255,255,255,.9)';x.fillRect(0,0,w,h);x.fillStyle='#14286f';x.font='bold 20px sans-serif';for(let c=0;c<=20;c++){const y=h-12-c*24;x.fillRect(0,y,c%5?14:26,2);if(!(c%5))x.fillText(String(c),30,y+7)}});const stick=new T.Mesh(new T.PlaneGeometry(.026,.22),new T.MeshBasicMaterial({map:stk,transparent:true}));stick.position.set(-W/2+.03,.11,D/2+.001);tank.add(stick);
 const stone=K.cyl(.02,.02,.012,K.M(0x9aa3ad,{r:.95}),{edge:false,seg:16});stone.position.set(-.15,.003,-.06);tank.add(stone);const bub=[];for(let i=0;i<14;i++){const b=new T.Mesh(new T.SphereGeometry(.004+Math.random()*.004,10,8),PM(0xffffff,{op:.6,cc:1,env:2}));b.userData.o=Math.random();b.position.set(-.13,0,-.04);tank.add(b);bub.push(b)}
 const tankP=K.place(root,tank,-.06,-.04);
 /* 2) قطعة خشب تطفو */
 const wtex=K.canvasTex(256,256,(x,w,h)=>{x.fillStyle='#c48a4f';x.fillRect(0,0,w,h);for(let i=0;i<40;i++){x.strokeStyle=`rgba(${90+Math.random()*40|0},55,25,${.15+Math.random()*.25})`;x.lineWidth=1+Math.random()*3;x.beginPath();const y=Math.random()*h;x.moveTo(0,y);x.bezierCurveTo(w*.3,y+Math.random()*20-10,w*.7,y+Math.random()*20-10,w,y+Math.random()*16-8);x.stroke()}});
 const wood=new T.Group();const wb=new T.Mesh(new T.BoxGeometry(.08,.06,.08),new T.MeshStandardMaterial({map:wtex,roughness:.75}));wb.castShadow=true;wood.add(wb);const woodP=K.place(root,wood,-.06,-.04,0,0);
 /* 3) ميزان نابضي على حامل وثقل غاطس */
 const bal=new T.Group();const pole=K.cyl(.006,.006,.52,K.steel,{edge:false,seg:16});pole.position.set(.27,0,-.06);bal.add(pole);const pbase=K.box(.12,.016,.09,dark,{edge:false});pbase.position.set(.27,0,-.06);bal.add(pbase);
 const parm=K.cyl(.005,.005,.18,K.steel,{edge:false,seg:12});parm.rotation.z=Math.PI/2;parm.position.set(.27,.5,-.06);bal.add(parm);
 const body=new T.Group();body.position.set(.1,.5,-.06);bal.add(body);const tubeB=new T.Mesh(new T.CylinderGeometry(.016,.016,.15,24),PM(0xeef3f8,{op:.55,cc:1,env:1.8}));tubeB.position.y=-.09;body.add(tubeB);
 const bsc=K.canvasTex(64,256,(x,w,h)=>{x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#07341F';x.font='bold 18px sans-serif';for(let i=0;i<=10;i++){const y=12+i*23;x.fillRect(0,y,i%5?14:24,2);if(!(i%5))x.fillText(String(i),30,y+7)}x.fillText('N',30,250)});const scl=new T.Mesh(new T.PlaneGeometry(.018,.13),new T.MeshBasicMaterial({map:bsc}));scl.position.set(0,-.09,.0165);body.add(scl);
 const cap=K.cyl(.018,.018,.012,chrome,{edge:false,seg:20});cap.position.y=-.018;body.add(cap);const pointer=K.box(.03,.003,.004,K.red,{edge:false});body.add(pointer);
 const rodB=K.cyl(.0025,.0025,1,K.steel,{edge:false,seg:8});rodB.rotation.z=Math.PI;body.add(rodB);const wt=new T.Group();const wcyl=new T.Mesh(new T.CylinderGeometry(.022,.022,.05,32),brass);wcyl.position.y=-.03;wcyl.castShadow=true;wt.add(wcyl);const wh=new T.Mesh(new T.TorusGeometry(.006,.0015,6,16),K.steel);wh.position.y=.0;wt.add(wh);body.add(wt);
 const balP=K.place(root,bal,-.06,-.04);
 /* 4) مقياس ضغط بمجس عمق */
 const gg=new T.Group();const gpole=K.cyl(.005,.005,.34,K.steel,{edge:false,seg:12});gg.add(gpole);const gb=K.box(.07,.014,.07,dark,{edge:false});gg.add(gb);
 const dial=new T.Group();dial.position.y=.38;gg.add(dial);const bez=new T.Mesh(new T.CylinderGeometry(.062,.062,.022,48),chrome);bez.rotation.x=Math.PI/2;dial.add(bez);
 const dtex=K.canvasTex(256,256,(x,w,h)=>{x.fillStyle='#fbfaf5';x.beginPath();x.arc(128,128,124,0,7);x.fill();x.strokeStyle='#14286f';x.fillStyle='#14286f';x.textAlign='center';x.font='bold 18px sans-serif';for(let i=0;i<=40;i++){const a=Math.PI*.75+i/40*Math.PI*1.5,r2=i%5?104:94;x.lineWidth=i%5?2:4;x.beginPath();x.moveTo(128+Math.cos(a)*114,128+Math.sin(a)*114);x.lineTo(128+Math.cos(a)*r2,128+Math.sin(a)*r2);x.stroke();if(!(i%10))x.fillText(String(i/10*100),128+Math.cos(a)*74,128+Math.sin(a)*74+6)}x.font='bold 16px sans-serif';x.fillText('kPa',128,178);x.fillStyle='#0F6B44';x.font='bold 13px sans-serif';x.fillText('EILAN',128,205)});
 const dface=new T.Mesh(new T.CircleGeometry(.056,48),new T.MeshStandardMaterial({map:dtex,roughness:.4}));dface.position.z=.0115;dial.add(dface);const dglass=new T.Mesh(new T.CircleGeometry(.057,48),PM(0xffffff,{op:.12,cc:1,env:2.5}));dglass.position.z=.016;dial.add(dglass);
 const needle=new T.Group();needle.position.z=.013;dial.add(needle);const nm=K.box(.0035,.05,.002,K.red,{edge:false});nm.position.y=-.004;needle.add(nm);const hub=K.cyl(.006,.006,.004,dark,{edge:false,seg:12});hub.rotation.x=Math.PI/2;needle.add(hub);
 const hose=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(0,.32,0),new T.Vector3(-.05,.36,0),new T.Vector3(-.2,.34,0),new T.Vector3(-.24,.25,0)]),24,.004,8),PM(0x111216,{r:.6,cc:.3}));gg.add(hose);
 const probe=new T.Group();probe.position.x=-.24;gg.add(probe);const ptube=K.cyl(.004,.004,1,glassM,{edge:false,seg:10});ptube.rotation.z=Math.PI;probe.add(ptube);const pmem=new T.Mesh(new T.CylinderGeometry(.014,.014,.008,24),PM(0x0F6B44,{r:.3}));probe.add(pmem);
 const ggP=K.place(root,gg,.34,.02);
 /* 5) مخبار مدرّج فيه الماء المزاح */
 const mc=new T.Group();const mcB=K.cyl(.032,.036,.008,glassM,{edge:false,seg:24});mc.add(mcB);const mcG=new T.Mesh(new T.CylinderGeometry(.022,.022,.22,32,1,true),glassM);mcG.position.y=.118;mc.add(mcG);const mcW=new T.Mesh(new T.CylinderGeometry(.02,.02,1,28),waterM);mc.add(mcW);
 for(let i=1;i<=10;i++)mc.add(K.line([[-.022*.7,.008+i*.02,.0155],[.0,.008+i*.02,.0215]]));const mcP=K.place(root,mc,.3,.32);
 /* 6) بطاقة المعادلة */
 const card=K.card(.3,.1,()=>{});K.place(root,card,-.2,.34);
 const st={sub:.6,dep:.1,ang:0,wt:.5,mc:.3,sink:0};
 return{root,update(v){const rf=pick(v,['rhof','rho'],1000),ro=pick(v,['rhoo'],600),fr0=pick(v,['res'],0);let f=fr0>0&&fr0<5?fr0:ro/Math.max(rf,1);st.sink=f>=1?1:0;st.sub=K.clamp(f,.08,1);
   const hd=pick(v,['hd','h'],1);st.dep=K.clamp(.03+K.lg(hd,.05)*.16,.03,.18);const P=pick(v,['Pr','dP','P0'],0)||rf*9.8*hd;st.ang=K.clamp(K.lg(Math.abs(P),1e3),0,1);
   const Wv=pick(v,['Wt','Fb','m'],1);st.wt=K.clamp(.2+K.lg(Math.abs(Wv),.1)*.6,.15,.95);st.mc=K.clamp(.2+K.lg(pick(v,['Vsub','V','Q'],.001),1e-5)*.6,.1,.95);
   card.userData.redraw((c,W2,H2)=>K.fit(c,eq.f,W2,H2))},
  tick(t,dt){const tOn=tankP.visible!==false;wat.visible=surf.visible=tOn;
   for(let i=0;i<sp.count;i++){const x=s0[i*3],z=s0[i*3+2];sp.array[i*3+1]=tOn?Math.sin(x*28+t*2.2)*.0018+Math.cos(z*34-t*1.7)*.0014:0}sp.needsUpdate=true;
   const lv=tOn?LV:0;if(st.sink&&tOn){wood.position.set(-.05,.03+.003,.03)}else wood.position.set(-.05,(tOn?lv-(st.sub-.5)*.06:.03)+.003+Math.sin(t*1.4)*.003,.03);wood.rotation.z=Math.sin(t*1.1)*.03;
   bub.forEach(b=>{b.visible=tOn;const k=(t*.35+b.userData.o)%1;b.position.set(-.15+Math.sin(k*12+b.userData.o*9)*.008,.01+k*(LV-.01),-.06)});
   const ext=.04+st.wt*.08*(tOn?.75:1);pointer.position.y=-.03-ext*.9;rodB.scale.y=ext+.25;wt.position.y=-ext-.25;
   probe.position.y=.25;const dpth=tOn?st.dep:0;pmem.position.y=-(.25-(LV-dpth)) ;ptube.scale.y=Math.abs(pmem.position.y);
   needle.rotation.z+=((Math.PI*.75-(tOn?st.ang:0)*Math.PI*1.5)-needle.rotation.z)*Math.min(1,dt*4+.02);
   mcW.scale.y=.215*st.mc;mcW.position.y=.008+mcW.scale.y/2}}},

/* ===== heat: مختبر الحرارة الواقعي — موقد بنزن بلهب أزرق، حامل ثلاثي وشبكة سيراميك، كأس بايركس يغلي، ميزان حرارة زجاجي بمشبك، مسعر حراري ===== */
heat(K,eq){const T=K.THREE,root=new T.Group();const PM=(c,o={})=>{const m=new T.MeshPhysicalMaterial({color:c,roughness:o.r??.3,metalness:o.m??0,clearcoat:o.cc??.6,clearcoatRoughness:o.ccr??.15,transparent:!!o.op,opacity:o.op??1,depthWrite:o.op?false:true,side:o.ds?T.DoubleSide:T.FrontSide,emissive:o.e??0,emissiveIntensity:o.ei??1});m.userData.env=o.env??1.2;return m};
 const brass=PM(0xc9a227,{r:.25,m:.9,env:1.5}),iron=PM(0x2a2d33,{r:.5,m:.6,cc:.5}),glassM=PM(0xe4f2ff,{r:.04,op:.2,cc:1,ds:1,env:2.2}),waterM=PM(0x5aa6e8,{r:.06,op:.45,cc:1,env:1.6}),dark=PM(0x1b1d22,{r:.4,cc:.9});
 const ph=Math.PI;
 /* 1) موقد بنزن */
 const bn=new T.Group();const bb=new T.Mesh(new T.CylinderGeometry(.045,.055,.014,40),iron);bb.position.y=.007;bn.add(bb);const bt=K.cyl(.011,.011,.14,brass,{edge:false,seg:24});bt.position.y=.014;bn.add(bt);
 const collar=K.cyl(.014,.014,.02,K.steel,{edge:false,seg:20});collar.position.y=.03;bn.add(collar);const hoseN=K.cyl(.004,.004,.04,brass,{edge:false,seg:10});hoseN.rotation.z=ph/2;hoseN.position.set(.04,.022,0);bn.add(hoseN);
 const hose=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(.04,.022,0),new T.Vector3(.09,.012,.02),new T.Vector3(.12,.004,.08)]),16,.006,8),PM(0xd0532f,{r:.6,cc:.2}));bn.add(hose);
 const flO=new T.Mesh(new T.ConeGeometry(.016,.09,24,1,true),PM(0x6aa0ff,{op:.6,e:0x3d6bff,ei:2,ds:1}));flO.position.y=.154+.045;bn.add(flO);const flI=new T.Mesh(new T.ConeGeometry(.009,.04,20,1,true),PM(0xbff0ff,{op:.9,e:0x9fe8ff,ei:2.6,ds:1}));flI.position.y=.154+.02;bn.add(flI);
 const glow=new T.PointLight(0x6f8cff,0,.4);glow.position.y=.2;bn.add(glow);
 const bnP=K.place(root,bn,-.13,-.05);
 /* 2) الحامل الثلاثي والشبكة */
 const tri=new T.Group();const TY=.25;const ringT=new T.Mesh(new T.TorusGeometry(.075,.005,10,40),iron);ringT.rotation.x=ph/2;ringT.position.y=TY;tri.add(ringT);
 for(let i=0;i<3;i++){const a=i*ph*2/3;const leg=new T.Mesh(new T.CylinderGeometry(.004,.004,TY,10),iron);leg.position.set(Math.cos(a)*.085,TY/2,Math.sin(a)*.085);leg.castShadow=true;tri.add(leg)}
 const gz=K.canvasTex(256,256,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='#9aa0a8';x.fillRect(0,0,w,h);x.strokeStyle='#5c6168';x.lineWidth=1.2;for(let i=0;i<w;i+=8){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(w,i);x.stroke()}const g=x.createRadialGradient(128,128,10,128,128,70);g.addColorStop(0,'#f2ece2');g.addColorStop(1,'rgba(230,224,214,0)');x.fillStyle=g;x.beginPath();x.arc(128,128,70,0,7);x.fill()});
 const gauze=new T.Mesh(new T.BoxGeometry(.17,.003,.17),new T.MeshStandardMaterial({map:gz,roughness:.8,metalness:.3}));gauze.position.y=TY+.006;tri.add(gauze);
 K.place(root,tri,-.13,-.05);
 /* 3) كأس بايركس فيه ماء يغلي */
 const bk=new T.Group();const BY=TY+.008;const bkG=new T.Mesh(new T.CylinderGeometry(.052,.05,.13,40,1,true),glassM);bkG.position.y=BY+.065;bk.add(bkG);const bkB=new T.Mesh(new T.CircleGeometry(.05,40),glassM);bkB.rotation.x=-ph/2;bkB.position.y=BY+.001;bk.add(bkB);
 const lip=new T.Mesh(new T.TorusGeometry(.052,.0025,8,40),glassM);lip.rotation.x=ph/2;lip.position.y=BY+.13;bk.add(lip);for(let i=1;i<=4;i++){bk.add(K.line([[-.02,BY+i*.025,.051],[.0,BY+i*.025,.0515]]))}
 const bw=new T.Mesh(new T.CylinderGeometry(.048,.047,.09,36),waterM);bw.position.y=BY+.046;bk.add(bw);
 const bub=[];for(let i=0;i<22;i++){const b=new T.Mesh(new T.SphereGeometry(.0028+Math.random()*.003,8,6),PM(0xffffff,{op:.65,cc:1,env:2}));b.userData={o:Math.random(),a:Math.random()*ph*2,r:Math.random()*.038};bk.add(b);bub.push(b)}
 const steam=[];const stM=()=>new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.3,depthWrite:false});for(let i=0;i<14;i++){const s=new T.Mesh(new T.SphereGeometry(.014,12,10),stM());s.userData.o=Math.random();bk.add(s);steam.push(s)}
 const bkP=K.place(root,bk,-.13,-.05);
 /* 4) ميزان حرارة زجاجي بمشبك على حامل */
 const th=new T.Group();const tp=K.cyl(.005,.005,.6,K.steel,{edge:false,seg:14});tp.position.set(.12,0,0);th.add(tp);const tbase=K.box(.1,.014,.08,dark,{edge:false});tbase.position.set(.12,0,0);th.add(tbase);
 const tarm=K.cyl(.004,.004,.1,K.steel,{edge:false,seg:10});tarm.rotation.z=ph/2;tarm.position.set(.12,.55,0);th.add(tarm);const clampB=K.box(.016,.02,.016,dark,{edge:false});clampB.position.set(0,.54,0);th.add(clampB);
 const tg=new T.Group();tg.position.set(0,.56,0);th.add(tg);const tube=new T.Mesh(new T.CylinderGeometry(.006,.006,.26,16),PM(0xf4f9ff,{op:.5,cc:1,env:2}));tube.position.y=-.13;tg.add(tube);const bulb=new T.Mesh(new T.SphereGeometry(.008,16,12),PM(0xd8262c,{r:.2,cc:1}));bulb.position.y=-.262;tg.add(bulb);
 const colm=K.cyl(.0022,.0022,1,PM(0xd8262c,{r:.3}),{edge:false,seg:8});colm.position.y=-.258;tg.add(colm);
 const tsc=K.canvasTex(48,512,(x,w,h)=>{x.fillStyle='rgba(255,255,255,.95)';x.fillRect(0,0,w,h);x.fillStyle='#14286f';x.font='bold 15px sans-serif';for(let c=0;c<=110;c+=5){const y=h-20-c*4.3;x.fillRect(0,y,c%10?8:16,c%50?1.5:2.5);if(!(c%20))x.fillText(String(c),20,y+5)}});const tscm=new T.Mesh(new T.PlaneGeometry(.012,.24),new T.MeshBasicMaterial({map:tsc,transparent:true}));tscm.position.set(0,-.13,.0062);tg.add(tscm);
 const thP=K.place(root,th,-.115,-.04);
 /* 5) مسعر حراري: كوبين فلّين بغطاء ومحرّك */
 const cal=new T.Group();const foam=PM(0xf5f3ee,{r:.9,cc:0});const c1=new T.Mesh(new T.CylinderGeometry(.045,.034,.1,36),foam);c1.position.y=.05;c1.castShadow=true;cal.add(c1);const c2=new T.Mesh(new T.CylinderGeometry(.047,.045,.03,36,1,true),foam);c2.position.y=.085;cal.add(c2);
 const lid=new T.Mesh(new T.CylinderGeometry(.049,.049,.008,36),PM(0xe9e6df,{r:.85,cc:0}));lid.position.y=.103;cal.add(lid);const stir=K.cyl(.0018,.0018,.1,K.steel,{edge:false,seg:8});stir.position.set(.018,.07,0);cal.add(stir);const stirR=new T.Mesh(new T.TorusGeometry(.008,.0015,6,16),K.steel);stirR.rotation.x=ph/2;stirR.position.set(.018,.168,0);cal.add(stirR);
 const dpr=K.cyl(.0025,.0025,.12,K.steel,{edge:false,seg:8});dpr.position.set(-.016,.06,0);cal.add(dpr);const dm=K.box(.05,.022,.075,PM(0xf1c40f,{r:.4,cc:.6}),{edge:false});dm.position.set(.11,0,.0);cal.add(dm);
 const dtex=K.canvasTex(256,96,()=>{});const dscr=new T.Mesh(new T.PlaneGeometry(.04,.02),new T.MeshStandardMaterial({map:dtex,emissive:0xffffff,emissiveMap:dtex,emissiveIntensity:.35}));dscr.rotation.x=-ph/2;dscr.position.set(.11,.0225,-.012);cal.add(dscr);
 const wire=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(-.016,.18,0),new T.Vector3(.04,.2,.02),new T.Vector3(.1,.06,.03),new T.Vector3(.11,.022,.03)]),20,.0018,6),dark);cal.add(wire);
 const calP=K.place(root,cal,.2,.24);
 /* 6) بطاقة المعادلة */
 const card=K.card(.28,.1,()=>{});K.place(root,card,.22,-.26);
 const st={T:.5,Tc:25,last:''};const drawD=c=>{const s=c.toFixed(1)+' °C';if(s===st.last)return;st.last=s;const {x}=dtex.userData;x.fillStyle='#c9d8c4';x.fillRect(0,0,256,96);x.fillStyle='#0b1f12';x.font='700 52px "Courier New",monospace';x.textAlign='center';x.textBaseline='middle';x.fillText(s,128,50);dtex.needsUpdate=true};drawD(25);
 return{root,update(v){const dTv=pick(v,['dT','hlDT'],0),Tv=pick(v,['Tk','T2','Th','T1','hlTf'],0)||(pick(v,['Tc','hlTc'],0)||(20+dTv))+273.15;const Tc=Tv-273.15;st.Tc=Tc;st.T=K.clamp((Tc+10)/110,.02,1);
   const q=pick(v,['Qh','QH','Qdot','P'],0);st.fl=K.clamp(.5+K.lg(Math.abs(q)||1000,100)*.25,.5,1.3);colm.scale.y=.008+K.clamp((Tc)/110,0,1)*.236;drawD(K.clamp(Tc,-50,999));card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=bnP.visible!==false,bkOn=bkP.visible!==false;flO.visible=flI.visible=on;glow.intensity=on?.6*st.fl:0;const fs=st.fl*(1+Math.sin(t*23)*.06+Math.sin(t*37)*.04);flO.scale.set(fs*.9,fs,fs*.9);flI.scale.setScalar(st.fl);flO.position.y=.154+.045*fs;
   const boil=on&&bkOn?st.T:0;bub.forEach((b,i)=>{const k=(t*(.25+boil*.9)+b.userData.o)%1;b.visible=boil>.15&&i<4+boil*18;b.position.set(Math.cos(b.userData.a)*b.userData.r,BY+.004+k*.088,Math.sin(b.userData.a)*b.userData.r)});
   steam.forEach(s=>{const k=(t*.22+s.userData.o)%1;s.visible=boil>.35;s.position.set(Math.sin(k*8+s.userData.o*6)*.02,BY+.13+k*.2*boil,Math.cos(k*6)*.01);s.scale.setScalar(.5+k*1.6);s.material.opacity=.3*(1-k)});
   bw.position.y=BY+.046+(boil>.6?Math.sin(t*14)*.0012:0);stir.position.y=.07+Math.max(0,Math.sin(t*2))*.012;stirR.position.y=stir.position.y+.098}}},

/* ===== gas: piston + particles ===== */
gas(K,eq){const T=K.THREE,root=new T.Group();const cyl=new T.Group();const g=K.cyl(.13,.13,.34,K.glass,{open:true,soft:true});cyl.add(g);cyl.add(K.cyl(.135,.135,.012,K.paper2));
 const pis=K.cyl(.125,.125,.03,K.metal);cyl.add(pis);const rod=K.cyl(.012,.012,.25,K.dark,{edge:false});pis.add(rod);rod.position.y=.03;const handle=K.box(.12,.02,.03,K.dark);handle.position.y=.28;pis.add(handle);
 const P=[];for(let i=0;i<36;i++){const s=K.sph(.009,K.purple,{hull:false,edge:false,center:true});s.userData.v=new T.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();s.position.set((Math.random()-.5)*.18,.02+Math.random()*.15,(Math.random()-.5)*.18);cyl.add(s);P.push(s)}
 K.place(root,cyl,-.08,0);const gauge=new T.Group();gauge.add(K.cyl(.004,.004,.24,K.dark,{edge:false}));const face=K.cyl(.055,.055,.015,K.paper,{seg:32});face.rotation.x=Math.PI/2;face.position.y=.27;gauge.add(face);const nd=K.box(.004,.045,.004,K.red,{edge:false});nd.position.set(0,.27,.01);gauge.add(nd);K.place(root,gauge,.3,.05);
 const st={h:.2,sp:.25};return{root,update(v){const Vv=pick(v,['VL','V','V2','V1'],1),Tv=pick(v,['Tk','T2','T1'],300),Pv=pick(v,['Pk','Pr','P2','P1'],100);st.h=K.clamp(.06+K.lg(Vv,.05)*.5,.07,.31);st.sp=K.clamp(Math.sqrt(Tv/300)*.25,.05,.8);nd.rotation.z=1.3-K.lg(Pv,10)*2.6},
  tick(t,dt){pis.position.y+=(st.h-pis.position.y)*Math.min(1,dt*3);const top=pis.position.y-.012;P.forEach(s=>{s.position.addScaledVector(s.userData.v,st.sp*dt);const r=Math.hypot(s.position.x,s.position.z);if(r>.115){s.userData.v.x*=-1;s.userData.v.z*=-1;s.position.x*=.115/r;s.position.z*=.115/r}if(s.position.y<.022){s.position.y=.022;s.userData.v.y=Math.abs(s.userData.v.y)}if(s.position.y>top){s.position.y=top;s.userData.v.y=-Math.abs(s.userData.v.y)}})}}},

/* ===== wave: speaker + beads ===== */
wave(K,eq){const T=K.THREE,root=new T.Group();const spk=new T.Group();spk.add(K.box(.1,.16,.08,K.dark));const cone=K.cyl(.045,.02,.02,K.paper,{seg:24});cone.rotation.z=-Math.PI/2;cone.position.set(.05,.09,0);spk.add(cone);K.place(root,spk,-.36,0);
 const beads=[];const N=34;for(let i=0;i<N;i++){const b=K.sph(.009,i===12?K.red:K.blue,{hull:false,edge:false,center:true});b.position.set(-.28+i*.02,.09,0);root.add(b);beads.push(b)}
 const line=new T.Line(new T.BufferGeometry().setFromPoints(beads.map(b=>b.position.clone())),new T.LineBasicMaterial({color:0x1E44C8}));root.add(line);
 const end=K.box(.02,.2,.06,K.paper2);K.place(root,end,.4,0);const cardW=K.card(.3,.1,()=>{});K.place(root,cardW,0,.36);
 const rings=[];for(let i=0;i<4;i++){const r=K.tor(.05,.002,K.dark,{seg:40,arc:Math.PI*.6});r.rotation.y=Math.PI/2;r.position.set(-.3,.09,0);r.rotation.x=-Math.PI*.3;root.add(r);rings.push(r)}
 const st={k:12,w:4,A:.04};return{root,update(v){const lam=pick(v,['lam'],1),f=pick(v,['f','fs','fo'],2),A=pick(v,['A'],.05);st.k=K.clamp(2*Math.PI/(.08+K.lg(lam,.2)*.5),6,60);st.w=K.clamp(K.lg(f,.5)*12,2,12);st.A=K.clamp(.015+K.lg(A,.01)*.06,.015,.06);
  cardW.userData.redraw((c,W,H)=>{K.fit(c,eq.f,W,H)})},
  tick(t){const pos=line.geometry.attributes.position;beads.forEach((b,i)=>{const x=i*.02;b.position.y=.09+st.A*Math.sin(st.k*x-st.w*t);pos.setY(i,b.position.y)});pos.needsUpdate=true;rings.forEach((r,i)=>{const k=((t*.6+i/4)%1);r.scale.setScalar(.3+k*1.6);r.position.x=-.3+k*.05})}}},

/* ===== charges & fields ===== */
charges(K,eq){const T=K.THREE,root=new T.Group();const mk=(mat,sign)=>{const g=new T.Group();g.add(K.cyl(.035,.045,.02,K.paper2));g.add(K.cyl(.005,.005,.14,K.dark,{edge:false}));const s=K.sph(.05,mat,{center:true});s.position.y=.19;g.add(s);const c=K.card(.05,.05,(x,W,H)=>K.txt(x,sign,W/2,H/2,300,sign==='+'?'#C8463C':'#1E44C8',true,'center',true),{bg:'#ffffff'});c.position.set(0,.25,0);g.add(c);return g};
 const a=K.place(root,mk(K.red,'+'),-.22,0),b=K.place(root,mk(K.blue,'−'),.22,0);const lines=[];
 for(let i=-3;i<=3;i++){if(!i)continue;const pts=[];for(let k=0;k<=20;k++){const x=-.17+k/20*.34;pts.push([x,.19+i*.035*Math.sin(k/20*Math.PI)*1.6,i*.012])}const l=K.tube(pts,.0016,K.dark,{seg:30});root.add(l);lines.push(l)}
 const sparks=[];for(let i=0;i<6;i++){const s=K.sph(.007,K.gold,{hull:false,edge:false,center:true});root.add(s);sparks.push({s,o:i/6,lane:i%6-2.5})}
 return{root,update(v){const q=pick(v,['q','q1','Ef'],1e-6);const sc=1+K.lg(Math.abs(q)*1e6,1)*.5;a.children[0].children[2].scale.setScalar(sc);b.children[0].children[2].scale.setScalar(sc)},
  tick(t){sparks.forEach(p=>{const k=(t*.3+p.o)%1;const x=-.17+k*.34;p.s.position.set(x,.19+p.lane*.035*Math.sin(k*Math.PI)*1.6/1.2,p.lane*.012)})}}},

/* ===== circuit ===== */
circuit(K,eq){const T=K.THREE,root=new T.Group();const wc=document.createElement('canvas');wc.width=512;wc.height=512;const wg=wc.getContext('2d');wg.fillStyle='#c79a63';wg.fillRect(0,0,512,512);for(let i=0;i<90;i++){wg.strokeStyle=`rgba(${120+Math.random()*30|0},${80+Math.random()*20|0},40,${.15+Math.random()*.25})`;wg.lineWidth=1+Math.random()*3;wg.beginPath();const y0=Math.random()*512;wg.moveTo(0,y0);for(let x=0;x<=512;x+=32)wg.lineTo(x,y0+Math.sin(x*.02+i)*6);wg.stroke()}const wt=new T.CanvasTexture(wc);wt.colorSpace=T.SRGBColorSpace;const woodM=new T.MeshPhysicalMaterial({map:wt,roughness:.55,clearcoat:.5,clearcoatRoughness:.3});woodM.userData.env=.7;const board=K.box(.72,.016,.5,woodM);K.place(root,board,0,0);
 const y=.04,path=[[-.28,y,.18],[-.28,y,-.18],[.28,y,-.18],[.28,y,.18],[-.28,y,.18]];const wireM=new T.MeshPhysicalMaterial({color:0xc8322a,roughness:.35,clearcoat:.8,clearcoatRoughness:.15});wireM.userData.env=.8;root.add(K.tube(path,.0055,wireM,{seg:160}));
 const bat=new T.Group();const hold=K.box(.075,.03,.17,K.M(0x1d2027,{r:.5}),{edge:false});hold.position.set(0,0,-.07);bat.add(hold);const bc=document.createElement('canvas');bc.width=512;bc.height=512;const bx=bc.getContext('2d');bx.fillStyle='#1E44C8';bx.fillRect(0,0,512,512);bx.fillStyle='#0b1f5e';bx.fillRect(0,0,512,40);bx.fillStyle='#C9A227';bx.fillRect(0,0,512,150);bx.save();bx.fillStyle='#fff';bx.font='bold 64px sans-serif';for(const cx of [128,384]){bx.save();bx.translate(cx,330);bx.rotate(-Math.PI/2);bx.textAlign='center';bx.fillText('1.5 V',0,22);bx.restore()}bx.restore();const btex=new T.CanvasTexture(bc);btex.colorSpace=T.SRGBColorSpace;const batM=new T.MeshPhysicalMaterial({map:btex,roughness:.3,metalness:.3,clearcoat:.9});batM.userData.env=1;const bb=new T.Mesh(new T.CylinderGeometry(.028,.028,.13,40,1,true),batM);bb.rotation.x=Math.PI/2;bb.position.set(0,.035,-.07);bat.add(bb);const cap1=K.cyl(.028,.028,.004,K.steel,{edge:false,seg:32});cap1.rotation.x=Math.PI/2;cap1.position.set(0,.035,-.137);bat.add(cap1);const cap2=K.cyl(.01,.01,.008,K.steel,{edge:false,seg:20});cap2.rotation.x=Math.PI/2;cap2.position.set(0,.035,-.001);bat.add(cap2);K.place(root,bat,-.28,.07,0,.016);
 const bulb=new T.Group();const sock=K.cyl(.028,.032,.018,K.M(0x1d2027,{r:.5}),{edge:false,seg:32});bulb.add(sock);for(let i=0;i<4;i++){const th=new T.Mesh(new T.TorusGeometry(.0165,.0025,8,28),K.steel);th.rotation.x=Math.PI/2;th.position.y=.022+i*.006;bulb.add(th)}const scr=K.cyl(.016,.016,.026,K.steel,{edge:false,seg:28});scr.position.y=.018;bulb.add(scr);const gl=new T.Group();gl.position.y=.072;const glM=new T.MeshPhysicalMaterial({color:0xfff9ea,roughness:.04,transparent:true,opacity:.28,clearcoat:1,emissive:0xffd36b,emissiveIntensity:0,depthWrite:false});glM.userData.env=1.6;const glb=new T.Mesh(new T.SphereGeometry(.04,40,28),glM);gl.add(glb);const neckB=K.cyl(.016,.022,.022,glM,{edge:false,seg:28});neckB.position.y=-.044;gl.add(neckB);const filM=new T.MeshStandardMaterial({color:0x553311,emissive:0xffb347,emissiveIntensity:0});const fil=K.helix(.004,.0008,.024,8,filM);fil.rotation.z=Math.PI/2;fil.position.set(-.012,0,0);gl.add(fil);[-.012,.012].forEach(x=>{const w=K.cyl(.0007,.0007,.04,K.steel,{edge:false,seg:6});w.position.set(x,-.04,0);gl.add(w)});bulb.add(gl);gl.children[0].material=glM;const light=new T.PointLight(0xffc860,0,.6);light.position.y=.07;bulb.add(light);K.place(root,bulb,.28,0,0,.016);
 const res=new T.Group();const rb=K.cyl(.014,.014,.09,K.M(0xe9d7b0));rb.rotation.z=Math.PI/2;rb.position.set(-.045,.04,0);res.add(rb);[0xC8463C,0x26282f,0xC9A227].forEach((c,i)=>{const b=K.cyl(.0145,.0145,.008,K.M(c),{edge:false});b.rotation.z=Math.PI/2;b.position.set(-.07+i*.02,.04,0);res.add(b)});K.place(root,res,0,-.18,0,.016);
 const sw=new T.Group();sw.add(K.box(.08,.012,.04,K.M(0x2a2d34,{r:.5})));[-.028,.028].forEach(x=>{const p=K.box(.006,.02,.012,K.M(0xc9a227,{m:.8,r:.25}),{edge:false});p.position.set(x,.012,0);sw.add(p)});const lev=K.box(.062,.004,.01,K.steel,{edge:false});lev.position.set(0,.026,0);lev.rotation.z=.06;sw.add(lev);const hnd=K.cyl(.005,.005,.022,K.M(0x1d2027),{edge:false});hnd.position.set(.03,.032,0);sw.add(hnd);K.place(root,sw,0,.18,0,.016);
 const eM=new T.MeshStandardMaterial({color:0x4f8cff,emissive:0x2f6bff,emissiveIntensity:.9});const el=[];for(let i=0;i<16;i++){const s=K.sph(.006,eM,{hull:false,edge:false,center:true});root.add(s);el.push({s,o:i/16})}
 const per=4*.56+0*.36;const pt=(k)=>{const segs=[[-.28,.18,-.28,-.18],[-.28,-.18,.28,-.18],[.28,-.18,.28,.18],[.28,.18,-.28,.18]];const L=[.36,.56,.36,.56],tot=1.84;let d=k*tot;for(let i=0;i<4;i++){if(d<=L[i]){const q=d/L[i],s=segs[i];return[s[0]+(s[2]-s[0])*q,s[1]+(s[3]-s[1])*q]}d-=L[i]}return[-.28,.18]};
 const st={sp:.1,glow:.5};return{root,update(v){const I=pick(v,['Iamp'],0)||pick(v,['Vv','emf','Ecell','E0'],6)/pick(v,['Rres','R1'],6);const P=pick(v,['Pw'],0)||I*pick(v,['Vv','emf'],6);st.sp=K.clamp(K.lg(I,.1)*.5,.02,.5);st.glow=K.clamp(K.lg(P,1)*1.3,0,1.2);glM.emissiveIntensity=st.glow*.35;filM.emissiveIntensity=st.glow*3;light.intensity=st.glow*.9},
  tick(t){el.forEach(e=>{const [x,z]=pt((t*st.sp+e.o)%1);e.s.position.set(x,y+.016,z)})}}},

/* ===== magnet ===== */
magnet(K,eq){const T=K.THREE,root=new T.Group();const mag=new T.Group();const n=K.box(.12,.04,.05,K.red);n.position.x=-.06;const s=K.box(.12,.04,.05,K.blue);s.position.x=.06;mag.add(n,s);
 const lab=(t,x,col)=>{const c=K.card(.04,.04,(cx,W,H)=>K.txt(cx,t,W/2,H/2,300,col,true,'center',true),{bg:'#ffffff'});c.position.set(x,.042,.0);c.rotation.x=-Math.PI/2+.0001;return c};const ln=lab('N',-.08,'#C8463C');ln.position.y=.041;ln.rotation.set(-Math.PI/2,0,0);mag.add(ln);const ls=lab('S',.08,'#1E44C8');ls.rotation.set(-Math.PI/2,0,0);ls.position.y=.041;mag.add(ls);
 K.place(root,mag,-.08,.05);const fl=[];for(let i=1;i<=4;i++){const r=.06+i*.04;const pts=[];for(let k=0;k<=40;k++){const a=k/40*Math.PI*2;pts.push([-.08+Math.cos(a)*(.12+r),.02,.05+Math.sin(a)*r*.9])}const l=K.line(pts,K.inkSoft);root.add(l);fl.push(l)}
 const comps=[];for(let i=0;i<7;i++){const a=i/7*Math.PI*2;const c=new T.Group();c.add(K.cyl(.022,.022,.008,K.paper,{seg:20}));const nd=new T.Group();const n1=K.box(.02,.004,.006,K.red,{edge:false});n1.position.x=.01;const n2=K.box(.02,.004,.006,K.dark,{edge:false});n2.position.x=-.01;nd.add(n1,n2);nd.position.y=.01;c.add(nd);const p=K.place(root,c,-.08+Math.cos(a)*.26,.05+Math.sin(a)*.2);comps.push({nd,p})}
 const coil=K.helix(.04,.004,.16,9,K.M(0xb5651d,{r:.4,m:.4}));coil.rotation.z=Math.PI/2;coil.position.set(.08,.05,0);const cg=new T.Group();cg.add(coil);cg.add(K.box(.2,.01,.06,K.paper2));K.place(root,cg,.24,-.36);
 const st={sp:.6};return{root,update(v){st.sp=K.clamp(K.lg(pick(v,['B','Phi','Vs','emf'],.5),.05)*2,.2,2)},
  tick(t){mag.parent.position.x=-.08+Math.sin(t*st.sp)*.02;comps.forEach(c=>{const dx=c.p.position.x+.08,dz=c.p.position.z-.05;const a=Math.atan2(dz,dx);c.nd.rotation.y=-(a*2)+Math.PI})}}},

/* ===== optics bench ===== */
optics(K,eq){const T=K.THREE,root=new T.Group();const rail=new T.Group();rail.add(K.box(.84,.02,.05,K.steel));const rc=document.createElement('canvas');rc.width=2048;rc.height=64;const rg=rc.getContext('2d');rg.fillStyle='#f4f1e6';rg.fillRect(0,0,2048,64);rg.fillStyle='#1b2a5c';rg.font='bold 22px sans-serif';for(let i=0;i<=84;i++){const x=12+i*(2024/84);rg.fillRect(x,0,i%10?2:3,i%10?(i%5?16:26):36);if(!(i%10))rg.fillText(String(i),x+4,58)}const rt=new T.CanvasTexture(rc);rt.colorSpace=T.SRGBColorSpace;const rul=new T.Mesh(new T.PlaneGeometry(.82,.022),new T.MeshStandardMaterial({map:rt,roughness:.6}));rul.position.set(0,.0101,.0256);rail.add(rul);[-.4,.4].forEach(x=>{const f=K.box(.03,.012,.07,K.dark,{edge:false});f.position.x=x;f.position.y=-.012;rail.add(f)});K.place(root,rail,0,.05);
 const cand=new T.Group();const wax=new T.MeshPhysicalMaterial({color:0xf6ecd6,roughness:.55,sheen:.5,sheenColor:new T.Color(0xfff4dc),transmission:0});cand.add(K.cyl(.015,.015,.09,wax,{edge:false,seg:28}));const drip=K.lathe([[0,0],[.016,0],[.017,.004],[.012,.008],[0,.008]],wax,{edge:false});drip.position.y=.086;cand.add(drip);const holder=K.lathe([[0,0],[.03,0],[.032,.006],[.02,.01],[.017,.014],[0,.014]],K.steel,{edge:false});holder.position.y=-.01;cand.add(holder);const wick=K.cyl(.0012,.0012,.012,K.dark,{edge:false});wick.position.y=.092;cand.add(wick);const flG=new T.Group();flG.position.y=.1;const fl=new T.Mesh(new T.SphereGeometry(.008,16,12),new T.MeshBasicMaterial({color:0xfff2b0}));fl.scale.set(1,2.2,1);fl.position.y=.012;flG.add(fl);const flo=new T.Mesh(new T.SphereGeometry(.013,16,12),new T.MeshBasicMaterial({color:0xff8a1e,transparent:true,opacity:.55,depthWrite:false,blending:T.AdditiveBlending}));flo.scale.set(1,2.4,1);flo.position.y=.016;flG.add(flo);const flb=new T.Mesh(new T.SphereGeometry(.004,10,8),new T.MeshBasicMaterial({color:0x4a7dff,transparent:true,opacity:.7}));flb.position.y=.003;flG.add(flb);cand.add(flG);const cp=K.place(root,cand,-.34,.05,0,.02);
 const lens=new T.Group();const lg=new T.SphereGeometry(.09,40,24);lg.scale(.16,1,1);const lgM=new T.MeshPhysicalMaterial({color:0xe6f0ff,roughness:.02,transparent:true,opacity:.32,clearcoat:1,clearcoatRoughness:.02,ior:1.52,depthWrite:false});lgM.userData.env=1.8;const lm=new T.Mesh(lg,lgM);lm.position.y=.13;lens.add(lm);const lr=K.tor(.091,.006,K.steel,{seg:56});lr.rotation.y=Math.PI/2;lr.position.y=.13;lens.add(lr);const ls=K.cyl(.005,.005,.05,K.steel,{edge:false});lens.add(ls);const lcar=K.box(.04,.025,.06,K.dark,{edge:false});lcar.position.y=-.012;lens.add(lcar);const lp=K.place(root,lens,0,.05,.35,.02);
 const scr=new T.Group();scr.add(K.box(.012,.24,.17,K.M(0x2a2d34,{r:.5}),{edge:false}));const scw=K.box(.004,.22,.15,K.M(0xfbfbf8,{r:.95}),{edge:false});scw.position.set(-.007,.01,0);scr.add(scw);const scar=K.box(.04,.025,.06,K.dark,{edge:false});scar.position.y=-.012;scr.add(scar);const sp=K.place(root,scr,.34,.05,.6,.02);
 const img=new T.Group();const im1=new T.Mesh(new T.SphereGeometry(.008,16,12),new T.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.9}));im1.scale.set(.3,2.2,1);img.add(im1);const im2=new T.Mesh(new T.SphereGeometry(.014,16,12),new T.MeshBasicMaterial({color:0xff9a3c,transparent:true,opacity:.35,depthWrite:false,blending:T.AdditiveBlending}));im2.scale.set(.3,2.4,1);img.add(im2);img.position.x=-.012;sp.add(img);
 let rays=null;const st={};const rebuild=(dob,f)=>{if(rays)root.remove(rays);rays=new T.Group();const sx=.34/ .5;const ox=-K.clamp(dob*sx,.06,.4),fx=K.clamp(f*sx,.03,.35);cp.position.x=ox;const di=1/(1/fx-1/(-ox));const ix=di;const hy=.13,obH=.11;
  const ys=[obH];const top=new T.Vector3(ox,.02+obH,.05);[[0],[1]].forEach(([k])=>{const pts=k===0?[top,new T.Vector3(0,.02+obH,.05),new T.Vector3(K.clamp(ix,-.4,.42),.02+obH-(obH/fx)*K.clamp(ix,-.4,.42),.05)]:[top,new T.Vector3(0,.13,.05),new T.Vector3(K.clamp(ix,-.4,.42),.13+(.13-.02-obH)/(-ox)*K.clamp(ix,-.4,.42),.05)];const l=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0xffc94a,transparent:true,opacity:.9}));rays.add(l)});
  root.add(rays);if(ix>0&&ix<.45){sp.position.x=ix;img.visible=true;const m=-ix/(-ox);img.position.y=.13+m*.03;const ss=Math.max(.4,Math.min(2,Math.abs(m)));img.scale.set(ss,m<0?-ss:ss,ss)}else{img.visible=false}};
 return{root,update(v){const f=pick(v,['fl'],.1),dob=pick(v,['dob'],.3);rebuild(K.clamp(dob,.05,.6),K.clamp(Math.abs(f),.02,.5))},tick(t){const k=1+Math.sin(t*17)*.08+Math.sin(t*7.3)*.05;flG.scale.set(1/k,k,1/k);flo.material.opacity=.45+Math.sin(t*11)*.12}}},

/* ===== atom ===== */
atom(K,eq){const T=K.THREE,root=new T.Group();const base=K.cyl(.05,.07,.03,K.paper2);K.place(root,base,0,0);const rod=K.cyl(.004,.004,.1,K.dark,{edge:false});rod.position.y=.03;base.add(rod);
 const at=new T.Group();at.position.y=.22;base.add(at);const nuc=new T.Group();at.add(nuc);
 for(let i=0;i<14;i++){const p=K.sph(.016,i%2?K.red:K.M(0x9a9cab),{center:true,hull:1.08});const phi=Math.acos(1-2*(i+.5)/14),th=Math.PI*(1+Math.sqrt(5))*i;p.position.set(Math.cos(th)*Math.sin(phi)*.026,Math.cos(phi)*.026,Math.sin(th)*Math.sin(phi)*.026);nuc.add(p)}
 const orbs=[];[[.11,0],[.15,1.05],[.19,2.1]].forEach(([r,a],i)=>{const g=new T.Group();g.rotation.set(Math.PI/2+.4*Math.sin(a),a,0);const ring=K.tor(r,.0016,K.dark,{seg:80});g.add(ring);const e=K.sph(.012,K.blue,{center:true});g.add(e);at.add(g);orbs.push({e,r,sp:2.2-i*.5,o:i})});
 const st={k:1};return{root,update(v){st.k=1},tick(t,dt){nuc.rotation.y+=dt*.6;orbs.forEach(o=>{const a=t*o.sp*st.k+o.o;o.e.position.set(Math.cos(a)*o.r,Math.sin(a)*o.r,0)})}}},

/* ===== chemistry lab ===== */
beaker(K,eq){const T=K.THREE,root=new T.Group();
 const phCol=p=>{const st=[[0,[200,30,40]],[3,[240,120,30]],[5,[240,210,50]],[7,[60,170,70]],[9,[40,110,200]],[11,[60,50,170]],[14,[110,40,140]]];p=K.clamp(p,0,14);for(let i=1;i<st.length;i++)if(p<=st[i][0]){const[a,ca]=st[i-1],[b,cb]=st[i],k=(p-a)/(b-a);return new T.Color(...ca.map((x,j)=>(x+(cb[j]-x)*k)/255))}return new T.Color(.43,.16,.55)};
 const bk=new T.Group();const glass=K.lathe([[0,0],[.08,0],[.085,.005],[.085,.2],[.095,.215]],K.glass,{soft:true});bk.add(glass);const liqM=K.liq(0x4f7fe0,.72);const liq=K.cyl(.08,.08,.12,liqM,{edge:false});bk.add(liq);const surfG=new T.CircleGeometry(.08,32);surfG.rotateX(-Math.PI/2);const surfM=K.liq(0x4f7fe0,.86);const surf=new T.Mesh(surfG,surfM);bk.add(surf);const base0=surfG.attributes.position.array.slice();const rod=K.cyl(.004,.004,.26,K.glass,{soft:true});rod.rotation.z=.22;bk.add(rod);
 bk.add(K.gradOn(.085,.19,.008));K.place(root,bk,-.15,0);
 const fl=new T.Group();const fg=K.lathe([[0,0],[.09,0],[.092,.01],[.03,.16],[.028,.24],[.034,.25]],K.glass,{soft:true});fl.add(fg);const fliq=K.lathe([[0,0],[.085,0],[.087,.008],[.06,.06],[0,.06]],K.liq(0xC9A227,.74),{edge:false});fl.add(fliq);K.place(root,fl,.18,-.12);
 const rack=new T.Group();rack.add(K.box(.22,.012,.06,K.M(0xd9b382)));const rb=K.box(.22,.012,.06,K.M(0xd9b382));rb.position.y=.07;rack.add(rb);[-.1,.1].forEach(x=>{const p=K.box(.01,.08,.06,K.M(0xd9b382));p.position.x=x;rack.add(p)});
 [0x1E44C8,0x0F6B44,0xC8463C,0x4A2A8F].forEach((c,i)=>{const tb=K.cyl(.012,.012,.13,K.glass,{soft:true,open:true});tb.position.set(-.075+i*.05,.012,0);rack.add(tb);const l=K.cyl(.01,.01,.06,K.M(c,{op:.75}),{edge:false});l.position.set(-.075+i*.05,.014,0);rack.add(l)});K.place(root,rack,.12,.3);
 const bub=[];for(let i=0;i<10;i++){const b=K.sph(.005,K.M(0xffffff,{op:.8}),{hull:false,edge:false,center:true});b.userData.o=Math.random();bk.add(b);bub.push(b)}
 const card=K.card(.3,.09,()=>{});K.place(root,card,-.12,.36);
 const st={lev:.1};return{root,update(v){const p=has(v,'pH')?v.pH:has(v,'pOH')?14-v.pOH:has(v,'Hc')?-Math.log10(v.Hc):7;liqM.color.copy(phCol(p));surfM.color.copy(liqM.color);const lvl=pick(v,['VL','V1','V2'],0);st.lev=lvl?K.clamp(.04+K.lg(lvl,.1)*.4,.04,.18):.12;liq.scale.y=st.lev/.12;
  card.userData.redraw((c,W,H)=>{K.fit(c,eq.f,W,H)})},
  tick(t){const okB=bk.parent&&bk.parent.visible!==false;bub.forEach(b=>{const k=(t*.3+b.userData.o)%1;const an=b.userData.o*20+t*.9;b.position.set(Math.sin(an)*.05,k*st.lev,Math.cos(an)*.05)});surf.position.y=st.lev+.0005;const P=surfG.attributes.position;const amp=okB?.0035:0;for(let i=0;i<P.count;i++){const x=base0[i*3],z=base0[i*3+2];P.setY(i,amp*Math.sin(x*70+t*8)+amp*.7*Math.sin(z*60-t*6)+amp*.8*Math.sin(Math.hypot(x,z)*90-t*10))}P.needsUpdate=true;surfG.computeVertexNormals();rod.position.set(Math.cos(t*2.2)*.035,.01,Math.sin(t*2.2)*.035);bk.rotation.z=Math.sin(t*2.5)*.012;fliq.rotation.z=Math.sin(t*2)*.04}}},

/* ===== molecules ===== */
molecule(K,eq){const T=K.THREE,root=new T.Group();const C={H:[0xf4f4f8,.022],O:[0xC8463C,.034],C:[0x2b2d36,.034],N:[0x1E44C8,.033],Cl:[0x0F6B44,.036],Na:[0x4A2A8F,.04]};
 const mol=(atoms,bonds)=>{const g=new T.Group();atoms.forEach(([e,x,y,z])=>{const s=K.sph(C[e][1],K.M(C[e][0],{r:.45}),{center:true,hull:1.07});s.position.set(x,y,z);g.add(s)});bonds.forEach(([i,j])=>{const a=new T.Vector3(...atoms[i].slice(1)),b=new T.Vector3(...atoms[j].slice(1));const len=a.distanceTo(b);const c=K.cyl(.007,.007,len,K.M(0xcfd2da),{edge:false,seg:8});c.position.copy(a);c.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());g.add(c)});return g};
 const f=eq.f;const set=[];
 set.push(mol([['O',0,0,0],['H',.06,.045,0],['H',-.06,.045,0]],[[0,1],[0,2]]));
 set.push(mol([['C',0,0,0],['O',.08,0,0],['O',-.08,0,0]],[[0,1],[0,2]]));
 set.push(mol([['C',0,0,0],['H',.06,.06,.0],['H',-.06,.06,0],['H',0,-.04,.07],['H',0,-.04,-.07]],[[0,1],[0,2],[0,3],[0,4]]));
 set.push(mol([['N',0,0,0],['H',.06,-.03,.03],['H',-.06,-.03,.03],['H',0,-.03,-.065]],[[0,1],[0,2],[0,3]]));
 const holders=set.map((m,i)=>{const g=new T.Group();g.add(K.cyl(.004,.004,.14,K.dark,{edge:false}));g.add(K.cyl(.035,.04,.012,K.paper2));m.position.y=.2;g.add(m);return K.place(root,g,[-.3,-.1,.1,.3][i],[0,-.18,0,-.18][i])});
 const card=K.card(.42,.11,()=>{});K.place(root,card,0,.34);
 return{root,update(){card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},tick(t,dt){holders.forEach((h,i)=>{h.children[0].children[2].rotation.y+=dt*(.5+i*.15)})}}},

/* ===== geometric solids ===== */
solids(K,eq){const T=K.THREE,root=new T.Group();const en=(eq.n[1]||'').toLowerCase();
 const objs={cube:K.box(.14,.14,.14,K.paper),sphere:K.sph(.075,K.paper),cylinder:K.cyl(.06,.06,.16,K.paper),cone:K.cyl(0,.07,.17,K.paper),pyramid:(()=>{const g=new T.ConeGeometry(.09,.16,4);g.translate(0,.08,0);g.rotateY(Math.PI/4);return K.sk(g,K.paper)})(),prism:(()=>{const s=new T.Shape([new T.Vector2(-.08,0),new T.Vector2(.08,0),new T.Vector2(0,.13)]);const g=new T.ExtrudeGeometry(s,{depth:.14,bevelEnabled:false});g.translate(0,0,-.07);return K.sk(g,K.paper)})(),torus:(()=>{const t=K.tor(.06,.022,K.paper,{hull:1.06});t.rotation.x=Math.PI/2;t.position.y=.022;const g=new T.Group();g.add(t);return g})()};
 const flat={triangle:new T.Shape([new T.Vector2(-.09,0),new T.Vector2(.09,0),new T.Vector2(-.02,.14)]),square:(()=>{const s=new T.Shape();s.moveTo(-.07,0);s.lineTo(.07,0);s.lineTo(.07,.14);s.lineTo(-.07,.14);return s})(),circle:(()=>{const s=new T.Shape();s.absarc(0,.075,.075,0,Math.PI*2);return s})(),trapezoid:new T.Shape([new T.Vector2(-.09,0),new T.Vector2(.09,0),new T.Vector2(.05,.11),new T.Vector2(-.05,.11)]),hexagon:(()=>{const s=new T.Shape();for(let i=0;i<6;i++){const a=i/6*Math.PI*2;i?s.lineTo(Math.cos(a)*.075,.075+Math.sin(a)*.075):s.moveTo(Math.cos(a)*.075,.075+Math.sin(a)*.075)}return s})(),parallelogram:new T.Shape([new T.Vector2(-.09,0),new T.Vector2(.05,0),new T.Vector2(.09,.11),new T.Vector2(-.05,.11)])};
 const kw=[['cube','cube'],['sphere','sphere'],['hemisphere','sphere'],['cylinder','cylinder'],['cone','cone'],['pyramid','pyramid'],['prism','prism'],['torus','torus'],['cuboid','cube'],['triangle','triangle'],['heron','triangle'],['square','square'],['rectangle','square'],['circle','circle'],['sector','circle'],['arc','circle'],['trapez','trapezoid'],['hexagon','hexagon'],['polygon','hexagon'],['parallelogram','parallelogram'],['rhomb','parallelogram'],['ellipse','circle'],['annulus','circle']];
 let hero=null;for(const [k,v] of kw)if(en.includes(k)){hero=v;break}if(!hero)hero=eq.cat==='ge2'?'triangle':'cube';
 const mkFlat=(name,mat)=>{const g=new T.ExtrudeGeometry(flat[name],{depth:.012,bevelEnabled:false});return K.sk(g,mat)};
 const heroObj=objs[hero]?objs[hero]:mkFlat(hero,K.M(0xbcd0ff));if(objs[hero])heroObj.traverse(o=>{if(o.isMesh&&o.material===K.paper)o.material=K.M(0xbcd0ff)});const hp=K.place(root,heroObj,0,-.02);heroObj.scale.setScalar(1.7);
 const others=Object.keys(objs).filter(k=>k!==hero).slice(0,5);others.forEach((k,i)=>{K.place(root,objs[k],[-.33,-.18,.18,.33,0][i],[.3,.38,.38,.3,-.4][i])});
 const card=K.card(.3,.09,()=>{});K.place(root,card,-.25,-.42,.3);
 return{root,update(){card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},tick(t,dt){heroObj.rotation.y+=dt*.35}}},

/* ===== function graph board ===== */
graph(K,eq){const T=K.THREE,root=new T.Group();const W=.62,H=.4;const board=K.card(W,H,()=>{},{bg:'#fffdf7'});board.rotation.x=-.12;K.place(root,board,0,-.1);
 const marker=K.sph(.016,K.gold,{center:true});root.add(marker);const base=K.box(.66,.02,.06,K.paper2);K.place(root,base,0,-.09);
 const st={fn:null,x0:0};
 return{root,update(v,fn){st.fn=fn;board.userData.redraw((c,Wc,Hc)=>{const pad=50;c.strokeStyle='rgba(38,40,47,.12)';c.lineWidth=2;for(let i=0;i<=10;i++){const x=pad+i*(Wc-2*pad)/10,y=pad+i*(Hc-2*pad)/10;c.beginPath();c.moveTo(x,pad);c.lineTo(x,Hc-pad);c.stroke();c.beginPath();c.moveTo(pad,y);c.lineTo(Wc-pad,y);c.stroke()}
   K.txt(c,eq.f,Wc/2,30,eq.f.length>30?28:38,'#14286f',true,'center',true);
   if(!fn||!fn.key)return;const x0=fn.x0,span=Math.max(1e-6,Math.abs(x0)*2||4);const xs=[],ys=[];for(let i=0;i<=120;i++){const xv=x0-span/2+i/120*span;let y=fn.f(xv);if(!isFinite(y))y=NaN;xs.push(xv);ys.push(y)}
   const fin=ys.filter(isFinite);if(fin.length<2)return;let lo=Math.min(...fin),hi=Math.max(...fin);if(hi-lo<1e-9){lo-=1;hi+=1}const X=xv=>pad+(xv-(x0-span/2))/span*(Wc-2*pad),Y=yv=>Hc-pad-(yv-lo)/(hi-lo)*(Hc-2*pad-30);
   if(lo<0&&hi>0){c.strokeStyle='#26282f';c.lineWidth=3;c.beginPath();c.moveTo(pad,Y(0));c.lineTo(Wc-pad,Y(0));c.stroke()}
   c.strokeStyle='#1E44C8';c.lineWidth=7;c.lineJoin='round';c.beginPath();let pen=false;xs.forEach((xv,i)=>{if(!isFinite(ys[i])){pen=false;return}pen?c.lineTo(X(xv),Y(ys[i])):c.moveTo(X(xv),Y(ys[i]));pen=true});c.stroke();
   const yv=fn.f(x0);if(isFinite(yv)){c.fillStyle='#C9A227';c.beginPath();c.arc(X(x0),Y(yv),14,0,7);c.fill();c.strokeStyle='#26282f';c.lineWidth=3;c.stroke()}
   K.txt(c,fn.xl+' →',Wc-pad,Hc-pad+24,26,'#5a5c66',true,'right',true);K.txt(c,'↑ '+fn.yl,pad,pad+44,26,'#5a5c66',true,'left',true);
   st.mx=(X(x0)/Wc-.5)*W;st.my=(1-Y(yv)/Hc)*H})},
  tick(t){if(st.mx!==undefined){marker.position.set(st.mx,.02+st.my*Math.cos(.12),-.1-st.my*Math.sin(.12)+.012);marker.visible=true}else marker.visible=false;marker.scale.setScalar(1+Math.sin(t*4)*.12)}}},

/* ===== dice & bars ===== */
dice(K,eq){const T=K.THREE,root=new T.Group();const pip=n=>K.canvasTex(128,128,(x)=>{x.fillStyle='#fbf8f0';x.fillRect(0,0,128,128);x.fillStyle='#26282f';const P={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[n];P.forEach(([a,b])=>{x.beginPath();x.arc(64+a*32,64+b*32,11,0,7);x.fill()})});
 const mats=[1,6,2,5,3,4].map(n=>new T.MeshStandardMaterial({map:pip(n),roughness:.7}));const dice=[];
 for(let i=0;i<2;i++){const g=new T.BoxGeometry(.07,.07,.07);g.translate(0,.035,0);const m=new T.Mesh(g,mats);m.castShadow=true;const gr=new T.Group();gr.add(m);gr.add(new T.LineSegments(new T.EdgesGeometry(g),K.ink));const p=K.place(root,gr,-.3+i*.11,.32,.4*i);dice.push({gr,spin:0})}
 const bars=[];const n=11;for(let i=0;i<n;i++){const b=K.box(.045,1,.045,i===5?K.gold:K.blueL);b.scale.y=.02;K.place(root,b,-.27+i*.054,-.12);bars.push(b)}
 const base=K.box(.64,.01,.08,K.paper2);K.place(root,base,0,-.12);
 return{root,update(v){const s=pick(v,['sd','sdx'],1)/Math.max(1e-6,Math.abs(pick(v,['mean','mu2'],0))||10);const w=K.clamp(1.2+s*10,1,4);bars.forEach((b,i)=>{b.userData.t=.04+.26*Math.exp(-(((i-5)/w)**2)/2)})},
  tick(t,dt){bars.forEach(b=>{b.scale.y+=((b.userData.t||.1)-b.scale.y)*Math.min(1,dt*3)});dice.forEach(d=>{if(d.spin>0){d.spin-=dt;d.gr.rotation.x+=dt*14;d.gr.rotation.z+=dt*10;if(d.spin<=0){const q=[0,Math.PI/2,Math.PI,-Math.PI/2];d.gr.rotation.x=q[Math.floor(Math.random()*4)];d.gr.rotation.z=q[Math.floor(Math.random()*4)]}}})},
  tap(o){let hit=false;dice.forEach(d=>{let p=o;while(p){if(p===d.gr){hit=true}p=p.parent}});if(hit)dice.forEach(d=>d.spin=.9);return hit}}},

/* ===== coins (finance) ===== */
coins(K,eq){const T=K.THREE,root=new T.Group();const stacks=[];const cm=K.M(0xC9A227,{r:.3,m:.7});const N=6;
 for(let i=0;i<N;i++){const g=new T.Group();const p=K.place(root,g,-.3+i*.12,.05);stacks.push(g)}
 const base=K.box(.76,.012,.12,K.paper2);K.place(root,base,0,.05);const pig=new T.Group();const body=K.sph(.07,K.M(0xf2b6c3),{center:true});body.scale.set(1.25,1,1);body.position.y=.08;pig.add(body);const sn=K.cyl(.025,.025,.02,K.M(0xe89aaa));sn.rotation.z=Math.PI/2;sn.position.set(.09,.085,0);pig.add(sn);[[-.04,-.03],[.04,-.03],[-.04,.03],[.04,.03]].forEach(([x,z])=>{const l=K.cyl(.012,.012,.03,K.M(0xe89aaa));l.position.set(x,0,z);pig.add(l)});const slot=K.box(.04,.004,.008,K.dark,{edge:false});slot.position.y=.15;pig.add(slot);K.place(root,pig,.28,-.3,-.5);
 const card=K.card(.34,.1,()=>{});K.place(root,card,-.15,-.36);
 const build=(i,count)=>{const g=stacks[i];while(g.children.length)g.remove(g.children[0]);for(let k=0;k<count;k++){const c=K.cyl(.035,.035,.01,cm,{seg:24});c.position.y=k*.011;c.rotation.y=k;g.add(c)}};
 return{root,update(v){const P0=pick(v,['Pm'],1000),r=pick(v,['ri'],5)/100;for(let i=0;i<N;i++){const amt=P0*Math.pow(1+r,i*2);build(i,Math.round(K.clamp(4+Math.log(amt/P0+1)*14,3,30)))}card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},tick(t){pig.rotation.y=Math.sin(t*.8)*.15}}},

/* ===== plant + cell (life sciences) ===== */
plant(K,eq){const T=K.THREE,root=new T.Group();const pot=new T.Group();pot.add(K.cyl(.07,.05,.09,K.M(0xc8704a)));const soil=K.cyl(.066,.066,.004,K.M(0x5a3b28),{edge:false});soil.position.y=.088;pot.add(soil);
 const stem=K.tube([[0,.09,0],[.01,.16,0],[-.01,.24,0],[0,.32,0]],.005,K.green,{seg:20});pot.add(stem);const leaves=[];for(let i=0;i<6;i++){const g=new T.SphereGeometry(.035,16,10);g.scale(1,.25,.5);const l=K.sk(g,K.greenL,{hull:false,edge:false});l.position.set(i%2?.035:-.035,.14+i*.03,0);l.rotation.z=i%2?-.5:.5;pot.add(l);leaves.push(l)}
 const fl=K.sph(.022,K.gold,{center:true});fl.position.y=.33;pot.add(fl);K.place(root,pot,-.22,0);
 const cell=new T.Group();const mem=K.sph(.11,K.M(0x9fd4b5,{op:.35,r:.3}),{center:true,hull:false});cell.add(mem);const nuc=K.sph(.04,K.purple,{center:true,hull:1.08});nuc.position.set(-.02,0,.0);cell.add(nuc);for(let i=0;i<4;i++){const g=new T.SphereGeometry(.02,12,8);g.scale(1.8,.8,.8);const mi=K.sk(g,K.red,{hull:1.1});const a=i/4*Math.PI*2;mi.position.set(Math.cos(a)*.065,Math.sin(a)*.04,Math.sin(a)*.05);mi.rotation.z=a;cell.add(mi)}
 const stand=new T.Group();stand.add(K.cyl(.04,.05,.02,K.paper2));stand.add(K.cyl(.004,.004,.08,K.dark,{edge:false}));cell.position.y=.2;stand.add(cell);K.place(root,stand,.2,-.05);
 const sg=new T.Group();sg.add(K.cyl(.004,.004,.3,K.dark,{edge:false}));const sun=K.sph(.04,K.M(0xfff3c4,{e:0xffd36b,ei:.7}),{center:true,hull:false});sun.position.y=.33;sg.add(sun);K.place(root,sg,-.36,-.38);
 const card=K.card(.34,.09,()=>{});K.place(root,card,0,.36);
 return{root,update(){card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},tick(t){leaves.forEach((l,i)=>l.rotation.x=Math.sin(t*1.4+i)*.12);cell.rotation.y=t*.3}}},

/* ===== blocks (sequences / counting / computing) ===== */
blocks(K,eq){const T=K.THREE,root=new T.Group();const cols=[K.blueL,K.greenL,K.M(0xb4a0e6),K.M(0xe8d48a)];const grp=new T.Group();K.place(root,grp,0,.05);
 const card=K.card(.38,.1,()=>{});K.place(root,card,0,-.38);
 const lab=(s)=>K.canvasTex(128,128,(x)=>{x.fillStyle='#fbf8f0';x.fillRect(0,0,128,128);x.fillStyle='#26282f';x.font='700 70px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText(s,64,68)});
 const build=(terms)=>{while(grp.children.length)grp.remove(grp.children[0]);const n=terms.length,mx=Math.max(...terms.map(Math.abs),1);terms.forEach((v,i)=>{const h=Math.max(1,Math.round(Math.abs(v)/mx*7));for(let k=0;k<h;k++){const b=K.box(.06,.06,.06,cols[i%4]);b.position.set(-((n-1)*.075)/2+i*.075,k*.061,0);grp.add(b)}const t=new T.Mesh(new T.PlaneGeometry(.06,.06),new T.MeshBasicMaterial({map:lab(String(Math.round(v*100)/100))}));t.rotation.x=-Math.PI/2;t.position.set(-((n-1)*.075)/2+i*.075,.001,.075);grp.add(t)})};
 return{root,update(v,fn){let terms=[1,2,3,4,5,6];if(fn&&fn.key){const x0=fn.x0;const base=Math.max(1,Math.round(Math.abs(x0)))||1;terms=[];for(let i=1;i<=6;i++){const y=fn.f(i*(base/3||1));terms.push(isFinite(y)?y:0)}}build(terms);card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},tick(t){grp.rotation.y=Math.sin(t*.5)*.12}}}
};
Object.assign(SCENES,MORE);
