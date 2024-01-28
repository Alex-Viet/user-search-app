import { GlobalStyles, Wrapper } from './App.styles'
import { AppRoutes } from './Routes'

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <AppRoutes />
      </Wrapper>
    </>
  )
}
