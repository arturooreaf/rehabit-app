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
