import { useAppSelector } from "../../reduxHooks.ts"
import { Card } from "../../Components/Card.tsx"
import { Pagination } from "antd"
import { SearchParamsType } from "../../types/Types.ts"

export const Main = ({ handleChangeFilters, searchParams }: SearchParamsType) => {
  const turnirs = useAppSelector((state) => state.turnirs.turnirs)

  return (
    <div>
      <div className='cardsbox'>
        {turnirs.map((turnir) => (
          <Card
            key={turnir.id}
            turnir={turnir} />
        ))}
      </div>
      <Pagination total={12} current={searchParams.get('_page') ? Number(searchParams.get('_page')) : 1} onChange={(page) => handleChangeFilters('_page', String(page))} />
    </div>
  )
}