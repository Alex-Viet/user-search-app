import * as S from './Header.styles'

export const Header = ({
  value,
  setValue,
  setSelectedOrder,
  error,
  isLoading,
  handleSearchButtonClick,
}) => {
  const handleInputChange = (evt) => {
    setValue(evt.target.value)
  }

  return (
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
  )
}
