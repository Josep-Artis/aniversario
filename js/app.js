// ============================================
//  APP.JS - Lógica principal del Wrap Aniversario
//  v2 - Con vídeo local, mapa Google Maps, carta animada y Spotify
// ============================================
 
let estadoMeses = [];
let mesActual = null;
let quizTimerInterval = null;
let titleClickCount = 0;
let letraActual = null;
 
// ---- Inicialización ----
document.addEventListener('DOMContentLoaded', () => {
  cargarEstado();
  iniciarIntro();
  iniciarSpotify();
 
  document.getElementById('password-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
 
  document.getElementById('main-title').addEventListener('click', () => {
    titleClickCount++;
    if (titleClickCount >= 5) { unlockAll(); titleClickCount = 0; }
  });
});
 
// ---- ESTADO ----
function cargarEstado() {
  const guardado = localStorage.getItem('wrap-aniversario-estado');
  if (guardado) {
    const data = JSON.parse(guardado);
    estadoMeses = data;
    MESES.forEach((mes, i) => {
      const s = estadoMeses.find(m => m.id === mes.id);
      if (s) { MESES[i].desbloqueado = s.desbloqueado; MESES[i].completado = s.completado; }
    });
  } else {
    estadoMeses = MESES.map(m => ({ id: m.id, desbloqueado: m.desbloqueado, completado: m.completado }));
  }
}
 
function guardarEstado() {
  estadoMeses = MESES.map(m => ({ id: m.id, desbloqueado: m.desbloqueado, completado: m.completado }));
  localStorage.setItem('wrap-aniversario-estado', JSON.stringify(estadoMeses));
}
 
// ---- INTRO ----
function iniciarIntro() {
  const houseImg = document.getElementById('house-img');
  houseImg.onerror = () => {
    houseImg.style.display = 'none';
    document.getElementById('house-fallback').style.display = 'block';
  };
  setTimeout(() => mostrarPantallaContraseña(), 5000);
}
 
// ---- CONTRASEÑA ----
function mostrarPantallaContraseña() {
  const intro = document.getElementById('intro-screen');
  intro.style.opacity = '0';
  setTimeout(() => {
    intro.style.display = 'none';
    document.getElementById('password-screen').classList.remove('hidden');
    document.getElementById('password-input').focus();
  }, 1000);
}
 
function checkPassword() {
  const input = document.getElementById('password-input').value.trim().toLowerCase();
  const error = document.getElementById('password-error');
  const hint  = document.getElementById('password-hint');
 
  if (CONTRASEÑAS_VALIDAS.includes(input)) {
    error.classList.add('hidden');
    hint.classList.add('hidden');
    document.getElementById('password-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('password-screen').style.display = 'none';
      mostrarPantallaMain();
    }, 800);
  } else {
    error.classList.remove('hidden');
    document.getElementById('password-input').value = '';
    document.getElementById('password-input').focus();
  }
}
 
function toggleHint() {
  document.getElementById('password-hint').classList.toggle('hidden');
}
 
// ---- PANTALLA PRINCIPAL ----
function mostrarPantallaMain() {
  document.getElementById('main-screen').classList.remove('hidden');
  document.getElementById('spotify-player').classList.remove('hidden');
  renderizarGrid();
}
 
function renderizarGrid() {
  const grid = document.getElementById('months-grid');
  grid.innerHTML = '';
  MESES.forEach((mes, index) => {
    const card = document.createElement('div');
    card.className = `month-card ${mes.desbloqueado ? 'unlocked' : 'locked'}`;
    card.style.animationDelay = `${index * 0.08}s`;
    card.innerHTML = `
      <div class="month-card-inner">
        ${mes.desbloqueado
          ? `<div class="month-emoji">${mes.emoji}</div>
             <div class="month-name">${mes.nombre}</div>
             <div class="month-year">${mes.año}</div>
             <div style="font-size:0.75rem; color:var(--text-warm); margin-top:0.3rem; text-align:center;">${mes.descripcion}</div>`
          : `<div class="month-lock">🔒</div>
             <div class="month-name">${mes.nombre}</div>
             <div class="month-year">${mes.año}</div>`
        }
      </div>
      ${mes.completado ? '<div class="month-check">✓</div>' : ''}
    `;
    if (mes.desbloqueado) card.addEventListener('click', () => abrirMes(mes));
    grid.appendChild(card);
  });
}
 
