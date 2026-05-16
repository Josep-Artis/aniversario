// ============================================
//  DATA.JS - Contenido de cada mes
//  v2 - Ahora con: foto, video, mapa, carta, quiz, texto
// ============================================
 
// ====================================================
//  ⭐ PON AQUÍ TU LINK DE SPOTIFY
//  Ejemplo: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
//  Copia el link de compartir de cualquier playlist, álbum o canción
// ====================================================
const SPOTIFY_URL = "https://open.spotify.com/playlist/PON_AQUI_TU_PLAYLIST";
 
// ====================================================
//  TIPOS DE BLOQUES DISPONIBLES:
//
//  { tipo: "texto", texto: "..." }
//
//  { tipo: "foto", src: "img/mes/foto.jpg", caption: "..." }
//
//  { tipo: "video", src: "video/mes/video.mp4", caption: "...", formato: "video/mp4" }
//  → Formatos válidos: "video/mp4", "video/quicktime" (MOV), "video/webm"
//  → Pon los vídeos en la carpeta video/mes/
//
//  { tipo: "mapa", lugar: "Sagrada Familia, Barcelona", caption: "...", zoom: 15 }
//  → 'lugar' puede ser nombre de sitio, dirección, o coordenadas "41.403629,2.174302"
//  → También puedes poner 'embedUrl' directo desde Google Maps → Compartir → Insertar mapa
//
//  { tipo: "carta", titulo: "...", texto: "Aquí el texto de la carta..." }
//  → Aparece como sobre animado. Al tocarlo se abre la carta.
//
//  { tipo: "quiz", foto: "img/mes/quiz.jpg", pregunta: "...",
//    opciones: ["A","B","C","D"], correcta: 0, tiempoSegundos: 15 }
// ====================================================
 
