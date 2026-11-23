from app.core.config import Settings


def test_settings_use_environment_overrides(monkeypatch) -> None:
    monkeypatch.setenv("APP_NAME", "Review Lab")
    monkeypatch.setenv("DEBUG", "true")

    settings = Settings()

    assert settings.app_name == "Review Lab"
    assert settings.debug is True


def test_settings_require_async_database_and_redis_urls(monkeypatch) -> None:
    monkeypatch.setenv("DATABASE_URL", "postgresql+asyncpg://test:test@postgres:5432/test")
    monkeypatch.setenv("REDIS_URL", "redis://redis:6379/1")

    settings = Settings()

    assert settings.database_url.startswith("postgresql+asyncpg://")
    assert settings.redis_url.startswith("redis://")
