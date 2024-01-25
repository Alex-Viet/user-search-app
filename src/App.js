import { useState } from 'react'
import './App.css'
import { getUsers } from './api/users'

export const App = () => {
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
      console.log(response)

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

  console.log(users)

  return (
    <div className="App">
      <div>
        <input type="text" value={value} onChange={handleInputChange} />
        <button disabled={isLoading} onClick={handleSearchButtonClick}>
          Поиск
        </button>
        {error && <p style={{ color: 'coral' }}>{error}</p>}
      </div>
      <div>
        <label>
          Сортировка по количеству репозиториев:
          <select
            name="selectedOrder"
            onChange={(evt) => setSelectedOrder(evt.target.value)}
          >
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </select>
        </label>
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li className="user__list" key={user.id}>
              <div>
                <p
                  className="user__login"
                  onClick={(e) => toggleOpenInfo(e, user.id)}
                >
                  {user.login}
                </p>
                {userId === user.id && (
                  <div>
                    <img className="user__img" src={user.avatar_url} />
                    <div className="user__link">
                      <p>Ссылка на Github:</p>
                      <a href={user.html_url}>{user.html_url}</a>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
