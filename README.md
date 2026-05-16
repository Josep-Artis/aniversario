# 🎈 Wrap Aniversario v2 - Guía de configuración

## Estructura de carpetas

```
wrap-aniversario/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js     ← ⭐ EDITA ESTO
│   └── app.js
├── img/
│   ├── casa.png
│   ├── mayo/       ← fotos del mes
│   ├── junio/
│   └── ... (una carpeta por mes)
├── video/          ← ⭐ NUEVO: vídeos locales
│   ├── mayo/
│   ├── junio/
│   └── ...
└── audio/
    ├── tick.mp3
    ├── ring.mp3
    ├── correct.mp3
    └── wrong.mp3
```

---

## ⭐ Lo más importante: SPOTIFY

Abre `js/data.js` y busca la primera línea:

```js
const SPOTIFY_URL = "https://open.spotify.com/playlist/PON_AQUI_TU_PLAYLIST";
```

**Cómo obtener el link:**
1. Abre Spotify en el navegador o móvil
2. Ve a la playlist / canción / álbum que quieras
3. Pulsa los tres puntos `···` → Compartir → Copiar enlace
4. Pega el enlace ahí (funciona con playlists, álbumes y canciones)

---

## ⭐ NUEVO: Tipos de bloques disponibles

### 📸 Foto
```js
{ tipo: "foto", src: "img/mayo/foto1.jpg", caption: "Texto que aparece debajo" }
```

### 🎥 Vídeo local
```js
{ tipo: "video", src: "video/mayo/video.mp4", caption: "Texto", formato: "video/mp4" }
```
- Crea la carpeta `video/` en el proyecto
- Crea subcarpetas por mes: `video/mayo/`, `video/junio/`...
- Copia tus vídeos ahí
- **Formatos compatibles:** `.mp4` (recomendado), `.mov`, `.webm`
- ⚠️ Si el vídeo pesa mucho (>100MB), comprimirlo con HandBrake (gratis)

### 🗺️ Mapa Google Maps
```js
{ tipo: "mapa", lugar: "Sagrada Familia, Barcelona", caption: "Aquí fue 📍", zoom: 15 }
```
- `lugar` puede ser nombre del sitio, dirección o coordenadas `"41.40,2.17"`
- `zoom` va de 10 (ciudad) a 18 (calle exacta), recomendado: 15-16

**Opción avanzada** — embed directo de Google Maps:
1. Abre Google Maps en el navegador
2. Busca el sitio
3. Pulsa Compartir → Insertar un mapa
4. Copia solo la URL del `src="..."` del iframe
5. Úsala así:
```js
{ tipo: "mapa", embedUrl: "https://www.google.com/maps/embed?pb=...", caption: "Aquí fue 📍" }
```

### 💌 Carta animada
```js
{
  tipo: "carta",
  titulo: "Tengo algo que decirte...",
  texto: "Mi amor,\n\nEste año contigo ha sido...\n\nTe quiero. 💛"
}
```
- Aparece como un sobre que se abre con animación
- Usa `\n` para saltos de línea

### 📝 Texto narrativo
```js
{ tipo: "texto", texto: "El verano llegó y con él..." }
```

### ❓ Quiz
```js
{
  tipo: "quiz",
  foto: "img/mayo/quiz1.jpg",      // opcional
  pregunta: "¿Dónde fue nuestra primera cita?",
  opciones: ["Parque", "Cafetería", "Cine", "Restaurante"],
  correcta: 1,                     // índice 0-3
  tiempoSegundos: 15
}
```

---

## 📁 Cómo añadir las fotos

Para cada mes, crea una carpeta en `img/`:
```
img/mayo/foto1.jpg
img/mayo/foto2.jpg
img/mayo/quiz1.jpg
img/junio/foto1.jpg
...
```

**Para los meses sin foto:** simplemente no pongas el bloque de `foto` en `data.js` o comenta la línea con `//`

---

## 🔓 Easter egg
- Haz **5 clicks** en el título "Nuestro Primer Año 🎈" de la pantalla principal
- Se desbloquean todos los meses de golpe

---

## 🚀 Cómo abrirlo
- Abre `index.html` directamente en Chrome, Safari o Firefox
- No necesita servidor ni internet (salvo para el widget de Spotify y los mapas)
- El progreso se guarda automáticamente en el navegador

---

## 🎨 Cambiar colores
Edita las variables al inicio de `css/style.css`:
```css
:root {
  --sky-top: #87CEEB;      /* Color cielo arriba */
  --sky-bottom: #FFF4E0;   /* Color cielo abajo */
  --gold: #F4C430;         /* Color dorado (botones, bordes) */
  --text-dark: #3D2B1F;    /* Texto oscuro */
  --text-warm: #7A4F2E;    /* Texto cálido */
}
```