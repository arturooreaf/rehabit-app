# Apuntes de frontend

Mis apuntes, ordenados por temas. Se van ampliando en cada sesión.

## 1. Cómo arranca la app

- La app es una **SPA** (_Single Page Application_): **una sola página HTML** que nunca se recarga.
- `index.html` solo tiene una caja vacía, `<div id="root">`, y un `<script>` que carga `main.tsx`.
- React **rellena esa caja** con lo que toque (login, agenda...) sin recargar la página.
- Cadena: `index.html` → `main.tsx` (`createRoot`, `StrictMode`) → `App.tsx` → `LoginPage.tsx`.

## 2. Ficheros

- `.ts` = **TypeScript**: JavaScript con **tipos**, que avisa de errores antes de ejecutar.
- `.tsx` = TypeScript + **JSX** (etiquetas como `<form>` dentro del código). Para componentes.
- Componentes en `PascalCase.tsx` (`LoginPage.tsx`); el resto en `kebab-case.ts`.
- Alias `@/` = `src/`. Se configura en `tsconfig.app.json` (`paths`) **y** en `vite.config.ts` (`resolve.alias`).

## 3. Componentes y JSX

- Un componente es **una función que devuelve lo que se ve**. Nombre en mayúscula.
- `export default LoginPage;` → la exporta para que otro fichero la importe. **Sin `()`**.
- El `return` devuelve **una sola caja padre**. Si ocupa varias líneas, va entre `( )`.
- En JSX, lo que no es etiqueta ni `{ }` **se pinta como texto**: cuidado con `;` y comillas sueltas.
- `className` en vez de `class`, y `htmlFor` en vez de `for`.

## 4. Funciones: con o sin paréntesis

| Escribes         | Significa                                            |
| ---------------- | ---------------------------------------------------- |
| `handleSubmit`   | **pasar** la función: otro la ejecutará cuando toque |
| `handleSubmit()` | **ejecutarla ya**                                    |

- En los eventos (`onSubmit`, `onClick`...) se **pasa**, sin `()`.
- `(e) => setEmail(e.target.value)` = **función flecha**: crea una función pequeña ahí mismo.

## 5. Formularios

- `<label htmlFor="email">` + `<input id="email">` → conectados: al pulsar el texto, el cursor salta al campo. También sirve para la accesibilidad.
- `type="email"` (teclado con `@`), `type="password"` (oculta con `•••`), `type="text"`.
- `<button type="submit">` envía el formulario.
- Por defecto, enviar un formulario **recarga la página**. `e.preventDefault()` lo impide.
- El evento de envío es `React.SubmitEvent<HTMLFormElement>`. (`FormEvent` sale tachado: obsoleto.)

## 6. Estado (`useState`) e inputs controlados

- El **estado** es la "pizarra" donde React apunta datos: `const [email, setEmail] = useState("");`
- **Input controlado** = `value={email}` + `onChange={(e) => setEmail(e.target.value)}`. **Siempre juntos**: `value` sin `onChange` bloquea el campo.
- La historia de una tecla: aviso (`e`) → en qué campo (`e.target`) → qué pone (`.value`) → a la pizarra (`setEmail`) → el campo lee la pizarra (`value={email}`).

## 7. Tailwind y CSS

- Tailwind = **atajos de CSS** escritos en `className`. Cada clase cambia una cosa (`text-3xl` → tamaño de letra).
- `src/index.css` tiene `@import "tailwindcss";`: esa línea activa Tailwind en toda la app.
- **Preflight** = el reseteo de Tailwind: borra los estilos del navegador. Por eso inputs y botones salen sin estilo.
- Una clase mal escrita (`felx`, `text 3xl`) **no da error**: hay que mirar el navegador.
- No hay que memorizarlas: entender la idea y buscar el nombre (tailwindcss.com/docs + extensión Tailwind CSS IntelliSense).

| Para qué            | Clases                                                  |
| ------------------- | ------------------------------------------------------- |
| Colocar en columna  | `flex flex-col gap-4`                                   |
| Centrar en pantalla | `flex min-h-screen items-center justify-center`         |
| Tarjeta             | `w-full max-w-sm p-8 rounded-xl bg-white shadow`        |
| Texto               | `text-sm` · `text-3xl` · `font-bold` · `text-slate-700` |

## 8. Herramientas

- **Prettier** = el maquetador: solo cambia **cómo se ve** el código. `.prettierrc` es su libro de estilo.
- **ESLint** = el corrector: busca errores y malas prácticas.
- **`tsc`** = comprueba los tipos.
- `eslint-config-prettier` va **al final** del array de `eslint.config.js`: el último bloque gana.
- Errores de ESLint: `línea:columna`, gravedad, mensaje y nombre de la regla.
- En la terminal, **silencio = éxito**. `echo $?` muestra el código de salida (`0` = bien).

