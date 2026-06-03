const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('iub-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', next);
    localStorage.setItem('iub-theme', next);
    updateThemeIcons();
  });
}

function updateThemeIcons() {
  const current = html.getAttribute('data-theme');
  document.body.classList.toggle('dark-active', current === 'dark');
}
updateThemeIcons();

const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }, { passive: true });
}

function initMagneticButtons() {
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.30;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 0.30;
      btn.style.transform = `translate(${dx * rect.width}px, ${dy * rect.height}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => { 
      btn.style.transform = ''; 
    });
  });
}
initMagneticButtons();

function initTilt() {
  document.querySelectorAll('.bento-card, .stat-card, .ext-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) perspective(700px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => { 
      card.style.transform = ''; 
    });
  });
}
initTilt();

(function() {
  const phone = document.querySelector('.hero-phone-graphic');
  if (!phone) return;
  
  document.addEventListener('mousemove', (e) => {
    const dx = (e.clientX / window.innerWidth - 0.5) * 8;
    const dy = (e.clientY / window.innerHeight - 0.5) * 6;
    phone.style.transform = `rotateY(${dx}deg) rotateX(${-dy}deg)`;
  }, { passive: true });
})();

const navbar = document.getElementById('navbar');
const scrollBtn = document.getElementById('scrollTop');

if (navbar) {
  const navSentinel = document.createElement('div');
  navSentinel.style.cssText = 'position:absolute;top:40px;height:1px;width:1px;pointer-events:none;opacity:0;';
  document.body.prepend(navSentinel);
  
  new IntersectionObserver((e) => {
    navbar.classList.toggle('stuck', !e[0].isIntersecting);
  }, { threshold: 0 }).observe(navSentinel);
}

if (scrollBtn) {
  const ss = document.createElement('div');
  ss.style.cssText = 'position:absolute;top:500px;height:1px;width:1px;pointer-events:none;opacity:0;';
  document.body.prepend(ss);
  
  new IntersectionObserver((e) => {
    scrollBtn.classList.toggle('show', !e[0].isIntersecting);
  }, { threshold: 0 }).observe(ss);
}

document.getElementById('scrollTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  
  const id = a.getAttribute('href');
  if (id === '#') return;
  
  const target = document.querySelector(id);
  if (!target) return;
  
  e.preventDefault();
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - (navbar?.offsetHeight || 72),
    behavior: 'smooth',
  });
});

const spyObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

document.querySelectorAll('section[id]').forEach((s) => spyObs.observe(s));

const drawer = document.getElementById('mobileDrawer');
const hamburger = document.getElementById('hamburger');

window.toggleMenu = function() {
  if (drawer && hamburger) {
    drawer.classList.toggle('open');
    hamburger.classList.toggle('active');
  }
}

document.addEventListener('click', (e) => {
  if (!drawer || !hamburger || !drawer.classList.contains('open')) return;
  
  if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
    drawer.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && drawer?.classList.contains('open')) {
    drawer.classList.remove('open');
    hamburger?.classList.remove('active');
  }
}, { passive: true });

(function() {
  const t = document.getElementById('tickerTrack');
  if (t) t.innerHTML += t.innerHTML;
})();

document.querySelectorAll('.edu-sym').forEach((s) => {
  s.style.animationDelay = (Math.random() * -35) + 's';
});

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.fade-up, .slide-left, .slide-right, .scale-in').forEach((el) => revealObs.observe(el));

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.glow-orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${y * (i % 2 === 0 ? 0.07 : -0.05)}px)`;
  });
}, { passive: true });

document.querySelectorAll('.section-eyebrow').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    el.style.letterSpacing = '0.2em';
    el.style.boxShadow = '0 4px 12px rgba(255,184,28,0.3)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.letterSpacing = '';
    el.style.boxShadow = '';
  });
});

function updateWaLabel() {
  const label = document.querySelector('.wa-label');
  if (label) label.style.display = window.innerWidth < 400 ? 'none' : '';
}
updateWaLabel();
window.addEventListener('resize', updateWaLabel, { passive: true });

const statsSection = document.getElementById('about');
if (statsSection) {
  let ran = false;
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !ran) {
      ran = true;
      document.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const dur = 1400; 
        const s = performance.now();
        
        const step = (now) => {
          const p = Math.min((now - s) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3); 
          el.textContent = Math.floor(e * target).toLocaleString() + '+';
          
          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target.toLocaleString() + '+';
          }
        };
        requestAnimationFrame(step);
      });
    }
  }, { threshold: 0.15 }).observe(statsSection);
}

window.changeMap = function(campusName, searchQuery) {
  document.getElementById('active-campus-title').innerHTML = '<i class="fa-solid fa-map-location-dot" style="color: var(--theme-blue); margin-right: 8px;"></i> ' + campusName;
  document.getElementById('active-campus-iframe').src = "https://maps.google.com/maps?q=" + searchQuery + "&t=&z=14&ie=UTF8&iwloc=&output=embed";
  document.getElementById('active-campus-link').href = "https://maps.google.com/maps?q=" + searchQuery;
}

window.submitForm = function() {
  const n = document.getElementById('cf-name');
  const em = document.getElementById('cf-email');
  const m = document.getElementById('cf-msg');
  const fb = document.getElementById('form-feedback');
  
  if (!n || !em || !m || !fb) return;
  
  [n, em, m].forEach((el) => el.classList.remove('input-error'));
  fb.className = 'form-note'; 
  fb.textContent = '';
  
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let ok = true;
  
  if (!n.value.trim()) { 
    n.classList.add('input-error'); 
    ok = false; 
  }
  if (!emailRx.test(em.value)) { 
    em.classList.add('input-error'); 
    ok = false; 
  }
  if (!m.value.trim()) { 
    m.classList.add('input-error'); 
    ok = false; 
  }
  
  if (!ok) { 
    fb.textContent = 'Please fill all fields correctly.'; 
    fb.classList.add('error'); 
    return; 
  }
  
  fb.textContent = 'Message sent successfully!'; 
  fb.classList.add('success');
  
  n.value = ''; 
  em.value = ''; 
  m.value = '';
}