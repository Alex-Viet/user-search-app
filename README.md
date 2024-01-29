# Проект "Приложение для поиска пользователей Github"
SPA-приложение разработано для поиска по логину пользователей сервиса Github, с возможностью сортировки по количеству репозиториев, а также пагинацией.

Деплой проекта: https://searching-for-github-user.netlify.app/

Для клонирования репозитория выполните команду:
`git clone https://github.com/Alex-Viet/user-search-app`

Для установки зависимостей:
`git install`

Для запуска проекта:
`npm start`

Проект будет доступен локально по адресу: http://localhost:3000

## Язык и технологии:
- Язык программирования: JavaScript
- React
- React-router-dom
- react-paginate
- Styled components
- Eslint
- Prettier

### Сторонние библиотеки:
- octokit/core

## Назначение папок проекта:
/pages - главная и 404 страницы приложения,<br>
/components - переиспользуемые react-компоненты,<br>
/api - файл с библиотекой octokit/core для api-запросов,<br>
/public - шрифты, index.html,<br>
/tests - unit-тесты<br>