## 9. Scripts de npm

- Un script es un **apodo** para un comando, en `package.json` → `"scripts"`. Se lanza con `npm run <nombre>`.
- Nombre libre (mejor seguir las convenciones); comando exacto.
- Los comandos de los paquetes viven en `node_modules/.bin/`.

| Script                 | Para qué                                          |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | la app en `localhost:5173`, se recarga al guardar |
| `npm run build`        | tipos + versión final en `dist/`                  |
| `npm run lint`         | ESLint                                            |
| `npm run format`       | **arregla** el formato                            |
| `npm run format:check` | solo **comprueba** el formato (CI)                |
| `npm run typecheck`    | solo tipos                                        |
| `npm test`             | tests una vez                                     |
| `npm run test:watch`   | tests vigilando: se repiten al guardar            |
| `npm run verify`       | todo lo anterior antes de un commit               |

- `devDependencies` = herramientas que solo se usan mientras programas. Se instalan con `npm install --save-dev --save-exact <paquete>`.

## 10. Navegador

- **Console** (Cmd + Option + J) = mensajes de `console.log` y errores.
- **Network** = peticiones que salen hacia servidores.
- **Nunca** hacer `console.log` de contraseñas, tokens ni datos personales.

## 11. Cómo se conecta todo

```
NAVEGADOR  ── rehabit-app (FRONT, localhost:5173) ── lo que ves y pulsas
               │  HTTP (fetch) + JSON
               ▼
           clinica-api (BACK, localhost:3000) ── routes → controller → service → repository
               │  SQL
               ▼
           PostgreSQL (clinica-db en Docker, localhost:5433) ── guarda los datos
```

Cada pieza **solo habla con su vecina**. El front **nunca** habla con la base de datos.

### El viaje de un login

1. Escribes → `onChange` → `setEmail` (la pizarra).
2. Pulsas **Log in** → `onSubmit` → `handleSubmit` → `e.preventDefault()`.
3. `fetch` `POST /auth/login` a `env.VITE_API_URL` (revisada con zod).
4. El back: routes → controller → service → busca el usuario en la base de datos → bcrypt compara la contraseña.
5. Responde **200** + `{ token, user }` o **401** + `{ error }`.
6. El front revisa la respuesta con zod.
7. 200 → guarda el token **en memoria** y cambia de pantalla. 401 → enseña "email o contraseña incorrectos".

| Pieza         | Su trabajo                                         | Habla con              |
| ------------- | -------------------------------------------------- | ---------------------- |
| Front         | enseñar cosas y recoger lo que haces               | el back (HTTP + JSON)  |
| Back          | decidir quién eres y qué puedes hacer              | la base de datos (SQL) |
| Base de datos | guardar y buscar datos                             | —                      |
| zod           | control de la puerta: revisa lo que entra al front | —                      |
| CORS          | el back solo acepta peticiones de `localhost:5173` | —                      |

- **ORM** = traductor entre código y base de datos. Solo en el backend. clinica-api usa SQL a mano con `pg`.

## 12. Puertos

- `localhost` = mi ordenador. El puerto = la "puerta" de cada programa.
- Un puerto solo lo puede usar **un programa a la vez**. Si está ocupado: `EADDRINUSE`.
- Si no hay nadie escuchando en un puerto: `ERR_CONNECTION_REFUSED`.
- `VITE_API_URL` (en el `.env` del front) = dónde está el back. `CORS_ORIGIN` (en el del back) = qué front puede llamarle.
- Si cambio un `.env`, reinicio `npm run dev`: solo se lee al arrancar.

| Puerto | Qué                                     | Dónde lo veo                 |
| ------ | --------------------------------------- | ---------------------------- |
| 22     | SSH (entrar a un servidor por terminal) | servidores, GitHub           |
| 80     | HTTP                                    | webs (redirige a 443)        |
| 443    | HTTPS (no se escribe: es el de defecto) | todas las webs en producción |
| 3000   | APIs Node/Express (costumbre)           | clinica-api                  |
| 5173   | Vite                                    | rehabit-app                  |
| 8080   | HTTP alternativo                        | XAMPP, Java                  |
| 3306   | MySQL                                   | XAMPP                        |
| 5432   | PostgreSQL (mi Docker lo saca por 5433) | clinica-db                   |
| 6379   | Redis (caché)                           | backends grandes             |

## 13. Documentación oficial

La documentación oficial manda: si algo no coincide, mirar aquí.

