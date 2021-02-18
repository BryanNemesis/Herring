import './App.css';
import {FilletsComponent} from './fillets';
import Logo from './Logo.png';

function App({username, userCanPost}) {
  return (
  <>
    <div className="d-flex justify-content-center py-4">
      <img src={Logo} width="180" height="60" alt=""/>
    </div>
    <FilletsComponent username={username} userCanPost={userCanPost} />
  </>
  )
}

export default App;
