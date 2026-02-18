import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => setIsLogin(!isLogin);

  return (
    <div className="app-container" style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.6s ease-out'
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {isLogin ? (
        <Login onSwitch={toggleView} />
      ) : (
        <Register onSwitch={toggleView} />
      )}
    </div>
  );
}

export default App;
