# Floreria Pages Fast

Base nueva para demo, pensada para una florería:

- frontend estático para `GitHub Pages`
- backend en `Apps Script`
- llamadas con `fetch` usando `Content-Type: text/plain;charset=utf-8`
- PWA ligera
- una sola pantalla HTML, rápida de mover y mantener

## Qué subir a GitHub

Sube todo el contenido de esta carpeta como la raíz de un repo nuevo:

- `index.html`
- `config.js`
- `manifest.webmanifest`
- `sw.js`
- `icon-192.png`
- `icon-512.png`
- `.nojekyll`
- `.github/workflows/deploy-pages.yml`

## Cómo conectar el backend

### 1. Apps Script

En tu proyecto de Apps Script:

1. abre `apps-script/Code.gs`
2. pega o confirma que está ese backend
3. haz `Deploy > New deployment`
4. tipo: `Web app`
5. ejecuta como: tu cuenta
6. acceso: `Anyone`
7. copia la URL terminada en `/exec`

### 2. Inicializar demo

Después del deploy:

1. entra al editor de Apps Script
2. corre la función `initializeDemo`
3. acepta permisos

Eso crea o refresca la data demo en el spreadsheet conectado.

### 3. Frontend

Edita `config.js` y pega tu Web App URL:

```js
window.POS_CONFIG = {
  apiBaseUrl: "https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec",
};
```

## Cómo publicar en GitHub Pages

1. crea un repo nuevo
2. sube esta carpeta como raíz del repo
3. haz push a `main`
4. en GitHub ve a `Settings > Pages`
5. confirma que use `GitHub Actions`
6. espera el workflow de deploy

## Flujo de la app

1. abrir la página publicada
2. elegir `Entrar como admin` o `Entrar como ventas`
3. el frontend llama `demoLogin`
4. luego carga todo con `getAppData`
5. desde ahí opera ventas, caja, inventario y gastos según rol

## Notas importantes

- La URL debe ser la de `Web app`, no la del editor de Apps Script.
- Debe terminar en `/exec`.
- Si vuelves a desplegar, a veces cambia la URL y hay que actualizar `config.js`.
- El rol `ventas` no debe ver reportes ni registrar gastos administrativos.
