/* مجسمات إضافية لموسوعة معادلات إيلان: درون، سيارة، جوال، سفينة، مكيف، بيت، لابتوب وراوتر.
   نفس نظام scenes.js: كل مشهد (K, eq) يرجّع {root, update(v), tick(t,dt)}، وكل قطعة تنضاف بـ K.place بنفس ترتيب parts2.js. */
const has=(v,k)=>v&&typeof v[k]==='number'&&isFinite(v[k]);
const outv=(v,eq,d=1)=>has(v,eq.out)?v[eq.out]:d;


/* real anatomy loader: BodyParts3D (CC BY-SA 2.1 JP) — see books/eq/models/LICENSE.txt */
let _bodyP=null;
function loadBody(){if(_bodyP)return _bodyP;_bodyP=Promise.all(['body','body2'].flatMap(n=>[fetch('/books/eq/models/'+n+'.json').then(r=>r.json()),fetch('/books/eq/models/'+n+'.bin').then(r=>r.arrayBuffer())])).then(([J,buf0,J2,buf2])=>{
  const T=window.__THREE;const half=J.half,c=J.center;const minZ=J.bbox[0][2];
  const geo=key=>{let p=J.parts[key],B=buf0;if(!p&&J2.parts[key]){p=J2.parts[key];B=buf2}if(!p)return null;const buf=B;const [po,pn]=p.pos,[no,nn]=p.nor,[io,inn,it]=p.idx;const q=new Int16Array(buf,po,pn),n8=new Int8Array(buf,no,nn);const ix=it==='uint32'?new Uint32Array(buf,io,inn):new Uint16Array(buf,io,inn);
   const P=new Float32Array(pn),N=new Float32Array(nn);for(let i=0;i<pn;i+=3){const x=q[i]/32767*half+c[0],y=q[i+1]/32767*half+c[1],z=q[i+2]/32767*half+c[2];P[i]=x/half;P[i+1]=(z-minZ)/half;P[i+2]=-y/half;N[i]=n8[i]/127;N[i+1]=n8[i+2]/127;N[i+2]=-n8[i+1]/127}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(P,3));g.setAttribute('normal',new T.BufferAttribute(N,3));g.setIndex(new T.BufferAttribute(ix,1));return g};
  return{geo,lift:0}}).catch(e=>{console.warn('body model',e);return null});return _bodyP}

export const MORE={
/* ===== drone ===== */
drone(K,eq){const T=K.THREE,root=new T.Group();
 const pad=new T.Group();pad.add(K.cyl(.16,.16,.006,K.paper2,{seg:40}));pad.add(K.line([[-.06,.007,-.06],[-.06,.007,.06]]));pad.add(K.line([[.06,.007,-.06],[.06,.007,.06]]));pad.add(K.line([[-.06,.007,0],[.06,.007,0]]));K.place(root,pad,0,.1);
 const body=new T.Group();body.add(K.box(.09,.035,.09,K.dark));const cam=K.sph(.016,K.metal,{center:true});cam.position.set(0,-.004,.05);body.add(cam);
 const arms=[[1,1],[1,-1],[-1,1],[-1,-1]];arms.forEach(([sx,sz])=>{const a=K.box(.16,.008,.012,K.dark,{edge:false});a.position.set(sx*.055,.02,sz*.055);a.rotation.y=sx*sz>0?-Math.PI/4:Math.PI/4;body.add(a)});
 const bodyP=K.place(root,body,0,.1,0,.18);
 const rotors=arms.map(([sx,sz])=>{const r=new T.Group();r.add(K.cyl(.012,.012,.025,K.dark,{edge:false,seg:14}));const blade=new T.Group();[0,Math.PI/2].forEach(a=>{const b=K.box(.11,.003,.014,K.blueL,{edge:false});b.rotation.y=a;b.position.y=.026;blade.add(b)});r.add(blade);r.userData.blade=blade;const p=K.place(root,r,sx*.11,.1+sz*.11,0,.2);p.userData.rotor=r;return {p,blade}});
 const bat=new T.Group();bat.add(K.box(.06,.02,.035,K.green));const tip=K.box(.008,.01,.015,K.metal,{edge:false});tip.position.set(.034,.005,0);bat.add(tip);const batP=K.place(root,bat,.3,.36);
 const fx=new T.Group();root.add(fx);const lift=K.arrow(.14,K.green,.007);fx.add(lift);
 const card=K.card(.32,.1,()=>{});K.place(root,card,0,-.36);
 const st={spin:20,h:.18};
 return{root,update(v){const val=outv(v,eq,1);st.spin=6+K.lg(val,.5)*40;st.h=.12+K.lg(val,.5)*.16;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=rotors.every(r=>r.p.visible!==false&&r.p.parent)&&bodyP.visible!==false;const sp=on?st.spin:0;rotors.forEach(r=>{r.blade.rotation.y+=sp*dt;r.p.position.y+=((on?st.h+.02:0.02)-r.p.position.y)*Math.min(1,dt*2)});bodyP.position.y+=((on?st.h:0)-bodyP.position.y)*Math.min(1,dt*2);bodyP.rotation.y=Math.sin(t*.6)*.08;
   lift.position.set(0,bodyP.position.y+.06,.1);lift.visible=on;lift.userData.set(.06+st.spin/400)}}},

/* ===== car on a road ===== */
car(K,eq){const T=K.THREE,root=new T.Group();
 const road=new T.Group();road.add(K.box(.86,.008,.2,K.M(0x3a3d46,{r:.9}),{edge:false}));const dashes=[];for(let i=0;i<9;i++){const d=K.box(.05,.002,.008,K.M(0xf4f0e6),{edge:false});d.position.set(-.4+i*.1,.009,0);road.add(d);dashes.push(d)}[-.1,.1].forEach(z=>road.add(K.line([[-.43,.01,z],[.43,.01,z]])));K.place(root,road,0,.12);
 const car=new T.Group();const body=K.box(.22,.045,.1,K.blue);body.position.y=.03;car.add(body);const cabin=K.box(.12,.04,.088,K.glass,{soft:true});cabin.position.set(-.01,.075,0);car.add(cabin);
 const lights=K.box(.006,.012,.08,K.M(0xfff3c4,{e:0xffd36b,ei:.8}),{edge:false});lights.position.set(.111,.045,0);car.add(lights);
 const wheels=[];[[-.07,-.055],[.07,-.055],[-.07,.055],[.07,.055]].forEach(([x,z])=>{const w=K.cyl(.024,.024,.016,K.dark,{seg:18,edge:false});w.rotation.x=Math.PI/2;w.position.set(x,.024,z);car.add(w);wheels.push(w);const hub=K.cyl(.01,.01,.018,K.metal,{seg:12,edge:false});hub.rotation.x=Math.PI/2;hub.position.set(x,.024,z);car.add(hub)});
 const carP=K.place(root,car,-.05,.12,0,.008);
 const pump=new T.Group();pump.add(K.box(.06,.12,.04,K.red));const scr=K.box(.04,.025,.002,K.M(0xdfe9f5),{edge:false});scr.position.set(0,.085,.021);pump.add(scr);pump.add(K.tube([[.03,.06,0],[.06,.04,.02],[.07,.02,.03]],.004,K.dark));K.place(root,pump,.32,.38);
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.05,-.34);
 const st={v:.3};
 return{root,update(v){const val=outv(v,eq,1);st.v=.08+K.lg(val,1)*.9;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=carP.visible!==false;const sp=on?st.v:0;dashes.forEach(d=>{d.position.x-=sp*dt;if(d.position.x<-.43)d.position.x+=.9});wheels.forEach(w=>w.rotation.y+=sp*dt/.024);car.position.y=on?Math.abs(Math.sin(t*12))*.002*sp:0}}},

/* ===== phone + charger ===== */
phone(K,eq){const T=K.THREE,root=new T.Group();
 const ph=new T.Group();ph.add(K.box(.16,.012,.3,K.dark));
 const scr=K.canvasTex(256,480,()=>{});const sm=new T.Mesh(new T.PlaneGeometry(.144,.27),new T.MeshStandardMaterial({map:scr,emissive:0xffffff,emissiveMap:scr,emissiveIntensity:.7}));sm.rotation.x=-Math.PI/2;sm.position.y=.0125;ph.add(sm);
 const phP=K.place(root,ph,-.08,.08);ph.rotation.x=-.08;
 const chg=new T.Group();chg.add(K.box(.06,.05,.05,K.paper));[-.012,.012].forEach(x=>{const pin=K.box(.004,.02,.002,K.metal,{edge:false});pin.position.set(x,.05,.0);chg.add(pin)});chg.add(K.tube([[0,.02,-.026],[0,.01,-.08],[-.12,.006,-.1],[-.22,.006,-.04],[-.26,.006,.06]],.004,K.paper2));
 const chgP=K.place(root,chg,.3,.2);
 const bolt=K.card(.07,.07,(c,W,H)=>{K.txt(c,'⚡',W/2,H/2,300,'#C9A227')},{bg:'#fff8dc'});K.place(root,bolt,.3,.02);
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.02,-.4);
 const st={lvl:.2,target:.8};
 const draw=(lvl,on)=>{const {c,x}=scr.userData;x.fillStyle='#0B1F5E';x.fillRect(0,0,256,480);x.fillStyle='#D8FFE6';x.font='700 30px system-ui';x.textAlign='center';x.fillText(on?'⚡ '+Math.round(lvl*100)+'%':Math.round(lvl*100)+'%',128,70);
  x.strokeStyle='#D8FFE6';x.lineWidth=8;x.strokeRect(78,130,100,230);x.fillRect(110,112,36,18);x.fillStyle=lvl<.2?'#C8463C':'#0F6B44';const h=Math.round(216*lvl);x.fillRect(86,352-h,84,h);x.fillStyle='#8fa7f0';x.font='600 20px system-ui';x.fillText('EILAN',128,430);scr.needsUpdate=true};
 return{root,update(v){const val=outv(v,eq,1);st.target=K.clamp(.25+K.lg(val,.5)*.75,.25,1);card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=chgP.visible!==false&&phP.visible!==false;if(on){st.lvl+=dt*.12;if(st.lvl>st.target)st.lvl=.15}draw(st.lvl,on)}}},

/* ===== ship on the sea ===== */
ship(K,eq){const T=K.THREE,root=new T.Group();
 const seaG=new T.PlaneGeometry(.86,.5,40,20);seaG.rotateX(-Math.PI/2);const sea=new T.Mesh(seaG,K.water);sea.receiveShadow=true;const seaW=new T.Group();seaW.add(sea);K.place(root,seaW,0,.08,0,.03);
 const ship=new T.Group();const hull=K.lathe([[0,0],[.03,.0],[.05,.03],[.055,.05]],K.red,{seg:24});hull.scale.set(3.2,1,1);ship.add(hull);const deck=K.box(.32,.01,.1,K.paper2);deck.position.y=.05;ship.add(deck);
 const cabin=K.box(.08,.05,.07,K.paper);cabin.position.set(-.07,.06,0);ship.add(cabin);const mast=K.cyl(.004,.004,.2,K.dark,{edge:false});mast.position.set(.04,.06,0);ship.add(mast);
 const sailG=new T.BufferGeometry().setFromPoints([new T.Vector3(0,0,0),new T.Vector3(0,.17,0),new T.Vector3(.11,0,0)]);sailG.setIndex([0,1,2]);sailG.computeVertexNormals();const sail=K.sk(sailG,K.M(0xf4f0e6,{ds:1}));sail.position.set(.045,.08,0);ship.add(sail);
 const shipP=K.place(root,ship,0,.08,0,.03);
 const lh=new T.Group();lh.add(K.cyl(.025,.035,.18,K.paper));const band=K.cyl(.031,.031,.03,K.red,{edge:false});band.position.y=.08;lh.add(band);const lamp=K.sph(.02,K.M(0xfff3c4,{e:0xffd36b,ei:.9}),{center:true});lamp.position.y=.2;lh.add(lamp);K.place(root,lh,.36,.4);
 const card=K.card(.32,.1,()=>{});K.place(root,card,0,-.38);
 const st={A:.012};
 return{root,update(v){const val=outv(v,eq,1);st.A=.006+K.lg(val,1)*.02;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t){const p=seaG.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);p.setY(i,st.A*Math.sin(x*14+t*2)+st.A*.5*Math.sin(z*18+t*1.3))}p.needsUpdate=true;seaG.computeVertexNormals();
   shipP.position.y=.03+st.A*Math.sin(t*2)*.8;ship.rotation.z=Math.sin(t*2+1)*st.A*3;ship.rotation.x=Math.sin(t*1.3)*st.A*2}}},

