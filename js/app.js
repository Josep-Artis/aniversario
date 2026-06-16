// ============================================
//  APP.JS v5 - Botón siempre visible, lightbox, sin timers
// ============================================

let mesActual = null;
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

  // Lightbox click fuera cierra
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) cerrarLightbox();
  });
});

// ---- ESTADO ----
function cargarEstado() {
  const guardado = localStorage.getItem('wrap-aniversario-estado');
  if (guardado) {
    const data = JSON.parse(guardado);
    MESES.forEach((mes, i) => {
      const s = data.find(m => m.id === mes.id);
      if (s) { MESES[i].desbloqueado = s.desbloqueado; MESES[i].completado = s.completado; }
    });
  }
}

function guardarEstado() {
  const estado = MESES.map(m => ({ id: m.id, desbloqueado: m.desbloqueado, completado: m.completado }));
  localStorage.setItem('wrap-aniversario-estado', JSON.stringify(estado));
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
  if (CONTRASEÑAS_VALIDAS.includes(input)) {
    document.getElementById('password-error').classList.add('hidden');
    document.getElementById('password-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('password-screen').style.display = 'none';
      mostrarPantallaMain();
    }, 800);
  } else {
    document.getElementById('password-error').classList.remove('hidden');
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
             <div style="font-size:0.75rem;color:var(--text-warm);margin-top:0.3rem;text-align:center;">${mes.descripcion}</div>`
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
  if (textoAnimadoInterval) { clearInterval(textoAnimadoInterval); textoAnimadoInterval = null; }
  document.getElementById('month-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');
  document.getElementById('month-screen').scrollTop = 0;
  document.querySelectorAll('#month-content video').forEach(v => v.pause());
  renderizarGrid();
}

function renderizarMes(mes) {
  const content = document.getElementById('month-content');
  content.innerHTML = '';

  // Cabecera
  const header = document.createElement('div');
  header.className = 'month-header';
  header.innerHTML = `<h2>${mes.emoji} ${mes.nombre} ${mes.año}</h2><p>${mes.descripcion}</p>`;
  content.appendChild(header);

  let fotoBuffer = [];

  function flushFotos() {
    if (fotoBuffer.length === 0) return;
    if (fotoBuffer.length === 1) {
      content.appendChild(fotoBuffer[0]);
    } else {
      const gallery = document.createElement('div');
      gallery.className = `photo-gallery cols-${Math.min(fotoBuffer.length, 3)}`;
      fotoBuffer.forEach(el => gallery.appendChild(el));
      content.appendChild(gallery);
    }
    fotoBuffer = [];
  }

  mes.contenido.forEach((bloque, i) => {

    if (bloque.tipo === 'foto') {
      const el = document.createElement('div');
      el.className = 'photo-block';
      const imgStyle = bloque.noZoom ? 'object-fit:contain;background:#f9f3e8;' : '';
      const img = document.createElement('img');
      img.src = bloque.src;
      img.alt = bloque.caption;
      img.style.cssText = imgStyle;
      img.onerror = () => el.style.display = 'none';
      img.addEventListener('click', () => abrirLightbox(bloque.src, bloque.caption));
      const caption = document.createElement('div');
      caption.className = 'photo-caption';
      caption.textContent = bloque.caption;
      el.appendChild(img);
      el.appendChild(caption);
      fotoBuffer.push(el);
      const sig = mes.contenido[i + 1];
      if (!sig || sig.tipo !== 'foto' || fotoBuffer.length >= 3) flushFotos();
      return;
    }

    flushFotos();

    if (bloque.tipo === 'texto') {
      const el = document.createElement('div');
      el.className = 'story-text';
      el.textContent = bloque.texto;
      content.appendChild(el);

    } else if (bloque.tipo === 'texto-animado') {
      content.appendChild(crearTextoAnimado(bloque.texto));

    } else if (bloque.tipo === 'video') {
      const el = document.createElement('div');
      el.className = 'video-block';
      el.innerHTML = `
        <video controls playsinline preload="metadata">
          <source src="${bloque.src}" type="${bloque.formato || 'video/mp4'}" />
        </video>
        <div class="video-caption">${bloque.caption || ''}</div>
      `;
      content.appendChild(el);

    } else if (bloque.tipo === 'mapa') {
      content.appendChild(crearMapaMultiPin(bloque));

    } else if (bloque.tipo === 'carta') {
      const el = document.createElement('div');
      el.className = 'letter-trigger';
      el.innerHTML = `
        <div class="letter-trigger-icon">💌</div>
        <h3>${bloque.titulo || 'Tengo algo que decirte...'}</h3>
        <p>Toca para abrir tu carta 💛</p>
      `;
      el.addEventListener('click', () => abrirCarta(bloque.texto));
      content.appendChild(el);

    } else if (bloque.tipo === 'quiz') {
      content.appendChild(crearQuiz(bloque));
    }
  });

  flushFotos();

  // Botón siguiente mes — siempre al final, independiente del quiz
  mostrarBotonSiguienteMes(mes, content);
}

// ---- LIGHTBOX ----
function abrirLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption || '';
  lb.classList.remove('hidden');
}

function cerrarLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.getElementById('lightbox-img').src = '';
}

// ---- TEXTO ANIMADO ----
function crearTextoAnimado(texto) {
  const wrapper = document.createElement('div');
  wrapper.className = 'story-text texto-animado-wrapper';

  const display = document.createElement('div');
  display.className = 'texto-animado-display';
  wrapper.appendChild(display);

  const btn = document.createElement('button');
  btn.className = 'texto-animado-btn';
  btn.textContent = '▶ Leer carta';
  btn.onclick = () => {
    btn.style.display = 'none';
    display.innerHTML = '';

    const parrafos = texto.split('\n\n');
    let palabras = [];
    parrafos.forEach((p, pi) => {
      p.trim().split(' ').forEach((w, wi) => {
        palabras.push({ texto: w, newParagraph: wi === 0 && pi > 0 });
      });
    });

    let parrafoActual = document.createElement('p');
    display.appendChild(parrafoActual);
    let idx = 0;

    textoAnimadoInterval = setInterval(() => {
      if (idx >= palabras.length) { clearInterval(textoAnimadoInterval); return; }
      const item = palabras[idx];
      if (item.newParagraph) {
        parrafoActual = document.createElement('p');
        display.appendChild(parrafoActual);
      }
      const span = document.createElement('span');
      span.className = 'palabra-animada';
      span.textContent = item.texto + ' ';
      parrafoActual.appendChild(span);
      idx++;
    }, 110);
  };
  wrapper.appendChild(btn);
  return wrapper;
}

// ---- MAPA MULTI-PIN ----
function crearMapaMultiPin(bloque) {
  const wrapper = document.createElement('div');
  wrapper.className = 'map-block mapa-multi';

  const lats = bloque.pines.map(p => p.lat);
  const lngs = bloque.pines.map(p => p.lng);
  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  const mapSrc = `https://maps.google.com/maps?q=${centerLat},${centerLng}&z=14&output=embed`;

  wrapper.innerHTML = `
    <div class="mapa-titulo">${bloque.titulo || 'Nuestros sitios especiales 📍'}</div>
    <iframe src="${mapSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
  const modal    = document.getElementById('letter-modal');
  const envelope = document.getElementById('envelope');
  const flap     = document.getElementById('envelope-flap');
  const paper    = document.getElementById('letter-paper');
  document.getElementById('letter-text-content').textContent = texto;

  modal.classList.remove('hidden');
  paper.classList.add('hidden');
  envelope.style.display = 'block';
  flap.classList.remove('open');

  setTimeout(() => {
    flap.classList.add('open');
    setTimeout(() => { envelope.style.display = 'none'; paper.classList.remove('hidden'); }, 700);
  }, 800);
}

function cerrarCarta() {
  document.getElementById('letter-modal').classList.add('hidden');
  document.getElementById('envelope').style.display = 'block';
}

// ---- QUIZ (sin timer) ----
function crearQuiz(bloque) {
  const div = document.createElement('div');
  div.className = 'quiz-block';

  let mediaHtml = '';
  if (bloque.video) {
    mediaHtml = `<video class="quiz-photo" controls playsinline preload="metadata">
      <source src="${bloque.video}" type="video/mp4" /></video>`;
  } else if (bloque.foto) {
    mediaHtml = `<img class="quiz-photo" src="${bloque.foto}" alt="Quiz" onerror="this.style.display='none'" />`;
  }

  const quizId = 'quiz-' + Math.random().toString(36).substr(2, 9);

  div.innerHTML = `
    ${mediaHtml}
    <div class="quiz-question">${bloque.pregunta}</div>
    <div class="quiz-options" id="opts-${quizId}">
      ${bloque.opciones.map((op, i) => `
        <button class="quiz-option" data-idx="${i}">${op}</button>
      `).join('')}
    </div>
    <div class="quiz-result" id="res-${quizId}"></div>
  `;

  const optsEl = div.querySelector(`#opts-${quizId}`);
  const resEl  = div.querySelector(`#res-${quizId}`);

  optsEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = parseInt(btn.dataset.idx);
      optsEl.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
      optsEl.querySelectorAll('.quiz-option')[bloque.correcta].classList.add('correct');
      if (sel !== bloque.correcta) btn.classList.add('wrong');

      if (sel === bloque.correcta) {
        resEl.className = 'quiz-result correct-result';
        resEl.textContent = '¡Correcto! 🎉 Lo sabía que te acordabas 💛';
      } else {
        resEl.className = 'quiz-result wrong-result';
        resEl.textContent = `❌ ¡Casi! La respuesta era: "${bloque.opciones[bloque.correcta]}"`;
      }
    });
  });

  return div;
}

