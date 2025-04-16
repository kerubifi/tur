
import { useState } from 'react';
import './App.css';
import { games } from './Components/Games';
import { Main } from './Components/Pages/main';
import { Route, Routes } from 'react-router-dom';
import { Favorite } from './Components/Pages/Favorite';
import { Header } from './Components/Header';


function App() {
  const [inputName, setInputName] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [category, setCategory] = useState('')
  const [favourites, setFavourites] = useState([])

  const FavoriteCards = games.filter(games => favourites.includes(games.id))

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
      <Routes>
        <Route path="/"
          element={
            <Main
              handleChandeCategory={handleChandeCategory}
              ChangeFavourites={ChangeFavourites}
              favourites={favourites}
              filterArray={filterArray}
              category={category}
              openFilter={openFilter}
            />
          }
        />
        <Route path="/favorite" element={<Favorite FavoriteCards={FavoriteCards} />} />
      </Routes>
    </div>
  );
}

export default App;
