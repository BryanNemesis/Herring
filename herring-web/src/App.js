import './App.css';
import FilletsElement from './fillets';
import Logo from './Logo.png';

function App({dataset}) {
  return (
  <>
    <div className="d-flex justify-content-center py-4">
      <img src={Logo} width="180" height="60" alt=""/>
    </div>
    <FilletsElement dataset={dataset}/>
  </>
  )
}

export default App;
