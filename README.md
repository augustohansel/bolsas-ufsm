# 🎓 UFSM Bolsas

O **UFSM Bolsas** é uma solução composta por uma API de Web Scraping e um aplicativo mobile desenvolvidos para facilitar a busca por editais de bolsas de pesquisa na Universidade Federal de Santa Maria (UFSM). 

O sistema automatiza a extração de dados do portal da universidade, categorizando as bolsas por áreas (Ciências Agrárias, Engenharias, etc.) e entregando essas informações de forma rápida e otimizada para os estudantes através de um app nativo.

## ✨ Funcionalidades

* **Raspagem de Dados:** Coleta automatizada de editais de bolsas diretamente do site da UFSM.
* **Otimização de Performance:** Utilização de cache (`cachetools`) na API para evitar requisições redundantes ao site da universidade e acelerar o tempo de resposta.
* **Filtro por Áreas:** Categorização inteligente das oportunidades.
* **Interface Mobile:** Aplicativo intuitivo para fácil navegação e leitura dos editais pelo celular.

## 🚀 Tecnologias Utilizadas

O projeto foi dividido em duas partes principais:

**Backend (API & Web Scraper)**
* [Python](https://www.python.org/)
* [FastAPI](https://fastapi.tiangolo.com/) (Framework web rápido e moderno)
* [BeautifulSoup4](https://www.crummy.com/software/BeautifulSoup/) (Extração de dados HTML)
* [Cachetools](https://pypi.org/project/cachetools/) (Gerenciamento de cache na memória)

**Frontend (Aplicativo Mobile)**
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
