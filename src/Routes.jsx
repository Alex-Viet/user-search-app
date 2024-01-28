import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/main-page/MainPage'
import { NotFoundPage } from './pages/not-found-page/NotFoundPage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
