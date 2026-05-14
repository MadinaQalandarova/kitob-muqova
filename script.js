// ═══ PAGE THEMES ═══
const PG_THEMES = {
  kosmik:   {'--bg':'#0f0f1a','--panel':'#16213e','--card':'#1a2744','--accent':'#f0c27f','--red':'#e94560','--text':'#e8e8f0','--muted':'#7788aa','--border':'#2a3a5a'},
  oltin:    {'--bg':'#0c0900','--panel':'#1c1500','--card':'#2a1e00','--accent':'#d4a853','--red':'#cc3333','--text':'#f0e8d0','--muted':'#8a7850','--border':'#382c00'},
  binafsha: {'--bg':'#0c0010','--panel':'#1a0028','--card':'#250038','--accent':'#c084fc','--red':'#ff3d7f','--text':'#f0e8ff','--muted':'#9070b8','--border':'#3d0060'},
  yashil:   {'--bg':'#040c07','--panel':'#0c1c10','--card':'#122218','--accent':'#52d68a','--red':'#ff5252','--text':'#d8f2e4','--muted':'#50886a','--border':'#1a3824'},
};
function setPgTheme(name,btn){
  const t=PG_THEMES[name];if(!t)return;
  Object.entries(t).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));
  document.querySelectorAll('.tcard').forEach(x=>x.classList.remove('on'));
  if(btn)btn.classList.add('on');
}

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
  { icon:`<svg viewBox="0 0 24 24" fill="#e91e63" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    name:'Ishq', bg:'linear-gradient(135deg,#1a0010,#5c0a2e,#9b1b5a)', color:'#ffb7b2', font:'Dancing Script,cursive',
    stk:['💕','🌹','💖','💋','🥀','✨','🌙','💑','🌸','💗','❤️','🌺','🫀','💝','🌷','🩷'] },
  { icon:`<svg viewBox="0 0 24 24" fill="none" stroke="#c3b1e1" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2 18.5V22h3.5L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 3v4M3 5h4"/><path d="M19 15v4M17 17h4"/></svg>`,
    name:'Fantaziya', bg:'linear-gradient(135deg,#0a0018,#1e0b4a,#3d1a8a)', color:'#c3b1e1', font:'Cinzel,serif',
    stk:['⭐','🌟','🔮','🌙','⚡','🐉','🦄','🧙','🏰','✨','🌌','🗡️','🧝','🪄','🌠','🔯'] },
  { icon:`<svg viewBox="0 0 24 24" fill="none" stroke="#7ee8fa" stroke-width="2.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    name:'Sirli', bg:'linear-gradient(135deg,#050810,#0d1a2e,#1a2f4a)', color:'#7ee8fa', font:'Oswald,sans-serif',
    stk:['🔍','🕵️','🔦','🗝️','💀','🖤','🌃','🔒','👁️','🌧️','🌑','⛓️','🩻','📻','🗃️','🔭'] },
  { icon:`<svg viewBox="0 0 24 24" fill="none" stroke="#b5ead7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#b5ead7" opacity=".5" stroke="none"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>`,
    name:'Sarguzasht', bg:'linear-gradient(135deg,#0a1400,#1e3a00,#2d5a00)', color:'#b5ead7', font:'Montserrat,sans-serif',
    stk:['🗺️','⛰️','🌲','🧭','⚓','🏕️','🦅','🌊','🔥','⚔️','🐺','🌄','🧗','🏹','🌍','🪂'] },
  { icon:`<svg viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 1 7 7 7 7 0 0 1-3.94 6.29L15 17H9l.94-1.71A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/><path d="M9 17v1a3 3 0 0 0 6 0v-1"/><line x1="9" y1="11" x2="10" y2="11" stroke-width="3"/><line x1="14" y1="11" x2="15" y2="11" stroke-width="3"/></svg>`,
    name:'Triller', bg:'linear-gradient(135deg,#100000,#3d0000,#6b0000)', color:'#ff6b6b', font:'Oswald,sans-serif',
    stk:['😱','💀','⚡','🌑','🕷️','🦇','🔪','🌩️','👻','🩸','⛓️','🖤','🪦','🕸️','🧟','☠️'] },
  { icon:`<svg viewBox="0 0 24 24" fill="none" stroke="#f0c27f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M2 18l2-9 4 5 4-10 4 10 4-5 2 9H2z"/><line x1="2" y1="18" x2="22" y2="18"/><circle cx="12" cy="5" r="1.5" fill="#f0c27f"/></svg>`,
    name:'Tarix', bg:'linear-gradient(135deg,#1a1000,#4a2e00,#7a4a00)', color:'#f0c27f', font:'Playfair Display,serif',
    stk:['⚔️','👑','🏛️','📜','🛡️','⚖️','🏰','🎭','🕯️','🧭','🌍','🗡️','⚱️','🏺','🗿','🪙'] },
  { icon:`<svg viewBox="0 0 24 24" fill="none" stroke="#c3b1e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>`,
    name:"She'riyat", bg:'linear-gradient(135deg,#160a1a,#2d1a3e,#4a2a5e)', color:'#c3b1e1', font:'Dancing Script,cursive',
    stk:['🌸','🌺','🦋','✨','🌙','🕊️','🌿','💫','🌊','🍃','🌷','🌹','🪷','🌼','🫧','🍀'] },
  { icon:`<svg viewBox="0 0 24 24" fill="none" stroke="#7ee8fa" stroke-width="2.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3.5"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3.5"/></svg>`,
    name:'Hajviy', bg:'linear-gradient(135deg,#001a1a,#003d4a,#006080)', color:'#7ee8fa', font:'Lobster,cursive',
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
const S={
  // ── Gullar ──
  rose:`<svg viewBox="-20 -20 40 46" xmlns="http://www.w3.org/2000/svg"><ellipse cx="0" cy="-10" rx="5.5" ry="8.5" fill="#C2185B"/><ellipse cx="0" cy="-10" rx="5.5" ry="8.5" fill="#E91E63" transform="rotate(72)"/><ellipse cx="0" cy="-10" rx="5.5" ry="8.5" fill="#C2185B" transform="rotate(144)"/><ellipse cx="0" cy="-10" rx="5.5" ry="8.5" fill="#E91E63" transform="rotate(216)"/><ellipse cx="0" cy="-10" rx="5.5" ry="8.5" fill="#AD1457" transform="rotate(288)"/><circle r="5.5" fill="#F06292"/><circle r="2.5" fill="#FCE4EC"/><line x1="0" y1="10" x2="-2" y2="26" stroke="#2E7D32" stroke-width="2"/><ellipse cx="-7" cy="21" rx="5" ry="2.5" fill="#388E3C" transform="rotate(-30,-7,21)"/></svg>`,
  lotus:`<svg viewBox="0 0 40 38" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="20" rx="5" ry="12" fill="#F48FB1" transform="rotate(-35 20 20)"/><ellipse cx="20" cy="20" rx="5" ry="12" fill="#E91E63" transform="rotate(0 20 20)"/><ellipse cx="20" cy="20" rx="5" ry="12" fill="#F48FB1" transform="rotate(35 20 20)"/><ellipse cx="7" cy="26" rx="4" ry="9" fill="#F8BBD9" transform="rotate(-65 7 26)"/><ellipse cx="33" cy="26" rx="4" ry="9" fill="#F8BBD9" transform="rotate(65 33 26)"/><circle cx="20" cy="18" r="5" fill="#FCE4EC"/><line x1="12" y1="37" x2="28" y2="37" stroke="#388E3C" stroke-width="2"/></svg>`,
  butterfly:`<svg viewBox="0 0 44 34" xmlns="http://www.w3.org/2000/svg"><ellipse cx="9" cy="12" rx="9" ry="12" fill="#CE93D8" transform="rotate(-25 9 12)"/><ellipse cx="35" cy="12" rx="9" ry="12" fill="#CE93D8" transform="rotate(25 35 12)"/><ellipse cx="8" cy="26" rx="7" ry="8" fill="#AB47BC" transform="rotate(20 8 26)"/><ellipse cx="36" cy="26" rx="7" ry="8" fill="#AB47BC" transform="rotate(-20 36 26)"/><ellipse cx="9" cy="11" rx="4.5" ry="6" fill="#E1BEE7" transform="rotate(-25 9 11)" opacity=".5"/><ellipse cx="35" cy="11" rx="4.5" ry="6" fill="#E1BEE7" transform="rotate(25 35 11)" opacity=".5"/><line x1="22" y1="4" x2="22" y2="30" stroke="#4A148C" stroke-width="1.5"/><path d="M22,4 Q19,1 17,2" stroke="#4A148C" stroke-width="1" fill="none"/><path d="M22,4 Q25,1 27,2" stroke="#4A148C" stroke-width="1" fill="none"/></svg>`,
  cherry:`<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><ellipse cx="18" cy="8" rx="5" ry="8" fill="#FFCDD2"/><ellipse cx="18" cy="8" rx="5" ry="8" fill="#F48FB1" transform="rotate(72 18 18)"/><ellipse cx="18" cy="8" rx="5" ry="8" fill="#FFCDD2" transform="rotate(144 18 18)"/><ellipse cx="18" cy="8" rx="5" ry="8" fill="#F48FB1" transform="rotate(216 18 18)"/><ellipse cx="18" cy="8" rx="5" ry="8" fill="#FFCDD2" transform="rotate(288 18 18)"/><circle cx="18" cy="18" r="4.5" fill="#FFE0B2"/><circle cx="18" cy="18" r="2" fill="#fff" opacity=".7"/></svg>`,
  sunflower:`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFD600"/><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFB300" transform="rotate(45 20 20)"/><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFD600" transform="rotate(90 20 20)"/><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFB300" transform="rotate(135 20 20)"/><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFD600" transform="rotate(180 20 20)"/><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFB300" transform="rotate(225 20 20)"/><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFD600" transform="rotate(270 20 20)"/><ellipse cx="20" cy="7" rx="4" ry="7" fill="#FFB300" transform="rotate(315 20 20)"/><circle cx="20" cy="20" r="8" fill="#5D4037"/><circle cx="20" cy="20" r="5" fill="#795548"/><circle cx="18" cy="18" r="1" fill="#4E342E"/><circle cx="22" cy="18" r="1" fill="#4E342E"/><circle cx="20" cy="22" r="1" fill="#4E342E"/></svg>`,
  tulip:`<svg viewBox="0 0 28 44" xmlns="http://www.w3.org/2000/svg"><path d="M14 21C14 21 4 17 4 8C4 2 8 0 14 0C20 0 24 2 24 8C24 17 14 21 14 21Z" fill="#E91E63"/><path d="M14 21C14 21 8 16 8 9C8 5 10 2 14 2C18 2 20 5 20 9C20 16 14 21 14 21Z" fill="#F48FB1"/><line x1="14" y1="21" x2="14" y2="42" stroke="#2E7D32" stroke-width="2.5"/><path d="M14 31C9 29 7 34 7 34" stroke="#388E3C" stroke-width="1.5" fill="none"/><ellipse cx="6" cy="34" rx="5" ry="2.5" fill="#66BB6A" transform="rotate(-20 6 34)"/><path d="M14 31C19 29 21 34 21 34" stroke="#388E3C" stroke-width="1.5" fill="none"/><ellipse cx="22" cy="34" rx="5" ry="2.5" fill="#66BB6A" transform="rotate(20 22 34)"/></svg>`,
  feather:`<svg viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 42C12 42 3 22 5 10C7 2 12 0 17 5C22 10 22 24 12 42Z" fill="#C3B1E1"/><line x1="12" y1="42" x2="12" y2="8" stroke="#7B1FA2" stroke-width="1.2" stroke-linecap="round"/><path d="M12 14C8 12 5.5 11 5.5 11M12 20C7.5 17 5.5 16 6 15M12 26C8 23 6.5 22 7 20M12 32C8.5 30 7.5 28 8 27" stroke="#CE93D8" stroke-width=".9" stroke-linecap="round"/><path d="M12 14C16 12 18.5 11 18.5 11M12 20C16.5 17 18.5 16 18 15M12 26C16 23 17.5 22 17 20M12 32C15.5 30 16.5 28 16 27" stroke="#CE93D8" stroke-width=".9" stroke-linecap="round"/></svg>`,
  leaf:`<svg viewBox="0 0 30 44" xmlns="http://www.w3.org/2000/svg"><path d="M15 2C15 2 28 10 26 24C24 36 15 42 15 42C15 42 2 34 4 22C6 10 15 2 15 2Z" fill="#388E3C"/><path d="M15 2C15 2 24 10 22 24C20 34 15 42 15 42" fill="#66BB6A" opacity=".45"/><line x1="15" y1="6" x2="15" y2="40" stroke="#1B5E20" stroke-width="1.5"/><line x1="15" y1="13" x2="8" y2="20" stroke="#1B5E20" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="20" x2="8" y2="27" stroke="#1B5E20" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="27" x2="9" y2="33" stroke="#1B5E20" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="13" x2="22" y2="20" stroke="#1B5E20" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="20" x2="22" y2="27" stroke="#1B5E20" stroke-width="1" stroke-linecap="round"/></svg>`,
  // ── Olov ──
  flame:`<svg viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg"><path d="M14 1C14 1 26 13 26 22C26 31 20 39 14 39C8 39 2 31 2 22C2 13 14 1 14 1Z" fill="#E65100"/><path d="M14 1C14 1 22 11 22 20C22 29 18 36 14 39C10 36 6 29 6 20C6 11 14 1 14 1Z" fill="#FF8F00"/><path d="M14 13C14 13 20 21 20 27C20 33 17 37 14 39C11 37 8 33 8 27C8 21 14 13 14 13Z" fill="#FFB300"/><path d="M14 22C14 22 17 27 17 31C17 35 15.5 38 14 39C12.5 38 11 35 11 31C11 27 14 22 14 22Z" fill="#FFF9C4"/></svg>`,
  lightning:`<svg viewBox="0 0 28 44" xmlns="http://www.w3.org/2000/svg"><polygon points="20,2 8,22 17,22 8,42 26,18 16,18 24,2" fill="#FFD600"/><polygon points="19,5 10,22 18,22 9,39 24,20 15,20 22,5" fill="#FFF9C4" opacity=".55"/></svg>`,
  sun:`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="8.5" fill="#FFD600"/><circle cx="20" cy="20" r="5.5" fill="#FFF9C4" opacity=".5"/><g stroke="#FFB300" stroke-width="2.5" stroke-linecap="round"><line x1="20" y1="2" x2="20" y2="8"/><line x1="20" y1="32" x2="20" y2="38"/><line x1="2" y1="20" x2="8" y2="20"/><line x1="32" y1="20" x2="38" y2="20"/><line x1="6.9" y1="6.9" x2="11.1" y2="11.1"/><line x1="28.9" y1="28.9" x2="33.1" y2="33.1"/><line x1="33.1" y1="6.9" x2="28.9" y2="11.1"/><line x1="11.1" y1="28.9" x2="6.9" y2="33.1"/></g></svg>`,
  moon:`<svg viewBox="0 0 36 38" xmlns="http://www.w3.org/2000/svg"><path d="M23 4C16 6 11 13 11 21C11 29 16 36 23 38C14 38 5 30 5 21C5 12 14 4 23 4Z" fill="#F0C27F"/><circle cx="27" cy="11" r="1.5" fill="#FFF9C4"/><circle cx="31" cy="20" r="1" fill="#FFF9C4"/><circle cx="28" cy="29" r="1.5" fill="#FFF9C4"/><circle cx="22" cy="34" r="1" fill="#FFF9C4"/></svg>`,
  star:`<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><polygon points="18,2 21.5,12.5 32.5,12.5 23.5,19 26.5,30 18,24 9.5,30 12.5,19 3.5,12.5 14.5,12.5" fill="#F0C27F"/><polygon points="18,6 20.8,14 29,14 22.5,19 25,27 18,22.5 11,27 13.5,19 7,14 15.2,14" fill="#FFF9C4" opacity=".55"/></svg>`,
  snowflake:`<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#7EE8FA" stroke-linecap="round"><line x1="18" y1="2" x2="18" y2="34" stroke-width="2"/><line x1="2" y1="18" x2="34" y2="18" stroke-width="2"/><line x1="5.5" y1="5.5" x2="30.5" y2="30.5" stroke-width="2"/><line x1="30.5" y1="5.5" x2="5.5" y2="30.5" stroke-width="2"/><g stroke-width="1.4"><line x1="18" y1="2" x2="14" y2="7"/><line x1="18" y1="2" x2="22" y2="7"/><line x1="18" y1="34" x2="14" y2="29"/><line x1="18" y1="34" x2="22" y2="29"/><line x1="2" y1="18" x2="7" y2="14"/><line x1="2" y1="18" x2="7" y2="22"/><line x1="34" y1="18" x2="29" y2="14"/><line x1="34" y1="18" x2="29" y2="22"/></g></svg>`,
  comet:`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="10" r="5" fill="#FFF9C4"/><circle cx="30" cy="10" r="3" fill="#FFD600"/><line x1="27" y1="14" x2="4" y2="37" stroke="#FFF9C4" stroke-width="2.5" stroke-linecap="round" opacity=".6"/><line x1="25" y1="16" x2="5" y2="36" stroke="#FFD600" stroke-width="1.5" stroke-linecap="round" opacity=".35"/><line x1="29" y1="12" x2="7" y2="34" stroke="#FFF9C4" stroke-width="1" stroke-linecap="round" opacity=".25"/></svg>`,
  // ── Bezak ──
  crown:`<svg viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg"><path d="M2 26L6 9L13 18L18 3L23 18L30 9L34 26Z" fill="#F0C27F"/><rect x="2" y="23" width="32" height="5" rx="2" fill="#D4A853"/><circle cx="18" cy="3" r="2.5" fill="#E94560"/><circle cx="6" cy="9" r="2" fill="#7EE8FA"/><circle cx="30" cy="9" r="2" fill="#7EE8FA"/><circle cx="13" cy="18" r="1.5" fill="#C3B1E1"/><circle cx="23" cy="18" r="1.5" fill="#C3B1E1"/></svg>`,
  diamond:`<svg viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg"><polygon points="16,2 30,14 16,36 2,14" fill="#7EE8FA"/><polygon points="16,2 30,14 16,19 2,14" fill="#B2EBF2"/><polygon points="16,19 30,14 16,36" fill="#0097A7"/><polygon points="16,19 2,14 16,36" fill="#00BCD4"/><polygon points="16,2 23,9 16,11 9,9" fill="#E0F7FA"/><line x1="9" y1="9" x2="16" y2="19" stroke="#80DEEA" stroke-width=".6"/><line x1="23" y1="9" x2="16" y2="19" stroke="#80DEEA" stroke-width=".6"/></svg>`,
  heart:`<svg viewBox="0 0 36 34" xmlns="http://www.w3.org/2000/svg"><path d="M18 30C18 30 2 20 2 10C2 5 6 2 11 2C14 2 16 4 18 7C20 4 22 2 25 2C30 2 34 5 34 10C34 20 18 30 18 30Z" fill="#E91E63"/><path d="M18 25C18 25 6 17 6 10C6 7 8 6 11 6C13.5 6 15.5 9 18 11C20.5 9 22.5 6 25 6C28 6 30 7 30 10C30 17 18 25 18 25Z" fill="#F48FB1"/><path d="M18 19C18 19 10 14 10 10C10 8.5 11 8 13 8C15 8 17 11 18 13C19 11 21 8 23 8C25 8 26 8.5 26 10C26 14 18 19 18 19Z" fill="#FCE4EC"/></svg>`,
  key:`<svg viewBox="0 0 28 44" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="12" r="10" fill="none" stroke="#F0C27F" stroke-width="3"/><circle cx="14" cy="12" r="5.5" fill="none" stroke="#F0C27F" stroke-width="1.8"/><rect x="12.5" y="21" width="3" height="20" fill="#F0C27F" rx="1.5"/><rect x="12.5" y="31" width="8" height="2.5" fill="#F0C27F" rx="1"/><rect x="12.5" y="36" width="6" height="2.5" fill="#F0C27F" rx="1"/></svg>`,
  scroll:`<svg viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="24" height="30" rx="1" fill="#F5F0DC"/><path d="M4 7C4 7 8 5 8 9C8 13 4 13 4 9Z" fill="#DFD9B8"/><path d="M28 7C28 7 24 5 24 9C24 13 28 13 28 9Z" fill="#DFD9B8"/><path d="M4 35C4 35 8 37 8 33C8 29 4 29 4 33Z" fill="#DFD9B8"/><path d="M28 35C28 35 24 37 24 33C24 29 28 29 28 33Z" fill="#DFD9B8"/><line x1="10" y1="14" x2="22" y2="14" stroke="#A0916C" stroke-width="1.2" stroke-linecap="round"/><line x1="10" y1="19" x2="22" y2="19" stroke="#A0916C" stroke-width="1.2" stroke-linecap="round"/><line x1="10" y1="24" x2="18" y2="24" stroke="#A0916C" stroke-width="1.2" stroke-linecap="round"/><line x1="10" y1="29" x2="20" y2="29" stroke="#A0916C" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  compass:`<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="16" fill="none" stroke="#7788AA" stroke-width="1"/><polygon points="18,4 21,17 18,14 15,17" fill="#E94560"/><polygon points="18,32 21,19 18,22 15,19" fill="#F0C27F"/><polygon points="4,18 17,15 14,18 17,21" fill="#F0C27F"/><polygon points="32,18 19,15 22,18 19,21" fill="#F0C27F"/><circle cx="18" cy="18" r="2.5" fill="#0f0f1a" stroke="#7788AA" stroke-width="1"/></svg>`,
  sword:`<svg viewBox="0 0 22 48" xmlns="http://www.w3.org/2000/svg"><polygon points="11,2 13.5,40 11,44 8.5,40" fill="#B0BEC5"/><polygon points="11,2 12.5,37 11,34 9.5,37" fill="#ECEFF1" opacity=".5"/><rect x="3" y="36" width="16" height="3.5" rx="1.5" fill="#F0C27F"/><rect x="9" y="39" width="4" height="7" rx="2" fill="#D4A853"/><line x1="9.5" y1="10" x2="12.5" y2="14" stroke="#ECEFF1" stroke-width=".7" opacity=".7"/></svg>`,
};

const STK_SETS = {
  'Gullar': [S.rose,S.lotus,S.butterfly,S.cherry,S.sunflower,S.tulip,S.feather,S.leaf],
  'Olov':   [S.flame,S.lightning,S.sun,S.moon,S.star,S.snowflake,S.comet],
  'Bezak':  [S.crown,S.diamond,S.heart,S.key,S.scroll,S.compass,S.sword],
  'Emoji':  ['📚','✏️','🖊️','📖','🌟','💡','🎨','🎭','🏆','🎯','💎','🌈','🔖','📝','🎬','🎵',
             '🌸','🌺','🌹','🌷','🌿','🍃','🦋','🌊','⭐','☀️','🌙','❤️','💕','💖','💋'],
  '_janr':  [],
};

function isSvg(item){return typeof item==='string'&&item.startsWith('<');}

function initStk(){
  const cEl=document.getElementById('scats');
  Object.keys(STK_SETS).filter(k=>k!=='_janr').forEach((cat,i)=>{
    const b=document.createElement('button');
    b.className='scb'+(i===0?' on':'');b.textContent=cat;
    b.onclick=()=>{document.querySelectorAll('.scb').forEach(x=>x.classList.remove('on'));b.classList.add('on');renderStk(cat);};
    cEl.appendChild(b);
  });
  renderStk('Gullar');
}

function renderStk(cat){
  const g=document.getElementById('sgrid');g.innerHTML='';
  (STK_SETS[cat]||[]).forEach(item=>{
    const s=document.createElement('span');s.className='spick';
    if(isSvg(item)){s.innerHTML=item;}else{s.textContent=item;}
    s.onclick=()=>addStk(item);
    g.appendChild(s);
  });
}

function addStk(item){
  const cover=document.getElementById('cover');
  const el=document.createElement('div');el.className='stk';

  const em=document.createElement('span');
  if(isSvg(item)){
    em.className='stk-sv';em.innerHTML=item;
  }else{
    em.className='stk-em';em.textContent=item;
  }
  el.appendChild(em);

  const x=document.createElement('button');x.className='stk-x';x.textContent='×';x.title="O'chirish";
  x.addEventListener('click',e=>{e.stopPropagation();el.remove();});
  el.appendChild(x);

  el.style.left=(30+Math.random()*200)+'px';
  el.style.top=(30+Math.random()*340)+'px';

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

// ═══ 3D BOOK ═══
let is3D=false;
function tog3D(btn){
  is3D=!is3D;
  document.getElementById('book-wrap').classList.toggle('is-3d',is3D);
  if(btn){btn.classList.toggle('on',is3D);btn.title=is3D?"2D ko'rinish":"3D ko'rinish";}
}

// ═══ DRAGGABLE TEXT GROUPS ═══
function makeCvDrag(id){
  const el=document.getElementById(id);if(!el)return;
  let ox,oy,sx,sy;
  el.addEventListener('mousedown',e=>{
    if(drawOn||eraseOn)return;
    e.stopPropagation();
    ox=el.offsetLeft;oy=el.offsetTop;sx=e.clientX;sy=e.clientY;
    el.classList.add('dragging');
    const cover=document.getElementById('cover');
    const cw=cover.offsetWidth,ch=cover.offsetHeight;
    const mv=m=>{
      let nx=ox+m.clientX-sx,ny=oy+m.clientY-sy;
      nx=Math.max(0,Math.min(nx,cw-el.offsetWidth));
      ny=Math.max(0,Math.min(ny,ch-el.offsetHeight));
      el.style.left=nx+'px';el.style.top=ny+'px';
    };
    const up=()=>{
      el.classList.remove('dragging');
      document.removeEventListener('mousemove',mv);
      document.removeEventListener('mouseup',up);
    };
    document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);
  });
}

// ═══ DOWNLOAD ═══
function dlCover(){
  document.querySelectorAll('.stk').forEach(s=>s.classList.remove('sel'));
  const wasD=drawOn,wasE=eraseOn;
  drawOn=false;eraseOn=false;cv.classList.remove('on');
  const bw=document.getElementById('book-wrap');
  const had3d=bw&&bw.classList.contains('is-3d');
  if(had3d)bw.classList.remove('is-3d');
  html2canvas(document.getElementById('cover'),{scale:3,useCORS:true,logging:false}).then(c=>{
    const a=document.createElement('a');a.download='kitob_muqovasi.png';a.href=c.toDataURL();a.click();
    if(had3d)bw.classList.add('is-3d');
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
['cg-top','cg-mid','cg-bot'].forEach(makeCvDrag);
