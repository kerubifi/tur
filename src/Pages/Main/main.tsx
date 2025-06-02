import { useAppDispatch, useAppSelector } from "../../reduxHooks.ts"
import { Card } from "../../Components/Card.tsx"
import { Pagination } from "antd"
import { SearchParamsType } from "../../types/Types.ts"
import './main.css'
import { useEffect } from "react"
import { Changeturnirkol, fetchturnirkol } from "./TurnirsSlice.ts"

export const Main = ({ handleChangeFilters, searchParams }: SearchParamsType) => {
  const turnirs = useAppSelector((state) => state.turnirs.turnirs)
  const num = useAppSelector((state) => state.turnirs.num)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchturnirkol())
  }, [])

  return (
    <div className="main">
      <div className='cardsbox'>
        {turnirs.map((turnir) => (
          <Card
            key={turnir.id}
            turnir={turnir} />
        ))}
      </div>
      <Pagination total={num ? num[0].num : 1} current={searchParams.get('_page') ? Number(searchParams.get('_page')) : 1} onChange={(page) => handleChangeFilters('_page', String(page))} align="center" />
    </div>
  )
}