/* مولّد باركود QR خاص بإيلان — مكتوب من الصفر بدون أي مكتبة خارجية.
   EilanQR.make(text) → {size, get(x,y)}  (byte mode, error-correction level M, versions 1–40) */
(function(){
'use strict';
const ECC_PER_BLOCK_M=[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28];
const BLOCKS_M=[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49];
const FORMAT_M=0;

function rawModules(v){let r=(16*v+128)*v+64;if(v>=2){const n=Math.floor(v/7)+2;r-=(25*n-10)*n-55;if(v>=7)r-=36;}return r;}
const dataCodewords=v=>Math.floor(rawModules(v)/8)-ECC_PER_BLOCK_M[v]*BLOCKS_M[v];

function gfMul(x,y){let z=0;for(let i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x;}return z&255;}
function rsDivisor(d){const r=new Array(d).fill(0);r[d-1]=1;let root=1;
  for(let i=0;i<d;i++){for(let j=0;j<d;j++){r[j]=gfMul(r[j],root);if(j+1<d)r[j]^=r[j+1];}root=gfMul(root,2);}return r;}
function rsRemainder(data,div){const r=new Array(div.length).fill(0);
  for(const b of data){const f=b^r.shift();r.push(0);div.forEach((c,i)=>r[i]^=gfMul(c,f));}return r;}

function alignPositions(v,size){if(v===1)return[];const n=Math.floor(v/7)+2,step=v===32?26:Math.ceil((v*4+4)/(n*2-2))*2;
  const r=[];for(let p=size-7;r.length<n-1;p-=step)r.unshift(p);r.unshift(6);return r;}

function make(text){
  const bytes=Array.from(new TextEncoder().encode(text));
  let v=1;for(;v<=40;v++){const cap=dataCodewords(v)*8,need=4+(v<=9?8:16)+bytes.length*8;if(need<=cap)break;}
  if(v>40)throw new Error('النص طويل جداً للباركود');
  const size=v*4+17,mod=[],fn=[];
  for(let i=0;i<size;i++){mod.push(new Array(size).fill(false));fn.push(new Array(size).fill(false));}
  const set=(x,y,d)=>{mod[y][x]=d;fn[y][x]=true;};

  // function patterns
  for(let i=0;i<size;i++){set(6,i,i%2===0);set(i,6,i%2===0);}
  const finder=(cx,cy)=>{for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const x=cx+dx,y=cy+dy,d=Math.max(Math.abs(dx),Math.abs(dy));if(x>=0&&x<size&&y>=0&&y<size)set(x,y,d!==2&&d!==4);}};
  finder(3,3);finder(size-4,3);finder(3,size-4);
  const al=alignPositions(v,size);
  al.forEach((a,i)=>al.forEach((b,j)=>{if((i===0&&j===0)||(i===0&&j===al.length-1)||(i===al.length-1&&j===0))return;
    for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)set(a+dx,b+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1);}));
  const drawFormat=mask=>{const data=(FORMAT_M<<3)|mask;let rem=data;for(let i=0;i<10;i++)rem=(rem<<1)^((rem>>>9)*0x537);
    const bits=((data<<10)|rem)^0x5412,g=i=>((bits>>>i)&1)!==0;
    for(let i=0;i<=5;i++)set(8,i,g(i));set(8,7,g(6));set(8,8,g(7));set(7,8,g(8));for(let i=9;i<15;i++)set(14-i,8,g(i));
    for(let i=0;i<8;i++)set(size-1-i,8,g(i));for(let i=8;i<15;i++)set(8,size-15+i,g(i));set(8,size-8,true);};
  drawFormat(0);
  if(v>=7){let rem=v;for(let i=0;i<12;i++)rem=(rem<<1)^((rem>>>11)*0x1F25);const bits=(v<<12)|rem;
    for(let i=0;i<18;i++){const d=((bits>>>i)&1)!==0,a=size-11+i%3,b=Math.floor(i/3);set(a,b,d);set(b,a,d);}}

  // data bits
  const bb=[];const put=(val,len)=>{for(let i=len-1;i>=0;i--)bb.push((val>>>i)&1);};
  put(4,4);put(bytes.length,v<=9?8:16);bytes.forEach(b=>put(b,8));
  const cap=dataCodewords(v)*8;put(0,Math.min(4,cap-bb.length));put(0,(8-bb.length%8)%8);
  for(let p=0xEC;bb.length<cap;p^=0xEC^0x11)put(p,8);
  const data=[];for(let i=0;i<bb.length;i+=8){let x=0;for(let j=0;j<8;j++)x=(x<<1)|bb[i+j];data.push(x);}

  // error correction + interleave
  const nb=BLOCKS_M[v],ecl=ECC_PER_BLOCK_M[v],raw=Math.floor(rawModules(v)/8),nShort=nb-raw%nb,shortLen=Math.floor(raw/nb);
  const div=rsDivisor(ecl),blocks=[];
  for(let i=0,k=0;i<nb;i++){const dat=data.slice(k,k+shortLen-ecl+(i<nShort?0:1));k+=dat.length;const ec=rsRemainder(dat,div);if(i<nShort)dat.push(0);blocks.push(dat.concat(ec));}
  const all=[];for(let i=0;i<blocks[0].length;i++)blocks.forEach((b,j)=>{if(i!==shortLen-ecl||j>=nShort)all.push(b[i]);});

  // zigzag placement
  let bi=0;
  for(let right=size-1;right>=1;right-=2){if(right===6)right=5;
    for(let vert=0;vert<size;vert++)for(let j=0;j<2;j++){const x=right-j,up=((right+1)&2)===0,y=up?size-1-vert:vert;
      if(!fn[y][x]&&bi<all.length*8){mod[y][x]=((all[bi>>>3]>>>(7-(bi&7)))&1)!==0;bi++;}}}

  // masks: pick the one with the lowest penalty
  const MASKS=[(x,y)=>(x+y)%2===0,(x,y)=>y%2===0,(x,y)=>x%3===0,(x,y)=>(x+y)%3===0,(x,y)=>(Math.floor(x/3)+Math.floor(y/2))%2===0,
    (x,y)=>x*y%2+x*y%3===0,(x,y)=>(x*y%2+x*y%3)%2===0,(x,y)=>((x+y)%2+x*y%3)%2===0];
  const apply=m=>{for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!fn[y][x]&&MASKS[m](x,y))mod[y][x]=!mod[y][x];};
  const penalty=()=>{let p=0,dark=0;const lines=[];
    for(let y=0;y<size;y++){lines.push(mod[y].map(b=>b?1:0).join(''));}
    for(let x=0;x<size;x++){let s='';for(let y=0;y<size;y++)s+=mod[y][x]?1:0;lines.push(s);}
    for(const s of lines){const runs=s.match(/0{5,}|1{5,}/g);if(runs)runs.forEach(r=>p+=r.length-2);
      let i=-1;while((i=s.indexOf('1011101',i+1))!==-1){if(s.slice(Math.max(0,i-4),i)==='0000'||s.slice(i+7,i+11)==='0000')p+=40;}}
    for(let y=0;y<size-1;y++)for(let x=0;x<size-1;x++){const c=mod[y][x];if(c===mod[y][x+1]&&c===mod[y+1][x]&&c===mod[y+1][x+1])p+=3;}
    for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(mod[y][x])dark++;
    p+=Math.floor(Math.abs(dark*20-size*size*10)/(size*size))*10;return p;};
  let best=0,bestP=Infinity;
  for(let m=0;m<8;m++){apply(m);drawFormat(m);const p=penalty();if(p<bestP){bestP=p;best=m;}apply(m);}
  apply(best);drawFormat(best);
  return {size,version:v,get:(x,y)=>x>=0&&y>=0&&x<size&&y<size&&mod[y][x]};
}

// draw on a canvas context: rounded dots, finder eyes kept square-ish for reliable scanning
function draw(ctx,qr,x0,y0,px,fg){
  ctx.fillStyle=fg||'#07080C';
  for(let y=0;y<qr.size;y++)for(let x=0;x<qr.size;x++)if(qr.get(x,y))ctx.fillRect(x0+x*px,y0+y*px,Math.ceil(px),Math.ceil(px));
}
window.EilanQR={make,draw};
})();