| Qué                 | Dónde                                   |
| ------------------- | --------------------------------------- |
| Web (HTML, CSS, JS) | https://developer.mozilla.org           |
| React               | https://react.dev                       |
| Tailwind            | https://tailwindcss.com/docs            |
| shadcn/ui           | https://ui.shadcn.com/docs/installation |
| Zustand             | https://zustand.docs.pmnd.rs/           |
| zod                 | https://zod.dev                         |
| Vite                | https://vite.dev                        |

## 14. Las capas del front (el patrón profesional)

```
LoginPage.tsx (ui)        pinta y recoge; llama a login() DEL STORE; si ok → navega
      ▼
auth.store.ts (model)     Zustand, en memoria: token, user + login(), logout()
      ▼                   login(): llama al service → guarda token y user → devuelve true/false
auth.service.ts (api)     fetch POST /auth/login → revisa con zod → devuelve { token, user }
      ▼
clinica-api (backend)     → PostgreSQL
```

- Cada capa **solo habla con la de abajo**. La página nunca hace `fetch`; el service nunca toca React.

### Pantallas

```
abres la app → ¿hay token en el store?
   NO → /login  (AuthLayout + LoginPage) → login correcto → navega a /agenda
   SÍ → /agenda (AppLayout + AgendaPage)
/agenda sin token → RequireStep te devuelve a /login
```

## 15. Animaciones

### Con `tw-animate-css` (viene con shadcn, se activa en `index.css`)

Fórmula: `animate-in` + **cómo entra** + `duration-*` (+ `delay-*` + `fill-mode-both`).

| Clase                                | Qué hace                                        |
| ------------------------------------ | ----------------------------------------------- |
| `animate-in`                         | anima al aparecer                               |
| `fade-in`                            | de transparente a visible                       |
| `slide-in-from-bottom-4` / `-left-4` | entra desde abajo / desde la izquierda          |
| `zoom-in-95`                         | entra creciendo desde el 95 %                   |
| `duration-500`                       | dura 500 ms                                     |
| `delay-100`, `delay-200`...          | espera antes de empezar (entrada escalonada)    |
| `fill-mode-both`                     | invisible mientras espera su turno (sin saltos) |

- **Entrada escalonada** = misma animación y un `delay` distinto en cada bloque: título (0) → email (100) → contraseña (200) → botón (300).
- Para que una etiqueta y su campo entren juntos, se agrupan en un `<div className="flex flex-col gap-2">`.

### Mis propias animaciones (`@keyframes` al final de `index.css`)

```css
@theme {
  --animate-float: float 6s ease-in-out infinite; /* crea la clase animate-float */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    } /* abajo */
    50% {
      transform: translateY(-8px);
    } /* sube 8 px */
  }
}
```

- `@keyframes` = los "fotogramas": cómo está en el 0 %, el 50 %, el 100 %...
- `--animate-nombre: keyframes duración curva repetición` → crea la clase `animate-nombre`.
- `ease-in-out` = arranca y frena suave. `infinite` = se repite siempre.
- En Rehabit: `float` (la tarjeta de la cita sube y baja) y `drift` (las manchas de luz se mueven despacio).

### El panel de marca

| Clase                                      | Qué hace                                                    |
| ------------------------------------------ | ----------------------------------------------------------- |
| `bg-linear-to-br from-primary to-blue-800` | degradado en diagonal (de arriba-izquierda a abajo-derecha) |
| `relative` (padre) + `absolute` (hijo)     | colocar algo libremente encima o debajo, sin empujar nada   |
| `overflow-hidden`                          | recorta lo que se sale                                      |
| `blur-3xl`                                 | difumina mucho (las manchas de luz)                         |
| `bg-white/10` + `backdrop-blur-sm`         | efecto cristal esmerilado                                   |
| `ring-1 ring-white/20`                     | borde fino y suave                                          |
| `w-fit`                                    | mide lo que su contenido                                    |

### Reglas

- **`motion-safe:`** → solo anima si el usuario no ha pedido "reducir movimiento" (accesibilidad; algunas personas se marean).
- La decoración lleva **`aria-hidden="true"`**: los lectores de pantalla la ignoran.
- En una app de trabajo, movimiento **suave y lento**. Animar mejor, no más.
- Datos de ejemplo en una app de salud: que se vean **claramente de demo** (nada de nombre + diagnóstico).

## 16. Repaso del login, pieza a pieza

### Layout y `children`

- Todo lo que pongo **entre** `<AuthLayout>` y `</AuthLayout>` le llega a `AuthLayout` como `children`. Él decide dónde pintarlo escribiendo `{children}` (dentro del `<main>`).
- `flex` en el padre = sus hijos se ponen **en fila, en el orden en que están escritos**. `flex-1` = "ocupa el espacio que sobre".
- `animate-in slide-in-from-left-4` = **cómo entra** (animación), **no dónde está**. `<aside>` es solo una etiqueta con significado: no coloca nada.

