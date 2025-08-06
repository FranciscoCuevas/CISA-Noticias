from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

#App Creation
app = FastAPI(
    title = "App Agrupación Noticias",
    description = "App desarrollada para CISA mediante FastAPI y PostgreSQL",
    version = "1.0.0" 
)

#CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "OK", "message": "API funcionando correctamente"}

if __name__ == "__main":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