/* ===== wall air-conditioner + room ===== */
ac(K,eq){const T=K.THREE,root=new T.Group();
 const wall=new T.Group();wall.add(K.box(.8,.3,.02,K.paper2));K.place(root,wall,0,-.3);
 const unit=new T.Group();unit.add(K.box(.36,.09,.08,K.paper));const vent=K.box(.32,.006,.06,K.dark,{edge:false});vent.position.set(0,.004,.012);unit.add(vent);const led=K.box(.02,.008,.002,K.M(0x8cc7a6,{e:0x0F6B44,ei:.9}),{edge:false});led.position.set(.14,.07,.041);unit.add(led);
 const unitP=K.place(root,unit,0,-.25,0,.19);
 const fx=new T.Group();root.add(fx);const flakes=[];for(let i=0;i<40;i++){const f=K.sph(.006,K.M(0x8fa7f0,{op:.8}),{hull:false,edge:false,center:true});fx.add(f);f.userData.k=Math.random();f.userData.x=(Math.random()-.5)*.3;flakes.push(f)}
 const th=new T.Group();th.add(K.cyl(.012,.012,.18,K.glass,{soft:true}));const merc=K.cyl(.007,.007,.17,K.red,{edge:false});th.add(merc);const bulb=K.sph(.02,K.red,{center:true});th.add(bulb);const thP=K.place(root,th,.32,.25);
 const sofa=new T.Group();sofa.add(K.box(.24,.05,.1,K.purple));const back=K.box(.24,.07,.025,K.purple);back.position.set(0,.05,-.04);sofa.add(back);K.place(root,sofa,-.18,.28);
 const card=K.card(.3,.1,()=>{});K.place(root,card,.08,.48);
 const st={flow:.5,temp:.6};
 return{root,update(v){const val=outv(v,eq,1);st.flow=.25+K.lg(val,1)*.9;st.temp=K.clamp(.85-st.flow*.4,.25,.85);card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=unitP.visible!==false;flakes.forEach(f=>{f.visible=on;if(!on)return;f.userData.k+=dt*st.flow*.5;if(f.userData.k>1)f.userData.k-=1;const k=f.userData.k;f.position.set(f.userData.x+Math.sin(k*6+t)*.01,.18-k*.15,-.2+k*.3)});
   merc.scale.y+=(((on?st.temp:.9))-merc.scale.y)*Math.min(1,dt)}}},

/* ===== house under the sun ===== */
house(K,eq){const T=K.THREE,root=new T.Group();
 const ground=new T.Group();ground.add(K.box(.8,.01,.5,K.greenL,{edge:false}));K.place(root,ground,0,.08);
 const h=new T.Group();h.add(K.box(.26,.16,.2,K.paper));const roofG=new T.BufferGeometry();const v=[-.15,.16,-.11, .15,.16,-.11, 0,.26,-.11, -.15,.16,.11, .15,.16,.11, 0,.26,.11];roofG.setAttribute('position',new T.Float32BufferAttribute(v,3));roofG.setIndex([0,2,1, 3,4,5, 0,3,5, 0,5,2, 1,2,5, 1,5,4]);roofG.computeVertexNormals();h.add(K.sk(roofG,K.red));
 const win=K.box(.06,.05,.004,K.M(0xfff3c4,{e:0xffd36b,ei:.4}));win.position.set(-.06,.07,.101);h.add(win);const door=K.box(.05,.09,.004,K.M(0x8a5a3c));door.position.set(.06,0,.101);h.add(door);
 const shade=K.box(.09,.006,.04,K.dark,{edge:false});shade.position.set(-.06,.105,.12);h.add(shade);
 const hP=K.place(root,h,-.05,.08,0,.01);
 const sun=new T.Group();const ball=K.sph(.05,K.M(0xfff3c4,{e:0xffd36b,ei:.7}),{center:true});sun.add(ball);for(let i=0;i<12;i++){const a=i/12*Math.PI*2;sun.add(K.line([[Math.cos(a)*.065,Math.sin(a)*.065,0],[Math.cos(a)*.09,Math.sin(a)*.09,0]]))}const sunP=K.place(root,sun,.3,-.12,0,.36);
 const fx=new T.Group();root.add(fx);const rays=[];for(let i=0;i<3;i++){const a=K.arrow(.18,K.gold,.005);fx.add(a);rays.push(a)}
 const solar=new T.Group();const pnl=K.box(.12,.006,.08,K.blue);pnl.rotation.x=-.5;pnl.position.y=.06;solar.add(pnl);solar.add(K.cyl(.004,.004,.06,K.dark,{edge:false}));K.place(root,solar,.28,.34);
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.05,-.36);
 const st={i:.5};
 return{root,update(v){const val=outv(v,eq,1);st.i=.3+K.lg(val,1)*.7;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t){const on=sunP.visible!==false;rays.forEach((r,i)=>{r.visible=on;const k=((t*.5+i/3)%1);r.position.set(.25-k*.25,.33-k*.18,-.08+k*.1+i*.03);r.rotation.z=Math.PI*.78;r.userData.set(.06+.1*st.i)});ball.rotation.z=t*.3;win.children[0].material.emissiveIntensity=.2+.5*st.i}}},

/* ===== laptop + router ===== */
laptop(K,eq){const T=K.THREE,root=new T.Group();
 const lap=new T.Group();lap.add(K.box(.26,.01,.18,K.metal));const keys=K.box(.22,.002,.09,K.dark,{edge:false});keys.position.set(0,.011,-.02);lap.add(keys);
 const lid=new T.Group();lid.add(K.box(.26,.17,.008,K.metal));const scr=K.canvasTex(320,210,()=>{});const sm=new T.Mesh(new T.PlaneGeometry(.24,.15),new T.MeshStandardMaterial({map:scr,emissive:0xffffff,emissiveMap:scr,emissiveIntensity:.75}));sm.position.set(0,.085,.0045);lid.add(sm);lid.position.set(0,.01,-.09);lid.rotation.x=-.25;lap.add(lid);
 const lapP=K.place(root,lap,-.1,.12);
 const rt=new T.Group();rt.add(K.box(.12,.03,.07,K.dark));[-.04,.04].forEach(x=>{const a=K.cyl(.004,.004,.09,K.dark,{edge:false});a.position.set(x,.03,-.03);rt.add(a)});const leds=[];for(let i=0;i<4;i++){const l=K.box(.008,.004,.002,K.M(0x8cc7a6,{e:0x0F6B44,ei:1}),{edge:false});l.position.set(-.03+i*.02,.02,.036);rt.add(l);leds.push(l)}
 const rtP=K.place(root,rt,.28,.3);
 const fx=new T.Group();root.add(fx);const rings=[];for(let i=0;i<3;i++){const r=K.tor(.05,.002,K.blue,{seg:30,arc:Math.PI*.5});r.rotation.z=Math.PI*.25;fx.add(r);rings.push(r)}
 const card=K.card(.32,.1,()=>{});K.place(root,card,0,-.38);
 const st={rate:1};let acc=0,rows=[];
 return{root,update(v){const val=outv(v,eq,1);st.rate=.5+K.lg(val,1)*3;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=lapP.visible!==false;const net=rtP.visible!==false;acc+=dt*st.rate*(on?1:0);if(acc>.12){acc=0;rows.unshift(Array.from({length:22},()=>Math.random()<.5?'0':'1').join(''));rows=rows.slice(0,9)}
   const {x}=scr.userData;x.fillStyle='#07080C';x.fillRect(0,0,320,210);x.font='600 18px monospace';x.textAlign='left';rows.forEach((r,i)=>{x.fillStyle=i?'#0F6B44':'#D8FFE6';x.fillText(r,14,24+i*21)});x.fillStyle='#8fa7f0';x.font='700 14px system-ui';x.fillText(net?'● online':'○ offline',220,200);scr.needsUpdate=true;
   leds.forEach((l,i)=>l.visible=net&&Math.sin(t*8*st.rate+i*2)>-.2);rings.forEach((r,i)=>{r.visible=net;const k=((t*.7+i/3)%1);r.scale.setScalar(.4+k*1.4);r.position.set(.28,.13,.27)})}}},
/* ===== music: piano + guitar ===== */
music(K,eq){const T=K.THREE,root=new T.Group();
 const piano=new T.Group();piano.add(K.box(.5,.04,.16,K.dark));const keys=[];for(let i=0;i<14;i++){const k=K.box(.033,.015,.12,K.paper);k.position.set(-.215+i*.0335,.04,.015);piano.add(k);keys.push(k)}
 [0,1,3,4,5,7,8,10,11,12].forEach(i=>{const b=K.box(.02,.02,.075,K.dark,{edge:false});b.position.set(-.215+i*.0335+.017,.05,-.007);piano.add(b)});const pianoP=K.place(root,piano,-.05,.3);
 const gtr=new T.Group();const bodyG=K.cyl(.07,.07,.014,K.M(0xc98a4b),{seg:32});bodyG.scale.set(1,1,1.25);gtr.add(bodyG);const waist=K.cyl(.055,.055,.014,K.M(0xc98a4b),{seg:28});waist.position.z=-.085;gtr.add(waist);const neck=K.box(.03,.01,.24,K.M(0x8a5a3c));neck.position.set(0,.004,-.24);gtr.add(neck);const hole=K.cyl(.022,.022,.002,K.dark,{edge:false});hole.position.set(0,.013,-.02);gtr.add(hole);
 const strings=[];for(let i=0;i<6;i++){const g=new T.BufferGeometry().setFromPoints(Array.from({length:24},(_,j)=>new T.Vector3(-.0125+i*.005,.016,.05-j*.016)));const l=new T.Line(g,new T.LineBasicMaterial({color:0xC9A227}));gtr.add(l);strings.push(l)}
 const gtrP=K.place(root,gtr,.24,.08);gtr.rotation.y=.6;
 const fx=new T.Group();root.add(fx);const notes=[];for(let i=0;i<6;i++){const n=K.card(.04,.04,(c,W,H)=>K.txt(c,i%2?'♪':'♫',W/2,H/2,320,'#4A2A8F'),{bg:'#f4f0e6'});fx.add(n);n.userData.k=i/6;notes.push(n)}
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.12,-.36);
 const st={f:2,hit:0};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:440;st.f=2+K.lg(val,10)*10;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=pianoP.visible!==false||gtrP.visible!==false;st.hit+=dt*st.f*.25;const ki=Math.floor(st.hit)%keys.length;keys.forEach((k,i)=>{k.position.y=.04-(on&&i===ki?.006:0)});
   strings.forEach((l,i)=>{const p=l.geometry.attributes.position;for(let j=0;j<p.count;j++){p.setY(j,.016+(gtrP.visible!==false?Math.sin(j/(p.count-1)*Math.PI)*.003*Math.sin(t*st.f*6+i):0))}p.needsUpdate=true});
   notes.forEach(n=>{n.visible=on;n.userData.k=(n.userData.k+dt*.15)%1;const k=n.userData.k;n.position.set(-.05+Math.sin(k*9)*.12,.08+k*.25,.25-k*.2);n.scale.setScalar(1-k*.5)})}}},

/* ===== sport: track, runner block, ball, stopwatch ===== */
sport(K,eq){const T=K.THREE,root=new T.Group();
 const track=new T.Group();const ring=new T.Mesh(new T.RingGeometry(.2,.3,48),K.M(0xC8463C,{r:.9,ds:1}));ring.rotation.x=-Math.PI/2;ring.position.y=.003;ring.scale.set(1.35,1,1);track.add(ring);const inner=new T.Mesh(new T.CircleGeometry(.2,40),K.greenL);inner.rotation.x=-Math.PI/2;inner.position.y=.002;inner.scale.set(1.35,1,1);track.add(inner);[.23,.26].forEach(r=>{const pts=[];for(let i=0;i<=48;i++){const a=i/48*Math.PI*2;pts.push([Math.cos(a)*r*1.35,.004,Math.sin(a)*r])}track.add(K.line(pts,K.inkSoft))});K.place(root,track,0,.05);
 const runner=new T.Group();const torso=K.cyl(.012,.014,.05,K.blue,{edge:false});torso.position.y=.04;runner.add(torso);const head=K.sph(.012,K.M(0xe8c39e),{center:true});head.position.y=.1;runner.add(head);const legs=[],arms=[];[-1,1].forEach(s=>{const l=K.cyl(.005,.005,.04,K.dark,{edge:false});l.position.set(s*.006,.04,0);l.rotation.x=0;runner.add(l);legs.push(l);const a=K.cyl(.004,.004,.035,K.blue,{edge:false});a.position.set(s*.016,.085,0);a.rotation.x=Math.PI;runner.add(a);arms.push(a)});
 const runP=K.place(root,runner,.33,.05);
 const ball=K.sph(.03,K.paper,{seg:16});const ballP=K.place(root,ball,-.05,.05);
 const sw=new T.Group();sw.add(K.cyl(.05,.05,.015,K.metal,{seg:32}));const face=K.canvasTex(256,256,()=>{});const fm=new T.Mesh(new T.CircleGeometry(.044,32),new T.MeshStandardMaterial({map:face,emissive:0xffffff,emissiveMap:face,emissiveIntensity:.5}));fm.rotation.x=-Math.PI/2;fm.position.y=.016;sw.add(fm);const btn=K.cyl(.008,.008,.012,K.dark,{edge:false});btn.position.set(0,.008,-.055);btn.rotation.x=Math.PI/2;sw.add(btn);const swP=K.place(root,sw,.3,.42);
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.1,-.42);
 const st={v:1,a:0,time:0};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:5;st.v=.3+K.lg(val,1)*1.6;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=runP.visible!==false;if(on){st.a+=dt*st.v*.8;st.time+=dt}const a=st.a;runP.position.set(Math.cos(a)*.25*1.35,0,.05+Math.sin(a)*.25);runner.rotation.y=-a;legs.forEach((l,i)=>l.rotation.z=Math.sin(t*st.v*12+i*Math.PI)*.5*(on?1:0));arms.forEach((l,i)=>l.rotation.z=Math.PI+Math.sin(t*st.v*12+i*Math.PI+Math.PI)*.5*(on?1:0));
   ballP.position.y=Math.abs(Math.sin(t*3))*.08;ball.rotation.x=t*2;
   const {x}=face.userData;x.fillStyle='#fbf8f0';x.fillRect(0,0,256,256);x.strokeStyle='#26282f';x.lineWidth=6;x.beginPath();x.arc(128,128,118,0,Math.PI*2);x.stroke();const sec=st.time%60;x.beginPath();x.moveTo(128,128);x.lineTo(128+Math.sin(sec/60*Math.PI*2)*100,128-Math.cos(sec/60*Math.PI*2)*100);x.strokeStyle='#C8463C';x.stroke();x.fillStyle='#26282f';x.font='700 40px monospace';x.textAlign='center';x.fillText(sec.toFixed(1),128,200);face.needsUpdate=true}}},

