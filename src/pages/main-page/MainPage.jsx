import { useState } from 'react'
import { getUsers } from '../../api/users'
import * as S from './MainPage.styles'

export const MainPage = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState('desc')
  const [userId, setUserId] = useState(null)

  const handleInputChange = (evt) => {
    setValue(evt.target.value)
  }

  const handleSearchButtonClick = async (evt) => {
    evt.preventDefault()
    setUsers([])

    if (!value) {
      setError('Поле не может быть пустым')
      return
    }

    if (value.length > 256) {
      setError('Максимальное количество символов - 256')
      return
    }

    setIsLoading(true)

    getUsers(value, selectedOrder).then((response) => {
      if (response == 'Error: Доступ закрыт') {
        setError(
          'Возможно, вы запрашиваете ресурс, к которому у вас нет доступа',
        )
        setIsLoading(false)
        return
      }

      if (response == 'Error: Превышен лимит') {
        setError('Вы превысили лимит запросов, попробуйте позже')
        setIsLoading(false)
        return
      }

      if (response?.status !== 200) {
        setError(
          'Что-то пошло не так. Возможно, проблемы с интернетом или сервером. Попробуйте позже',
        )
        setIsLoading(false)
        return
      }

      if (response.data.incomplete_results) {
        setError('К сожалению, выведены не все результаты')
      }

      if (!response.data.items.length) {
        setError('Результатов не найдено')
        setIsLoading(false)
        return
      }

      const searchedUsers = response.data.items.filter((user) => {
        if (user.login.toLowerCase().includes(value.toLowerCase())) {
          return user
        }
      })

      setUsers(searchedUsers)
      setError(null)
      setIsLoading(false)
    })
  }

  const toggleOpenInfo = (evt, actualUserId) => {
    evt.preventDefault()

    setUserId((prevUserId) =>
      prevUserId === actualUserId ? null : actualUserId,
    )
  }

  return (
    <>
      <S.Header>
        <S.SearchBlock>
          <S.SearchInput
            type="text"
            value={value}
            placeholder="Введите логин"
            onChange={handleInputChange}
          />
          <S.SearchButton
            disabled={isLoading}
            $disable={isLoading}
            onClick={handleSearchButtonClick}
          >
            Поиск
          </S.SearchButton>
        </S.SearchBlock>
        {error && <S.ErrorText>{error}</S.ErrorText>}
        <S.OrderLabel>
          Сортировка по количеству репозиториев:
          <S.OrderSelect
            name="selectedOrder"
            onChange={(evt) => setSelectedOrder(evt.target.value)}
          >
            <option value="desc">по убыванию</option>
            <option value="asc">по возрастанию</option>
          </S.OrderSelect>
        </S.OrderLabel>
      </S.Header>
      <S.Main>
        <S.Title>Список пользователей Github</S.Title>
        <S.List>
          {users.map((user) => (
            <S.ListItem key={user.id}>
              <div>
                <S.UserLogin
                  $active={userId === user.id}
                  onClick={(e) => toggleOpenInfo(e, user.id)}
                >
                  {user.login}
                </S.UserLogin>
                {userId === user.id && (
                  <S.UserInfoContainer>
                    <S.UserAvatar src={user.avatar_url} />
                    <S.UserProfileLink>
                      <p>Ссылка на Github:</p>
                      <a href={user.html_url} target="_blank" rel="noreferrer">
                        {user.html_url}
                      </a>
                    </S.UserProfileLink>
                  </S.UserInfoContainer>
                )}
              </div>
            </S.ListItem>
          ))}
        </S.List>
      </S.Main>
    </>
  )
}