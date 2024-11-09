import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import Header from './components/ui/TaskForm';

function App() {
  return (
      <>
     <Header />
     <TaskList />
    </>
  );
}

export default App;
