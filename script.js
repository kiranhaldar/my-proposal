const $ = (id) => document.getElementById(id);
const card = $('card'), sticker = $('sticker'), eyebrow = $('eyebrow'), heading = $('heading');
const subtitle = $('subtitle'), actions = $('actions'), microcopy = $('microcopy'), progress = $('progress');
const yesBtn = $('yesBtn'), noBtn = $('noBtn'), toast = $('toast');
let step = 0, noCount = 0, chosenMood = '', chosenDate = '';
const progressSpans = [...progress.querySelectorAll('span')];

function showToast(message) {
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}
function updateProgress(n) { progressSpans.forEach((s,i)=>s.classList.toggle('active',i===n)); }
function burstHearts(count=18) {
  const layer = document.querySelector('.floating-hearts');
  const symbols = ['💗','💕','💖','♡','🌸','✨'];
  for(let i=0;i<count;i++){
    const h=document.createElement('span'); h.className='heart'; h.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    h.style.left=Math.random()*100+'%'; h.style.fontSize=(14+Math.random()*20)+'px';
    h.style.animationDuration=(4+Math.random()*5)+'s'; h.style.animationDelay=(Math.random()*.8)+'s';
    layer.appendChild(h); setTimeout(()=>h.remove(),10500);
  }
}
function resetActions(){ actions.innerHTML=''; }
function button(label, cls, handler){const b=document.createElement('button');b.className='btn '+cls;b.textContent=label;b.addEventListener('click',handler);return b;}
function choice(label, emoji, onClick){const b=document.createElement('button');b.className='choice';b.innerHTML=`<span style="font-size:1.3rem">${emoji}</span><br>${label}`;b.addEventListener('click',()=>{document.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');onClick(label,b);});return b;}
function setHeader(icon, small, title, desc){sticker.textContent=icon;eyebrow.textContent=small;heading.textContent=title;subtitle.textContent=desc;}
function evadeNo(){
  if(step!==0) return;
  noCount++;
  const maxX=Math.max(10,Math.min(130,window.innerWidth/2-100));
  const maxY=55;
  noBtn.style.position='absolute';
  noBtn.style.left=(Math.random()*(maxX*2)-maxX)+'px';
  noBtn.style.top=(Math.random()*(maxY*2)-maxY)+'px';
  const lines=['Hehe, too slow 🙈','Are you sure? 🥺','The universe says try YES 💫','Nope, that button is shy! 💗','One more chance? 🌷','My heart is buffering… 💓'];
  showToast(lines[(noCount-1)%lines.length]);
  if(noCount===3) microcopy.textContent='The "No" button is a little shy… maybe press YES? 💕';
}
noBtn.addEventListener('mouseenter',evadeNo);
noBtn.addEventListener('click',evadeNo);
noBtn.addEventListener('touchstart',(e)=>{e.preventDefault();evadeNo();},{passive:false});

yesBtn.addEventListener('click',()=>{
  step=1; burstHearts(30); updateProgress(1);
  setHeader('🥹💞','YOU JUST MADE MY DAY','YAYYYYY! It\'s a date! 🌷','Now let\'s make our little plan extra special.');
  resetActions();
  actions.append(choice('A cozy café date','☕',v=>{chosenDate=v;showToast('Café date is such a sweet choice! ☕');}));
  actions.append(choice('Sunset walk','🌅',v=>{chosenDate=v;showToast('Golden-hour romance, coming up! 🌅');}));
  actions.append(choice('Movie & snacks','🎬',v=>{chosenDate=v;showToast('A cute movie date! 🍿');}));
  actions.append(choice('Bookshop adventure','📚',v=>{chosenDate=v;showToast('A storybook kind of date! 📚');}));
  actions.append(button('NEXT: PICK THE VIBE ✨','btn-yes wide',showMood));
  microcopy.textContent='Choose whichever feels most like us 💗';
});
function showMood(){
  step=2; updateProgress(2); burstHearts(12);
  setHeader('💌🌸','THE LITTLE DETAILS','What should our date feel like?','Pick a vibe—or change your mind as much as you like.');
  resetActions();
  actions.append(choice('Soft & romantic','🕯️',v=>{chosenMood=v;}));
  actions.append(choice('Silly & playful','🧸',v=>{chosenMood=v;}));
  actions.append(choice('Fancy & dreamy','✨',v=>{chosenMood=v;}));
  actions.append(choice('Simple & heartfelt','💗',v=>{chosenMood=v;}));
  actions.append(button('NEXT: WRITE A LITTLE NOTE 💌','btn-yes wide',showNote));
  const back=document.createElement('button');back.className='back';back.textContent='← Back to date ideas';back.onclick=()=>{step=1;updateProgress(1);location.reload();};actions.append(back);
  microcopy.textContent='There are no wrong answers, just cute ones.';
}
function showNote(){
  step=3; updateProgress(3); burstHearts(22);
  setHeader('📝💖','ONE LAST LITTLE THING','Leave a tiny note for me','Add a date, a sweet message, or just your favourite emoji.');
  resetActions();
  const wrap=document.createElement('div');wrap.style.width='100%';
  wrap.innerHTML=`<div class="field"><label for="dateChoice">Our date (optional)</label><input id="dateChoice" type="date"></div>
  <div class="field"><label for="noteText">Your little message</label><textarea id="noteText" maxlength="220" placeholder="Maybe: I'm looking forward to spending time with you… 💗"></textarea></div>
  <div class="field"><label for="songChoice">Our date soundtrack (optional)</label><input id="songChoice" maxlength="80" placeholder="A song that feels like us 🎶"></div>`;
  actions.append(wrap);
  actions.append(button('MAKE OUR LITTLE PLAN 💘','btn-yes wide',finish));
  const back=document.createElement('button');back.className='back';back.textContent='← Back to vibes';back.onclick=showMood;actions.append(back);
  microcopy.textContent='This is just a cute little plan—nothing gets sent anywhere.';
}
function finish(){
  const date=$('dateChoice').value, note=$('noteText').value.trim(), song=$('songChoice').value.trim();
  const dateText=date?new Date(date+'T12:00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'}):'Whenever we both feel like it';
  step=4; progress.style.display='none'; burstHearts(42);
  setHeader('💑💐','IT\'S A LITTLE DATE PLAN','A tiny plan, a big smile','The sweetest part is getting to spend time together.');
  resetActions();
  const summary=document.createElement('div');summary.className='success-note';
  summary.innerHTML=`<strong>Our date idea:</strong> ${escapeHTML(chosenDate||'A surprise date')}<br><strong>The vibe:</strong> ${escapeHTML(chosenMood||'Soft & romantic')}<br><strong>When:</strong> ${escapeHTML(dateText)}${song?`<br><strong>Soundtrack:</strong> ${escapeHTML(song)}`:''}${note?`<br><br><strong>A little note:</strong><br>"${escapeHTML(note)}"`:''}`;
  actions.append(summary);
  actions.append(button('CELEBRATE AGAIN 💞','btn-yes wide',()=>{burstHearts(35);showToast('Sending you imaginary flowers 🌷');}));
  const restart=document.createElement('button');restart.className='back';restart.textContent='Start over';restart.onclick=()=>location.reload();actions.append(restart);
  microcopy.textContent='Made with care. Share the page only with someone you want to invite.';
}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
setInterval(()=>{if(Math.random()>.45)burstHearts(1)},2500);