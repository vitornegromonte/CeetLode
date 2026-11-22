from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "CeetLode API"
    debug: bool = False
    database_url: str = "postgresql+asyncpg://ceetlode:ceetlode@postgres:5432/ceetlode"
    redis_url: str = "redis://redis:6379/0"
