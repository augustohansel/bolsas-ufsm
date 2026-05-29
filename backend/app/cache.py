from cachetools import TTLCache

# Cache: até 20 áreas, duração de 5 minutos (300 segundos)
cache_bolsas = TTLCache(maxsize=20, ttl=300)
