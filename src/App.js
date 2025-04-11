
import { useState } from 'react';
import './App.css';
import { games } from './Components/Games';
import { Header } from './Components/Header';
import { Filter } from './Components/Filter';
import { Card } from './Components/Card';


function App() {
  const [inputName, setInputName] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [category, setCategory] = useState('')
  const [favourites, setFavourites] = useState([])

  const filterArray = games.filter(el => el.name.toLowerCase().includes(inputName.toLowerCase()) && el.category.includes(category))

  const handleInput = (text) => {
    setInputName(text)
  }

  const handleOpen = () => {
    setOpenFilter(!openFilter)
  }

  const handleChandeCategory = (changetcategory) => {
    if (changetcategory === category) {
      setCategory('')
    } else
      setCategory(changetcategory)
  }

  const ChangeFavourites = (id) => {
    favourites.includes(id) ? setFavourites(favourites.filter((i) => i !== id)) : setFavourites([...favourites, id])
  }

  return (
    <div>
      <Header handleInput={handleInput} handleOpen={handleOpen} />
      {openFilter && <Filter handleChandeCategory={handleChandeCategory} category={category} />}
      <div className='cardsbox'>
        {filterArray.map((el) => (
          <Card
            ChangeFavourites={ChangeFavourites}
            favourites={favourites}
            id={el.id}
            key={el.id}
            name={el.name}
            category={el.category}
            groupse={el.groupse}
            peopleInGroup={el.peopleInGroupe}
            prize={el.prize}
            img={el.img}
            alt={el.alt} />
        ))}
      </div>
    </div>
  );
}

export default App;