/* ===== kitchen: stove, pot with steam, scale ===== */
kitchen(K,eq){const T=K.THREE,root=new T.Group();
 const stove=new T.Group();stove.add(K.box(.3,.03,.22,K.paper));const burner=K.tor(.05,.006,K.dark,{hull:false});burner.rotation.x=Math.PI/2;burner.position.set(-.06,.031,0);stove.add(burner);const knob=K.cyl(.012,.012,.012,K.dark,{edge:false});knob.rotation.x=Math.PI/2;knob.position.set(.1,.015,.112);stove.add(knob);
 const flames=[];for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const f=K.cyl(0,.006,.02,K.M(0x4f7fe0,{e:0x1E44C8,ei:.9,op:.85}),{edge:false,seg:8});f.position.set(-.06+Math.cos(a)*.05,.031,Math.sin(a)*.05);stove.add(f);flames.push(f)}
 const stoveP=K.place(root,stove,-.1,.1);
 const pot=new T.Group();pot.add(K.cyl(.07,.065,.08,K.metal,{open:true,seg:32}));const soup=K.cyl(.066,.066,.004,K.M(0xd98b3a),{edge:false,seg:32});soup.position.y=.06;pot.add(soup);[-1,1].forEach(s=>{const h=K.box(.03,.008,.012,K.dark,{edge:false});h.position.set(s*.08,.07,0);pot.add(h)});
 const potP=K.place(root,pot,-.16,.1,0,.03);
 const fx=new T.Group();root.add(fx);const steam=[];for(let i=0;i<14;i++){const s=K.sph(.012,K.M(0xffffff,{op:.4}),{hull:false,edge:false,center:true});fx.add(s);s.userData.k=Math.random();s.userData.x=(Math.random()-.5)*.08;steam.push(s)}
 const scale=new T.Group();scale.add(K.box(.12,.02,.12,K.paper2));const plat=K.cyl(.05,.05,.006,K.metal,{seg:28});plat.position.y=.02;scale.add(plat);const disp=K.canvasTex(160,60,()=>{});const dm=new T.Mesh(new T.PlaneGeometry(.06,.022),new T.MeshStandardMaterial({map:disp,emissive:0xffffff,emissiveMap:disp,emissiveIntensity:.6}));dm.position.set(0,.012,.0605);scale.add(dm);const flour=K.cyl(.03,.035,.025,K.M(0xf4f0e6),{seg:20});flour.position.y=.026;scale.add(flour);
 const scaleP=K.place(root,scale,.25,.32);
 const card=K.card(.32,.1,()=>{});K.place(root,card,.05,-.38);
 const st={heat:.5,val:0};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:100;st.val=val;st.heat=.3+K.lg(val,1)*.7;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H));
   const {x}=disp.userData;x.fillStyle='#0B1F5E';x.fillRect(0,0,160,60);x.fillStyle='#D8FFE6';x.font='700 34px monospace';x.textAlign='center';x.textBaseline='middle';x.fillText(K.num(val),80,32);disp.needsUpdate=true},
  tick(t,dt){const on=stoveP.visible!==false;flames.forEach((f,i)=>{f.visible=on;f.scale.y=.6+st.heat*(.8+.4*Math.sin(t*20+i*2))});
   steam.forEach(s=>{s.visible=on&&potP.visible!==false;s.userData.k=(s.userData.k+dt*.3*st.heat)%1;const k=s.userData.k;s.position.set(-.16+s.userData.x+Math.sin(k*8+t)*.01,.12+k*.2,.1);s.scale.setScalar(.6+k*1.4)})}}},
/* ===== reaction lab: pouring, sloshing liquid, bubbles, precipitate, flame, moving particles ===== */
reaction(K,eq){const T=K.THREE,root=new T.Group();const txt=(eq.f+' '+eq.n.join(' ')+' '+(eq.d||[]).join(' '));
 const gas=/[↑]|CO₂|H₂(?!O)|O₂|N₂|Cl₂|SO₂|NH₃|فقاع|فور|غاز|bubbl|fizz|gas/i.test(txt);
 const ppt=/[↓]|AgCl|راسب|precipit|CaCO₃\s*$|Shell/i.test(txt);
 const hot=/حرار|احتراق|يشتعل|نار|اشتعال|heat|burn|combust|flame|fire|Δ|ألعاب نارية|firework|عود الثقاب|match|شمعة|candle/i.test(txt);
 const flameCol=/Sr|السترونشيوم|أحمر|red/i.test(txt)?0xff3b3b:/Ba²|الباريوم|أخضر|green/i.test(txt)?0x46e07a:/Na|صوديوم/i.test(txt)?0xffc23b:/Cu|نحاس/i.test(txt)?0x3bd6ff:0x4f7fe0;
 const colA=new T.Color(/Cu|نحاس|كبريتات النحاس/i.test(txt)?0x2f7de0:/Fe|حديد|صدأ|rust/i.test(txt)?0xd9a066:/MnO₄|برمنغنات/i.test(txt)?0x8a2be2:/Cr₂O₇|دايكرومات/i.test(txt)?0xf08a24:/حليب|milk|لبن/i.test(txt)?0xf4f0e6:/I₂|يود|نشا|starch/i.test(txt)?0xe8d48a:0x4f7fe0);
 const colB=new T.Color(/Cr₂O₇|دايكرومات/i.test(txt)?0x3a9a4a:/MnO₄|برمنغنات/i.test(txt)?0xf4d0e8:/Fe|حديد|صدأ|rust/i.test(txt)?0xa0461e:/I₂|يود|نشا|starch/i.test(txt)?0x1b1f5e:/Cu/.test(txt)?0x6fb7e8:0x8cc7a6);
 /* bench */
 const bench=new T.Group();bench.add(K.box(.8,.012,.3,K.bench));K.place(root,bench,0,.12);
 /* beaker with sloshing liquid */
 const bk=new T.Group();bk.add(K.lathe([[0,0],[.085,0],[.09,.005],[.09,.21],[.1,.225]],K.glass,{soft:true}));bk.add(K.gradOn(.09,.2,.008));
 const liqM=K.liq(colA.clone(),.74);const liq=K.cyl(.085,.085,1,liqM,{edge:false});bk.add(liq);
 const surfG=new T.CircleGeometry(.085,32,0,Math.PI*2);surfG.rotateX(-Math.PI/2);const surf=new T.Mesh(surfG,K.liq(colA.clone(),.86));bk.add(surf);const base0=surfG.attributes.position.array.slice();
 const bubs=[];for(let i=0;i<(gas?34:12);i++){const b=K.sph(.004+Math.random()*.004,K.M(0xffffff,{op:.85}),{hull:false,edge:false,center:true});b.userData.o=Math.random();b.userData.r=Math.random()*.07;b.userData.a=Math.random()*6.28;bk.add(b);bubs.push(b)}
 const ppts=[];if(ppt)for(let i=0;i<40;i++){const q=K.sph(.004,K.M(0xf4f4f8),{hull:false,edge:false,center:true});q.userData.o=Math.random();q.userData.x=(Math.random()-.5)*.13;q.userData.z=(Math.random()-.5)*.13;bk.add(q);ppts.push(q)}
 const stir=K.cyl(.004,.004,.28,K.glass,{soft:true});stir.rotation.z=.25;bk.add(stir);
 const bkP=K.place(root,bk,-.08,.12,0,.012);
 /* flask that tilts and pours */
 const fl=new T.Group();const fg=K.lathe([[0,0],[.06,0],[.062,.008],[.022,.11],[.02,.16],[.026,.17]],K.glass,{soft:true});const fpiv=new T.Group();const fin=new T.Group();fin.position.y=-.06;fpiv.position.y=.06;fpiv.add(fin);fin.add(fg);const lipM=new T.Object3D();lipM.position.y=.17;fin.add(lipM);
 const fliqM=K.liq(colB.clone(),.78);const fliq=K.lathe([[0,0],[.057,0],[.059,.006],[.035,.05],[0,.05]],fliqM,{edge:false});fin.add(fliq);fl.add(fpiv);
 const flP=K.place(root,fl,.13,.12,0,.012);
 const stream=K.cyl(.006,.004,1,K.M(colB.getHex(),{op:.8}),{edge:false,seg:10});root.add(stream);stream.visible=false;
 /* burner (only lit for hot reactions) */
 const bur=new T.Group();bur.add(K.cyl(.03,.035,.012,K.steel,{edge:false}));const flames=[];for(let i=0;i<7;i++){const a=i/7*6.28;const f=K.cyl(0,.008,.035,K.M(flameCol,{e:flameCol,ei:1,op:.85}),{edge:false,seg:8});f.position.set(Math.cos(a)*.015,.012,Math.sin(a)*.015);bur.add(f);flames.push(f)}const burP=K.place(root,bur,-.08,.25,0,.012);
 /* particle box (molecules moving, like a zoom-in) */
 const pb=new T.Group();pb.add(K.box(.16,.16,.16,K.glass,{soft:true}));const mols=[];for(let i=0;i<16;i++){const red=i%2===0;const m=K.sph(.011,red?K.red:K.blue,{hull:false,edge:false,center:true});m.position.set((Math.random()-.5)*.13,.015+Math.random()*.13,(Math.random()-.5)*.13);m.userData.v=new T.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();pb.add(m);mols.push(m)}
 const pbP=K.place(root,pb,.3,-.14,0,.012);
 /* thermometer */
 const th=new T.Group();th.add(K.cyl(.01,.01,.2,K.glass,{soft:true}));const merc=K.cyl(.006,.006,.19,K.red,{edge:false});th.add(merc);const thb=K.sph(.016,K.red,{center:true});th.add(thb);for(let i=1;i<6;i++)th.add(K.line([[.011,i*.035,0],[.02,i*.035,0]]));const thP=K.place(root,th,-.3,.0,0,.012);
 const card=K.card(.34,.1,()=>{});K.place(root,card,-.08,-.4);
 const fx=new T.Group();root.add(fx);const puffs=[];if(gas||hot)for(let i=0;i<10;i++){const pf=K.sph(.014,K.M(0xffffff,{op:.35}),{hull:false,edge:false,center:true});pf.userData.k=Math.random();fx.add(pf);puffs.push(pf)}
 const st={rate:.5,mix:0,temp:.35,step:0,tStep:0,tilt:0,speed:0,fizz:0,ppt:0,fire:0};
 const parts=String(eq.f).split(/→|⇌|⇄|=>/);const R=(parts[0]||'').trim(),Pd=(parts[1]||'').trim();
 const L=(a,b)=>K.L(a,b);
 const STEPS=[
  {ar:'نصبّ المادة الثانية في الكأس'+(R?' — المتفاعلات: '+R:''),en:'Pour the second substance into the beaker'+(R?' — reactants: '+R:'')},
  {ar:'الجزيئات تتحرك أسرع وتتصادم ببعض — التصادمات هي اللي تكسر الروابط القديمة',en:'The particles speed up and collide — collisions break the old bonds'},
  {ar:(gas?'تطلع فقاعات غاز':ppt?'يتكوّن راسب صلب وينزل لتحت':hot?'تطلع حرارة ويرتفع الترمومتر':'يتغير لون المحلول')+' — هذي علامة إن التفاعل صار',en:(gas?'Gas bubbles appear':ppt?'A solid precipitate forms and sinks':hot?'Heat is given off and the thermometer rises':'The solution changes colour')+' — a sign the reaction is happening'},
  {ar:'تكوّنت النواتج ✅'+(Pd?' — '+Pd:''),en:'The products have formed ✅'+(Pd?' — '+Pd:'')}];
 const prodCard=K.card(.34,.08,()=>{},{bg:'#eafbf0'});prodCard.visible=false;K.place(root,prodCard,-.08,-.28);root.remove(prodCard.parent);fx.add(prodCard.parent);
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.rate=.6+K.lg(val,.5)*.6;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H));prodCard.userData.redraw((c,W,H)=>K.fit(c,'→ '+(Pd||eq.f),W,H,'#0F6B44'))},
  steps:()=>STEPS.map(x=>L(x.ar,x.en)),getStep:()=>st.step,
  setStep(n){st.step=K.clamp(n,0,STEPS.length);st.tStep=0;if(n===0){st.mix=0;st.speed=0;st.fizz=0;st.ppt=0;st.fire=0;st.tilt=0}},
  tick(t,dt){const okB=bkP.visible!==false,okF=flP.visible!==false,okH=burP.visible!==false;const S=st.step;if(!okB||!okF)st.step=Math.min(st.step,0);st.tStep+=dt;
   const ease=(x)=>x*x*(3-2*x);const tt=st.tStep;
   /* step 1: pour (tilt up, pour, return) */
   let tiltT=0,pour=false;if(S===1){if(tt<1.2)tiltT=tt/1.2;else if(tt<4.2){tiltT=1;pour=true}else if(tt<5.4)tiltT=1-(tt-4.2)/1.2;else tiltT=0}
   st.tilt+=(tiltT-st.tilt)*Math.min(1,dt*6);const e=ease(K.clamp(st.tilt,0,1));fpiv.rotation.z=e*1.75;fpiv.position.x=-e*.13;fpiv.position.y=.06+e*.2;
   if(pour)st.mix=Math.min(.35,st.mix+dt*.12);
   const pouredLevel=S>=1?Math.min(1,(S>1?1:K.clamp((tt-1.2)/3,0,1))):0;
   /* targets per step */
   const tgtSpeed=S===0?0:S===1?.25:S===2?1:S===3?.8:.35;st.speed+=(tgtSpeed-st.speed)*Math.min(1,dt*1.5);
   if(S>=3)st.mix=Math.min(1,st.mix+dt*.35);else if(S===2)st.mix=Math.min(.5,st.mix+dt*.08);
   const tgtF=S===3?1:S===4?.35:0;st.fizz+=(tgtF-st.fizz)*Math.min(1,dt*2);st.ppt+=((S>=3?1:0)-st.ppt)*Math.min(1,dt*.8);st.fire+=(((S===3||S===4)&&hot?1:0)-st.fire)*Math.min(1,dt*2);
   const level=.06+.07*pouredLevel;liq.scale.y=level;surf.position.y=level+.0005;
   const col=colA.clone().lerp(colB,st.mix);liqM.color.copy(col);surf.material.color.copy(col);fliq.scale.y=1-pouredLevel*.8;
   stream.visible=pour&&st.tilt>.95;if(stream.visible){root.updateMatrixWorld(true);const lip=root.worldToLocal(lipM.getWorldPosition(new T.Vector3()));const dst=new T.Vector3(-.08+.02,.12+.012+level,0);const dir=lip.clone().sub(dst);const Ln=dir.length();stream.position.copy(dst);stream.scale.set(1+Math.sin(t*40)*.15,Ln,1);stream.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize())}
   const P=surfG.attributes.position;const amp=okB?(.0008+st.speed*.003+(pour?.006:0)+st.fizz*(gas?.003:.001)):0;for(let i=0;i<P.count;i++){const x=base0[i*3],z=base0[i*3+2];P.setY(i,base0[i*3+1]+amp*Math.sin(x*70+t*9)+amp*.7*Math.sin(z*60-t*7)+(pour?amp*1.5*Math.sin(Math.hypot(x-.03,z)*120-t*20):0))}P.needsUpdate=true;surfG.computeVertexNormals();
   bk.rotation.z=Math.sin(t*3)*.008*st.speed;stir.position.set(Math.cos(t*2*st.speed)*.03,.02,Math.sin(t*2*st.speed)*.03);
   bubs.forEach((b,i)=>{const show=okB&&(gas?st.fizz>.05:st.speed>.3&&i<6);b.visible=show;const k=(t*(.25+st.fizz*.6)+b.userData.o)%1;const a=b.userData.a+t*.8;b.position.set(Math.cos(a)*b.userData.r,.005+k*level,Math.sin(a)*b.userData.r);b.scale.setScalar(.6+k*.8)});
   ppts.forEach(q=>{q.visible=okB&&st.ppt>.15;const k=(t*.12+q.userData.o)%1;q.position.set(q.userData.x+Math.sin(t+q.userData.o*9)*.006,Math.max(.004,level*(1-k*st.ppt)),q.userData.z)});
   const hotNow=hot&&okH&&st.fire>.05;flames.forEach((f,i)=>{f.visible=hotNow;f.scale.y=(.4+.6*st.fire)*(.7+.5*Math.sin(t*22+i*2))});
   st.temp+=(((hotNow?.95:.35)+st.mix*.12)-st.temp)*Math.min(1,dt*.6);merc.scale.y=thP.visible!==false?st.temp:.2;
   const sp=(.02+st.temp*.1)*st.speed*(pbP.visible!==false?1:0);mols.forEach((m,i)=>{m.position.addScaledVector(m.userData.v,sp*dt);['x','z'].forEach(a=>{if(Math.abs(m.position[a])>.068){m.position[a]=Math.sign(m.position[a])*.068;m.userData.v[a]*=-1}});if(m.position.y<.013||m.position.y>.147){m.position.y=K.clamp(m.position.y,.013,.147);m.userData.v.y*=-1}
     if(S>=4&&i%2===1){const mate=mols[i-1];m.position.lerp(mate.position.clone().add(new T.Vector3(.02,0,0)),Math.min(1,dt*2))}});
   puffs.forEach(pf=>{pf.visible=okB&&(gas?st.fizz>.1:hotNow);pf.userData.k=(pf.userData.k+dt*.25)%1;const k=pf.userData.k;pf.position.set(-.08+Math.sin(k*7+t)*.03,.12+.2+k*.14,0);pf.scale.setScalar(.6+k*2)});
   prodCard.visible=S>=4;if(S>=4){const k=Math.min(1,tt*1.5);prodCard.parent.position.y=.0+k*.02;prodCard.scale.setScalar(.6+.4*k)}}}},
