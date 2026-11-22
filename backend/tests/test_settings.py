from app.core.config import Settings


def test_settings_use_environment_overrides(monkeypatch) -> None:
    monkeypatch.setenv("APP_NAME", "Review Lab")
    monkeypatch.setenv("DEBUG", "true")

    settings = Settings()

    assert settings.app_name == "Review Lab"
    assert settings.debug is True
