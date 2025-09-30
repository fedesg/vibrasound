// Resalta el enlace activo del menú
(function setActiveNav(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === here) a.classList.add('active');
  });
})();

// Lightbox simple (compartido)
window.Lightbox = (function(){
  let images = [], index = 0;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  const btnClose = document.getElementById('close');

  function open(list, start=0){
    images = list; index = start;
    img.src = images[index];
    lb.classList.add('open');
  }
  function close(){ lb.classList.remove('open'); img.src=""; }
  function nav(step){ if(!images.length) return; index = (index + step + images.length) % images.length; img.src = images[index]; }

  if(btnPrev) btnPrev.onclick = ()=>nav(-1);
  if(btnNext) btnNext.onclick = ()=>nav(1);
  if(btnClose) btnClose.onclick = close;
  if(lb) lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
  window.addEventListener('keydown', e=>{
    if(!lb || !lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowRight') nav(1);
    if(e.key==='ArrowLeft') nav(-1);
  });

  return { open, close };
})();
