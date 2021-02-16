import './App.css';
import FilletsElement from './fillets';
import Logo from './Logo.png';

function App() {
  return (
  <>
    <div className="d-flex justify-content-center py-4">
      <img src={Logo} width="180" height="60" alt=""/>
    </div>
    <FilletsElement />
  </>
  )
}

export default App;
