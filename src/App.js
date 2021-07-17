import Weather from './weather.js';
import Crypto from './crypto.js';
import News from './news.js'
import './App.css'

function App() {
  return (
    <div className='parent'>
      <div className='flex-parent'>
        <div className='header-container'>
          <Weather className='weather-main' />
          <Crypto className='crypto-main' cryptoId='ethereum'/>
        </div>
        <News />
      </div>
      
    </div>
    
  );
}

export default App;
