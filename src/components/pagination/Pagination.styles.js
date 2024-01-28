import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

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
