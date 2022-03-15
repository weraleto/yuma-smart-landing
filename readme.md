## Перед запуском:
- Рабочая версия Python для запуска проекта `Python 3.9.7
`.
- Требует установки `python3-tk` ([туториал](https://zoomadmin.com/HowToInstall/UbuntuPackage/python3-tk))
- Рекомендованная БД - Postgresql 13. Возможен вариант использования sqlite (не рекомендовано для использования в production-среде) - для этого необходимо удалить из `.env` файла все переменные базы данных. 

___
## Первый запуск / деплой
1. Перенести код проекта на сервер
2. Переименовать файл `conf/backend.env.local` в `conf/.env`. Заполнить файл:
   - **SECRET_KEY** - оставить без изменений
   - **DEBUG** - ни в коем случае не использовать `True` для production. Только для отладки.
   - **ALLOWED_HOSTS** - домены / хосты (без указания портов), на которых будет запущено приложение. **Через запятую без пробелов.**
   - **DB_ENGINE** - оставить без изменений если будет использоваться postgres.
   - **DB_NAME** - имя базы данных
   - **DB_USER** - имя пользователя базы данных
   - **DB_PASSWORD** - пароль пользователя базы данных
   - **DB_HOST** - хост базы данных
   - **DB_PORT** - порт базы данных
3. Рекомендуется создать виртуальное окружение (`virtualenv`)
4. `pip install -r requirements.txt` - установка зависимостей
5. `python3 manage.py migrate` - применение миграций БД
6. `python3 manage.py createsuperuser` - создание суперпользователя
7. `python3 manage.py collectstatic` - первичный сбор статики
8. Для запуска понадобится `uwsgi` или `gunicorn`. Оставляю линки на мануалы по запуску:
   - [uwsgi](https://www.digitalocean.com/community/tutorials/how-to-serve-django-applications-with-uwsgi-and-nginx-on-ubuntu-16-04)
   - [gunicorn](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04)

Логирование системных ошибок уже настроено и падает в `logs/main.log`