import './App.css';
import Home from './components/Home'
import TransactionProvider from './contexts/TransactionContext';
function App() {
  return (
    <div className="App">
      <TransactionProvider>
        <Home></Home>
      </TransactionProvider>
    </div>
  );
}

export default App;
