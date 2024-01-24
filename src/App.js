import { useState } from 'react'
import './App.css'
import { getUsers } from './api/users'

export const App = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

    getUsers(value).then((response) => {
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

  return (
    <div className="App">
      <div>
        <input type="text" onChange={handleInputChange} />
        <button disabled={isLoading} onClick={handleSearchButtonClick}>
          Поиск
        </button>
        {error && <p style={{ color: 'coral' }}>{error}</p>}
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.login}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
