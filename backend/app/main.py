from fastapi import FastAPI, HTTPException
from typing import List, Optional
from .scraper import buscar_bolsas, listar_areas, buscar_todas_bolsas
from .models import Bolsa

app = FastAPI(title="API Bolsas UFSM", version="1.0")

@app.get("/api/v1/areas", response_model=List[str])
async def get_areas():
    return listar_areas()

@app.get("/api/v1/bolsas/{area}", response_model=List[Bolsa])
async def get_bolsas_area(area: str, filtro: Optional[str] = None):
    try:
        bolsas = buscar_bolsas(area)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ConnectionError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro inesperado ao buscar bolsas.")

    if filtro:
        filtro_lower = filtro.lower()
        bolsas = [
            bolsa for bolsa in bolsas
            if filtro_lower in bolsa.Subarea.lower() or filtro_lower in bolsa.Docente.lower()
        ]

    return bolsas

@app.get("/api/v1/bolsas", response_model=List[Bolsa])
async def get_todas_bolsas(filtro: Optional[str] = None):
    try:
        bolsas = buscar_todas_bolsas()
    except Exception:
        raise HTTPException(status_code=500, detail="Erro inesperado ao buscar todas as bolsas.")

    if filtro:
        filtro_lower = filtro.lower()
        bolsas = [
            bolsa for bolsa in bolsas
            if filtro_lower in bolsa.Subarea.lower() or filtro_lower in bolsa.Docente.lower()
        ]

    return bolsas