function unlockAll() {
  MESES.forEach(m => m.desbloqueado = true);
  guardarEstado();
  renderizarGrid();
  const hint = document.getElementById('unlock-hint');
  hint.style.opacity = '1';
  hint.style.transition = 'opacity 0.5s';
  setTimeout(() => hint.style.opacity = '0', 3000);
}
 
// ---- MES ----
function abrirMes(mes) {
  mesActual = mes;
  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('month-screen').classList.remove('hidden');
  renderizarMes(mes);
}
 
function goBack() {
  if (quizTimerInterval) { clearInterval(quizTimerInterval); quizTimerInterval = null; }
  document.getElementById('month-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');
  document.getElementById('month-screen').scrollTop = 0;
  // Pausar vídeos al volver
  document.querySelectorAll('#month-content video').forEach(v => v.pause());
}
 
function renderizarMes(mes) {
  const content = document.getElementById('month-content');
  content.innerHTML = '';
 
  const header = document.createElement('div');
  header.className = 'month-header';
  header.innerHTML = `<h2>${mes.emoji} ${mes.nombre} ${mes.año}</h2><p>${mes.descripcion}</p>`;
  content.appendChild(header);
 
  let totalQuizzes = mes.contenido.filter(c => c.tipo === 'quiz').length;
  let quizzesCompletados = 0;
  let quizCount = 0;
 
  mes.contenido.forEach((bloque, i) => {
    const delay = `${i * 0.1}s`;
 
    if (bloque.tipo === 'texto') {
      const el = document.createElement('div');
      el.className = 'story-text';
      el.style.animationDelay = delay;
      el.textContent = bloque.texto;
      content.appendChild(el);
 
    } else if (bloque.tipo === 'foto') {
      const el = document.createElement('div');
      el.className = 'photo-block';
      el.style.animationDelay = delay;
      el.innerHTML = `
        <img src="${bloque.src}" alt="${bloque.caption}" onerror="this.parentElement.style.display='none'" />
        <div class="photo-caption">${bloque.caption}</div>
      `;
      content.appendChild(el);
 
    } else if (bloque.tipo === 'video') {
      // ===== NUEVO: VÍDEO LOCAL =====
      const el = document.createElement('div');
      el.className = 'video-block';
      el.style.animationDelay = delay;
      el.innerHTML = `
        <video controls playsinline preload="metadata">
          <source src="${bloque.src}" type="${bloque.formato || 'video/mp4'}" />
          Tu navegador no soporta vídeo HTML5.
        </video>
        <div class="video-caption">${bloque.caption || ''}</div>
      `;
      content.appendChild(el);
 
    } else if (bloque.tipo === 'mapa') {
      // ===== NUEVO: MAPA GOOGLE MAPS =====
      const el = document.createElement('div');
      el.className = 'map-block';
      el.style.animationDelay = delay;
      // Si pasan embedUrl directo lo usamos, si no construimos uno básico con q=
      const mapSrc = bloque.embedUrl ||
        `https://maps.google.com/maps?q=${encodeURIComponent(bloque.lugar)}&output=embed&z=${bloque.zoom || 15}`;
      el.innerHTML = `
        <iframe
          src="${mapSrc}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="${bloque.caption || bloque.lugar}">
        </iframe>
        <div class="map-caption">
          <span>📍</span> ${bloque.caption || bloque.lugar}
        </div>
      `;
      content.appendChild(el);
 
    } else if (bloque.tipo === 'carta') {
      // ===== NUEVO: CARTA ANIMADA =====
      const el = document.createElement('div');
      el.className = 'letter-trigger';
      el.style.animationDelay = delay;
      el.innerHTML = `
        <div class="letter-trigger-icon">💌</div>
        <h3>${bloque.titulo || 'Tengo algo que decirte...'}</h3>
        <p>Toca para abrir tu carta 💛</p>
      `;
      el.addEventListener('click', () => abrirCarta(bloque.texto));
      content.appendChild(el);
 
    } else if (bloque.tipo === 'quiz') {
      quizCount++;
      const quizEl = crearQuiz(bloque, quizCount, () => {
        quizzesCompletados++;
        if (quizzesCompletados >= totalQuizzes || totalQuizzes === 0) {
          setTimeout(() => mostrarBotonSiguienteMes(mes, content), 600);
        }
      });
      content.appendChild(quizEl);
    }
  });
 
  if (totalQuizzes === 0) {
    setTimeout(() => mostrarBotonSiguienteMes(mes, content), 500);
  }
}
 