// ---- BOTÓN SIGUIENTE MES ---- (siempre al final)
function mostrarBotonSiguienteMes(mes, content) {
  const idx = MESES.findIndex(m => m.id === mes.id);
  mes.completado = true;
  if (idx !== -1 && idx < MESES.length - 1) MESES[idx + 1].desbloqueado = true;
  guardarEstado();

  const btn = document.createElement('div');
  btn.style.textAlign = 'center';
  btn.style.padding = '2rem 1rem';

  if (idx === MESES.length - 1) {
    btn.innerHTML = `
      <div style="font-size:3rem;margin-bottom:1rem;">🎈❤️🎈</div>
      <h2 style="font-family:'Pacifico',cursive;font-size:1.8rem;color:#3D2B1F;margin-bottom:1rem;">
        ¡Feliz aniversario, mi amor!
      </h2>
      <p style="color:#7A4F2E;font-size:1.1rem;line-height:1.7;font-weight:500;">
        Un año increíble a tu lado. Gracias por cada momento, cada risa y cada abrazo.
        Eres lo mejor que me ha pasado. Te quiero muchísimo. 💛
      </p>
      <div style="font-size:2rem;margin-top:1.5rem;">🌹🏠🎈</div>`;
  } else {
    const sig = MESES[idx + 1];
    btn.innerHTML = `
      <button class="next-month-btn" onclick="goBack()">
        🔓 ¡${sig.nombre} desbloqueado! Volver al inicio →
      </button>`;
  }

  content.appendChild(btn);
  setTimeout(() => btn.scrollIntoView({ behavior: 'smooth', block: 'end' }), 300);
}

// ---- SPOTIFY ----
function iniciarSpotify() {
  if (!SPOTIFY_URL || SPOTIFY_URL.includes('PON_AQUI')) return;
  let embedUrl = SPOTIFY_URL;
  if (SPOTIFY_URL.includes('open.spotify.com') && !SPOTIFY_URL.includes('/embed/')) {
    embedUrl = SPOTIFY_URL.replace('open.spotify.com/', 'open.spotify.com/embed/').split('?')[0];
  }
  const iframe = document.getElementById('spotify-iframe');
  if (iframe) iframe.src = embedUrl + '?utm_source=generator&theme=0';

  // Abrir el panel por defecto
  const panel = document.getElementById('spotify-panel');
  panel.classList.add('open');
  document.getElementById('spotify-icon').textContent = '✕';
}

function toggleSpotify() {
  const panel = document.getElementById('spotify-panel');
  panel.classList.toggle('open');
  document.getElementById('spotify-icon').textContent = panel.classList.contains('open') ? '✕' : '🎵';
}
