// ---- ambient sparkles ----
function initSparkles(){
  const field = document.getElementById('sparkleField');
  if(!field) return;
  for(let i=0;i<14;i++){
    const s = document.createElement('div');
    s.className='sparkle';
    s.textContent = (i % 2 === 0) ? '❀' : '✦';
    s.style.left = Math.random()*100+'vw';
    s.style.top = Math.random()*100+'vh';
    s.style.animationDelay = (Math.random()*6)+'s';
    s.style.fontSize = (9+Math.random()*8)+'px';
    s.style.color = (i % 2 === 0) ? 'var(--rose-deep)' : 'var(--gold)';
    field.appendChild(s);
  }
}

// ---- background music, persists play state across pages via sessionStorage ----
function initMusic(){
  const audio = document.getElementById('bgMusic');
  const toggle = document.getElementById('musicToggle');
  if(!audio || !toggle) return;

  const iconPlay = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const iconPause = '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

  function setPlayingUI(isPlaying){
    toggle.innerHTML = isPlaying ? iconPause : iconPlay;
    toggle.classList.toggle('playing', isPlaying);
  }

  // resume playback state when navigating between pages
  if(sessionStorage.getItem('musicPlaying') === 'true'){
    audio.currentTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
    audio.play().then(()=> setPlayingUI(true)).catch(()=> setPlayingUI(false));
  } else {
    setPlayingUI(false);
  }

  toggle.addEventListener('click', ()=>{
    if(audio.paused){
      audio.play();
      sessionStorage.setItem('musicPlaying','true');
      setPlayingUI(true);
    } else {
      audio.pause();
      sessionStorage.setItem('musicPlaying','false');
      setPlayingUI(false);
    }
  });

  // remember position before leaving the page
  window.addEventListener('beforeunload', ()=>{
    sessionStorage.setItem('musicTime', audio.currentTime);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initSparkles();
  initMusic();
});
