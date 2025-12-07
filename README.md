# Comandos

### Arrancar la API

```
cd api
npm install
npm start
```

### Arrancar el frontend (React)

```
npm install
npm run dev
```

---

# 🆘 Ayuda

**Eventos (React + TS):**

- onChange (select): `(evt: React.ChangeEvent<HTMLSelectElement>)`
- onChange (input) : `(evt: React.ChangeEvent<HTMLInputElement>)`
- onClick (button) : `(evt: React.MouseEvent<HTMLButtonElement>)`

**Cambios al pasar de HTML a React**

- class ⇒ className
- for ⇒ htmlFor
- `<a href="...">` ⇒ `<Link to="...">`


# API de Proyectos

## Formato de errores

Cuando algo va mal, la API devuelve:

```json
{
  "error": "Mensaje descriptivo del error"
}
```

Con el código HTTP correspondiente (400, 404, 500, etc.)


## Endpoints

### 1) Listar proyectos GET /api/proyectos

Devuelve el listado de proyectos.

Admite **filtrado por estado**.

**Query param (opcional):**

- estado: "TODOS" | "EN_CURSO" | "PAUSADO"

Si no se envía estado, se devolverán **todos**.

**Ejemplos**

- Todos los proyectos:
  - GET /api/proyectos
  - GET /api/proyectos?estado=TODOS
- Solo en curso:
  - GET /api/proyectos?estado=EN_CURSO
- Solo pausados:
  - GET /api/proyectos?estado=PAUSADO

**Respuesta 200 (OK)**

```json
[
  {
    "id": 1,
    "nombre": "App de gestión de tareas",
    "cliente": "Fundación AyudaNet",
    "estado": "EN_CURSO",
    "estado_label": "En curso"
  },
  {
    "id": 2,
    "nombre": "Dashboard de incidencias",
    "cliente": "Asociación Verde",
    "estado": "PAUSADO",
    "estado_label": "Pausado"
  }
]
```

**Errores**

- 400 Bad Request — estado no válido:

```json
{ "error": "Parámetro 'estado' no válido" }
```

- 500 Internal Server Error:

```json
{ "error": "Error obteniendo proyectos" }
```

---

### 2) Crear proyecto POST /api/proyectos

Crea un proyecto nuevo.

**Body (JSON)**

```json
{
  "nombre": "App de reservas",
  "cliente": "Startup Local",
  "estado": "EN_CURSO",
  "email": "hola@startuplocal.io",
  "telefono": "910000006"
}
```

**Validaciones**

- nombre (obligatorio): string, 3..60 caracteres (se hace trim)
- cliente (obligatorio): string, 2..60 caracteres (se hace trim)
- estado (obligatorio): "EN_CURSO" o "PAUSADO"
- email (opcional): si viene, debe tener formato válido tipo a@b.com
- telefono (opcional): si viene, solo puede contener dígitos, espacios, + y -, y debe tener **9..15 dígitos** (contando solo números)

**Respuesta 201 (CREATED)**

```json
{
  "id": 7,
  "nombre": "App de reservas",
  "cliente": "Startup Local",
  "estado": "EN_CURSO",
  "estado_label": "En curso",
  "email": "hola@startuplocal.io",
  "telefono": "910000006"
}
```

**Errores**

- 400 Bad Request — faltan campos obligatorios:

```json
{ "error": "nombre, cliente y estado son obligatorios" }
```

- 400 Bad Request — tipo incorrecto:

```json
{ "error": "nombre, cliente y estado deben ser strings" }
```

- 400 Bad Request — estado inválido:

```json
{ "error": "estado debe ser 'EN_CURSO' o 'PAUSADO'" }
```

- 400 Bad Request — email inválido:

```json
{ "error": "email no tiene un formato válido" }
```

- 400 Bad Request — teléfono inválido:

```json
{ "error": "telefono debe tener entre 9 y 15 dígitos" }
```

- 500 Internal Server Error:

```json
{ "error": "Error creando proyecto" }
```

---

### 3) Eliminar proyecto DELETE /api/proyectos/:id

Elimina un proyecto por ID.

**Parámetros de ruta**

- id — ID numérico del proyecto.

**Ejemplo**

```
DELETE /api/proyectos/1
```

**Respuesta 204 (NO_CONTENT)**

Sin cuerpo.

**Errores**

- 400 Bad Request — id no numérico:

```json
{ "error": "ID no válido" }
```

- 404 Not Found — proyecto no encontrado:

```json
{ "error": "Proyecto no encontrado" }
```

- 500 Internal Server Error:

```json
{ "error": "Error eliminando proyecto" }
```