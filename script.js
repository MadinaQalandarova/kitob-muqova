// ═══ NAV ═══
function goPg(name, btn) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
  document.getElementById('pg-' + name).classList.add('on');
  btn.classList.add('on');
  if (name === 'design') syncDP();
}

// ═══ GENRES ═══
const GENRES = [
  { icon:'💕', name:'Ishq',       bg:'linear-gradient(135deg,#1a0010,#5c0a2e,#9b1b5a)', color:'#ffb7b2', font:'Dancing Script,cursive',
    stk:['💕','🌹','💖','💋','🥀','✨','🌙','💑','🌸','💗','❤️','🌺','🫀','💝','🌷','🩷'] },
  { icon:'🔮', name:'Fantaziya',  bg:'linear-gradient(135deg,#0a0018,#1e0b4a,#3d1a8a)', color:'#c3b1e1', font:'Cinzel,serif',
    stk:['⭐','🌟','🔮','🌙','⚡','🐉','🦄','🧙','🏰','✨','🌌','🗡️','🧝','🪄','🌠','🔯'] },
  { icon:'🔍', name:'Sirli',      bg:'linear-gradient(135deg,#050810,#0d1a2e,#1a2f4a)', color:'#7ee8fa', font:'Oswald,sans-serif',
    stk:['🔍','🕵️','🔦','🗝️','💀','🖤','🌃','🔒','👁️','🌧️','🌑','⛓️','🩻','📻','🗃️','🔭'] },
  { icon:'⛰️', name:'Sarguzasht', bg:'linear-gradient(135deg,#0a1400,#1e3a00,#2d5a00)', color:'#b5ead7', font:'Montserrat,sans-serif',
    stk:['🗺️','⛰️','🌲','🧭','⚓','🏕️','🦅','🌊','🔥','⚔️','🐺','🌄','🧗','🏹','🌍','🪂'] },
  { icon:'😱', name:'Triller',    bg:'linear-gradient(135deg,#100000,#3d0000,#6b0000)', color:'#ff6b6b', font:'Oswald,sans-serif',
    stk:['😱','💀','⚡','🌑','🕷️','🦇','🔪','🌩️','👻','🩸','⛓️','🖤','🪦','🕸️','🧟','☠️'] },
  { icon:'📜', name:'Tarix',      bg:'linear-gradient(135deg,#1a1000,#4a2e00,#7a4a00)', color:'#f0c27f', font:'Playfair Display,serif',
    stk:['⚔️','👑','🏛️','📜','🛡️','⚖️','🏰','🎭','🕯️','🧭','🌍','🗡️','⚱️','🏺','🗿','🪙'] },
  { icon:'🌸', name:"She'riyat",  bg:'linear-gradient(135deg,#160a1a,#2d1a3e,#4a2a5e)', color:'#c3b1e1', font:'Dancing Script,cursive',
    stk:['🌸','🌺','🦋','✨','🌙','🕊️','🌿','💫','🌊','🍃','🌷','🌹','🪷','🌼','🫧','🍀'] },
  { icon:'😄', name:'Hajviy',     bg:'linear-gradient(135deg,#001a1a,#003d4a,#006080)', color:'#7ee8fa', font:'Lobster,cursive',
    stk:['😄','🎭','🃏','🎪','🤣','🎉','🌈','✨','🎨','💫','🌟','🎊','🎈','🥳','🎠','🎡'] },
];

function initGenres() {
  const g = document.getElementById('ggrid');
  GENRES.forEach(gen => {
    const b = document.createElement('button');
    b.className = 'gbtn';
    b.innerHTML = `<span class="gicon">${gen.icon}</span><span class="gname">${gen.name}</span>`;
    b.onclick = () => {
      document.querySelectorAll('.gbtn').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      document.getElementById('cover').style.background = gen.bg;
      document.getElementById('cover').style.color = gen.color;
      document.getElementById('cover').style.fontFamily = gen.font;
      STK_SETS['_janr'] = gen.stk;
      renderStk('_janr');
    };
    g.appendChild(b);
  });
}

