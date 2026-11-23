from redis.asyncio import Redis

from app.core.config import Settings


def create_redis_client() -> Redis:
    return Redis.from_url(Settings().redis_url, decode_responses=True)
