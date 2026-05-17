// ============================================
//  APP.JS - Lógica principal del Wrap Aniversario
//  v3 - Con texto animado, mapa multi-pin, vídeo en quiz
// ============================================

let estadoMeses = [];
let mesActual = null;
let quizTimerInterval = null;
let textoAnimadoInterval = null;
let titleClickCount = 0;

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
  if (textoAnimadoInterval) { clearInterval(textoAnimadoInterval); textoAnimadoInterval = null; }
  document.getElementById('month-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');
  document.getElementById('month-screen').scrollTop = 0;
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

  // Agrupar fotos consecutivas en galerías
  let buffer = [];

  function flushBuffer() {
    if (buffer.length === 0) return;
    if (buffer.length === 1) {
      content.appendChild(buffer[0]);
    } else {
      const gallery = document.createElement('div');
      gallery.className = `photo-gallery cols-${Math.min(buffer.length, 3)}`;
      buffer.forEach(el => gallery.appendChild(el));
      content.appendChild(gallery);
    }
    buffer = [];
  }

  mes.contenido.forEach((bloque, i) => {
    const delay = `${i * 0.08}s`;

    if (bloque.tipo === 'texto') {
      flushBuffer();
      const el = document.createElement('div');
      el.className = 'story-text';
      el.style.animationDelay = delay;
      el.textContent = bloque.texto;
      content.appendChild(el);

    } else if (bloque.tipo === 'texto-animado') {
      flushBuffer();
      const el = crearTextoAnimado(bloque.texto, delay);
      content.appendChild(el);

    } else if (bloque.tipo === 'foto') {
      const el = document.createElement('div');
      el.className = 'photo-block';
      el.style.animationDelay = delay;
      const imgStyle = bloque.noZoom ? 'object-fit: contain; background:#f9f3e8;' : '';
      el.innerHTML = `
        <img src="${bloque.src}" alt="${bloque.caption}" style="${imgStyle}" onerror="this.parentElement.style.display='none'" />
        <div class="photo-caption">${bloque.caption}</div>
      `;
      buffer.push(el);
      // Flush si el siguiente NO es foto
      const siguiente = mes.contenido[i + 1];
      if (!siguiente || siguiente.tipo !== 'foto' || buffer.length >= 3) {
        flushBuffer();
      }

    } else if (bloque.tipo === 'video') {
      flushBuffer();
      const el = document.createElement('div');
      el.className = 'video-block';
      el.style.animationDelay = delay;
      el.innerHTML = `
        <video controls playsinline preload="metadata">
          <source src="${bloque.src}" type="${bloque.formato || 'video/mp4'}" />
        </video>
        <div class="video-caption">${bloque.caption || ''}</div>
      `;
      content.appendChild(el);

    } else if (bloque.tipo === 'mapa') {
      flushBuffer();
      // ===== MAPA MULTI-PIN =====
      const el = crearMapaMultiPin(bloque);
      content.appendChild(el);

    } else if (bloque.tipo === 'carta') {
      flushBuffer();
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
      flushBuffer();
      quizCount++;
      const quizEl = crearQuiz(bloque, quizCount, () => {
        quizzesCompletados++;
        if (quizzesCompletados >= totalQuizzes) {
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

// ---- TEXTO ANIMADO ----
function crearTextoAnimado(texto, delay) {
  const wrapper = document.createElement('div');
  wrapper.className = 'story-text texto-animado-wrapper';
  wrapper.style.animationDelay = delay;
  wrapper.style.minHeight = '100px';

  const display = document.createElement('div');
  display.className = 'texto-animado-display';
  wrapper.appendChild(display);

  const btn = document.createElement('button');
  btn.className = 'texto-animado-btn';
  btn.textContent = '▶ Leer carta';
  btn.onclick = () => iniciarTextoAnimado(texto, display, btn);
  wrapper.appendChild(btn);

  return wrapper;
}

function iniciarTextoAnimado(texto, display, btn) {
  btn.style.display = 'none';
  display.innerHTML = '';

  // Separar por párrafos y luego por palabras
  const parrafos = texto.split('\n\n');
  let palabrasTotales = [];

  parrafos.forEach((parrafo, pi) => {
    const palabras = parrafo.trim().split(' ');
    palabras.forEach((p, wi) => {
      palabrasTotales.push({ texto: p, esFinParrafo: wi === palabras.length - 1 && pi < parrafos.length - 1 });
    });
  });

  let i = 0;
  let parrafoActual = document.createElement('p');
  parrafoActual.style.marginBottom = '1rem';
  display.appendChild(parrafoActual);

  textoAnimadoInterval = setInterval(() => {
    if (i >= palabrasTotales.length) {
      clearInterval(textoAnimadoInterval);
      textoAnimadoInterval = null;
      return;
    }

    const item = palabrasTotales[i];
    const span = document.createElement('span');
    span.textContent = item.texto + ' ';
    span.className = 'palabra-animada';
    span.style.animationDelay = '0s';
    parrafoActual.appendChild(span);

    if (item.esFinParrafo) {
      parrafoActual = document.createElement('p');
      parrafoActual.style.marginBottom = '1rem';
      display.appendChild(parrafoActual);
    }

    // Scroll suave al último elemento
    display.scrollIntoView({ behavior: 'smooth', block: 'end' });
    i++;
  }, 120); // Una palabra cada 120ms
}

// ---- MAPA MULTI-PIN ----
function crearMapaMultiPin(bloque) {
  const wrapper = document.createElement('div');
  wrapper.className = 'map-block mapa-multi';

  // Calcular centro del mapa
  const lats = bloque.pines.map(p => p.lat);
  const lngs = bloque.pines.map(p => p.lng);
  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  // Construir URL de Google Maps con múltiples marcadores
  // Usamos el modo embed con búsqueda del centro + markers como waypoints
  const markersParam = bloque.pines.map(p => `${p.lat},${p.lng}`).join('|');
  
  // Google Maps embed con múltiples pins usando el modo directions o search
  // La forma más fiable: iframe con mapa centrado + lista de sitios debajo
  const mapSrc = `https://maps.google.com/maps?q=${centerLat},${centerLng}&z=14&output=embed`;

  wrapper.innerHTML = `
    <div class="mapa-titulo">${bloque.titulo || 'Nuestros sitios especiales 📍'}</div>
    <iframe
      src="${mapSrc}"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="${bloque.titulo || 'Mapa'}">
    </iframe>
    <div class="mapa-pines-lista">
      ${bloque.pines.map(p => `
        <a class="mapa-pin-item" href="https://maps.google.com/?q=${p.lat},${p.lng}" target="_blank">
          <span class="mapa-pin-label">${p.label}</span>
          <span class="mapa-pin-desc">${p.descripcion || ''}</span>
        </a>
      `).join('')}
    </div>
  `;

  return wrapper;
}

// ---- CARTA ----
function abrirCarta(texto) {
  const modal = document.getElementById('letter-modal');
  const envelope = document.getElementById('envelope');
  const flap = document.getElementById('envelope-flap');
  const paper = document.getElementById('letter-paper');
  const textContent = document.getElementById('letter-text-content');

  textContent.textContent = texto;
  modal.classList.remove('hidden');
  paper.classList.add('hidden');
  envelope.style.display = 'block';
  flap.classList.remove('open');

  setTimeout(() => {
    flap.classList.add('open');
    setTimeout(() => {
      envelope.style.display = 'none';
      paper.classList.remove('hidden');
    }, 700);
  }, 800);
}

function cerrarCarta() {
  document.getElementById('letter-modal').classList.add('hidden');
  document.getElementById('envelope').style.display = 'block';
}

// ---- QUIZ ----
function crearQuiz(bloque, numero, onCompletado) {
  const div = document.createElement('div');
  div.className = 'quiz-block';

  const tiempoTotal = bloque.tiempoSegundos || 0;
  const conTiempo = tiempoTotal > 0;
  let tiempoRestante = tiempoTotal;
  let respondido = false;

  // Si el quiz tiene vídeo, lo añadimos arriba
  let mediaHtml = '';
  if (bloque.video) {
    mediaHtml = `
      <video class="quiz-photo" controls playsinline preload="metadata" style="max-height:200px; width:100%; border-radius:14px; margin-bottom:1rem;">
        <source src="${bloque.video}" type="video/mp4" />
      </video>
    `;
  } else if (bloque.foto) {
    mediaHtml = `<img class="quiz-photo" src="${bloque.foto}" alt="Quiz" onerror="this.style.display='none'" />`;
  }

  div.innerHTML = `
    ${mediaHtml}
    ${conTiempo ? `
    <div class="quiz-timer">
      <div class="timer-bar-bg"><div class="timer-bar" id="timer-bar-${numero}" style="width:100%"></div></div>
      <div class="timer-count" id="timer-count-${numero}">${tiempoTotal}</div>
    </div>` : ''}
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

  // Solo iniciar timer si hay tiempo definido
  if (conTiempo) {
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
  }

  div.dataset.quizNumero = numero;
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

  // Llamar el callback del quiz actual
  setTimeout(() => {
    const thisBlock = document.querySelector(`.quiz-block[data-quiz-numero="${numero}"]`);
    if (thisBlock && thisBlock._onCompletado) {
      thisBlock._onCompletado();
      thisBlock._onCompletado = null;
    }
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
  if (!SPOTIFY_URL || SPOTIFY_URL.includes('PON_AQUI')) return;

  let embedUrl = SPOTIFY_URL;
  if (SPOTIFY_URL.includes('open.spotify.com') && !SPOTIFY_URL.includes('/embed/')) {
    embedUrl = SPOTIFY_URL.replace('open.spotify.com/', 'open.spotify.com/embed/');
    embedUrl = embedUrl.split('?')[0];
  }

  const iframe = document.getElementById('spotify-iframe');
  if (iframe) iframe.src = embedUrl + '?utm_source=generator&theme=0';
}

function toggleSpotify() {
  const panel = document.getElementById('spotify-panel');
  panel.classList.toggle('open');
  document.getElementById('spotify-icon').textContent = panel.classList.contains('open') ? '✕' : '🎵';
}