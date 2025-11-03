# Aplicativo Presupuesto - Elite Flower

## Descripción del Proyecto

Aplicativo web desarrollado en **Vue 3.js** con **Tailwind CSS** para la gestión integral de presupuestos de proyectos en **Elite Flower**, empresa líder en la industria de flores. El sistema permite el control y seguimiento del presupuesto estimado vs. ejecutado real en todas las fincas de la compañía.

## 🚀 Características Principales

### 📊 Gestión de Proyectos
- **Dashboard ejecutivo** con KPIs y métricas financieras
- **Tablero Kanban** para gestión visual por prioridades
- **Seguimiento mensual** de presupuesto vs. ejecutado
- **Filtros avanzados** por estado, prioridad y fechas

### 💰 Control Presupuestal
- **Distribución automática** de presupuesto en 12 meses
- **Transferencias entre meses** con validaciones
- **Ajustes dinámicos** de presupuesto
- **Reportes comparativos** presupuestado vs. real

### 🔗 Integraciones
- **SGMWIN** - Sistema de gestión existente
- **FDIM** - Aplicativo interno complementario
- **Mantenimiento** - Sistema del área de mantenimiento
- **Power BI** - Embed para reportes avanzados

## 🛠️ Stack Tecnológico

- **Frontend:** Vue 3.js + Composition API
- **Styling:** Tailwind CSS
- **Routing:** Vue Router
- **State Management:** Pinia/Vuex
- **Build Tool:** Vite
- **Deployment:** Docker + Nginx

## 📁 Estructura del Proyecto

```
APLICATIVO PRESUPUESTO/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 Form/
│   │   ├── 📁 Home/
│   │   └── 📄 Componentes base (Modal, DataTable, etc.)
│   ├── 📁 views/
│   │   ├── 📄 Home.vue
│   │   ├── 📄 Login.vue
│   │   └── 📄 Módulos especializados
│   ├── 📁 layouts/
│   │   ├── 📄 Main.vue
│   │   └── 📄 Layouts de autenticación
│   ├── 📁 router/
│   │   └── 📄 index.js
│   ├── 📁 stores/
│   │   ├── 📄 cart.js
│   │   └── 📄 drawer.js
│   ├── 📁 services/
│   │   ├── 📄 budgetMovements.js
│   │   ├── 📄 proyect.js
│   │   └── 📄 APIs especializadas
│   └── 📁 utils/
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 Dockerfile
└── 📄 nginx.conf
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm

### Configuración del Proyecto

```sh
# Instalar dependencias
npm install

# Compilar y recargar en caliente para desarrollo
npm run dev

# Compilar y minificar para producción
npm run build

# Lint con ESLint
npm run lint

# Formatear con Prettier
npm run format
```

### Configuración con Docker

```sh
# Construir imagen
docker build -t aplicativo-presupuesto .

# Ejecutar contenedor
docker run -p 3000:80 aplicativo-presupuesto
```

## 🔧 Configuración de Variables de Entorno

Crear archivos `.env.development` y `.env.production`:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=
```

## 📊 Funcionalidades por Módulo

### 🏠 Home (Dashboard)
- Resumen ejecutivo con KPIs financieros
- Métricas de proyectos activos y completados
- Distribución por prioridades (Alta, Media, Baja)
- Proyectos más costosos destacados

### 📊 Proyectos
- Creación y edición de proyectos
- Tablero Kanban con drag & drop
- Distribución automática de presupuesto
- Seguimiento de estados y prioridades

### 🧮 Hoja de Cálculo
- Vista comparativa 12 meses
- Modal de edición de presupuesto
- Gestión de movimientos y transferencias
- Validaciones de saldos disponibles

### 📈 Reportes
- Embed de dashboards Power BI
- Reporte de gastos en contratistas
- Métricas de órdenes de trabajo
- Reportes ejecutivos para gerencia

## 👥 Roles de Usuario (Genericos)

- **Gerente:** Acceso completo a todas las funcionalidades
- **Jefe de Proyectos:** Gestión de proyectos y presupuestos
- **Analista:** Consulta y reportes
- **Usuario Básico:** Visualización limitada

## 🔒 Seguridad (la cual se quiere llegar)

- Autenticación JWT
- Control de acceso por roles
- Validación de datos en frontend y backend
- Auditoría de cambios críticos

## 📈 Métricas y KPIs

- Presupuesto total vs. ejecutado
- Proyectos por estado y prioridad
- Desviaciones presupuestales
- Eficiencia en ejecución
- ROI por proyecto

## 📄 Licencia

Este proyecto es de uso interno de Elite Flower. Todos los derechos reservados.

---

**Desarrollado por el Departamento de Mantenimiento - Elite Flower** 🌸