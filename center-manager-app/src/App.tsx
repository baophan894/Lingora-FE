import React from 'react';
import { Sidebar } from './components/sidebar/Sidebar';

const App: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        {/* Main content goes here */}
      </main>
    </div>
  );
}

export default App;