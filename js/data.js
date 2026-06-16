// ============================================
//  DATA.JS - Contenido completo del Wrap Aniversario
//  Carla & Josep - Mayo 2025 → Mayo 2026
// ============================================

const SPOTIFY_URL = "https://open.spotify.com/playlist/2zeEFP1kLJVrFcHdrEbME7";

// URL base de las fotos en GitHub
const BASE_URL = "https://raw.githubusercontent.com/Josep-Artis/aniversario/main/carla/";

const MESES = [
  // ============================================
  //  MAYO 2025 🌸
  // ============================================
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
        texto: "Desde el primer mensaje ya había algo especial. Las conversaciones fluían solas, las horas pasaban sin darnos cuenta y teníamos tantas cosas en común que parecía que nos conociéramos de toda la vida. La primera vez que quedamos fue Sant Jordi — sin fotos, pero con una de esas tardes que no se olvidan. Y cuando por fin llegó el día de ir a Sant Cugat... el perro de mi madre tuvo otros planes. Pero ni eso pudo estropearlo. Ese mes fuimos al Turó de Can Mates, al Pi del Xandri, conocí a Marc y Anna, te pedí salir en Sitges, te regalé tu primer ramo, y conociste a mi hermana y a Candela. Mayo fue el principio de todo. 🌹"
      },
      { tipo: "foto", src: BASE_URL + "1.jpg", caption: "📍 Primer día en Sant Cugat, Turó de Can Mates 🌳" },
      { tipo: "foto", src: BASE_URL + "3.PNG", caption: "✨ Versión anime del primer día" },
      { tipo: "foto", src: BASE_URL + "2.jpg", caption: "🐶 La primera foto en casa, con Candela" },
      { tipo: "foto", src: BASE_URL + "4.jpg", caption: "🍽️ Restaurante Kemo, Barcelona" },
      { tipo: "foto", src: BASE_URL + "5.jpg", caption: "🍽️ Restaurante Kemo, Barcelona" },
      { tipo: "foto", src: BASE_URL + "6.jpg", caption: "🍽️ De los primeros planes juntos 💛" },
      { tipo: "foto", src: BASE_URL + "7.jpg", caption: "🌲 El Pi del Xandri... deberíamos volver a buscarlo, ¿te acuerdas? 😄" },
      { tipo: "foto", src: BASE_URL + "8.jpg", caption: "👋 Conociendo a Marc y Anna" },
      { tipo: "foto", src: BASE_URL + "9.jpg", caption: "💛 El día que te pedí salir, Sitges" },
      { tipo: "foto", src: BASE_URL + "10.jpg", caption: "🌊 Primeros días juntos en Sitges" },
      { tipo: "foto", src: BASE_URL + "11.jpg", caption: "🐶 Haciéndote fotos a escondidas con Candela 😄", noZoom: true },
      { tipo: "foto", src: BASE_URL + "12.jpg", caption: "🌹 Tu primer ramo", noZoom: true },
      { tipo: "foto", src: BASE_URL + "13.jpg", caption: "🏴‍☠️ Primeros momentos en Tossa, la Cala del Pirata — bfff que bueno estaba el bocata 😄" },
      {
        tipo: "quiz",
        pregunta: "¿Qué pasó la mañana que íbamos a quedar por primera vez en Sant Cugat para desayunar?",
        opciones: ["Te mordió el perro de tu madre 🐶", "Perdí el tren", "Me quedé dormido", "Se me olvidó avisarte"],
        correcta: 0,
        tiempoSegundos: 0
      },
      { tipo: "foto", src: BASE_URL + "15.jpg", caption: "😬 Qué nervios... después a conocer a tus padres" },
      { tipo: "foto", src: BASE_URL + "18.jpg", caption: "🍹 Tomando algo en el Botanic de Tossa" },
      { tipo: "foto", src: BASE_URL + "19.jpg", caption: "🍹 Besitos en el Botanic" },
      { tipo: "foto", src: BASE_URL + "20.jpg", caption: "🌊 Paseito a ver tortugas", noZoom: true },
      { tipo: "foto", src: BASE_URL + "21.jpg", caption: "🌊 Castillo Tossa" },
      { tipo: "foto", src: BASE_URL + "22.jpg", caption: "😴 Sobada histórica — primer sticker de Carla 😂" },
      { tipo: "foto", src: BASE_URL + "23.jpg", caption: " 🕒 En mi habitación" },
      { tipo: "foto", src: BASE_URL + "24.jpg", caption: "🏰 Castell de Sant Pere de Ribes" },
      { tipo: "foto", src: BASE_URL + "25.jpg", caption: "🏰 Paseito con Candelita" },
      { tipo: "foto", src: BASE_URL + "26.jpg", caption: "🏰 Me encanta esta foto amor" },
      { tipo: "foto", src: BASE_URL + "27.jpg", caption: "🌊 En el espigon", noZoom: true },
      { tipo: "foto", src: BASE_URL + "28.jpg", caption: "🌊 ¿Como no ponen una valla aqui?" },
      { tipo: "foto", src: BASE_URL + "29.jpg", caption: "🎨 Cau Ferrat, Sitges" },
      { tipo: "foto", src: BASE_URL + "30.jpg", caption: "🌊 La Punta de Sitges" },
      {
        tipo: "quiz",
        pregunta: "¿Por qué tuvimos que ir a cambiar el regalo que te hice al poco de empezar a salir?",
        opciones: ["Me quedaba grande 💍", "Era el color equivocado", "Lo habías visto antes", "No te gustaba el modelo"],
        correcta: 0,
        tiempoSegundos: 0
      },
      { tipo: "foto", src: BASE_URL + "31.jpg", caption: "🌅 Tomandonos unos smoothies con unos nachos" },
      { tipo: "foto", src: BASE_URL + "32.jpg", caption: "🌅 En el Somewhere" },
      { tipo: "foto", src: BASE_URL + "33.jpg", caption: "🌅 Atardecer en el Turó de Can Mates" },
      { tipo: "foto", src: BASE_URL + "34.jpg", caption: "🌅 Estiraditos disfrutando del momento" },
      { tipo: "foto", src: BASE_URL + "35.jpg", caption: "🌅 No podia faltar la cenita", noZoom: true },
      {
        tipo: "mapa",
        titulo: "Nuestros sitios de mayo 📍",
        pines: [
          { lat: 41.47011, lng: 2.08181, label: "🏠 Tu casa", descripcion: "Carrer de Sant Antoni, 10" },
          { lat: 41.47578, lng: 2.06360, label: "🌳 Turó de Can Mates", descripcion: "Nuestro sitio favorito" },
          { lat: 41.46742, lng: 2.10075, label: "🌲 Pi del Xandri", descripcion: "Ese paseo tan especial" }
        ]
      }
    ]
  },

  // ============================================
  //  JUNIO 2025 ☀️
  // ============================================
  {
    id: "junio-2025",
    nombre: "Junio",
    año: "2025",
    emoji: "☀️",
    descripcion: "Verano, aventuras y una piscina de bolas",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Junio llegó con calor y con ganas de aventura. Nos metimos de lleno en el Museo Ikono, donde descubrimos que los dos guardamos un niño interior que no tiene ninguna intención de crecer — especialmente tú en la piscina de bolas, que con 1,58 casi desapareces entera. 😄 Tomando algo en la plaza de casa cuando venías a verme, tardeos en Sitges, días en Tossa... y la noche de San Juan, donde lo que empezó como una bengala acabó en un duelo de varitas digno de Hogwarts. Avada Kedavra."
      },
      { tipo: "foto", src: BASE_URL + "37.jpg", caption: "🎱 Tú y yo en la piscina de bolas" },
      { tipo: "foto", src: BASE_URL + "38.jpg", caption: "🦎 Técnica del Camaleón Mimético" },
      { tipo: "foto", src: BASE_URL + "40.jpg", caption: "🎨 Perdidos en el museo IKONO" },
      { tipo: "foto", src: BASE_URL + "39.jpg", caption: "📸 Me encantan estas fotos" },
      { tipo: "foto", src: BASE_URL + "41.jpg", caption: "😊 Tengo esa sonrisa grabada" },
      { tipo: "foto", src: BASE_URL + "42.jpg", caption: "💛 Solos tú y yo" },
      { tipo: "foto", src: BASE_URL + "43.jpg", caption: "🌊 Tardeo en Sitges" },
      { tipo: "foto", src: BASE_URL + "44.jpg", caption: "🌊 Lo bien que lo estabamos pasando y lo mala que te pusiste..." },
      { tipo: "foto", src: BASE_URL + "45.jpg", caption: "🌊 Tossa antes de cenar" },
      {
        tipo: "video",
        src: BASE_URL + "45.5.mp4",
        caption: "Noche de San Juan — duelo de varitas nivel Hogwarts ⚡",
        formato: "video/mp4"
      }
    ]
  },

  // ============================================
  //  JULIO 2025 🏖️
  // ============================================
  {
    id: "julio-2025",
    nombre: "Julio",
    año: "2025",
    emoji: "🏖️",
    descripcion: "Primeras vacaciones juntos 🌴",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Julio fue de esos meses que te dejan con una sonrisa permanente. Cine en Sant Cugat para ver Cómo Entrenar a Tu Dragón — con pizza incluida y una crepe de Nutella con helado que todavía me debes, por cierto. 👀 Tomando algo tranquilos en la plaza de casa. Y el broche de oro: nuestras primeras vacaciones juntos en Mallorca, en el Sun Club El Dorado. Todo incluido, el sol, el mar, y tú. No se puede pedir más. 🌴"
      },
      { tipo: "foto", src: BASE_URL + "46.jpg", caption: "🐉 Cine en Sant Cugat — Cómo Entrenar a Tu Dragón", noZoom: true },
      {
        tipo: "quiz",
        pregunta: "¿Qué comimos el día que fuimos al cine a ver Cómo Entrenar a Tu Dragón?",
        opciones: ["Pizza 🍕", "Hamburguesa 🍔", "Sushi 🍣", "Bocadillo 🥖"],
        correcta: 0,
        tiempoSegundos: 0
      },
      {
        tipo: "quiz",
        pregunta: "¿Con qué te quedaste con ganas ese día... y que todavía me debes? 👀",
        opciones: ["Crepe de Nutella con helado 🥞", "Churros con chocolate", "Tarta de queso", "Donuts"],
        correcta: 0,
        tiempoSegundos: 0
      },
      { tipo: "foto", src: BASE_URL + "47.jpg", caption: "☕ Tomando algo en la plaza de la Mercè" },
      { tipo: "foto", src: BASE_URL + "48.jpg", caption: "🌴 Primeras vacaciones juntos" },
      { tipo: "foto", src: BASE_URL + "49.jpg", caption: "🌴 Sun Club El Dorado" },
      { tipo: "foto", src: BASE_URL + "50.jpg", caption: "🌴 Lo facil que fue bajar 💛" },
      { tipo: "foto", src: BASE_URL + "51.jpg", caption: "🌴 Y lo que costo subir DIOSSS" },
      { tipo: "foto", src: BASE_URL + "52.jpg", caption: "🌴 Mallorca, todo incluido, tu y tú 🌊" }
    ]
  },

  // ============================================
  //  AGOSTO 2025 🌊
  // ============================================
  {
    id: "agosto-2025",
    nombre: "Agosto",
    año: "2025",
    emoji: "🌊",
    descripcion: "Tossa, excursiones y últimos días de verano",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Agosto olía a verano, a Tossa de Mar y a helado después de cenar. Noches viendo el castillo iluminado, excursión a Cala Giverola, un italiano con una lasaña que estaba de escándalo 👀, y la aventura de Blanes con el jardín botánico. También el día que conocí a Joel y a Blay — vaya dos, me caen genial. Y los últimos días de verano apurando cada momento, sabiendo que septiembre estaba a la vuelta de la esquina."
      },
      { tipo: "foto", src: BASE_URL + "53.jpg", caption: "🏰 Tossa de Mar, el castillo de noche" },
      { tipo: "foto", src: BASE_URL + "54.jpg", caption: "🍦 Helado después de cenar, el mejor plan" },
      { tipo: "foto", src: BASE_URL + "55.jpg", caption: "👋 Con NikiNikol, Joel y Blay — salida por Lloret" },
      { tipo: "foto", src: BASE_URL + "56.jpg", caption: "🎉 Primera vez que conocí a Joel y Blay, vaya genios" },
      { tipo: "foto", src: BASE_URL + "57.jpg", caption: "🍽️ Cenando por Tossa" },
      { tipo: "foto", src: BASE_URL + "58.jpg", caption: "🍽️ Cenando por Tossa" },
      { tipo: "foto", src: BASE_URL + "60.jpg", caption: "🏖️ Excursión a Cala Giverola" },
      { tipo: "foto", src: BASE_URL + "61.jpg", caption: "🏖️ Toss desde la montaña" },
      { tipo: "foto", src: BASE_URL + "62.jpg", caption: "🏖️ Que guapa amoor" },
      { tipo: "foto", src: BASE_URL + "63.jpg", caption: "🏖️ Que bien te queda ese vestido DIOSS" },
      { tipo: "foto", src: BASE_URL + "64.jpg", caption: "🏖️ Sudando un poco" },
      { tipo: "foto", src: BASE_URL + "65.jpg", caption: "🏖️ Disfrutando del senderismo" },
      { tipo: "foto", src: BASE_URL + "67.jpg", caption: "🏖️ Volviendo en barco 💛" },
      { tipo: "foto", src: BASE_URL + "68.jpg", caption: "🍝 Italiano en Tossa... ¿estaba buena la lasaña? 👀" },
      { tipo: "foto", src: BASE_URL + "69.jpg", caption: "🌿 Excursión a Blanes — Jardín Botánico" },
      { tipo: "foto", src: BASE_URL + "70.jpg", caption: "🌿 Callejon con florecitas" },
      { tipo: "foto", src: BASE_URL + "71.jpg", caption: "🌿 Empezamos a subir, Pongo a Blanes a tus pies" },
      { tipo: "foto", src: BASE_URL + "72.jpg", caption: "🌿 Primera parada villa Cactus" },
      { tipo: "foto", src: BASE_URL + "73.jpg", caption: "🌿 Jiji Modo pandas entre bambu" },
      { tipo: "foto", src: BASE_URL + "74.jpg", caption: "🌿 Besitos entre bambus" },
      { tipo: "foto", src: BASE_URL + "75.jpg", caption: "🌿 Que bonito el paisaje" },
      { tipo: "foto", src: BASE_URL + "76.jpg", caption: "🌿 Te quiero amor " },
      { tipo: "foto", src: BASE_URL + "77.jpg", caption: "🌿 Te acuerdas que los guiris se ponian en medio xD" },
      { tipo: "foto", src: BASE_URL + "78.jpg", caption: "🌿 Nunca me dejes de mirar asi" },
      { tipo: "foto", src: BASE_URL + "79.jpg", caption: "🌿 Lo guapa que eres HOLAAA!!" },
      { tipo: "foto", src: BASE_URL + "80.jpg", caption: "🌿 Esa sonrisa..." },
      { tipo: "foto", src: BASE_URL + "81.jpg", caption: "🌿 TU y YO 💛" },
      { tipo: "foto", src: BASE_URL + "82.jpg", caption: "🌅 IGUALEES" },
      { tipo: "foto", src: BASE_URL + "83.jpg", caption: "🌅 Apurando  ultimos dias del verano" },
      { tipo: "foto", src: BASE_URL + "84.jpg", caption: "🌅 en Tossa" },
      { tipo: "foto", src: BASE_URL + "85.jpg", caption: "🌅 Última foto de agosto 💛" }
    ]
  },

  // ============================================
  //  SEPTIEMBRE 2025 🍂
  // ============================================
  {
    id: "septiembre-2025",
    nombre: "Septiembre",
    año: "2025",
    emoji: "🍂",
    descripcion: "El mes del cambio",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto-animado",
        texto: "Empezamos nuestra historia y, como dice la canción de Little Things, sentí que tu mano encajaba perfectamente en la mía. Todo fue un torbellino emocional que subió cual tsunami — y entonces llegó septiembre.\n\nNo voy a mentir, me daba miedo. En mayo nos reíamos diciendo 'bua, no queda ni nada' — refiriéndonos a que quedaba mucho para septiembre — y de repente llegó. Tú estudiando y trabajando, yo metiéndome de cabeza en la aventura informática que tanto quebradero de cabeza me ha dado, y trabajando todos los fines de semana. De vernos cada día pasamos a vernos una vez a la semana.\n\nSabíamos que se haría cuesta arriba, y aún así lo conseguimos. Aprovechamos cada momento que aparecía.\n\nAmor, quiero darte las gracias de corazón, porque no sabes el poder que tienes. Con solo mirarme me das una fuerza sobrehumana digna de un superguerrer — como buen discípulo de Goku y Vegeta que soy. Muchas veces me he sentido abrumado, mil voladuras me han pasado por la mente, y gracias a ti he sabido focalizarme. Esto es ahora, pero luego nos reiremos. Porque todo esto es por ti, por mí, por nosotros. Tú eres mi fuerza, amor. 💛"
      },
      {
        tipo: "quiz",
        video: BASE_URL + "36.MOV",
        pregunta: "🎧 Escucha este audio... ¿de qué momento de nuestra historia es?",
        opciones: [
          "Saltando a una piscina de bolas 🎱",
          "En la montaña rusa 🎢",
          "Gritando porque vio una araña 🕷️",
          "Cantando en el coche 🎤"
        ],
        correcta: 0,
        tiempoSegundos: 0
      }
    ]
  },

  // ============================================
  //  OCTUBRE 2025 🎃
  // ============================================
  {
    id: "octubre-2025",
    nombre: "Octubre",
    año: "2025",
    emoji: "🎃",
    descripcion: "Skincare y chino, el plan perfecto",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Octubre llegó tranquilo y lo aprovechamos a nuestra manera. Sesión de skincare — porque el cuidado de la piel es cosa de dos — y una cenita en el chino que ya se ha convertido en un clásico nuestro. A veces los mejores planes son los más sencillos. 🥢"
      },
      { tipo: "foto", src: BASE_URL + "86.jpg", caption: "💆 Sesión de skincare 🧴" },
      { tipo: "foto", src: BASE_URL + "87.jpg", caption: "💆 Skincare en pareja, lo más" },
      { tipo: "foto", src: BASE_URL + "88.jpg", caption: "🥢 Cenita en el chino, un clásico" },
      { tipo: "foto", src: BASE_URL + "89.jpg", caption: "🥢 El chino de siempre 💛" }
    ]
  },

  // ============================================
  //  NOVIEMBRE 2025 🌧️
  // ============================================
  {
    id: "noviembre-2025",
    nombre: "Noviembre",
    año: "2025",
    emoji: "🌧️",
    descripcion: "Una carta para ti",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto-animado",
        texto: "Sé que eres más de cartas escritas en papel, pero de todas las hadas que podían tocarte te ha tocado el frikhadas — así que ya que me dejo los ojos en la pantalla por clase, no me los iba a dejar también por la persona que más quiero.\n\nEste año ha sido un año de cambio, de reconstrucción, de superación. Un poco de todo. Y de la nada apareciste tú, para darme un soplo de vida cuando más lo necesitaba. Sin buscar nada, encontré mi otra mitad. A mi compañera, a mi mujer, a la que quiero que sea la madre de mis hijos.\n\nNo tengo palabras para lo que siento por ti, amor. Nunca he tenido a nadie tan bueno en mi vida — en ningún sentido. Cuando me abrazas, cuando me miras, cuando me tocas, cuando me hablas... lo en paz que me siento cuando me duermo en tu pecho. Eres una mujer increíble.\n\nTu hermana Nuria tenía razón cuando me dijo en Tossa que tú desprendes luz. En ese momento ya era consciente de ello — pero ahora, después de un año contigo, quiero ser el guardián de esa sonrisa, de esa mirada y de esa luz. Protegiéndola, protegiéndote, con mi vida si hace falta.\n\nEste curso ha sido duro. Volver a estudiar trabajando los dos, pasar de vernos cada día a vernos una vez a la semana. Yo voy de duro pero se me ha hecho duro de cojones. Y aún así aquí estamos — porque lo que tenemos vale cada segundo.\n\nEstoy orgulloso de la mujer que eres. De las notas que sacas, del esfuerzo que le pones — nada de eso es en vano. Sabes que siempre voy a estar ahí para ti. Nunca vas a estar sola. Si tengo que enfrentarme al mundo entero por ti, lo haré con mucho gusto y con una sonrisa.\n\nSiempre tendrás a alguien con quien reír, con quien llorar, con quien compartir cada cosa — grande o pequeña. Nunca voy a minimizar nada que te importe, porque tú eres lo que más me importa.\n\nTe quiero, amor. Hoy y siempre. 💛"
      }
    ]
  },

  // ============================================
  //  DICIEMBRE 2025 🎄
  // ============================================
  {
    id: "diciembre-2025",
    nombre: "Diciembre",
    año: "2025",
    emoji: "🎄",
    descripcion: "Tu cumple, la Navidad y Nochevieja",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Diciembre llegó cargado de magia. Primero tu cumpleaños — las luces de Barcelona de fondo, las velas que soplaste, y esas fotos tuyas de pequeña que demuestran que ya eras igual de guapa. 😄 Y luego la escapada que me regalaste: un hotel en Barcelona, spa y cena romántica. Después de meses de poco tiempo juntos, lo necesitábamos más que el aire. El broche final: Nochevieja. Ese vestido, esa noche, tú. No hacía falta nada más. 🥂✨"
      },
      { tipo: "foto", src: BASE_URL + "93.jpg", caption: "✨ Luces de Navidad por Barcelona 🎄" },
      { tipo: "foto", src: BASE_URL + "94.jpg", caption: "✨ Luces de Barcelona" },
      { tipo: "foto", src: BASE_URL + "95.jpg", caption: "✨ Barcelona en Navidad" },
      { tipo: "foto", src: BASE_URL + "91.jpg", caption: "🎂 Soplando las velas 🥳" },
      { tipo: "foto", src: BASE_URL + "92.jpg", caption: "🎂 ¡Feliz cumpleaños, amor! 💛" },
      { tipo: "foto", src: BASE_URL + "90.jpg", caption: "👶 De pequeñita... ya eras igual de guapa 😄" },
      { tipo: "foto", src: BASE_URL + "96.jpg", caption: "👶 Fotos de cuando eras peque 🥹" },
      { tipo: "foto", src: BASE_URL + "97.jpg", caption: "👶 Carla de pequeña 💛" },
      { tipo: "foto", src: BASE_URL + "98.jpg", caption: "👶 Qué cosita 🥹" },
      { tipo: "foto", src: BASE_URL + "99.jpg", caption: "👶 La misma sonrisa de siempre 💛" },
      { tipo: "foto", src: BASE_URL + "100.jpg", caption: "🛁 Escapada romántica — Hotel en Barcelona" },
      { tipo: "foto", src: BASE_URL + "101.jpg", caption: "🛁 Spa y desconexión total" },
      { tipo: "foto", src: BASE_URL + "102.jpg", caption: "🛁 Lo necesitábamos más que el aire" },
      { tipo: "foto", src: BASE_URL + "103.jpg", caption: "🍷 Cena romántica 💛" },
      { tipo: "foto", src: BASE_URL + "104.jpg", caption: "🍷 Hotel Barcelona" },
      { tipo: "foto", src: BASE_URL + "105.jpg", caption: "🛁 Escapada perfecta" },
      { tipo: "foto", src: BASE_URL + "106.jpg", caption: "💛 Hotel Barcelona" },
      { tipo: "foto", src: BASE_URL + "107.jpg", caption: "💛 Escapada romántica" },
      { tipo: "foto", src: BASE_URL + "108.jpg", caption: "💛 Diciembre en Barcelona" },
      { tipo: "foto", src: BASE_URL + "109.jpg", caption: "💛 Escapada" },
      { tipo: "foto", src: BASE_URL + "110.jpg", caption: "💛 Hotel Barcelona" },
      { tipo: "foto", src: BASE_URL + "111.jpg", caption: "💛 Escapada romántica" },
      { tipo: "foto", src: BASE_URL + "112.jpg", caption: "💛 Barcelona" },
      { tipo: "foto", src: BASE_URL + "113.jpg", caption: "💛 Escapada" },
      { tipo: "foto", src: BASE_URL + "114.jpg", caption: "💛 El mejor regalo 🛁" },
      { tipo: "foto", src: BASE_URL + "115.jpg", caption: "🥂 Nochevieja — ese vestido, esa noche, tú ✨" },
      { tipo: "foto", src: BASE_URL + "116.jpg", caption: "🥂 Nochevieja 2025" },
      { tipo: "foto", src: BASE_URL + "117.jpg", caption: "🥂 Qué guapa eres, cabrona 😍" },
      { tipo: "foto", src: BASE_URL + "118.jpg", caption: "🥂 Nochevieja juntos" },
      { tipo: "foto", src: BASE_URL + "119.jpg", caption: "🥂 Fin de año 2025" },
      { tipo: "foto", src: BASE_URL + "120.jpg", caption: "🥂 Nochevieja" },
      { tipo: "foto", src: BASE_URL + "121.jpg", caption: "🥂 Feliz Año Nuevo, mi amor 💛" }
    ]
  },

  // ============================================
  //  ENERO 2026 🎆
  // ============================================
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
        texto: "Año nuevo con las pilas cargadas. Enero empezó con el pequeño Nil — que ya tiene un tío favorito, aunque él todavía no lo sabe. Y acabó con algo especial: un espectáculo de música en vivo en la Basílica de Santa Maria del Pi, con esa luz y esa acústica que te pone los pelos de punta. Buen comienzo de año. 🎶"
      },
      { tipo: "foto", src: BASE_URL + "122.jpg", caption: "👶 Con el pequeño Nil 🥹" },
      { tipo: "foto", src: BASE_URL + "123.jpg", caption: "🎶 Espectáculo Luminiscent — Basílica de Santa Maria del Pi" },
      { tipo: "foto", src: BASE_URL + "124.jpg", caption: "🎶 Santa Maria del Pi, Barcelona" },
      { tipo: "foto", src: BASE_URL + "125.jpg", caption: "🎶 Luminiscent ✨" },
      { tipo: "foto", src: BASE_URL + "126.jpg", caption: "🎶 Una noche muy especial 💛" }
    ]
  },

  // ============================================
  //  FEBRERO 2026 ❤️
  // ============================================
  {
    id: "febrero-2026",
    nombre: "Febrero",
    año: "2026",
    emoji: "❤️",
    descripcion: "San Valentín, a nuestra manera",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "San Valentín llegó antes de tiempo — porque los dos teníamos la agenda llena y el amor no entiende de fechas exactas. Cuando por fin pudimos vernos, lo celebramos como se merece: algo para beber, una cenita, y lo más importante, estar juntos. Que al final es de lo único que se trata. ❤️"
      },
      { tipo: "foto", src: BASE_URL + "127.jpg", caption: "❤️ San Valentín a nuestra manera" },
      { tipo: "foto", src: BASE_URL + "128.jpg", caption: "❤️ Porque el amor no entiende de fechas 💛" }
    ]
  },

  // ============================================
  //  MARZO 2026 🌷
  // ============================================
  {
    id: "marzo-2026",
    nombre: "Marzo",
    año: "2026",
    emoji: "🌷",
    descripcion: "Semana Santa y Pompeya",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Semana Santa y por fin tiempo para respirar juntos. Un picnic en Montjuïc escuchando música con Barcelona a los pies, el jardín botánico, el sol dando en la cara... y al día siguiente, un salto al pasado en la exposición de Pompeya en realidad virtual. De la calma absoluta al Vesubio en erupción. Así somos nosotros. 🌋"
      },
      { tipo: "foto", src: BASE_URL + "129.jpg", caption: "🌿 Picnic en Montjuïc, Barcelona al sol ☀️" },
      { tipo: "foto", src: BASE_URL + "130.jpg", caption: "🌿 Montjuïc — música y Barcelona a los pies" },
      { tipo: "foto", src: BASE_URL + "131.jpg", caption: "🏛️ Exposición de Pompeya — Realidad Virtual" },
      { tipo: "foto", src: BASE_URL + "132.jpg", caption: "🏛️ Pompeya VR 💛" }
    ]
  },

  // ============================================
  //  ABRIL 2026 🎈
  // ============================================
  {
    id: "abril-2026",
    nombre: "Abril",
    año: "2026",
    emoji: "🎈",
    descripcion: "Michael Jackson y Sant Jordi",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "Abril llegó con Michael Jackson y con nuestro primer Sant Jordi oficial juntos. 🌹 El biopic en el cine, la rosa, y la sensación de que un año da para mucho cuando lo vives con la persona correcta. Que ya falta poco, amor. 🎈"
      },
      { tipo: "foto", src: BASE_URL + "133.jpg", caption: "🎬 Cine — Michael Jackson Biopic 🎵" },
      { tipo: "foto", src: BASE_URL + "134.jpg", caption: "🎬 Michael Jackson 🎵" },
      { tipo: "foto", src: BASE_URL + "135.jpg", caption: "🎬 Cine juntos" },
      { tipo: "foto", src: BASE_URL + "136.jpg", caption: "🎬 Abril 2026" },
      { tipo: "foto", src: BASE_URL + "137.jpg", caption: "🌹 Nuestro primer Sant Jordi oficial juntos 💛" }
    ]
  },

  // ============================================
  //  MAYO 2026 🎈
  // ============================================
  {
    id: "mayo-2026",
    nombre: "Mayo",
    año: "2026",
    emoji: "🎈",
    descripcion: "Un año juntos",
    desbloqueado: false,
    completado: false,
    contenido: [
      {
        tipo: "texto",
        texto: "De dos extraños que se cruzaron por casualidades de la vida, a serlo todo el uno para el otro. Hay una foto tuya que defendería con mi vida. Puede que seas consciente de cómo me miras — o puede que no del todo. Pero esa mirada tuya que dice 'estoy aquí, tranquilo, confío en ti, estoy orgullosa de ti'... me convierte en Super Saiyan full power. Por muy reventado o cansado que esté, nadie ni nada puede conmigo cuando me miras así. Gracias por este año, amor. Gracias por ser tú. 💛🎈"
      },
      { tipo: "foto", src: BASE_URL + "138.jpeg", caption: "💛 Esa mirada que me lo da todo" },
      { tipo: "foto", src: BASE_URL + "139.jpeg", caption: "🎈 Un año juntos" },
      { tipo: "foto", src: BASE_URL + "140.jpeg", caption: "🎈 Feliz aniversario, mi amor 💛" }
    ]
  }
];

// ====================================================
//  CONTRASEÑAS VÁLIDAS
// ====================================================
const CONTRASEÑAS_VALIDAS = [
  "sant jordi",
  "23 de abril",
  "23/04/2025",
  "23 abril",
  "sant jordi 2025"
];