// ---- CARTA ----
function abrirCarta(texto) {
  letraActual = texto;
  const modal = document.getElementById('letter-modal');
  const envelope = document.getElementById('envelope');
  const flap = document.getElementById('envelope-flap');
  const paper = document.getElementById('letter-paper');
  const textContent = document.getElementById('letter-text-content');
 
  textContent.textContent = texto;
  modal.classList.remove('hidden');
  paper.classList.add('hidden');
  flap.classList.remove('open');
 
  // Al cabo de 0.8s, abrir el sobre → mostrar carta
  setTimeout(() => {
    flap.classList.add('open');
    setTimeout(() => {
      envelope.style.display = 'none';
      paper.classList.remove('hidden');
    }, 700);
  }, 800);
}
 
function cerrarCarta() {
  const modal = document.getElementById('letter-modal');
  const envelope = document.getElementById('envelope');
  modal.classList.add('hidden');
  envelope.style.display = 'block';
}
 
// ---- QUIZ ----
function crearQuiz(bloque, numero, onCompletado) {
  const div = document.createElement('div');
  div.className = 'quiz-block';
 
  const tiempoTotal = bloque.tiempoSegundos || 15;
  let tiempoRestante = tiempoTotal;
  let respondido = false;
 
  div.innerHTML = `
    ${bloque.foto ? `<img class="quiz-photo" src="${bloque.foto}" alt="Quiz" onerror="this.style.display='none'" />` : ''}
    <div class="quiz-timer">
      <div class="timer-bar-bg"><div class="timer-bar" id="timer-bar-${numero}" style="width:100%"></div></div>
      <div class="timer-count" id="timer-count-${numero}">${tiempoTotal}</div>
    </div>
    <div class="quiz-question">${bloque.pregunta}</div>
    <div class="quiz-options" id="quiz-options-${numero}">
      ${bloque.opciones.map((op, i) => `
        <button class="quiz-option" onclick="responderQuiz(${numero}, ${i}, ${bloque.correcta}, this)" id="option-${numero}-${i}">
          ${op}
        </button>
      `).join('')}
    </div>
    <div class="quiz-result" id="quiz-result-${numero}"></div>
  `;
 
  const tickSfx = document.getElementById('sfx-tick');
  const ringSfx = document.getElementById('sfx-ring');
 
  quizTimerInterval = setInterval(() => {
    if (respondido) { clearInterval(quizTimerInterval); return; }
    tiempoRestante--;
    const bar   = document.getElementById(`timer-bar-${numero}`);
    const count = document.getElementById(`timer-count-${numero}`);
    if (bar)   bar.style.width = `${(tiempoRestante / tiempoTotal) * 100}%`;
    if (count) {
      count.textContent = tiempoRestante;
      if (tiempoRestante <= 4) {
        count.classList.add('urgent');
        if (tickSfx && tickSfx.src) { tickSfx.currentTime = 0; tickSfx.play().catch(() => {}); }
      }
    }
    if (tiempoRestante <= 0) {
      clearInterval(quizTimerInterval);
      if (!respondido) {
        respondido = true;
        if (ringSfx && ringSfx.src) { ringSfx.currentTime = 0; ringSfx.play().catch(() => {}); }
        tiempoAgotado(numero, bloque.correcta, bloque.opciones, onCompletado);
      }
    }
  }, 1000);
 
  div._onCompletado = onCompletado;
  return div;
}
 