/* ===== human body from real anatomy data (BodyParts3D, CC BY-SA 2.1 JP) + original inner-ear model ===== */
body(K,eq){const T=K.THREE,root=new T.Group();
 const PM=(o)=>new T.MeshPhysicalMaterial(o);
 const M={skin:PM({color:0xd9a184,roughness:.5,sheen:.7,sheenColor:new T.Color(0xffd6c4),sheenRoughness:.45,clearcoat:.12,transparent:true,opacity:.33,depthWrite:false,side:T.DoubleSide}),
  ear:PM({color:0xd9a184,roughness:.5,sheen:.6,sheenColor:new T.Color(0xffd6c4),transparent:true,opacity:.6,depthWrite:false}),
  heart:PM({color:0x8a1820,roughness:.32,clearcoat:.7,clearcoatRoughness:.25,sheen:.35,sheenColor:new T.Color(0xff6a6a)}),
  lung:PM({color:0xd88792,roughness:.72,sheen:.9,sheenColor:new T.Color(0xffc8cf),transparent:true,opacity:.62,depthWrite:false}),
  kidney:PM({color:0x7c2f2a,roughness:.38,clearcoat:.55,clearcoatRoughness:.3}),
  bone:PM({color:0xeee2c6,roughness:.5,clearcoat:.3}),brain:PM({color:0xe7a6a8,roughness:.6,sheen:.6,sheenColor:new T.Color(0xffd0d0)}),stomach:PM({color:0xd98a7a,roughness:.45,clearcoat:.4}),liver:PM({color:0x6e2420,roughness:.35,clearcoat:.6}),intest:PM({color:0xe0a08a,roughness:.5,clearcoat:.3}),misc:PM({color:0xb4605a,roughness:.4,clearcoat:.4}),eye:PM({color:0xf6f3ee,roughness:.2,clearcoat:.9}),trach:PM({color:0xe9d2c0,roughness:.55})};
 const S=.23;/* metres of page per normalised unit */
 const stand=new T.Group();const sb=new T.Mesh(new T.CylinderGeometry(.12,.13,.012,48),PM({color:0x23252d,roughness:.3,metalness:.6}));sb.position.y=.006;sb.receiveShadow=true;stand.add(sb);K.place(root,stand,-.12,.06);
 const G={};const ORDER=['skin','skeleton','brain','heart','lungs','digest','kidneys','ear'];ORDER.forEach(k=>{G[k]=new T.Group();K.place(root,G[k],-.12,.06,0,.012)});
 /* original inner ear (magnified): cochlea spiral + three semicircular canals + vestibule */
 const ie=new T.Group();const ieM=PM({color:0xf3e3c3,roughness:.4,clearcoat:.5});const pts=[];for(let i=0;i<=120;i++){const a=i/120*Math.PI*2*2.6,r=.028*(1-i/150);pts.push(new T.Vector3(Math.cos(a)*r,i/120*.022,Math.sin(a)*r))}
 const coch=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),160,.006,10),ieM);coch.castShadow=true;coch.position.set(-.04,.03,0);ie.add(coch);
 const ves=new T.Mesh(new T.SphereGeometry(.014,24,16),ieM);ves.position.set(0,.04,0);ie.add(ves);
 [[0,0,0],[Math.PI/2,0,0],[0,0,Math.PI/2]].forEach(([rx,ry,rz],i)=>{const c=new T.Mesh(new T.TorusGeometry(.026,.004,10,40,Math.PI*1.6),ieM);c.rotation.set(rx,ry,rz);c.position.set(.022,.07+i*.004,(i-1)*.006);c.castShadow=true;ie.add(c)});
 const nerve=new T.Mesh(new T.CylinderGeometry(.004,.005,.05,10),PM({color:0xf6d36b,roughness:.5}));nerve.rotation.z=Math.PI/2.4;nerve.position.set(-.07,.035,0);ie.add(nerve);
 const ieBase=new T.Mesh(new T.CylinderGeometry(.07,.075,.01,40),PM({color:0x23252d,roughness:.35,metalness:.5}));ieBase.position.y=.005;ie.add(ieBase);
 const ieLab=K.card(.14,.04,(c,W,H)=>K.txt(c,K.L('الأذن الداخلية (مكبّرة)','Inner ear (magnified)'),W/2,H/2,58,'#26282f'));ieLab.position.set(0,.0,.085);ieLab.rotation.x=-.9;ie.add(ieLab);
 const pIE=K.place(root,ie,.24,.3);
 /* heart monitor */
 const mon=new T.Group();const frame=new T.Mesh(new T.BoxGeometry(.17,.11,.012),PM({color:0x1b1d24,roughness:.35,metalness:.4}));frame.position.y=.12;frame.castShadow=true;mon.add(frame);const ecg=K.canvasTex(256,160,()=>{});const em=new T.Mesh(new T.PlaneGeometry(.15,.092),new T.MeshStandardMaterial({map:ecg,emissive:0xffffff,emissiveMap:ecg,emissiveIntensity:.85}));em.position.set(0,.12,.0065);mon.add(em);const leg=new T.Mesh(new T.CylinderGeometry(.005,.005,.07,12),PM({color:0xb9bcc6,metalness:.9,roughness:.3}));leg.position.y=.035;mon.add(leg);mon.add(new T.Mesh(new T.CylinderGeometry(.03,.03,.006,24),PM({color:0x1b1d24,roughness:.4})));
 K.place(root,mon,.26,-.1,-.35);
 const card=K.card(.32,.1,()=>{});K.place(root,card,.05,-.42);
 const credit=K.card(.3,.03,(c,W,H)=>K.txt(c,'BodyParts3D © DBCLS · CC BY-SA 2.1 JP',W/2,H/2,40,'#5a5c66',false,'center',true),{bg:'#f4f0e6'});credit.rotation.x=-1.2;credit.position.set(-.12,.0,.22);root.add(credit);
 /* load real anatomy */
 const centers={};
 loadBody().then(B=>{if(!B)return;const add=(key,grp,mat)=>{const g=B.geo(key);if(!g)return null;g.computeBoundingBox();const c=g.boundingBox.getCenter(new T.Vector3());g.translate(-c.x,-c.y,-c.z);const m=new T.Mesh(g,mat);m.castShadow=mat!==M.skin;m.receiveShadow=true;m.position.copy(c);grp.add(m);return m};
  add('skin',G.skin,M.skin);add('skeleton',G.skeleton,M.bone);add('brain',G.brain,M.brain);add('heart',G.heart,M.heart);add('lung_l',G.lungs,M.lung);add('lung_r',G.lungs,M.lung);add('trachea',G.lungs,M.trach);
  add('esophagus',G.digest,M.trach);add('stomach',G.digest,M.stomach);add('liver',G.digest,M.liver);add('intestine',G.digest,M.intest);add('pancreas',G.digest,M.misc);add('spleen',G.digest,M.misc);
  add('kidney_l',G.kidneys,M.kidney);add('kidney_r',G.kidneys,M.kidney);add('bladder',G.kidneys,M.misc);add('ear',G.ear,M.ear);add('eyes',G.ear,M.eye);
  ORDER.forEach(k=>{G[k].scale.setScalar(S);G[k].position.y=B.lift*S})}).catch(()=>{});
 const st={bpm:72,br:14};const trace=[];
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:72;st.bpm=K.clamp(has(v,'HR')?v.HR:50+K.lg(val,1)*60,40,180);st.br=10+K.lg(val,1)*10;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const beat=(t*st.bpm/60)%1;const pulse=beat<.12?1+Math.sin(beat/.12*Math.PI)*.12:beat<.24?1+Math.sin((beat-.12)/.12*Math.PI)*.05:1;G.heart.children.forEach(m=>m.scale.setScalar(pulse));
   const br=Math.sin(t*st.br/60*Math.PI*2)*.5+.5;G.lungs.children.forEach((m,i)=>{if(i<2)m.scale.set(1+br*.06,1+br*.09,1+br*.07)});
   coch.rotation.y=t*.4;
   const {x}=ecg.userData;const y=beat<.04?0:beat<.07?-40:beat<.1?60:beat<.13?-20:beat<.3?Math.sin((beat-.13)/.17*Math.PI)*10:0;trace.push(y);if(trace.length>128)trace.shift();x.fillStyle='#04060a';x.fillRect(0,0,256,160);x.strokeStyle='rgba(70,224,122,.18)';x.lineWidth=1;for(let i=0;i<256;i+=16){x.beginPath();x.moveTo(i,0);x.lineTo(i,160);x.stroke()}x.strokeStyle='#46e07a';x.lineWidth=3;x.beginPath();trace.forEach((v,i)=>{const X=i*2,Y=95-v;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();x.fillStyle='#D8FFE6';x.font='700 26px monospace';x.fillText('♥ '+Math.round(st.bpm),150,32);ecg.needsUpdate=true}}},

