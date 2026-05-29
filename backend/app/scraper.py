import requests
from bs4 import BeautifulSoup
import re
from typing import List
from .models import Bolsa
from .cache import cache_bolsas

links_areas = {
    "ciencias-agrarias": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-ciencias-agrarias",
    "ciencias-biologicas": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-ciencias-biologicas",
    "ciencias-da-saude": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-ciencias-da-saude",
    "ciencias-exatas-e-da-terra": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-ciencias-exatas-e-da-terra",
    "ciencias-humanas": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-ciencias-humanas",
    "ciencias-sociais-aplicadas": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-ciencias-sociais-aplicadas",
    "engenharias": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-engenharias",
    "linguistica-letras-e-artes": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-linguistica-letras-e-artes",
    "multidisciplinar": "https://www.ufsm.br/pro-reitorias/prpgp/bolsas-ic-unificado-multidisciplinar"
}

def extrair_numero(texto: str) -> int:
    match = re.search(r'\d+', texto)
    return int(match.group()) if match else 0

def buscar_bolsas(area: str) -> List[Bolsa]:
    if area in cache_bolsas:
        return cache_bolsas[area]

    url = links_areas.get(area)
    if not url:
        raise ValueError("Área inválida.")

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException:
        raise ConnectionError("Falha ao conectar com o site da UFSM.")

    soup = BeautifulSoup(response.text, 'html.parser')
    tabela = soup.find('table')

    if not tabela:
        raise ValueError("Tabela não encontrada na página.")

    bolsas = []
    linhas = tabela.find_all('tr')[1:]

    for linha in linhas:
        colunas = linha.find_all('td')
        if len(colunas) >= 6:
            bolsa = Bolsa(
                Subarea=colunas[0].get_text(strip=True),
                Docente=colunas[1].get_text(strip=True),
                PIBIC=extrair_numero(colunas[2].get_text(strip=True)),
                PROBIC=extrair_numero(colunas[3].get_text(strip=True)),
                LinkEdital=colunas[4].find('a')['href'] if colunas[4].find('a') else 'Sem link disponível',
                LinkResultado=colunas[5].find('a')['href'] if colunas[5].find('a') else 'Sem link disponível'
            )
            bolsas.append(bolsa)

    cache_bolsas[area] = bolsas
    return bolsas

def listar_areas() -> List[str]:
    return list(links_areas.keys())

def buscar_todas_bolsas() -> List[Bolsa]:
    todas_bolsas = []
    for area in links_areas.keys():
        try:
            bolsas = buscar_bolsas(area)
            todas_bolsas.extend(bolsas)
        except Exception:
            continue
    return todas_bolsas
