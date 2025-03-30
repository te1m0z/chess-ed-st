Onion архитектура
Внешние слои зависят от внутренних. Но не наоброт!
- Infrastructure (DB, logger, repositories, frameworks...)
- Application (modules, controllers, services, dto)
- Core (Entities, interfaces, configs)

## Авторизация
POST http://localhost:8000/auth/login
```
{
	"login": "admin",
	"password": "parol123"
}
```

## Начать игру
POST http://localhost:8000/game/start

## Сделать ход
POST http://localhost:8000/game/:gameId/move
```
{
	"from": "a2",
	"to": "a3"
}
```