### `useState`: leer y escribir

- `const [email, setEmail] = useState("")` → `useState` devuelve **2 cosas** y los `[ ]` solo las sacan de la caja y les ponen nombre.
  - `email` → **leer** lo que pone la pizarra.
  - `setEmail(nuevo)` → **escribir**, y React **repinta**. Nunca `email = nuevo`: React no se entera.
- `setEmail` no juzga si el email es correcto: apunta lo que escribas.
- `e.target.value` = **todo** el texto de la caja, no solo la última tecla. `onChange` suena con cualquier cambio (escribir, borrar, pegar).
- Eventos de React (`onClick`, `onChange`, `onSubmit`) = timbres que ya existen. Yo solo digo qué función ejecutar.

### Enviar el formulario

- `submit` = la **acción** de enviar (palabra de HTML).
- `handleSubmit` = **mi función** ("la que se encarga del envío"). El nombre lo elijo yo.
- Botón `type="submit"` → envía el formulario → suena `<form onSubmit={handleSubmit}>`. El botón no necesita `onClick`, y así también funciona con Enter. `type="button"` no envía nada.
- `e.preventDefault()` = "navegador, no recargues". Sin él, la página se recarga y las pizarras se vacían.

### Pintar según el estado

- `!` = "NO". `if (!ok)` = "si NO ha ido bien...".
- `{algo && (<p>...</p>)}` = pinta solo si `algo` tiene valor. `""`, `false`, `null` y `0` cuentan como "nada".
- **Ternario**: `condición ? siEsTrue : siEsFalse`. Ejemplo: `{isSubmitting ? "Logging in..." : "Log in"}`.
- `isSubmitting` = "¿estoy enviando ahora?". `true` antes del `await`, `false` después. Con `disabled` evita que se pulse 5 veces.

### La cadena hasta el back

```
LoginPage → auth.store (login) → auth.service (loginRequest) → fetch → BACK
```

- `useAuthStore((state) => state.login)` = "del tablón, coge solo `login`".
- `import { login as loginRequest }` = importo `login` con otro nombre para no chocar.
- `throw` = "¡error, para!" → salta al `catch`. El store devuelve `true` (token guardado) o `false`.
- El front **no sabe** qué contraseña es correcta: **pregunta** al back, que mira la base de datos (bcrypt) y responde **200 + token** o **401**.
- `fetch` viene **de serie** con el navegador y devuelve un `response` con `.status`, `.ok` (`true` si es 200–299) y `.json()`. Un 401 **no** hace fallar a `fetch`: hay que mirar `.ok`.
- `response.json()` convierte la respuesta en objeto; `Schema.parse(...)` (zod) **revisa** que tenga la forma correcta, como el control del aeropuerto.
- `VITE_API_URL` (`http://localhost:3000`) + endpoint (`/auth/login`) = dirección completa.
- El endpoint lo define el back: `app.use("/auth", ...)` + `router.post("/login", ...)`. Método y ruta tienen que coincidir.
- Métodos HTTP (en los `*.routes.ts` del back): `GET` leer, `POST` crear, `PATCH` modificar, `DELETE` borrar. El login es `POST` porque los datos van en el body, no en la URL.
- `env.ts` valida con zod al arrancar: si `VITE_API_URL` no es una URL, la app falla **ya y con un mensaje claro** (_fail fast_).

### Validar: ¿quién decide si el email está bien?

- `type="email"` → el navegador hace una comprobación básica (que haya `@`).
- El **back** es el que manda: valida con zod y comprueba usuario y contraseña.
- Validar en el front = **comodidad**. Validar en el back = **seguridad** (cualquiera puede saltarse el front con Postman).

### `useState`, Zustand y `localStorage`

|                                      | Para qué                                        | Ejemplo                                       |
| ------------------------------------ | ----------------------------------------------- | --------------------------------------------- |
| `useState` (pizarra del aula)        | datos de **un solo componente**                 | `email`, `errorMessage`, `isSubmitting`       |
| Zustand (tablón del pasillo)         | datos que **comparten varias páginas**          | token, usuario, día seleccionado en la agenda |
| `localStorage` (cajón del navegador) | cosas **no secretas** que sobreviven a recargar | tema oscuro, idioma                           |

- Sin Zustand habría que pasar el dato por props piso a piso (_prop drilling_).
- Zustand **no** es una medida de seguridad: lo seguro es que el token va **solo en memoria** (sin `persist`).
- **Nunca** un token en `localStorage`: cualquier JavaScript de la página puede leerlo (ataque XSS).
