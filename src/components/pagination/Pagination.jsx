import { MyPaginate } from './Pagination.styles'

export const Pagination = ({ handlePageClick, pageCount }) => {
  return (
    <MyPaginate
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  )
}
