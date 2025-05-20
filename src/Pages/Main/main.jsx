import { useSelector } from "react-redux"
import { Card } from "../../Components/Card"
import { Sort } from "../../Components/Sort/sort"
import { Pagination } from "antd"

export const Main = ({handleChangeFilters, searchParams }) => {
  const turnirs = useSelector((state) => state.turnirs.turnirs)

  return (
    <div>
      <Sort handleChangeFilters={handleChangeFilters} searchParams={searchParams} />
      <div className='cardsbox'>
        {turnirs.map((turnir) => (
          <Card
            key={turnir.id}
            turnir={turnir} />
        ))}
      </div>
      <Pagination total={12} current={searchParams.get('_page')} onChange={(page) => handleChangeFilters('_page', page)} />
    </div>
  )
}