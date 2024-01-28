import { useState } from 'react'
import { getUsers } from '../../api/users'
import * as S from './MainPage.styles'
import { Header } from '../../components/header/Header'
import { Pagination } from '../../components/pagination/Pagination'

const maxPages = 100
const itemsPerPage = 10

export const MainPage = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [totalUsers, setTotalUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState('desc')
  const [userId, setUserId] = useState(null)
  const [itemOffset, setItemOffset] = useState(0)

  const handleSearchButtonClick = async (evt) => {
    evt.preventDefault()
    setItemOffset(0)
    setTotalUsers([])

    if (!value) {
      setError('Поле не может быть пустым')
      return
    }

    if (value.length > 256) {
      setError('Максимальное количество символов - 256')
      return
    }

    setIsLoading(true)

    getUsers(value, selectedOrder, 1, maxPages).then((response) => {
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

      const searchedUsers = response.data.items
      setTotalUsers(searchedUsers)
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

  const endOffset = itemOffset + itemsPerPage
  const currentUsers = totalUsers.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(totalUsers.length / itemsPerPage)

  const handlePageClick = (evt) => {
    const newOffset = (evt.selected * itemsPerPage) % totalUsers.length
    setItemOffset(newOffset)
  }

  return (
    <>
      <Header
        value={value}
        setValue={setValue}
        setSelectedOrder={setSelectedOrder}
        error={error}
        isLoading={isLoading}
        handleSearchButtonClick={handleSearchButtonClick}
      />
      <S.Main>
        <S.Title>Список пользователей Github</S.Title>
        {isLoading ? (
          <S.SpinnerContainer>
            <S.Spinner />
          </S.SpinnerContainer>
        ) : currentUsers.length ? (
          <>
            {pageCount > 1 && (
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            )}
            <S.List>
              {currentUsers.map((user) => (
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
                          <a
                            href={user.html_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {user.html_url}
                          </a>
                        </S.UserProfileLink>
                      </S.UserInfoContainer>
                    )}
                  </div>
                </S.ListItem>
              ))}
            </S.List>
          </>
        ) : (
          <S.InfoText>
            Здесь будет отображаться список найденных пользователей
          </S.InfoText>
        )}
      </S.Main>
    </>
  )
}