const MESES = [
  {
    id: "mayo-2025",
    nombre: "Mayo",
    año: "2025",
    emoji: "🌸",
    descripcion: "Donde todo empezó...",
    desbloqueado: true,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Era Sant Jordi, y sin saberlo, ese día cambiaría todo. Las primeras quedadas, las primeras risas, y una historia que estaba a punto de empezar... 🌹"
      },
      {
        tipo: "foto",
        src: "img/mayo/foto1.jpg",
        caption: "📍 El principio de todo 💛"
      },
      // EJEMPLO DE MAPA - Pon el sitio donde os conocisteis o vuestra primera cita
      {
        tipo: "mapa",
        lugar: "Carrer de Sant Jordi, Barcelona",   // ← Cambia esto por el sitio real
        caption: "Aquí empezó todo 🌹",
        zoom: 16
      },
      {
        tipo: "quiz",
        foto: "img/mayo/quiz1.jpg",
        pregunta: "¿Qué día especial fue nuestra primera quedada?",
        opciones: ["Sant Joan", "Sant Jordi", "San Valentín", "Año Nuevo"],
        correcta: 1,
        tiempoSegundos: 15
      },
      {
        tipo: "foto",
        src: "img/mayo/foto2.jpg",
        caption: "Los primeros momentos juntos ✨"
      }
    ]
  },
  {
    id: "junio-2025",
    nombre: "Junio",
    año: "2025",
    emoji: "☀️",
    descripcion: "El verano empieza...",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "El calor llegó y con él, muchas aventuras juntos. Cada día era una excusa perfecta para estar juntos. ☀️"
      },
      {
        tipo: "foto",
        src: "img/junio/foto1.jpg",
        caption: "Verano y tú, la mejor combinación 🌻"
      },
      // EJEMPLO DE VÍDEO - Pon un vídeo tuyo del mes
      // { tipo: "video", src: "video/junio/recuerdo.mp4", caption: "Ese momento que nunca olvidaré 🎬" },
      {
        tipo: "quiz",
        foto: "img/junio/quiz1.jpg",
        pregunta: "¿Cuál fue nuestro plan favorito de junio?",
        opciones: ["Playa", "Montaña", "Ciudad", "Casa"],
        correcta: 0,
        tiempoSegundos: 15
      }
    ]
  },
  {
    id: "julio-2025",
    nombre: "Julio",
    año: "2025",
    emoji: "🏖️",
    descripcion: "Verano a tope",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Julio fue puro sol, risas y momentos que no olvidaremos jamás. 🌊"
      },
      {
        tipo: "foto",
        src: "img/julio/foto1.jpg",
        caption: "Días de verano para siempre 💛"
      }
    ]
  },
  {
    id: "agosto-2025",
    nombre: "Agosto",
    año: "2025",
    emoji: "🌊",
    descripcion: "El mes del mar",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Agosto trajo consigo el olor a verano y las mejores tardes juntos. 🌅"
      },
      {
        tipo: "foto",
        src: "img/agosto/foto1.jpg",
        caption: "Atardeceres contigo 🧡"
      },
      // EJEMPLO DE MAPA - Sitio de vacaciones o playa especial
      // { tipo: "mapa", lugar: "Barceloneta, Barcelona", caption: "Nuestra playa favorita 🏖️", zoom: 15 }
    ]
  },
  {
    id: "septiembre-2025",
    nombre: "Septiembre",
    año: "2025",
    emoji: "🍂",
    descripcion: "El otoño llega",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "El verano se fue pero nosotros seguíamos más juntos que nunca. 🍁"
      },
      {
        tipo: "foto",
        src: "img/septiembre/foto1.jpg",
        caption: "Otoño contigo 🍂"
      }
    ]
  },
  {
    id: "octubre-2025",
    nombre: "Octubre",
    año: "2025",
    emoji: "🎃",
    descripcion: "Temporada de planes",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Halloween, planes de otoño y mil momentos especiales. 🎃"
      },
      {
        tipo: "foto",
        src: "img/octubre/foto1.jpg",
        caption: "Octubre juntos 🧡"
      }
    ]
  },
  {
    id: "noviembre-2025",
    nombre: "Noviembre",
    año: "2025",
    emoji: "🌧️",
    descripcion: "Los días de lluvia",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Los días grises son mucho más bonitos contigo. ☕"
      },
      {
        tipo: "foto",
        src: "img/noviembre/foto1.jpg",
        caption: "Días de lluvia y manta 🌧️"
      }
    ]
  },
  {
    id: "diciembre-2025",
    nombre: "Diciembre",
    año: "2025",
    emoji: "🎄",
    descripcion: "Tu cumple y Nochevieja",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Diciembre fue un mes muy especial: tu primer cumple juntos y el primer Año Nuevo que vivimos juntos. ¡El mejor regalo del año eres tú! 🎁🥂"
      },
      {
        tipo: "foto",
        src: "img/diciembre/foto1.jpg",
        caption: "🎂 Tu primer cumpleaños juntos ✨"
      },
      {
        tipo: "quiz",
        foto: "img/diciembre/quiz1.jpg",
        pregunta: "¿Qué deseo pediste cuando soplaste las velas?",
        opciones: ["Viajes juntos", "Salud", "Amor eterno", "No lo recuerdo 😅"],
        correcta: 2,
        tiempoSegundos: 15
      },
      // EJEMPLO DE CARTA - El mensaje de Nochevieja
      {
        tipo: "carta",
        titulo: "Mi carta de Nochevieja",
        texto: "Mi amor,\n\nEste primer año contigo ha sido el más bonito de mi vida. Cada momento a tu lado ha sido un regalo.\n\nNo puedo imaginar este año sin ti, y espero que vengan muchos más.\n\nTe quiero infinito. 💛"
      },
      {
        tipo: "foto",
        src: "img/diciembre/foto2.jpg",
        caption: "🥂 Feliz Año Nuevo, mi amor"
      },
      {
        tipo: "quiz",
        foto: "img/diciembre/quiz2.jpg",
        pregunta: "¿Dónde pasamos la Nochevieja?",
        opciones: ["En casa", "De fiesta", "Con la familia", "En la calle"],
        correcta: 0,
        tiempoSegundos: 15
      }
    ]
  },
  {
    id: "enero-2026",
    nombre: "Enero",
    año: "2026",
    emoji: "🎆",
    descripcion: "Año nuevo, nosotros",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Empezamos el año juntos, con mil sueños y planes por delante. 🎆"
      },
      {
        tipo: "foto",
        src: "img/enero/foto1.jpg",
        caption: "Año nuevo, amor de siempre 💛"
      }
    ]
  },
  {
    id: "febrero-2026",
    nombre: "Febrero",
    año: "2026",
    emoji: "❤️",
    descripcion: "San Valentín",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Nuestro primer San Valentín juntos. Contigo todos los días son San Valentín. ❤️"
      },
      {
        tipo: "foto",
        src: "img/febrero/foto1.jpg",
        caption: "💌 San Valentín contigo"
      },
      {
        tipo: "quiz",
        foto: "img/febrero/quiz1.jpg",
        pregunta: "¿Cuál fue la sorpresa de San Valentín?",
        opciones: ["Flores", "Cena romántica", "Viaje", "Regalo especial"],
        correcta: 1,
        tiempoSegundos: 15
      }
    ]
  },
  {
    id: "marzo-2026",
    nombre: "Marzo",
    año: "2026",
    emoji: "🌷",
    descripcion: "La primavera llega",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "La primavera llegó con sus colores y con ganas de nuevas aventuras juntos. 🌷"
      },
      {
        tipo: "foto",
        src: "img/marzo/foto1.jpg",
        caption: "Primavera juntos 🌸"
      }
    ]
  },
  {
    id: "abril-2026",
    nombre: "Abril",
    año: "2026",
    emoji: "🎈",
    descripcion: "¡Un año juntos!",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Y aquí estamos... un año juntos. Gracias por cada momento, cada risa, cada abrazo. Eres lo mejor que me ha pasado. 🎈❤️"
      },
      {
        tipo: "foto",
        src: "img/abril/foto1.jpg",
        caption: "Un año de los mejores momentos 💛"
      },
      {
        tipo: "mapa",
        lugar: "Barcelona, España",   // ← Puedes poner el sitio donde lo celebréis
        caption: "Donde lo celebramos 🎈",
        zoom: 14
      },
      {
        tipo: "quiz",
        foto: "img/abril/quiz1.jpg",
        pregunta: "¿Cuándo empezó nuestra historia?",
        opciones: ["Sant Jordi 2025", "San Valentín 2025", "Navidad 2024", "Año Nuevo 2025"],
        correcta: 0,
        tiempoSegundos: 15
      },
      // La carta final del aniversario
      {
        tipo: "carta",
        titulo: "Mi carta de aniversario 💌",
        texto: "Mi amor,\n\nHace un año, sin saberlo, empezó la mejor historia de mi vida.\n\nGracias por cada momento, por las risas, por los abrazos, por estar ahí siempre.\n\nEres mi persona favorita en este mundo.\n\nFeliz primer aniversario. Te quiero muchísimo. 🎈💛"
      }
    ]
  }
];
 
// ====================================================
//  CONTRASEÑAS VÁLIDAS (siempre en minúsculas)
// ====================================================
const CONTRASEÑAS_VALIDAS = [
  "sant jordi",
  "23 de abril",
  "23/04/2025",
  "23 abril",
  "sant jordi 2025"
];