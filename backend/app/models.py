from pydantic import BaseModel

class Bolsa(BaseModel):
    Subarea: str
    Docente: str
    PIBIC: int
    PROBIC: int
    LinkEdital: str
    LinkResultado: str