/* ===== earth cut-away: layers, volcano, seismograph ===== */
earth(K,eq){const T=K.THREE,root=new T.Group();
 const globe=new T.Group();const layers=[[.15,0x3f8f5a,'crust'],[.14,0xd9733a,'mantle'],[.085,0xf0a030,'outer'],[.045,0xfff0a0,'inner']];
 layers.forEach(([r,c],i)=>{const g=new T.SphereGeometry(r,32,22,0,Math.PI*1.5);const m=new T.Mesh(g,K.M(c,{ds:1,e:i>1?c:0,ei:i>1?.35:0}));m.castShadow=true;globe.add(m);
  const cap=new T.Mesh(new T.CircleGeometry(r,32,Math.PI/2,Math.PI),K.M(c,{ds:1,e:i>1?c:0,ei:i>1?.35:0}));globe.add(cap);const cap2=cap.clone();cap2.rotation.y=-Math.PI/2;globe.add(cap2)});
 globe.add(new T.LineSegments(new T.EdgesGeometry(new T.SphereGeometry(.15,12,8,0,Math.PI*1.5),30),K.inkSoft));
 const globeP=K.place(root,globe,-.14,.05,0,.16);
 const vol=new T.Group();vol.add(K.cyl(.02,.09,.09,K.M(0x7a5a40),{seg:24}));const lava=K.cyl(.018,.018,.004,K.M(0xff6a2a,{e:0xff4a1a,ei:1}),{edge:false});lava.position.y=.09;vol.add(lava);const volP=K.place(root,vol,.24,.3);
 const fx=new T.Group();root.add(fx);const smoke=[];for(let i=0;i<8;i++){const sm=K.sph(.016,K.M(0x8a8c96,{op:.45}),{hull:false,edge:false,center:true});sm.userData.k=i/8;fx.add(sm);smoke.push(sm)}
 const seis=new T.Group();seis.add(K.box(.18,.03,.1,K.paper2));const drum=K.cyl(.025,.025,.14,K.paper,{seg:24});drum.rotation.z=Math.PI/2;drum.position.y=.055;seis.add(drum);const paper=K.canvasTex(512,128,()=>{});const pm=new T.Mesh(new T.PlaneGeometry(.14,.04),new T.MeshStandardMaterial({map:paper,emissive:0xffffff,emissiveMap:paper,emissiveIntensity:.4}));pm.position.set(0,.082,0);pm.rotation.x=-Math.PI/2;seis.add(pm);const arm=K.box(.006,.006,.08,K.dark,{edge:false});arm.position.set(0,.09,-.04);seis.add(arm);
 const seisP=K.place(root,seis,.02,.42);
 const rings=[];for(let i=0;i<3;i++){const r=K.tor(.05,.002,K.red,{seg:40});r.rotation.x=Math.PI/2;fx.add(r);rings.push(r)}
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.1,-.4);
 const st={A:.3};const sig=[];
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:5;st.A=.15+K.lg(val,.5)*.85;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){globe.rotation.y=Math.PI*.75+Math.sin(t*.25)*.3;const on=globeP.visible!==false;const quake=on&&Math.sin(t*.7)>.6;
   smoke.forEach(sm=>{sm.visible=volP.visible!==false;sm.userData.k=(sm.userData.k+dt*.2)%1;const k=sm.userData.k;sm.position.set(.24+Math.sin(k*6+t)*.02,.1+k*.2,.3);sm.scale.setScalar(.6+k*1.6)});lava.scale.setScalar(1+Math.sin(t*4)*.15);
   rings.forEach((r,i)=>{r.visible=quake;const k=((t*.8+i/3)%1);r.scale.setScalar(.5+k*2.2);r.position.set(-.14,.012,.05);r.material.opacity=1-k});
   const y=quake?Math.sin(t*60)*40*st.A*(0.5+Math.random()*.5):Math.sin(t*20)*2;sig.push(y);if(sig.length>256)sig.shift();const {x}=paper.userData;x.fillStyle='#fbf8f0';x.fillRect(0,0,512,128);x.strokeStyle='#C8463C';x.lineWidth=3;x.beginPath();sig.forEach((v,i)=>{const X=i*2,Y=64-v;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();paper.needsUpdate=true;drum.rotation.x=t;arm.position.x=K.clamp(y/400,-.03,.03)}}},

/* ===== weather: cloud, rain, sun, wind ===== */
weather(K,eq){const T=K.THREE,root=new T.Group();
 const ground=new T.Group();ground.add(K.box(.8,.01,.46,K.greenL,{edge:false}));K.place(root,ground,0,.08);
 const cloud=new T.Group();[[0,0,0,.06],[.06,-.01,0,.045],[-.06,-.01,0,.05],[.025,.03,0,.045],[-.03,.025,.01,.042]].forEach(([x,y,z,r])=>{const c=K.sph(r,K.M(0xf4f6fb),{center:true,hull:1.05,seg:18});c.position.set(x,y,z);cloud.add(c)});const cloudP=K.place(root,cloud,-.1,.05,0,.36);
 const fx=new T.Group();root.add(fx);const drops=[];for(let i=0;i<30;i++){const d=K.cyl(.0025,.0025,.022,K.M(0x4f7fe0,{op:.85}),{edge:false,seg:6});d.userData.o=Math.random();d.userData.x=(Math.random()-.5)*.17;d.userData.z=(Math.random()-.5)*.08;fx.add(d);drops.push(d)}
 const sun=new T.Group();const ball=K.sph(.045,K.M(0xfff3c4,{e:0xffd36b,ei:.8}),{center:true});sun.add(ball);for(let i=0;i<12;i++){const a=i/12*Math.PI*2;sun.add(K.line([[Math.cos(a)*.058,Math.sin(a)*.058,0],[Math.cos(a)*.08,Math.sin(a)*.08,0]]))}const sunP=K.place(root,sun,.28,-.16,0,.4);
 const mill=new T.Group();mill.add(K.cyl(.004,.006,.2,K.paper,{edge:false}));const rotor=new T.Group();for(let i=0;i<3;i++){const b=K.box(.008,.07,.003,K.paper);b.position.y=.035;const bg=new T.Group();bg.add(b);bg.rotation.z=i*Math.PI*2/3;rotor.add(bg)}rotor.position.set(0,.2,.008);mill.add(rotor);const millP=K.place(root,mill,.3,.25);
 const th=new T.Group();th.add(K.cyl(.01,.01,.18,K.glass,{soft:true}));const merc=K.cyl(.006,.006,.17,K.red,{edge:false});th.add(merc);th.add(K.sph(.016,K.red,{center:true}));const thP=K.place(root,th,-.33,.3);
 const puddle=new T.Mesh(new T.CircleGeometry(.07,24),K.water);puddle.rotation.x=-Math.PI/2;puddle.position.set(-.1,.092,.06);root.add(puddle);
 const card=K.card(.32,.1,()=>{});K.place(root,card,.05,-.4);
 const st={rain:.5,wind:.5,temp:.5};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:10;st.rain=.3+K.lg(val,1)*.7;st.wind=has(v,'vkmh')?K.lg(v.vkmh,1):.4;st.temp=K.clamp(has(v,'Tair')?(v.Tair+20)/70:has(v,'Tair2')?(v.Tair2+20)/70:.5,.1,1);card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=cloudP.visible!==false;cloudP.position.x=-.1+Math.sin(t*.3)*.04;drops.forEach(d=>{d.visible=on;const k=(t*(.6+st.rain)+d.userData.o)%1;d.position.set(cloudP.position.x+d.userData.x,.33-k*.24,d.userData.z);d.rotation.z=st.wind*.3});puddle.scale.setScalar(on?1+Math.sin(t*2)*.03:.001);
   rotor.rotation.z-=dt*(1+st.wind*10)*(millP.visible!==false?1:0);ball.rotation.z=t*.2;merc.scale.y+=((sunP.visible!==false?st.temp:.2)-merc.scale.y)*Math.min(1,dt)}}},

/* ===== pipes & pump: tank, pump impeller, flowing pipe, gauge ===== */
pump(K,eq){const T=K.THREE,root=new T.Group();
 const tank=new T.Group();tank.add(K.cyl(.08,.08,.2,K.glass,{soft:true,seg:28}));const wl=K.cyl(.076,.076,.13,K.water,{edge:false,seg:28});tank.add(wl);const tankP=K.place(root,tank,-.3,.05);
 const pumpG=new T.Group();pumpG.add(K.cyl(.05,.05,.04,K.blue,{seg:28}));const imp=new T.Group();for(let i=0;i<6;i++){const b=K.box(.04,.03,.004,K.metal,{edge:false});b.position.set(.02,.005,0);const g=new T.Group();g.add(b);g.rotation.y=i*Math.PI/3;imp.add(g)}imp.position.y=.042;pumpG.add(imp);const motor=K.cyl(.03,.03,.06,K.dark,{seg:20});motor.rotation.z=Math.PI/2;motor.position.set(.07,.02,0);pumpG.add(motor);
 const pumpP=K.place(root,pumpG,-.05,.05);
 const path=[[-.22,.04,.05],[-.1,.04,.05],[-.05,.04,.05]];const path2=[[-.05,.04,.05],[.05,.04,.05],[.15,.04,.05],[.2,.04,.05],[.25,.15,.05],[.3,.25,.05]];const pipe=new T.Group();pipe.add(K.tube(path,.012,K.M(0xb9bcc6,{op:.45}),{seg:20}));pipe.add(K.tube(path2,.012,K.M(0xb9bcc6,{op:.45}),{seg:40}));
 const curve=new T.CatmullRomCurve3([...path,...path2.slice(1)].map(p=>new T.Vector3(...p)));const dots=[];for(let i=0;i<22;i++){const d=K.sph(.007,K.M(0x4f7fe0),{hull:false,edge:false,center:true});d.userData.k=i/22;pipe.add(d);dots.push(d)}
 const valve=K.tor(.02,.003,K.red,{seg:24});valve.position.set(.1,.075,.05);pipe.add(valve);const stem=K.cyl(.003,.003,.03,K.dark,{edge:false});stem.position.set(.1,.045,.05);pipe.add(stem);
 const pipeP=K.place(root,pipe,0,0);
 const gauge=new T.Group();gauge.add(K.cyl(.04,.04,.012,K.metal,{seg:28}));const face=K.canvasTex(200,200,()=>{});const fm=new T.Mesh(new T.CircleGeometry(.035,28),new T.MeshStandardMaterial({map:face,emissive:0xffffff,emissiveMap:face,emissiveIntensity:.5}));fm.rotation.x=-Math.PI/2;fm.position.y=.013;gauge.add(fm);const gaugeP=K.place(root,gauge,.15,.3);
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.05,-.36);
 const st={q:.5,p:.5};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.q=.2+K.lg(val,.5)*.9;st.p=K.clamp(.2+K.lg(val,1)*.8,0,1);card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=pumpP.visible!==false&&tankP.visible!==false;const sp=on?st.q:0;imp.rotation.y+=dt*sp*25;dots.forEach(d=>{d.visible=pipeP.visible!==false;d.userData.k=(d.userData.k+dt*sp*.25)%1;d.position.copy(curve.getPointAt(d.userData.k))});valve.rotation.z=t*.3*sp;
   wl.scale.y=.6+.35*(on?(Math.sin(t*.4)*.5+.5):1);const ang=-2.3+(on?st.p:0)*4.6+Math.sin(t*8)*.03*sp;const {x}=face.userData;x.fillStyle='#fbf8f0';x.fillRect(0,0,200,200);x.strokeStyle='#26282f';x.lineWidth=5;x.beginPath();x.arc(100,100,92,0,7);x.stroke();for(let i=0;i<=10;i++){const a=-2.3+i*.46-Math.PI/2;x.beginPath();x.moveTo(100+Math.cos(a)*78,100+Math.sin(a)*78);x.lineTo(100+Math.cos(a)*90,100+Math.sin(a)*90);x.stroke()}x.strokeStyle='#C8463C';x.lineWidth=6;x.beginPath();x.moveTo(100,100);x.lineTo(100+Math.cos(ang-Math.PI/2)*72,100+Math.sin(ang-Math.PI/2)*72);x.stroke();face.needsUpdate=true}}},

