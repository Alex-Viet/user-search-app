import styled, { keyframes } from 'styled-components'

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
