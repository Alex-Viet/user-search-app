import { Link } from 'react-router-dom'
import { NotFoundPageTextContainer } from './NotFoundPage.styles'

export const NotFoundPage = () => {
  return (
    <NotFoundPageTextContainer>
      <h1>ОШИБКА 404</h1>
      <h2>Страница не найдена</h2>
      <p>
        Вернуться на <Link to="/">Главную</Link>
      </p>
    </NotFoundPageTextContainer>
  )
}