/* ===== study desk: books, notebook, clock, calendar ===== */
desk(K,eq){const T=K.THREE,root=new T.Group();
 const top=new T.Group();top.add(K.box(.62,.014,.3,K.M(0xd9b382)));K.place(root,top,0,.1);
 const books=new T.Group();[[0x1E44C8,.03],[0x0F6B44,.025],[0x4A2A8F,.035],[0xC8463C,.022]].reduce((y,[c,h],i)=>{const b=K.box(.14,h,.1,K.M(c));b.position.set((i%2)*.008,y,0);b.rotation.y=(i-1.5)*.06;books.add(b);return y+h},0);const booksP=K.place(root,books,-.2,.1,0,.014);
 const nb=new T.Group();const page=K.canvasTex(256,180,()=>{});const pg=new T.Mesh(new T.PlaneGeometry(.16,.11),new T.MeshStandardMaterial({map:page,roughness:.9}));pg.rotation.x=-Math.PI/2;pg.position.y=.004;nb.add(K.box(.17,.004,.12,K.paper));nb.add(pg);const pen=K.cyl(.004,.004,.12,K.gold,{edge:false,seg:8});pen.rotation.z=Math.PI/2;pen.position.set(0,.01,.07);nb.add(pen);const nbP=K.place(root,nb,.02,.14,0,.014);
 const clk=new T.Group();clk.add(K.cyl(.05,.05,.014,K.paper,{seg:32}));clk.rotation.x=Math.PI/2;const hh=K.box(.004,.025,.002,K.dark,{edge:false});hh.position.z=-.008;const mh=K.box(.003,.038,.002,K.red,{edge:false});mh.position.z=-.009;const hg=new T.Group();hg.add(hh);const mg=new T.Group();mg.add(mh);hh.position.y=.012;mh.position.y=.019;clk.add(hg,mg);const clkW=new T.Group();clkW.add(clk);clk.position.y=.06;clkW.add(K.box(.03,.01,.03,K.dark));const clkP=K.place(root,clkW,.22,.02,0,.014);
 const cal=K.card(.1,.12,()=>{},{bg:'#fbf8f0'});const calP=K.place(root,cal,.24,.22,-.4,.014);
 const card=K.card(.32,.1,()=>{});K.place(root,card,-.05,-.36);
 const st={sp:1,n:0};let lines=0;
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.sp=.5+K.lg(val,1)*2;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H));cal.userData.redraw((c,W,H)=>{c.fillStyle='#C8463C';c.fillRect(6,6,W-12,H*.24);K.txt(c,K.L('يوم','DAY'),W/2,H*.15,56,'#fff');K.txt(c,K.num(Math.round(val%1000)),W/2,H*.62,150,'#26282f',true,'center',true)})},
  tick(t,dt){mg.rotation.z=-t*st.sp*.6;hg.rotation.z=-t*st.sp*.05;const writing=nbP.visible!==false&&booksP.visible!==false;if(writing)lines+=dt*st.sp*.6;const {x}=page.userData;x.fillStyle='#fbf8f0';x.fillRect(0,0,256,180);x.strokeStyle='#8fa7f0';x.lineWidth=1;for(let i=1;i<9;i++){x.beginPath();x.moveTo(10,i*20);x.lineTo(246,i*20);x.stroke()}x.strokeStyle='#14286f';x.lineWidth=3;const L=lines%8;for(let i=0;i<Math.floor(L);i++){x.beginPath();x.moveTo(16,i*20+16);for(let k=0;k<20;k++)x.lineTo(16+k*11,i*20+16+Math.sin(k*1.7+i)*3);x.stroke()}const frac=L%1;x.beginPath();x.moveTo(16,Math.floor(L)*20+16);for(let k=0;k<20*frac;k++)x.lineTo(16+k*11,Math.floor(L)*20+16+Math.sin(k*1.7)*3);x.stroke();page.needsUpdate=true;pen.position.x=-.07+frac*.14}}},
/* ===== solar system with real NASA planet maps ===== */
/* ===== ركن الحيوان الأليف: قطة على وسادة، صحن أكل، صحن ماء، ميزان ===== */
pet(K,eq){const T=K.THREE,root=new T.Group();
 const tex=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t};
 const furT=tex(512,256,(g,w,h)=>{g.fillStyle='#d98a3d';g.fillRect(0,0,w,h);for(let i=0;i<14;i++){g.fillStyle='rgba(165,92,38,.32)';const x=i*w/14+Math.random()*8;g.beginPath();g.moveTo(x,0);g.bezierCurveTo(x+14,h*.3,x-10,h*.7,x+6,h);g.lineTo(x+16,h);g.bezierCurveTo(x,h*.7,x+24,h*.3,x+12,0);g.fill()}for(let i=0;i<16000;i++){const v=Math.random();g.fillStyle=v>.5?'rgba(255,220,170,.25)':'rgba(120,60,20,.2)';g.fillRect(Math.random()*w,Math.random()*h,1,3)}});
 const fur=new T.MeshPhysicalMaterial({map:furT,roughness:.9,sheen:1,sheenRoughness:.6,sheenColor:new T.Color(0xffd9a8)});const white=new T.MeshPhysicalMaterial({color:0xfaf3e8,roughness:.9,sheen:1,sheenColor:new T.Color(0xffffff)});
 const cush=new T.Group();const cM=new T.MeshPhysicalMaterial({map:tex(256,256,(g,w,h)=>{g.fillStyle='#2a4f8f';g.fillRect(0,0,w,h);g.strokeStyle='rgba(255,255,255,.12)';g.lineWidth=3;for(let i=0;i<w;i+=16){g.beginPath();g.moveTo(i,0);g.lineTo(i,h);g.stroke()}}),roughness:.95,sheen:.8,sheenColor:new T.Color(0x9fb8ff)});
 const cs=new T.Mesh(new T.CylinderGeometry(.13,.135,.035,48),cM);cs.position.y=.0175;cush.add(cs);const rim=new T.Mesh(new T.TorusGeometry(.13,.022,16,60),cM);rim.rotation.x=Math.PI/2;rim.position.y=.035;cush.add(rim);K.place(root,cush,-.05,0);
 const cat=new T.Group();const body=new T.Mesh(new T.CapsuleGeometry(.045,.09,10,24),fur);body.rotation.z=Math.PI/2;body.position.y=.085;cat.add(body);
 const belly=new T.Mesh(new T.SphereGeometry(.043,24,16),white);belly.scale.set(1.5,.7,.9);belly.position.set(.01,.065,0);cat.add(belly);
 const head=new T.Group();head.position.set(.085,.13,0);const hd=new T.Mesh(new T.SphereGeometry(.042,32,24),fur);hd.scale.set(.95,.88,1);head.add(hd);const muz=new T.Mesh(new T.SphereGeometry(.02,20,14),white);muz.scale.set(.8,.7,1.3);muz.position.set(.032,-.012,0);head.add(muz);
 const nose=new T.Mesh(new T.SphereGeometry(.005,10,8),K.M(0xd9707a,{r:.4}));nose.position.set(.047,-.004,0);head.add(nose);
 const eyeM=new T.MeshPhysicalMaterial({color:0x7fbf3f,roughness:.1,clearcoat:1}),pupM=K.M(0x111111,{r:.2});const eyes=[];
 [-1,1].forEach(k=>{const e=new T.Mesh(new T.SphereGeometry(.009,16,12),eyeM);e.position.set(.034,.01,k*.018);head.add(e);const p=new T.Mesh(new T.SphereGeometry(.0045,10,8),pupM);p.scale.set(.5,1.6,.5);p.position.set(.042,.01,k*.019);head.add(p);eyes.push(e,p);
  const ear=new T.Mesh(new T.ConeGeometry(.016,.032,4),fur);ear.position.set(-.004,.042,k*.022);ear.rotation.set(k*.25,0,-.1);head.add(ear);const ein=new T.Mesh(new T.ConeGeometry(.009,.02,4),K.M(0xe8a0a8,{r:.8}));ein.position.set(.003,.04,k*.022);ein.rotation.set(k*.25,0,-.1);head.add(ein)});
 cat.add(head);
 [[.05,.03],[.05,-.03],[-.05,.03],[-.05,-.03]].forEach(([x,z])=>{const l=new T.Mesh(new T.CapsuleGeometry(.012,.03,6,12),fur);l.position.set(x,.045,z);cat.add(l);const paw=new T.Mesh(new T.SphereGeometry(.014,14,10),white);paw.scale.set(1.3,.6,1);paw.position.set(x+.006,.04,z);cat.add(paw)});
 const tail=new T.Group();tail.position.set(-.1,.085,0);const tp=[];for(let i=0;i<=8;i++){const u=i/8;tp.push(new T.Vector3(-u*.06,u*.09,Math.sin(u*2)*.02))}const tailM=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(tp),30,.009,10),fur);tail.add(tailM);cat.add(tail);
 const catP=K.place(root,cat,-.05,0,-1.05,.035);
 const bowl=(c,inner)=>{const g=new T.Group();g.add(K.lathe([[0,0],[.035,0],[.05,.03],[.047,.031],[.033,.006],[0,.006]],K.steel,{edge:false,seg:40}));const r=new T.Mesh(new T.TorusGeometry(.049,.003,8,40),K.steel);r.rotation.x=Math.PI/2;r.position.y=.03;g.add(r);if(inner)g.add(inner);return g};
 const kib=new T.Group();const kM=new T.MeshStandardMaterial({color:0x8a4f24,roughness:.8});for(let i=0;i<34;i++){const k=new T.Mesh(new T.SphereGeometry(.0065,8,6),kM);const a=Math.random()*6.28,r=Math.random()*.036;k.position.set(Math.cos(a)*r,.012+Math.random()*.012-r*.15,Math.sin(a)*r);k.scale.y=.7;kib.add(k)}
 const fB=bowl(0,kib);const fP=K.place(root,fB,.17,.06);
 const wM=K.liq(0x5fa8ec,.72);const wat=new T.Mesh(new T.CylinderGeometry(.043,.036,.016,40),wM);wat.position.y=.02;const wB=bowl(0,wat);const wP=K.place(root,wB,.17,-.07);
 const scl=new T.Group();scl.add(K.box(.16,.012,.12,K.M(0xe9ecf1,{r:.35})));const disp=K.card(.06,.02,(c,W,H)=>{c.fillStyle='#0b1f5e';c.fillRect(0,0,W,H);c.fillStyle='#d8ffe6';c.font=`bold ${H*.6}px monospace`;c.textAlign='center';c.fillText('4.2 kg',W/2,H*.75)});disp.rotation.x=-Math.PI/2;disp.position.set(0,.0125,.04);scl.add(disp);const sP=K.place(root,scl,-.27,.1,.3);
 const card=K.card(.34,.09,()=>{});K.place(root,card,.05,.28);root.scale.setScalar(.95);
 const st={sp:1};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.sp=.7+K.lg(Math.abs(val)||1,.5)*.4;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){tail.rotation.y=Math.sin(t*1.6*st.sp)*.6;tail.rotation.z=Math.sin(t*.9)*.15;body.scale.set(1,1+Math.sin(t*2.2)*.025,1+Math.sin(t*2.2)*.025);head.rotation.y=Math.sin(t*.5)*.25;head.rotation.z=Math.sin(t*.7)*.06;
   const bl=(t%4.2)<.12;eyes.forEach(e=>e.scale.y=bl?.15:(e.geometry.parameters.radius<.005?1.6:1));wat.position.y=.02+Math.sin(t*2)*.0006}}},
