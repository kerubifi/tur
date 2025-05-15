import { useSelector } from "react-redux"
import { Card } from "../../Components/Card"
import { Sort } from "../../Components/Sort/sort"

export const Main = ({ handleChangeSort, sort }) => {
  const turnirs = useSelector((state) => state.turnirs.turnirs)

  return (
    <div>
      <Sort handleChangeSort={handleChangeSort} sort={sort} />
      <div className='cardsbox'>
        {turnirs.map((turnir) => (
          <Card
            key={turnir.id}
            turnir={turnir} />
        ))}
      </div>
    </div>
  )
}