// ═══ COVER BINDINGS ═══
[['i-title','cv-title'],['i-sub','cv-sub'],['i-quote','cv-quote'],
 ['i-author','cv-author'],['i-pub','cv-pub']].forEach(([inp,el]) => {
  document.getElementById(inp).addEventListener('input', function() {
    document.getElementById(el).textContent = this.value;
  });
});

const THEMES = {
  night:'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
  fire:'linear-gradient(135deg,#1a0a00,#7b1e00,#c0392b)',
  ocean:'linear-gradient(135deg,#00171f,#003459,#007ea7)',
  forest:'linear-gradient(135deg,#0a1a0a,#1b4332,#2d6a4f)',
  gold:'linear-gradient(135deg,#3d2800,#7a5000,#c49a00)',
  rose:'linear-gradient(135deg,#2d0019,#6b002b,#c2185b)',
  purple:'linear-gradient(135deg,#0e0018,#2d0a5e,#5b0ea6)',
  mono:'linear-gradient(135deg,#000,#1a1a1a,#2d2d2d)',
};
function setTheme(n,b){document.querySelectorAll('#th-row .chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('cover').style.background=THEMES[n];document.querySelectorAll('.gbtn').forEach(x=>x.classList.remove('on'));}
function setTC(c,b){if(b){document.querySelectorAll('#tc-row .sw').forEach(x=>x.classList.remove('on'));b.classList.add('on');}document.getElementById('cover').style.color=c;}
function setCF(f,b){document.querySelectorAll('#fc-row .chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('cover').style.fontFamily=f;}
function loadBg(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>document.getElementById('cbg').style.backgroundImage=`url('${ev.target.result}')`;r.readAsDataURL(f);}

// ═══ DRAWING ═══
const cv=document.getElementById('dcanvas'),ctx=cv.getContext('2d');
let drawing=false,drawOn=false,eraseOn=false,bSz=4;

function pos(e){const r=cv.getBoundingClientRect(),sx=cv.width/r.width,sy=cv.height/r.height,src=e.touches?e.touches[0]:e;return{x:(src.clientX-r.left)*sx,y:(src.clientY-r.top)*sy};}
cv.addEventListener('mousedown',e=>{if(!drawOn&&!eraseOn)return;drawing=true;const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);});
cv.addEventListener('mousemove',e=>{if(!drawing)return;const p=pos(e);if(eraseOn){ctx.globalCompositeOperation='destination-out';ctx.lineWidth=bSz*3;ctx.strokeStyle='rgba(0,0,0,1)';}else{ctx.globalCompositeOperation='source-over';ctx.lineWidth=bSz;ctx.strokeStyle=document.getElementById('bcol').value;}ctx.lineCap='round';ctx.lineJoin='round';ctx.lineTo(p.x,p.y);ctx.stroke();ctx.beginPath();ctx.moveTo(p.x,p.y);});
['mouseup','mouseleave'].forEach(ev=>cv.addEventListener(ev,()=>{drawing=false;ctx.beginPath();}));
cv.addEventListener('touchstart',e=>{e.preventDefault();cv.dispatchEvent(new MouseEvent('mousedown',{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}));},{passive:false});
cv.addEventListener('touchmove',e=>{e.preventDefault();cv.dispatchEvent(new MouseEvent('mousemove',{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}));},{passive:false});
cv.addEventListener('touchend',e=>{e.preventDefault();cv.dispatchEvent(new MouseEvent('mouseup'));},{passive:false});

function togDraw(){drawOn=!drawOn;eraseOn=false;cv.classList.toggle('on',drawOn||eraseOn);document.getElementById('dbtn').classList.toggle('on',drawOn);document.getElementById('ebtn').classList.remove('on');}
function togErase(){eraseOn=!eraseOn;drawOn=false;cv.classList.toggle('on',drawOn||eraseOn);document.getElementById('ebtn').classList.toggle('on',eraseOn);document.getElementById('dbtn').classList.remove('on');}
function clrCanvas(){ctx.clearRect(0,0,cv.width,cv.height);}

function dPat(type){
  const w=cv.width,h=cv.height,c=document.getElementById('bcol').value;
  ctx.globalCompositeOperation='source-over';ctx.strokeStyle=c;ctx.fillStyle=c;
  if(type==='dots'){for(let x=15;x<w;x+=22)for(let y=15;y<h;y+=22){ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fill();}}
  else if(type==='lines'){ctx.lineWidth=1;ctx.globalAlpha=.22;for(let y=20;y<h;y+=26){ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(w-10,y);ctx.stroke();}ctx.globalAlpha=1;}
  else if(type==='stars'){ctx.font='13px serif';const s=['✦','✧','·','★','✶'];for(let x=0;x<w;x+=30)for(let y=0;y<h;y+=30)if(Math.random()>.5)ctx.fillText(s[Math.floor(Math.random()*s.length)],x+Math.random()*16,y+Math.random()*16);}
  else if(type==='waves'){ctx.lineWidth=1.2;ctx.globalAlpha=.32;for(let y=18;y<h;y+=18){ctx.beginPath();ctx.moveTo(0,y);for(let x=0;x<w;x+=8)ctx.lineTo(x,y+Math.sin(x*.25)*4);ctx.stroke();}ctx.globalAlpha=1;}
  else if(type==='border'){ctx.lineWidth=2.5;ctx.globalAlpha=.55;ctx.strokeRect(8,8,w-16,h-16);ctx.lineWidth=1;ctx.globalAlpha=.25;ctx.strokeRect(14,14,w-28,h-28);ctx.globalAlpha=1;}
  else if(type==='diamonds'){ctx.lineWidth=1;ctx.globalAlpha=.28;for(let x=0;x<w;x+=28)for(let y=0;y<h;y+=28){ctx.beginPath();ctx.moveTo(x+14,y);ctx.lineTo(x+28,y+14);ctx.lineTo(x+14,y+28);ctx.lineTo(x,y+14);ctx.closePath();ctx.stroke();}ctx.globalAlpha=1;}
  else if(type==='grid'){ctx.lineWidth=.7;ctx.globalAlpha=.18;for(let x=0;x<w;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}for(let y=0;y<h;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}ctx.globalAlpha=1;}
  else if(type==='zigzag'){ctx.lineWidth=1.5;ctx.globalAlpha=.38;const st=20;for(let row=0;row<h;row+=st*2){ctx.beginPath();ctx.moveTo(0,row);for(let x=0;x<w;x+=st)ctx.lineTo(x,row+(x/st%2===0?0:st));ctx.stroke();}ctx.globalAlpha=1;}
  else if(type==='circles'){ctx.lineWidth=1;ctx.globalAlpha=.22;for(let x=0;x<w;x+=32)for(let y=0;y<h;y+=32){ctx.beginPath();ctx.arc(x,y,12,0,Math.PI*2);ctx.stroke();}ctx.globalAlpha=1;}
}

// ═══ STICKERS ═══
const STK_SETS = {
  'Umumiy': ['📚','✏️','🖊️','📖','🌟','💡','🎨','🎭','🏆','🎯','💎','🌈','🔖','📝','🎬','🎵','🎪','🎩'],
  'Tabiat': ['🌸','🌺','🌹','🌷','🌿','🍃','🦋','🕊️','🌊','⛰️','🌙','⭐','☀️','🌈','🍁','🌲','🌻','🦚'],
  'Yulduz': ['⭐','🌟','✨','💫','🌙','☀️','🌠','🎆','🎇','💥','⚡','🌌','🔭','🪐','🌠','🛸','🌛','🌜'],
  'Sevgi':  ['❤️','💕','💖','💗','💑','💋','🌹','💐','🥀','💞','💝','💟','❣️','💓','💘','🫀','🩷','🩸'],
  'San\'at':['✏️','📚','📖','📝','🖊️','🔖','🖌️','🎨','🎬','🎼','🎭','🏛️','🖼️','✒️','📓','🖋️','🎹','🎸'],
  '_janr':  [],
};

function initStk(){
  const cEl=document.getElementById('scats');
  Object.keys(STK_SETS).filter(k=>k!=='_janr').forEach((cat,i)=>{
    const b=document.createElement('button');
    b.className='scb'+(i===0?' on':'');b.textContent=cat;
    b.onclick=()=>{document.querySelectorAll('.scb').forEach(x=>x.classList.remove('on'));b.classList.add('on');renderStk(cat);};
    cEl.appendChild(b);
  });
  renderStk('Umumiy');
}

function renderStk(cat){
  const g=document.getElementById('sgrid');g.innerHTML='';
  (STK_SETS[cat]||[]).forEach(em=>{
    const s=document.createElement('span');s.className='spick';s.textContent=em;s.title=em;
    s.onclick=()=>addStk(em);g.appendChild(s);
  });
}

function addStk(emoji){
  const cover=document.getElementById('cover');
  const el=document.createElement('div');el.className='stk';el.dataset.emoji=emoji;

  const em=document.createElement('span');em.className='stk-em';em.textContent=emoji;
  el.appendChild(em);

  const x=document.createElement('button');x.className='stk-x';x.textContent='×';x.title="O'chirish";
  x.addEventListener('click',e=>{e.stopPropagation();el.remove();});
  el.appendChild(x);

  el.style.left=(28+Math.random()*200)+'px';
  el.style.top=(28+Math.random()*350)+'px';

  el.addEventListener('click',e=>{
    e.stopPropagation();
    document.querySelectorAll('.stk').forEach(s=>s.classList.remove('sel'));
    el.classList.add('sel');
  });
  el.addEventListener('dblclick',()=>el.remove());

  makeDrag(el);
  cover.appendChild(el);
}

document.getElementById('cover').addEventListener('click',()=>{
  document.querySelectorAll('.stk').forEach(s=>s.classList.remove('sel'));
});

function makeDrag(el){
  let ox,oy,sx,sy,moved=false;
  el.addEventListener('mousedown',e=>{
    e.stopPropagation();if(drawOn||eraseOn)return;
    ox=el.offsetLeft;oy=el.offsetTop;sx=e.clientX;sy=e.clientY;moved=false;
    const mv=m=>{moved=true;el.style.left=(ox+m.clientX-sx)+'px';el.style.top=(oy+m.clientY-sy)+'px';};
    const up=()=>{document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);};
    document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);
  });
}

// ═══ DOWNLOAD ═══
function dlCover(){
  document.querySelectorAll('.stk').forEach(s=>s.classList.remove('sel'));
  const wasD=drawOn,wasE=eraseOn;
  drawOn=false;eraseOn=false;cv.classList.remove('on');
  html2canvas(document.getElementById('cover'),{scale:3,useCORS:true,logging:false}).then(c=>{
    const a=document.createElement('a');a.download='kitob_muqovasi.png';a.href=c.toDataURL();a.click();
    if(wasD)togDraw();if(wasE)togErase();
  });
}

// ═══ WRITING ═══
let CHS=[{title:'Birinchi bob',html:''}],curC=0;
function initWrite(){renderCHL();loadC(0);}
function renderCHL(){const l=document.getElementById('chl');l.innerHTML='';CHS.forEach((ch,i)=>{const el=document.createElement('div');el.className='chi'+(i===curC?' on':'');el.innerHTML=`<div class="chin">Bob ${i+1}</div><div>${ch.title}</div>`;el.onclick=()=>{saveC();loadC(i);};l.appendChild(el);});}
function saveC(){CHS[curC].html=document.getElementById('wed').innerHTML;}
function loadC(i){curC=i;document.getElementById('ch-inp').value=CHS[i].title;document.getElementById('wed').innerHTML=CHS[i].html;renderCHL();updWC();}
function updChT(v){CHS[curC].title=v;renderCHL();}
function addCh(){saveC();CHS.push({title:`${CHS.length+1}-bob`,html:''});loadC(CHS.length-1);}
function onEdIn(){saveC();updWC();}
function updWC(){const t=document.getElementById('wed').innerText||'';const n=t.trim()?t.trim().split(/\s+/).length:0;document.getElementById('wc').textContent=n+" so'z";}
function fmt(cmd){document.execCommand(cmd,false,null);document.getElementById('wed').focus();}
function fmtF(v){if(v){document.execCommand('fontName',false,v);document.getElementById('wed').focus();}}
function fmtSz(v){if(v){document.execCommand('fontSize',false,v);document.getElementById('wed').focus();}}

// ═══ DESIGN ═══
const D={fontFamily:"'Merriweather',serif",fontSize:'16px',lineHeight:'1.8',letterSpacing:'0px',textAlign:'left',color:'#e8e8f0',pageColor:'#1e1e2e',titleFont:"'Playfair Display',serif"};
const STLS={
  classic:{fontFamily:"'Merriweather',serif",fontSize:'15px',lineHeight:'2',color:'#2c1a00',pageColor:'#f5f0e8',textAlign:'justify',titleFont:"'Playfair Display',serif"},
  modern: {fontFamily:"'Montserrat',sans-serif",fontSize:'15px',lineHeight:'1.7',color:'#e8e8f0',pageColor:'#121212',textAlign:'left',titleFont:"'Oswald',sans-serif"},
  elegant:{fontFamily:"'Playfair Display',serif",fontSize:'16px',lineHeight:'2',color:'#c3b1e1',pageColor:'#1a0a2e',textAlign:'center',titleFont:"'Dancing Script',cursive"},
  dark:   {fontFamily:"'Nunito',sans-serif",fontSize:'15px',lineHeight:'1.8',color:'#aaa',pageColor:'#0a0a0a',textAlign:'left',titleFont:"'Cinzel',serif"},
  light:  {fontFamily:'Georgia,serif',fontSize:'16px',lineHeight:'1.9',color:'#222',pageColor:'#fefefe',textAlign:'justify',titleFont:"'Playfair Display',serif"},
};
function dsp(p,v,b,r){D[p]=v;if(b&&r){document.querySelectorAll('#'+r+' .chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');}syncDP();}
function dsv(p,v){D[p]=v;syncDP();}
function acsw(el,par){par.querySelectorAll('.sw').forEach(x=>x.classList.remove('on'));el.classList.add('on');}
function apStl(n){Object.assign(D,STLS[n]);syncDP();}
function syncDP(){
  const pg=document.getElementById('dpg'),h=document.getElementById('dp-h'),b=document.getElementById('dp-b');
  if(!pg)return;
  pg.style.backgroundColor=D.pageColor;
  h.style.fontFamily=D.titleFont;h.style.color=D.color;h.textContent=CHS[curC]?.title||'Bob';
  b.style.cssText=`font-family:${D.fontFamily};font-size:${D.fontSize};line-height:${D.lineHeight};letter-spacing:${D.letterSpacing};text-align:${D.textAlign};color:${D.color}`;
  const txt=document.getElementById('wed')?.innerText||'';
  b.textContent=txt||"Bu yerda kitobingizning matnini ko'rasiz. \"Yozish\" sahifasida yozgan matnlaringiz shu yerda ko'rinadi.";
}
function apDes(){
  const ed=document.getElementById('wed');
  Object.assign(ed.style,{fontFamily:D.fontFamily,fontSize:D.fontSize,lineHeight:D.lineHeight,letterSpacing:D.letterSpacing,textAlign:D.textAlign,color:D.color,backgroundColor:D.pageColor});
  alert("✅ Dizayn yozish sahifasiga qo'llandi!");
}

// ═══ INIT ═══
initGenres();initStk();initWrite();
