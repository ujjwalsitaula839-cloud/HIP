from fastapi import FastAPI

app = FastAPI(title="HIP API")


@app.get("/health")
def health():
    return {"status": "ok"}
