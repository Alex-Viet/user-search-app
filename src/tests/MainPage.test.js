import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MainPage } from '../pages/main-page/MainPage'
import { getUsers } from '../api/users'

// Mock the getUsers function
jest.mock('../api/users')

describe('MainPage Component', () => {
  it('renders without errors', () => {
    render(<MainPage />)
  })

  it('handles search button click correctly', async () => {
    // Arrange
    getUsers.mockResolvedValue({
      data: {
        items: [
          {
            id: 1,
            login: 'testuser',
            avatar_url: 'testurl',
            html_url: 'testhtmlurl',
          },
        ],
      },
    })
    render(<MainPage />)

    // Act
    userEvent.type(screen.getByRole('textbox'), 'test')
    fireEvent.click(screen.getByRole('button', { name: /Поиск/i }))

    // Assert
    expect(getUsers).toHaveBeenCalledWith('test', 'desc', 1, 100)
  })

  it('displays an error if value length is greater than 256 on search button click', async () => {
    // Arrange
    render(<MainPage />)

    // Act
    userEvent.type(screen.getByRole('textbox'), 'a'.repeat(257))
    await userEvent.click(screen.getByText(/Поиск/i))

    // Assert
    expect(
      screen.getByText(/максимальное количество символов - 256/i),
    ).toBeInTheDocument()
  })
})
