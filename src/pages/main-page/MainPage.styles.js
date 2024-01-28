import ReactPaginate from 'react-paginate'
import styled, { keyframes } from 'styled-components'

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SearchBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

export const SearchInput = styled.input`
  width: 80%;
  max-width: 1000px;
  border: 1px solid #5e5c5c;
  border-radius: 6px;
  background-color: transparent;
  padding: 2px 10px;
  font-size: 16px;
  line-height: 160%;
  color: #000000;

  &::placeholder {
    background-color: transparent;
    color: #b2b0b0;
    font-size: 16px;
    line-height: 160%;
  }
`

export const SearchButton = styled.button`
  font-size: 16px;
  line-height: 160%;
  color: #ffffff;
  border-radius: 6px;
  background-color: ${(props) => (props.$disable ? '#d9d9d9' : '#00acf9')};
  padding: 3px 10px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${(props) => (props.$disable ? '#d9d9d9' : '#0e91d4')};
  }
`

export const ErrorText = styled.p`
  font-size: 16px;
  line-height: 160%;
  color: coral;
  margin: 10px 0 0;
`

export const OrderLabel = styled.label`
  font-size: 14px;
  line-height: 120%;
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const OrderSelect = styled.select`
  font-size: 14px;
  line-height: 120%;
  border-radius: 6px;
  outline: none;
  background-color: #e7e7e7;
  cursor: pointer;
`

export const Main = styled.main``

export const Title = styled.h1`
  font-size: 26px;
  line-height: 160%;
  margin: 30px auto;
  padding: 0 30px;
  text-align: center;
`

export const List = styled.ul`
  margin: 0 auto;
  padding: 0 30px;
`

export const ListItem = styled.li`
  width: fit-content;
  padding: 10px 0;
`

export const UserLogin = styled.h2`
  font-size: 18px;
  line-height: 140%;
  cursor: pointer;
  color: ${(props) => (props.$active ? 'red' : '#000')};
  transition: color 0.2s ease-out;

  &:hover {
    color: #ff3100;
  }
`

export const UserInfoContainer = styled.div`
  padding: 20px 10px 0;
`

export const UserAvatar = styled.img`
  width: 160px;
  border-radius: 50%;
`

export const UserProfileLink = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  margin: 10px 0;

  & p,
  a {
    font-size: 16px;
    line-height: 160%;
  }
`

export const InfoText = styled.p`
  font-size: 16px;
  line-height: 160%;
  margin: 20px auto;
  padding: 0 20px;
`

export const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  max-width: 700px;
  padding: 0 20px;
  margin-bottom: 30px;

  @media (max-width: 500px) {
    padding: 0 5px;
  }

  li a {
    border-radius: 7px;
    padding: 5px 15px;
    border: 1px solid gray;
    cursor: pointer;

    @media (max-width: 500px) {
      font-size: 14px;
      line-height: 120%;
      padding: 2px 10px;
    }
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0071a2;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`
