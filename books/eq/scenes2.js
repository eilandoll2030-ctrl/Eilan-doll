/* مجسمات إضافية لموسوعة معادلات إيلان: درون، سيارة، جوال، سفينة، مكيف، بيت، لابتوب وراوتر.
   نفس نظام scenes.js: كل مشهد (K, eq) يرجّع {root, update(v), tick(t,dt)}، وكل قطعة تنضاف بـ K.place بنفس ترتيب parts2.js. */
const has=(v,k)=>v&&typeof v[k]==='number'&&isFinite(v[k]);
const outv=(v,eq,d=1)=>has(v,eq.out)?v[eq.out]:d;

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
 const bench=new T.Group();bench.add(K.box(.8,.012,.3,K.M(0xd9b382)));K.place(root,bench,0,.12);
 /* beaker with sloshing liquid */
 const bk=new T.Group();bk.add(K.lathe([[0,0],[.085,0],[.09,.005],[.09,.21],[.1,.225]],K.glass,{soft:true}));for(let i=1;i<=4;i++)bk.add(K.line([[.091,i*.04,0],[.091,i*.04,.02]]));
 const liqM=new T.MeshStandardMaterial({color:colA.clone(),transparent:true,opacity:.72,roughness:.15});const liq=K.cyl(.085,.085,1,liqM,{edge:false});bk.add(liq);
 const surfG=new T.CircleGeometry(.085,32,0,Math.PI*2);surfG.rotateX(-Math.PI/2);const surf=new T.Mesh(surfG,new T.MeshStandardMaterial({color:colA.clone(),transparent:true,opacity:.85,roughness:.05,metalness:.1}));bk.add(surf);const base0=surfG.attributes.position.array.slice();
 const bubs=[];for(let i=0;i<(gas?34:12);i++){const b=K.sph(.004+Math.random()*.004,K.M(0xffffff,{op:.85}),{hull:false,edge:false,center:true});b.userData.o=Math.random();b.userData.r=Math.random()*.07;b.userData.a=Math.random()*6.28;bk.add(b);bubs.push(b)}
 const ppts=[];if(ppt)for(let i=0;i<40;i++){const q=K.sph(.004,K.M(0xf4f4f8),{hull:false,edge:false,center:true});q.userData.o=Math.random();q.userData.x=(Math.random()-.5)*.13;q.userData.z=(Math.random()-.5)*.13;bk.add(q);ppts.push(q)}
 const stir=K.cyl(.004,.004,.28,K.glass,{soft:true});stir.rotation.z=.25;bk.add(stir);
 const bkP=K.place(root,bk,-.08,.12,0,.012);
 /* flask that tilts and pours */
 const fl=new T.Group();const fg=K.lathe([[0,0],[.06,0],[.062,.008],[.022,.11],[.02,.16],[.026,.17]],K.glass,{soft:true});const fpiv=new T.Group();const fin=new T.Group();fin.position.y=-.06;fpiv.position.y=.06;fpiv.add(fin);fin.add(fg);const lipM=new T.Object3D();lipM.position.y=.17;fin.add(lipM);
 const fliqM=new T.MeshStandardMaterial({color:colB.clone(),transparent:true,opacity:.75,roughness:.2});const fliq=K.lathe([[0,0],[.057,0],[.059,.006],[.035,.05],[0,.05]],fliqM,{edge:false});fin.add(fliq);fl.add(fpiv);
 const flP=K.place(root,fl,.13,.12,0,.012);
 const stream=K.cyl(.006,.004,1,K.M(colB.getHex(),{op:.8}),{edge:false,seg:10});root.add(stream);stream.visible=false;
 /* burner (only lit for hot reactions) */
 const bur=new T.Group();bur.add(K.cyl(.03,.035,.012,K.dark,{edge:false}));const flames=[];for(let i=0;i<7;i++){const a=i/7*6.28;const f=K.cyl(0,.008,.035,K.M(flameCol,{e:flameCol,ei:1,op:.85}),{edge:false,seg:8});f.position.set(Math.cos(a)*.015,.012,Math.sin(a)*.015);bur.add(f);flames.push(f)}const burP=K.place(root,bur,-.08,.25,0,.012);
 /* particle box (molecules moving, like a zoom-in) */
 const pb=new T.Group();pb.add(K.box(.16,.16,.16,K.glass,{soft:true}));const mols=[];for(let i=0;i<16;i++){const red=i%2===0;const m=K.sph(.011,red?K.red:K.blue,{hull:false,edge:false,center:true});m.position.set((Math.random()-.5)*.13,.015+Math.random()*.13,(Math.random()-.5)*.13);m.userData.v=new T.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();pb.add(m);mols.push(m)}
 const pbP=K.place(root,pb,.3,-.14,0,.012);
 /* thermometer */
 const th=new T.Group();th.add(K.cyl(.01,.01,.2,K.glass,{soft:true}));const merc=K.cyl(.006,.006,.19,K.red,{edge:false});th.add(merc);const thb=K.sph(.016,K.red,{center:true});th.add(thb);for(let i=1;i<6;i++)th.add(K.line([[.011,i*.035,0],[.02,i*.035,0]]));const thP=K.place(root,th,-.3,.0,0,.012);
 const card=K.card(.34,.1,()=>{});K.place(root,card,-.08,-.4);
 const fx=new T.Group();root.add(fx);const puffs=[];if(gas||hot)for(let i=0;i<10;i++){const pf=K.sph(.014,K.M(0xffffff,{op:.35}),{hull:false,edge:false,center:true});pf.userData.k=Math.random();fx.add(pf);puffs.push(pf)}
 const st={rate:.5,phase:0,mix:0,temp:.35};
 return{root,update(v){const val=has(v,eq.out)?v[eq.out]:1;st.rate=.35+K.lg(val,.5)*.9;card.userData.redraw((c,W,H)=>K.fit(c,eq.f,W,H))},
  tick(t,dt){const okB=bkP.visible!==false,okF=flP.visible!==false,okH=burP.visible!==false;const run=okB&&okF;
   st.phase=(st.phase+dt*.12*st.rate)%1;const ph=st.phase;
   const pour=run&&ph>.1&&ph<.45;const tilt=run?(ph<.1?ph/.1:ph<.45?1:ph<.55?1-(ph-.45)/.1:0):0;const e=tilt*tilt*(3-2*tilt);fpiv.rotation.z=e*1.75;fpiv.position.x=-e*.13;fpiv.position.y=.06+e*.2;
   if(run&&ph<.05)st.mix=0;if(pour)st.mix=Math.min(1,st.mix+dt*.45*st.rate);else if(run&&ph>.55)st.mix=Math.min(1,st.mix+dt*.15);
   const level=.06+(run?st.mix*.07:0);liq.scale.y=level;surf.position.y=level+.0005;
   const col=colA.clone().lerp(colB,run?st.mix:0);liqM.color.copy(col);surf.material.color.copy(col);fliq.scale.y=run?1-st.mix*.8:1;
   /* stream from flask lip to beaker */
   stream.visible=pour&&tilt>.95;if(stream.visible){root.updateMatrixWorld(true);const lip=root.worldToLocal(lipM.getWorldPosition(new T.Vector3()));const dst=new T.Vector3(-.08+.02,.12+.012+level,0);const dir=lip.clone().sub(dst);const L=dir.length();stream.position.copy(dst);stream.scale.set(1+Math.sin(t*40)*.15,L,1);stream.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize())}
   /* wobbling surface */
   const P=surfG.attributes.position;const amp=okB?(.003+(pour?.006:0)+(gas?.002:0)):0;for(let i=0;i<P.count;i++){const x=base0[i*3],z=base0[i*3+2];P.setY(i,base0[i*3+1]+amp*Math.sin(x*70+t*9)+amp*.7*Math.sin(z*60-t*7)+(pour?amp*1.5*Math.sin(Math.hypot(x-.03,z)*120-t*20):0))}P.needsUpdate=true;surfG.computeVertexNormals();
   bk.rotation.z=okB?Math.sin(t*3)*.01*(pour?2:1):0;stir.position.set(Math.cos(t*2)*.03,.02,Math.sin(t*2)*.03);stir.rotation.y=t*2;
   bubs.forEach(b=>{b.visible=okB;const k=(t*(.25+st.rate*.35)*(gas?1.4:.6)+b.userData.o)%1;const a=b.userData.a+t*.8;b.position.set(Math.cos(a)*b.userData.r,.005+k*level,Math.sin(a)*b.userData.r);b.scale.setScalar(.6+k*.8)});
   ppts.forEach(q=>{q.visible=okB&&st.mix>.2;const k=(t*.12+q.userData.o)%1;q.position.set(q.userData.x+Math.sin(t+q.userData.o*9)*.006,Math.max(.004,level*(1-k)),q.userData.z)});
   const hotNow=hot&&okH;flames.forEach((f,i)=>{f.visible=hotNow;f.scale.y=.7+.5*Math.sin(t*22+i*2)});
   st.temp+=(((hotNow?.95:.35)+(run?st.mix*.15:0))-st.temp)*Math.min(1,dt*.6);merc.scale.y=thP.visible!==false?st.temp:.2;
   const sp=(.04+st.temp*.12)*(pbP.visible!==false?1:0)*st.rate;mols.forEach(m=>{m.position.addScaledVector(m.userData.v,sp*dt);['x','z'].forEach(a=>{if(Math.abs(m.position[a])>.068){m.position[a]=Math.sign(m.position[a])*.068;m.userData.v[a]*=-1}});if(m.position.y<.013||m.position.y>.147){m.position.y=K.clamp(m.position.y,.013,.147);m.userData.v.y*=-1}});
   puffs.forEach(pf=>{pf.visible=okB&&(gas?st.mix>.1:hotNow);pf.userData.k=(pf.userData.k+dt*.25)%1;const k=pf.userData.k;pf.position.set(-.08+Math.sin(k*7+t)*.03,.12+.2+k*.14,0);pf.scale.setScalar(.6+k*2)})}}}
};
