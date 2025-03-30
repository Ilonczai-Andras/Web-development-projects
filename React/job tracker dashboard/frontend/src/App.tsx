import './App.css';
import { Header } from './components/Header';
import { KanbanBoard } from './components/KanbanBoard';

function App() {

  return (
    <>
      <main className="column">
        <Header/>
        <KanbanBoard/>
      </main>
    </>
  );
}

export default App;
