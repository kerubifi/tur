
import { useEffect, useState } from 'react';
import './App.css';
import { Main } from './Pages/main';
import { Route, Routes } from 'react-router-dom';
import { Favorite } from './Pages/Favorite';
import { Header } from './Components/Header';


function App() {
  const [turnir, setturnir] = useState([])
  const [inputName, setInputName] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [category, setCategory] = useState('')
  const [favoriteTurnirs, setFavoriteTurnirs] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/turnirs?name_like=${inputName}&category_like=${category}`)
      .then((response) => response.json())
      .then((result) => {
        setturnir(result)
      })
      .catch((error) => console.log(error))
  }, [inputName, category])

  const loadFavorite = () => {
    fetch(`http://localhost:5000/favorite`)
      .then((response) => response.json())
      .then((result) => {
        setFavoriteTurnirs(result)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    loadFavorite()
  }, [])

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

  const ChangeFavourites = (turnir) => {
    if (favoriteTurnirs.some(el => el.id === turnir.id)) {
      fetch(`http://localhost:5000/favorite/${turnir.id}`, {
        method: "DELETE",
      }).then(result => loadFavorite())
    }
    else {
      fetch(`http://localhost:5000/favorite`, {
        method: "POST",
        body: JSON.stringify(turnir),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(result => loadFavorite())
    }
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
              favoriteIds={favoriteTurnirs.map(i => i.id)}
              turnirs={turnir}
              category={category}
              openFilter={openFilter}
            />
          }
        />
        <Route path="/favorite" element={<Favorite favoriteTurnirs={favoriteTurnirs} />} />
      </Routes>
    </div>
  );
}

export default App;
