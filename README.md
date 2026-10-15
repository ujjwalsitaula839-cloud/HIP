# HIP

Proyecto monorepo: frontend (React) + backend (FastAPI).

## Estructura

```
HIP/
├── frontend/          # React (Vite)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/   # llamadas al API
│       ├── styles/
│       └── utils/
├── backend/           # FastAPI
│   ├── app/
│   │   ├── api/routes/
│   │   ├── core/       # config, seguridad
│   │   ├── db/         # conexión / sesión
│   │   ├── models/     # ORM
│   │   ├── schemas/    # Pydantic
│   │   └── services/   # lógica de negocio
│   └── tests/
└── docs/
```

## Próximos pasos

1. Inicializar React en `frontend/` (Vite + React).
2. Instalar dependencias de FastAPI en `backend/`.