/* ===== نبتة واقعية: أصيص فخّار، تربة، أوراق بعروق، زهرة، شمس، فقاعات أكسجين ===== */
garden(K,eq){const T=K.THREE,root=new T.Group();
 const tex=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t};
 const noise=(g,w,h,base,n,a)=>{g.fillStyle=base;g.fillRect(0,0,w,h);for(let i=0;i<n;i++){const v=Math.random();g.fillStyle=`rgba(${v>.5?255:0},${v>.5?235:0},${v>.5?210:0},${a*Math.random()})`;g.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2.5,1+Math.random()*2.5)}};
 const terra=new T.MeshPhysicalMaterial({map:tex(256,256,(g,w,h)=>noise(g,w,h,'#b65a35',5000,.18)),roughness:.85,clearcoat:.05});
 const soilM=new T.MeshStandardMaterial({map:tex(256,256,(g,w,h)=>{noise(g,w,h,'#3b2516',7000,.35);for(let i=0;i<40;i++){g.fillStyle='rgba(150,130,110,.6)';g.beginPath();g.arc(Math.random()*w,Math.random()*h,1.5+Math.random()*3,0,6.28);g.fill()}}),roughness:1});
 const veinT=tex(256,512,(g,w,h)=>{const gr=g.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#2f7a2e');gr.addColorStop(.5,'#4fa33f');gr.addColorStop(1,'#2f7a2e');g.fillStyle=gr;g.fillRect(0,0,w,h);g.strokeStyle='rgba(200,235,160,.6)';g.lineWidth=4;g.beginPath();g.moveTo(w/2,h);g.lineTo(w/2,0);g.stroke();g.lineWidth=1.6;for(let y=40;y<h-20;y+=38){g.beginPath();g.moveTo(w/2,y+30);g.quadraticCurveTo(w*.3,y+12,w*.06,y-10);g.moveTo(w/2,y+30);g.quadraticCurveTo(w*.7,y+12,w*.94,y-10);g.stroke()}});
 const leafM=new T.MeshPhysicalMaterial({map:veinT,color:0x9ccc84,roughness:.5,sheen:.25,sheenColor:new T.Color(0xb8e090),clearcoat:.15,clearcoatRoughness:.5,side:T.DoubleSide});leafM.userData.env=.5;
 const leafG=(L)=>{const sh=new T.Shape();sh.moveTo(0,0);sh.bezierCurveTo(L*.42,L*.18,L*.36,L*.8,0,L);sh.bezierCurveTo(-L*.36,L*.8,-L*.42,L*.18,0,0);const g=new T.ShapeGeometry(sh,18);const pa=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i);pa.setZ(i,-(y/L)*(y/L)*L*.35+Math.abs(x)*.25);uv.setXY(i,.5+x/(L*.8),y/L)}g.computeVertexNormals();return g};
 const pot=new T.Group();const potL=K.lathe([[0,0],[.07,0],[.072,.005],[.09,.12],[.1,.122],[.102,.15],[.096,.152],[.088,.128],[0,.128]],terra,{edge:false,seg:48});pot.add(potL);
 const sau=K.lathe([[0,0],[.1,0],[.108,.012],[.104,.014],[.094,.004],[0,.004]],terra,{edge:false,seg:48});pot.add(sau);K.place(root,pot,0,0);
 const soil=new T.Group();const sd=new T.Mesh(new T.CircleGeometry(.093,40),soilM);sd.rotation.x=-Math.PI/2;sd.position.y=.138;soil.add(sd);for(let i=0;i<7;i++){const pb=K.sph(.006+Math.random()*.005,K.M(0x9a9188,{r:.9}),{hull:false,edge:false,center:true});const a=Math.random()*6.28,r=.03+Math.random()*.05;pb.position.set(Math.cos(a)*r,.14,Math.sin(a)*r);pb.scale.y=.6;soil.add(pb)}K.place(root,soil,0,0);
 const stemM=new T.MeshPhysicalMaterial({color:0x4d8a33,roughness:.55,sheen:.4});
 const plant=new T.Group();const sp=[[0,.135,0],[.005,.2,.004],[-.004,.27,-.003],[.006,.34,.002],[0,.4,0]];plant.add(K.tube(sp,.0055,stemM,{seg:40}));
 const leaves=[];for(let i=0;i<9;i++){const u=.15+i*.09,y=.15+u*.24,L=.07+.05*Math.sin(Math.PI*(1-u*.8));const g=new T.Group();const m=new T.Mesh(leafG(L),leafM);m.rotation.x=-Math.PI/2+.55;g.add(m);g.position.y=y;g.rotation.y=i*2.4;g.userData.ph=i;plant.add(g);leaves.push(g)}
 K.place(root,plant,0,0);
 const flw=new T.Group();flw.position.set(0,.405,0);const petM=new T.MeshPhysicalMaterial({color:0xf3f0ff,roughness:.5,sheen:1,sheenColor:new T.Color(0xffe6f4),side:T.DoubleSide});
 for(let i=0;i<10;i++){const m=new T.Mesh(leafG(.045),petM);m.rotation.set(-Math.PI/2+.35,0,0);const g=new T.Group();g.add(m);g.rotation.y=i*Math.PI/5;flw.add(g)}
 const ctr=K.sph(.014,new T.MeshStandardMaterial({color:0xf2b705,roughness:.9}),{hull:false,edge:false,center:true});ctr.scale.y=.6;flw.add(ctr);const fP=K.place(root,flw,0,0);
 const sun=new T.Group();const sunM=new T.MeshStandardMaterial({color:0xffd34d,emissive:0xffb300,emissiveIntensity:1.6});const sb=K.sph(.035,sunM,{hull:false,edge:false,center:true});sun.add(sb);const glowS=new T.Mesh(new T.SphereGeometry(.055,24,16),new T.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.25,depthWrite:false}));sun.add(glowS);
 const rays=[];for(let i=0;i<5;i++){const r=new T.Mesh(new T.CylinderGeometry(.0018,.0018,.2,6),new T.MeshBasicMaterial({color:0xffe9a8,transparent:true,opacity:.5,depthWrite:false}));const tgt=new T.Vector3(.16+(i-2)*.025,-.12-i*.02,-.02);r.position.copy(tgt.clone().multiplyScalar(.5));r.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),tgt.clone().normalize());sun.add(r);rays.push(r)}
 sun.position.set(-.21,.36,-.04);const sP=K.place(root,sun,0,0);
 const bub=[];const bM=new T.MeshPhysicalMaterial({color:0xdff3ff,transparent:true,opacity:.45,roughness:.05,clearcoat:1,depthWrite:false});for(let i=0;i<10;i++){const b=K.sph(.005+Math.random()*.004,bM,{hull:false,edge:false,center:true});b.userData={o:Math.random(),l:leaves[i%9]};root.add(b);bub.push(b)}
 const card=K.card(.34,.09,()=>{});K.place(root,card,.03,.24);root.scale.setScalar(.82);
 const st={g:1};const tmp=new T.Vector3();
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.g=K.clamp(.75+K.lg(Math.abs(val)||1,.5)*.3,.7,1.25);plant.scale.setScalar(st.g);fP.scale.setScalar(st.g);card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){leaves.forEach(l=>{l.rotation.z=Math.sin(t*1.3+l.userData.ph)*.05});flw.rotation.y=t*.15;sunM.emissiveIntensity=1.5+Math.sin(t*2)*.2;glowS.scale.setScalar(1+Math.sin(t*2)*.06);rays.forEach((r,i)=>r.material.opacity=.3+.25*Math.sin(t*3+i));
   const on=plant.parent&&plant.parent.visible!==false;bub.forEach(b=>{b.visible=on;if(!on)return;const q=(t*.25+b.userData.o)%1;b.userData.l.children[0].getWorldPosition(tmp);root.worldToLocal(tmp);b.position.set(tmp.x+Math.sin(t+b.userData.o*9)*.01,tmp.y+.02+q*.16,tmp.z);b.material.opacity=.45*(1-q)})}}},
/* ===== مجهر ضوئي واقعي + ساحة الرؤية الحيّة ===== */
microscope(K,eq){const T=K.THREE,root=new T.Group();const body=K.M(0xf1f2f4,{r:.35}),blk=K.M(0x1d2027,{r:.45});
 const base=new T.Group();base.add(K.box(.2,.03,.26,body));const lampG=K.cyl(.025,.025,.006,K.M(0xfff4c8,{e:0xffe9a0,ei:1.4}),{edge:false});lampG.position.set(0,.03,.03);base.add(lampG);
 const sw=K.cyl(.012,.012,.01,blk,{edge:false});sw.rotation.z=Math.PI/2;sw.position.set(.1,.015,.07);base.add(sw);const cond=K.cyl(.02,.016,.04,blk,{edge:false});cond.position.set(0,.105,.03);base.add(cond);K.place(root,base,0,0,-.65);
 const arm=new T.Group();const pil=K.box(.05,.24,.05,body);pil.position.set(0,.03,-.09);arm.add(pil);arm.add(K.tube([[0,.24,-.09],[0,.3,-.07],[0,.33,-.03],[0,.335,0]],.022,body,{seg:24}));
 const kC=K.cyl(.032,.032,.012,blk,{edge:false,seg:28});kC.rotation.z=Math.PI/2;kC.position.set(.034,.12,-.09);arm.add(kC);const kC2=kC.clone();kC2.position.x=-.034;arm.add(kC2);
 const kF=K.cyl(.018,.018,.012,K.M(0x8a8f99,{m:.6,r:.3}),{edge:false});kF.rotation.z=Math.PI/2;kF.position.set(.046,.12,-.09);arm.add(kF);K.place(root,arm,0,0,-.65);
 const stage=new T.Group();stage.add(K.box(.15,.008,.13,blk));stage.position.y=.15;const hole=K.cyl(.012,.012,.0085,K.M(0xfff1b0,{e:0xffe08a,ei:.8}),{edge:false});hole.position.y=0;stage.add(hole);
 const slide=K.box(.075,.002,.025,K.glass,{edge:false});slide.position.y=.009;stage.add(slide);const spec=K.cyl(.009,.009,.0006,K.M(0xc86fb0,{op:.75}),{edge:false});spec.position.y=.011;stage.add(spec);
 [-.03,.03].forEach(x=>{const c=K.box(.006,.002,.05,K.steel,{edge:false});c.position.set(x,.011,.03);stage.add(c)});stage.position.z=.03;const stP=K.place(root,stage,0,0,-.65,0);
 const head=new T.Group();const turret=K.cyl(.04,.035,.02,K.steel,{edge:false,seg:32});turret.position.y=.3;head.add(turret);
 const objs=new T.Group();objs.position.y=.3;[[0xd93b3b,.05],[0xf0c419,.06],[0x3b7dd9,.07]].forEach(([c,L],i)=>{const g=new T.Group();const o=K.cyl(.009,.011,L,K.steel,{edge:false,seg:18});o.position.y=-L;g.add(o);const r=K.cyl(.0115,.0115,.004,K.M(c,{r:.3}),{edge:false});r.position.y=-L*.35;g.add(r);g.rotation.z=.32;g.rotation.y=i*Math.PI*2/3;objs.add(g)});head.add(objs);
 const bt=K.cyl(.02,.02,.1,body,{edge:false,seg:24});bt.position.set(0,.36,.0);bt.rotation.x=-.5;head.add(bt);
 const ep=K.cyl(.014,.017,.05,blk,{edge:false,seg:22});ep.position.set(0,.43,-.035);ep.rotation.x=-.5;head.add(ep);head.position.z=.03;K.place(root,head,0,0,-.65,0);
 const vc=document.createElement('canvas');vc.width=vc.height=256;const vx=vc.getContext('2d');const vt=new T.CanvasTexture(vc);vt.colorSpace=T.SRGBColorSpace;
 const mode=/بكتير|bacteri|خمير|yeast|نمو|growth|مضاعف|doubl/i.test(((eq.n||[]).join(' '))+' '+(eq.f||''))?'bac':'cell';
 const seeds=[...Array(28)].map((_,i)=>({x:Math.random(),y:Math.random(),r:.06+Math.random()*.05,a:Math.random()*6.28,ph:Math.random()}));
 const drawV=(t,z)=>{const W=256;vx.fillStyle='#f5ecd0';vx.fillRect(0,0,W,W);const g=vx.createRadialGradient(128,128,40,128,128,128);g.addColorStop(0,'rgba(255,250,225,0)');g.addColorStop(1,'rgba(150,120,60,.45)');
  seeds.forEach((c,i)=>{const s=z*W,x=((c.x*W+t*3*(i%3-1))%W+W)%W,y=c.y*W;
   if(mode==='bac'){const sp=((t*.25+c.ph)%1),split=sp>.7?(sp-.7)/.3*c.r*s*.6:0;vx.save();vx.translate(x,y);vx.rotate(c.a);vx.fillStyle='rgba(120,70,160,.78)';[-1,1].forEach(k=>{vx.beginPath();vx.ellipse(k*split,0,c.r*s*.55,c.r*s*.2,0,0,6.28);vx.fill()});vx.restore()}
   else{vx.fillStyle='rgba(214,120,170,.45)';vx.strokeStyle='rgba(140,60,110,.8)';vx.lineWidth=2;vx.beginPath();vx.arc(x,y,c.r*s,0,6.28);vx.fill();vx.stroke();vx.fillStyle='rgba(80,30,110,.85)';vx.beginPath();vx.arc(x+c.r*s*.2,y-c.r*s*.15,c.r*s*.32,0,6.28);vx.fill()}});
  vx.fillStyle=g;vx.fillRect(0,0,W,W);vt.needsUpdate=true};
 const view=new T.Group();const disc=new T.Mesh(new T.CircleGeometry(.085,48),new T.MeshBasicMaterial({map:vt}));view.add(disc);const ring=K.tor(.087,.006,blk,{seg:48});view.add(ring);
 view.position.set(-.22,.24,.04);view.rotation.y=.35;const vP=K.place(root,view,0,0);
 const card=K.card(.34,.09,()=>{});K.place(root,card,.02,.24);root.scale.setScalar(.76);
 const st={z:1,last:-1};drawV(0,1);
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.z=K.clamp(.6+K.lg(Math.abs(val)||1,.4)*.6,.5,1.8);card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H));drawV(st.last<0?0:st.last,st.z)},
  tick(t,dt){if(t-st.last>.12||t<st.last){st.last=t;drawV(t,st.z)}objs.rotation.y=Math.sin(t*.4)*.15;kF.rotation.x=t*.8;lampG.material.emissiveIntensity=1.2+Math.sin(t*3)*.15}}},

/* ===== حلزون DNA المزدوج ===== */
dna(K,eq){const T=K.THREE,root=new T.Group();const N=22,H=.42,R=.07,turns=2.2;
 const stand=new T.Group();stand.add(K.cyl(.09,.1,.02,K.M(0x1d2027,{r:.4}),{edge:false,seg:40}));const pole=K.cyl(.004,.004,H+.05,K.steel,{edge:false});pole.position.y=.02;stand.add(pole);K.place(root,stand,0,0);
 const pts=(ph)=>[...Array(61)].map((_,i)=>{const u=i/60,a=u*turns*Math.PI*2+ph;return[Math.cos(a)*R,u*H,Math.sin(a)*R]});
 const s1=new T.Group();s1.add(K.tube(pts(0),.007,K.M(0x2f6fd6,{r:.3}),{seg:160}));const s2=new T.Group();s2.add(K.tube(pts(Math.PI*.8),.007,K.M(0xe2a21b,{r:.3}),{seg:160}));
 const bp=new T.Group();const col={A:0xe0475b,T:0x2fb5d6,G:0x3fbf6b,C:0xf2c94c};const seq='ATGCGTACCGATTAGCCATGCA';
 for(let i=0;i<N;i++){const u=(i+.5)/N,a=u*turns*Math.PI*2,a2=a+Math.PI*.8,y=u*H;const p1=new T.Vector3(Math.cos(a)*R,y,Math.sin(a)*R),p2=new T.Vector3(Math.cos(a2)*R,y,Math.sin(a2)*R),m=p1.clone().lerp(p2,.5);
  const b1=seq[i],b2={A:'T',T:'A',G:'C',C:'G'}[b1];[[p1,m,b1],[m,p2,b2]].forEach(([q1,q2,b])=>{const L=q1.distanceTo(q2);const c=new T.Mesh(new T.CylinderGeometry(.0042,.0042,L,10),K.M(col[b],{r:.35}));c.position.copy(q1).lerp(q2,.5);c.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),q2.clone().sub(q1).normalize());bp.add(c)})}
 [s1,s2,bp].forEach(g=>K.place(root,g,0,0,0,.05));
 const leg=K.card(.24,.1,(c,W,H)=>{const L=[['A','#e0475b'],['T','#2fb5d6'],['G','#3fbf6b'],['C','#f2c94c']];L.forEach(([b,cl],i)=>{c.fillStyle=cl;c.fillRect(30+i*(W-60)/4,H*.3,70,H*.4);c.fillStyle='#111';c.font='bold 120px sans-serif';c.fillText(b,110+i*(W-60)/4,H*.68)})});K.place(root,leg,-.25,.1);
 const card=K.card(.34,.09,()=>{});K.place(root,card,.05,.24);root.scale.setScalar(.8);
 const st={sp:1};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.sp=.5+K.lg(Math.abs(val)||1,.4)*.4;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){[s1,s2,bp].forEach(g=>g.rotation.y+=dt*.5*st.sp)}}},
