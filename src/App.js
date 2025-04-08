
import './App.css';
import { games } from './Components/Games';
import { Header } from './Components/Header';

function App() {
  return (
    <div>
      <Header/>
      <div className='cardsbox'>
        {games.map((el) => (
          <div className='cards'>
            <div><img src={el.img} alt={el.alt} width={30} /></div>
            <div>{el.name}</div>
            <div>Приз: {el.prize}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
