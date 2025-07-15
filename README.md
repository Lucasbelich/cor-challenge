# Software Engineer FE Challenge

## Challenge Técnico: Ingeniero/a de Software Frontend

¡Bienvenido/a al desafío técnico de COR! 

El objetivo de este challenge es darnos una idea de tus habilidades técnicas y tu enfoque para resolver problemas. Estamos menos interesados en una solución "perfecta" y más en entender tu proceso de pensamiento, la calidad de tu código y cómo abordas los requisitos de performance y UX.

Buscamos a alguien con una sólida experiencia en la construcción de aplicaciones web con React.js que nos ayude a desarrollar nuevas funcionalidades y a construir componentes reutilizables. 

### El Desafío: "Infinite Task Manager"
La tarea es construir una aplicación de gestión de tareas simple pero de alto rendimiento. La característica principal es que deberá renderizar una lista de tareas potencialmente muy grande de manera eficiente, utilizando un mecanismo de scroll infinito.

> **Nota:** No es necesario implementar una API de backend real. Puedes simular la API utilizando el archivo `mockApi.js` que se encuentra en `src/lib/api/mockApi.js`.

#### Requisitos Funcionales (Must-Have)

**Visualización de Tareas:**
- Al cargar, la aplicación debe buscar y mostrar una lista inicial de tareas desde una API (puedes simularla).
- La lista debe implementar scroll infinito. A medida que el usuario se desplaza hacia abajo, se deben cargar y agregar más tareas a la lista sin interrumpir la experiencia.

**Gestión de Tareas:**
- Agregar: El usuario debe poder agregar una nueva tarea. La nueva tarea debe aparecer en la lista sin necesidad de recargar la página.
- Editar: El usuario debe poder hacer clic en una tarea existente para editar su texto.
- Marcar como Completada: El usuario debe poder marcar una tarea como completada (y viceversa). Esto debería reflejarse visualmente (por ejemplo, tachando el texto).

**Manejo de Estados de UI:**
- Carga (Loading): Se deben mostrar indicadores de carga claros mientras se obtienen las tareas iniciales y al cargar más tareas con el scroll infinito.
- Error: Si la API falla, se debe mostrar un mensaje de error amigable al usuario.
- Estado Vacío: Si no hay tareas, la UI debe comunicarlo adecuadamente.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Software-Engineer-FE-Challenge.git
   ```
2. Entra al directorio del proyecto:
   ```bash
   cd Software-Engineer-FE-Challenge
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Puedes iniciar la aplicación en modo desarrollo (cuando esté implementada) con:

```bash
npm start
```

## Estructura del Proyecto

- `src/lib/api/mockApi.js` - Mock API para simular las operaciones de backend sobre tareas.
- `package.json` - Dependencias y scripts del proyecto.
- `README.md` - Este archivo.

## Licencia

Este proyecto está bajo la licencia MIT. 