function responderQuiz(numero, seleccion, correcta, btnEl) {
  const options = document.querySelectorAll(`#quiz-options-${numero} .quiz-option`);
  const result  = document.getElementById(`quiz-result-${numero}`);
  options.forEach(b => b.disabled = true);
  options[correcta].classList.add('correct');
  if (seleccion !== correcta) btnEl.classList.add('wrong');
  if (quizTimerInterval) { clearInterval(quizTimerInterval); quizTimerInterval = null; }
 
  const correcto = seleccion === correcta;
  if (correcto) {
    const sfx = document.getElementById('sfx-correct');
    if (sfx && sfx.src) { sfx.currentTime = 0; sfx.play().catch(() => {}); }
    result.className = 'quiz-result correct-result';
    result.textContent = '¡Correcto! 🎉 Lo sabía que te acordabas 💛';
  } else {
    const sfx = document.getElementById('sfx-wrong');
    if (sfx && sfx.src) { sfx.currentTime = 0; sfx.play().catch(() => {}); }
    result.className = 'quiz-result wrong-result';
    result.textContent = `❌ ¡Casi! La respuesta era: "${document.getElementById(`option-${numero}-${correcta}`).textContent.trim()}"`;
  }
 
  setTimeout(() => {
    document.querySelectorAll('.quiz-block').forEach(block => {
      if (block._onCompletado) { block._onCompletado(); block._onCompletado = null; }
    });
  }, 1500);
}
 
function tiempoAgotado(numero, correcta, opciones, onCompletado) {
  const options = document.querySelectorAll(`#quiz-options-${numero} .quiz-option`);
  const result  = document.getElementById(`quiz-result-${numero}`);
  options.forEach(b => b.disabled = true);
  options[correcta].classList.add('correct');
  result.className = 'quiz-result wrong-result';
  result.textContent = `⏰ ¡Se acabó el tiempo! La respuesta era: "${opciones[correcta]}"`;
  setTimeout(() => { if (onCompletado) onCompletado(); }, 1500);
}
 
// ---- BOTÓN SIGUIENTE MES ----
function mostrarBotonSiguienteMes(mes, content) {
  mes.completado = true;
  const idx = MESES.findIndex(m => m.id === mes.id);
  if (idx !== -1 && idx < MESES.length - 1) MESES[idx + 1].desbloqueado = true;
  guardarEstado();
 
  const esUltimo = idx === MESES.length - 1;
  const btn = document.createElement('div');
 
  if (esUltimo) {
    btn.innerHTML = `
      <div style="text-align:center; padding:2rem 1rem;">
        <div style="font-size:3rem; margin-bottom:1rem;">🎈❤️🎈</div>
        <h2 style="font-family:'Pacifico',cursive; font-size:1.8rem; color:#3D2B1F; margin-bottom:1rem;">
          ¡Feliz aniversario, mi amor!
        </h2>
        <p style="color:#7A4F2E; font-size:1.1rem; line-height:1.7; font-weight:500;">
          Un año increíble a tu lado. Gracias por cada momento, cada risa y cada abrazo.
          Eres lo mejor que me ha pasado. Te quiero muchísimo. 💛
        </p>
        <div style="font-size:2rem; margin-top:1.5rem;">🌹🏠🎈</div>
      </div>
    `;
  } else {
    const sig = MESES[idx + 1];
    btn.innerHTML = `
      <button class="next-month-btn" onclick="goBack()">
        🔓 ¡${sig.nombre} desbloqueado! Volver al inicio →
      </button>
    `;
  }
 
  content.appendChild(btn);
  setTimeout(() => btn.scrollIntoView({ behavior: 'smooth', block: 'end' }), 200);
}
 
// ---- SPOTIFY ----
function iniciarSpotify() {
  if (!SPOTIFY_URL) return;
 
  // Convertir URL de playlist/álbum a embed URL si es necesario
  let embedUrl = SPOTIFY_URL;
  if (SPOTIFY_URL.includes('open.spotify.com') && !SPOTIFY_URL.includes('/embed/')) {
    // https://open.spotify.com/playlist/ID → https://open.spotify.com/embed/playlist/ID
    embedUrl = SPOTIFY_URL.replace('open.spotify.com/', 'open.spotify.com/embed/');
    // Limpiar parámetros extra
    embedUrl = embedUrl.split('?')[0];
  }
 
  const iframe = document.getElementById('spotify-iframe');
  iframe.src = embedUrl + '?utm_source=generator&theme=0';
}
 
function toggleSpotify() {
  const panel = document.getElementById('spotify-panel');
  panel.classList.toggle('open');
  document.getElementById('spotify-icon').textContent = panel.classList.contains('open') ? '✕' : '🎵';
}
 