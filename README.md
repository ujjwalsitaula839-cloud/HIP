# HIP

Monorepo project: frontend (React) + backend (FastAPI).

## Structure

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
│       ├── services/   # API client calls
│       ├── styles/
│       └── utils/
├── backend/           # FastAPI
│   ├── app/
│   │   ├── api/routes/
│   │   ├── core/       # config, security
│   │   ├── db/         # connection / session
│   │   ├── models/     # ORM
│   │   ├── schemas/    # Pydantic
│   │   └── services/   # business logic
│   └── tests/
└── docs/
```

## Next steps

1. Install frontend dependencies in `frontend/` (`npm install`).
2. Install FastAPI dependencies in `backend/` (`pip install -r requirements.txt`).