/* ===== معايرة واقعية: حامل، سحاحة مدرّجة، دورق مخروطي، خلّاط مغناطيسي ===== */
titration(K,eq){const T=K.THREE,root=new T.Group();
 const stand=new T.Group();stand.add(K.box(.34,.014,.2,K.bench));const rod=K.cyl(.007,.007,.52,K.steel,{edge:false,seg:16});rod.position.set(-.12,.014,-.05);stand.add(rod);
 const clamp=K.box(.13,.012,.018,K.steel,{edge:false});clamp.position.set(-.06,.42,-.05);stand.add(clamp);const jaw=K.tor(.016,.004,K.dark,{seg:20});jaw.rotation.x=Math.PI/2;jaw.position.set(0,.425,-.05);stand.add(jaw);K.place(root,stand,0,0);
 const stir=new T.Group();stir.add(K.box(.15,.04,.15,K.M(0xeef0f3,{r:.4})));const knob=K.cyl(.012,.012,.012,K.dark,{edge:false});knob.rotation.x=Math.PI/2;knob.position.set(.04,.02,.075);stir.add(knob);const led=K.sph(.005,K.M(0x2ecc71,{e:0x2ecc71,ei:1}),{hull:false,edge:false,center:true});led.position.set(-.04,.02,.076);stir.add(led);const tile=K.box(.12,.003,.12,K.M(0xffffff,{r:.25}));tile.position.y=.04;stir.add(tile);const stirP=K.place(root,stir,0,-.05,0,.014);
 const fl=new T.Group();fl.add(K.lathe([[0,0],[.06,0],[.063,.008],[.024,.1],[.02,.14],[.025,.148]],K.glass,{soft:true}));const fM=K.liq(new T.Color(0xf3f6fa),.5);const fliq=K.lathe([[0,0],[.058,0],[.06,.006],[.042,.05],[0,.05]],fM,{edge:false});fl.add(fliq);
 const bar=K.cyl(.004,.004,.04,K.M(0xffffff,{r:.3}),{edge:false,seg:10});bar.rotation.z=Math.PI/2;bar.position.set(.02,.006,0);const barG=new T.Group();barG.add(bar);fl.add(barG);fl.scale.setScalar(.85);const flP=K.place(root,fl,0,-.05,0,.057);
 const bu=new T.Group();const BL=.24,BY=.26;const tubeG=K.cyl(.011,.011,BL,K.glass,{open:true,soft:true,seg:20});tubeG.position.y=BY;bu.add(tubeG);
 const gc=document.createElement('canvas');gc.width=64;gc.height=512;const gx=gc.getContext('2d');gx.strokeStyle='#1b2a5c';gx.fillStyle='#1b2a5c';gx.font='bold 20px sans-serif';for(let i=0;i<=50;i++){const y=12+i*(488/50);gx.lineWidth=i%5?1.5:3;gx.beginPath();gx.moveTo(2,y);gx.lineTo(i%5?14:24,y);gx.stroke();if(!(i%10))gx.fillText(String(i),28,y+7)}
 const gt=new T.CanvasTexture(gc);gt.colorSpace=T.SRGBColorSpace;const gm=new T.Mesh(new T.CylinderGeometry(.0113,.0113,BL*.92,16,1,true,-.7,1.4),new T.MeshBasicMaterial({map:gt,transparent:true,depthWrite:false}));gm.position.y=BY+BL/2;bu.add(gm);
 const bM=K.liq(new T.Color(0x5d9be6),.82);const bliq=K.cyl(.0095,.0095,1,bM,{edge:false,seg:16});bliq.position.y=BY;bu.add(bliq);
 const neck=K.cyl(.011,.004,.05,K.glass,{soft:true,seg:16});neck.position.y=BY-.05;bu.add(neck);const tip=K.cyl(.0035,.0015,.06,K.glass,{soft:true,seg:12});tip.position.y=BY-.11;bu.add(tip);
 const cock=new T.Group();cock.add(K.box(.05,.008,.012,K.M(0xd94b3d,{r:.4}),{edge:false}));cock.position.set(0,BY-.07,0);bu.add(cock);const cockC=K.cyl(.009,.009,.016,K.M(0xf4f4f4,{r:.3}),{edge:false,seg:14});cockC.rotation.x=Math.PI/2;cockC.position.set(0,BY-.07,0);bu.add(cockC);
 const buP=K.place(root,bu,0,-.05,0,.014);
 const drops=[];for(let i=0;i<3;i++){const d=K.sph(.0045,bM,{hull:false,edge:false,center:true});d.userData.o=i/3;d.visible=false;root.add(d);drops.push(d)}
 const card=K.card(.34,.1,()=>{});K.place(root,card,.02,.24);root.scale.setScalar(.8);
 const pink=new T.Color(0xf06fb4),clear=new T.Color(0xdbe8f7),blueL=new T.Color(0x9cc4f0);
 const ind=/ميثيل|methyl/i.test((eq.n&&eq.n.join(' '))||'')?[new T.Color(0xe8573c),new T.Color(0xf2c230)]:[clear,pink];
 const st={sp:1,k:0};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.sp=.6+K.lg(Math.abs(val)||1,.5)*.5;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=buP.visible!==false&&flP.visible!==false;if(on){if(st.t0==null)st.t0=t;st.k=((t-st.t0)*.09*st.sp)%1.25}else st.t0=null;const k=Math.min(st.k,1);
   const lvl=BL*(.92-.62*k);bliq.scale.y=lvl;bliq.position.y=BY;
   const end=K.clamp((k-.82)/.12,0,1);fM.color.copy(ind[0]).lerp(ind[1],end);fM.opacity=.5+.3*end;
   cock.rotation.y=on&&k<1?Math.PI/2:0;barG.rotation.y+=dt*(on?18:0);fliq.rotation.y=t*.4;
   const wp=new T.Vector3();tip.getWorldPosition(wp);root.worldToLocal(wp);
   drops.forEach(d=>{d.visible=on&&k<1;const q=((t*1.6*st.sp)+d.userData.o)%1;d.position.set(wp.x,wp.y-.035-q*.13,wp.z);d.scale.setScalar(q<.1?q*10:1)});
   led.material.emissiveIntensity=on?1:.1}}},
space(K,eq){const T=K.THREE,root=new T.Group();const txt=eq.f+' '+eq.n.join(' ')+' '+(eq.d||[]).join(' ');
 const TL=new T.TextureLoader();const tex=n=>{const t=TL.load('/books/eq/models/planets/'+n+'.jpg');t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t};
 const planet=(r,map,o={})=>{const m=new T.Mesh(new T.SphereGeometry(r,48,32),new T.MeshStandardMaterial({map,roughness:o.rough??.9,metalness:0,emissive:o.e||0x000000,emissiveIntensity:o.ei||0}));m.castShadow=true;m.receiveShadow=true;return m};
 const base=new T.Group();const pad=new T.Mesh(new T.CylinderGeometry(.42,.42,.006,64),new T.MeshStandardMaterial({color:0x05060b,roughness:.6,metalness:.2}));pad.position.y=.003;pad.receiveShadow=true;base.add(pad);
 const stars=new T.BufferGeometry();const sp=[];for(let i=0;i<500;i++){const a=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*.41;sp.push(Math.cos(a)*r,.008,Math.sin(a)*r)}stars.setAttribute('position',new T.Float32BufferAttribute(sp,3));base.add(new T.Points(stars,new T.PointsMaterial({color:0xffffff,size:.004,sizeAttenuation:true})));
 K.place(root,base,0,0);
 const sunG=new T.Group();const sunC=K.canvasTex(256,128,(c,W,H)=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#ffd36b');g.addColorStop(1,'#ff8a1a');c.fillStyle=g;c.fillRect(0,0,W,H);for(let i=0;i<900;i++){c.fillStyle=`rgba(${200+Math.random()*55|0},${90+Math.random()*90|0},20,${Math.random()*.35})`;c.beginPath();c.arc(Math.random()*W,Math.random()*H,Math.random()*3+1,0,7);c.fill()}});
 const sun=new T.Mesh(new T.SphereGeometry(.07,48,32),new T.MeshStandardMaterial({map:sunC,emissive:0xffffff,emissiveMap:sunC,emissiveIntensity:1.1}));sunG.add(sun);const glow=new T.Mesh(new T.SphereGeometry(.085,32,24),new T.MeshBasicMaterial({color:0xffb040,transparent:true,opacity:.18,depthWrite:false}));sunG.add(glow);sunG.position.y=.12;const sunP=K.place(root,sunG,0,0,0,0);
 const light=new T.PointLight(0xfff1d6,2.2,1.6,1.2);sunG.add(light);
 const sys=new T.Group();sys.position.y=.12;root.add(sys);
 const defs=[['venus',.15,.016,1.6],['earth',.22,.022,1],['mars',.29,.016,.53],['jupiter',.36,.04,.084],['saturn',.43,.034,.034]];
 const focus=/المريخ|Mars/i.test(txt)?'mars':/المشتري|Jupiter/i.test(txt)?'jupiter':/زحل|Saturn/i.test(txt)?'saturn':/الزهرة|Venus/i.test(txt)?'venus':'earth';
 const orb=[];defs.forEach(([n,r,s,spd],i)=>{const ring=new T.Mesh(new T.RingGeometry(r-.001,r+.001,128),new T.MeshBasicMaterial({color:0x8fa7f0,transparent:true,opacity:.35,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;sys.add(ring);
  const pv=new T.Group();pv.rotation.y=i*1.3;const pl=planet(n===focus?s*1.25:s,tex(n));pl.position.x=r;pv.add(pl);
  if(n==='saturn'){const rg=new T.RingGeometry(s*1.4,s*2.3,64);const pos=rg.attributes.position,uv=rg.attributes.uv;for(let k=0;k<pos.count;k++){const d=Math.hypot(pos.getX(k),pos.getY(k));uv.setXY(k,(d-s*1.4)/(s*.9),.5)}const rc=K.canvasTex(256,8,(c,W,H)=>{for(let x=0;x<W;x++){const a=.35+.5*Math.abs(Math.sin(x*.13))*(x%37<4?.2:1);c.fillStyle=`rgba(${215-x/6|0},${195-x/5|0},${150-x/4|0},${a})`;c.fillRect(x,0,1,H)}});const rm=new T.Mesh(rg,new T.MeshStandardMaterial({map:rc,transparent:true,side:T.DoubleSide,depthWrite:false}));rm.rotation.x=-Math.PI/2+.45;rm.position.x=r;pv.add(rm)}
  if(n==='earth'){const moonC=K.canvasTex(256,128,(c,W,H)=>{c.fillStyle='#a9a9ad';c.fillRect(0,0,W,H);for(let i=0;i<160;i++){const r2=Math.random()*7+1;c.fillStyle=`rgba(${70+Math.random()*60|0},${70+Math.random()*60|0},${75+Math.random()*60|0},${.25+Math.random()*.4})`;c.beginPath();c.arc(Math.random()*W,Math.random()*H,r2,0,7);c.fill()}});const mpv=new T.Group();mpv.position.x=r;const moon=planet(.0075,moonC);moon.position.x=.045;mpv.add(moon);pv.add(mpv);pl.userData.mpv=mpv;
   const atm=new T.Mesh(new T.SphereGeometry((n===focus?s*1.25:s)*1.06,40,28),new T.MeshBasicMaterial({color:0x6fb0ff,transparent:true,opacity:.14,depthWrite:false}));pl.add(atm)}
  sys.add(pv);orb.push({pv,pl,spd})});
 const sysP=K.place(root,(()=>{const g=new T.Group();return g})(),0,0);
 const lab=K.card(.34,.05,(c,W,H)=>K.txt(c,K.L('خرائط الكواكب: NASA — صور حقيقية','Planet maps: NASA — real imagery'),W/2,H/2,46,'#26282f'),{bg:'#f4f0e6'});lab.rotation.x=-1.1;lab.position.set(0,.0,.47);root.add(lab);
 const card=K.card(.32,.1,()=>{});K.place(root,card,0,-.47);
 const st={k:1};
 return{root,update(v){const T0=has(v,'T')?v.T:0;st.k=T0?K.clamp(2/Math.log10(10+T0),.15,1.5):1;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const on=sunP.visible!==false;orb.forEach(o=>{o.pv.rotation.y+=o.spd*.35*st.k*dt*(on?1:.2);o.pl.rotation.y+=dt*.8;if(o.pl.userData.mpv)o.pl.userData.mpv.rotation.y+=dt*2.4});sun.rotation.y+=dt*.1;glow.scale.setScalar(1+Math.sin(t*2)*.04);sys.visible=sysP.visible!==false}}},

};
