from app.db.session import create_database_engine


def test_database_engine_uses_asyncpg(monkeypatch) -> None:
    monkeypatch.setenv(
        "DATABASE_URL",
        "postgresql+asyncpg://ceetlode:ceetlode@postgres:5432/ceetlode",
    )

    engine = create_database_engine()

    assert engine.dialect.name == "postgresql"
    assert engine.dialect.driver == "asyncpg"
