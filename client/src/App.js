import './App.css';
import { Routes, Route } from 'react-router-dom'
import SignIn from './Components/SignIn';
import Signup from './Components/Signup'
import Sidebar from './Components/Sidebar';
import Tasks from './Components/Tasks';
import ViewTask from './Components/ViewTask';
import ProtectedPage from './Components/ProtectedPage';
import Home from './Components/Home'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <Sidebar />
        <Routes>
          <Route path='/' element={<ProtectedPage Component={Home} />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/task/new' element={<ProtectedPage Component={Tasks} />} />
          <Route path='/tasks' element={<ProtectedPage Component={ViewTask} />} />

        </Routes>
      </header>
    </div>
  );
}

export default App;
