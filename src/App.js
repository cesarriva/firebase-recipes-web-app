import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';

import AuthService from './FirebaseAuthService';

function App() {
  const [user, setUser] = useState(null);

  AuthService.subscribeToAuthChanges(setUser);

  return (
    <div className='App'>
      <div className='title-row'>
        <h1 className='title'>Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
    </div>
  );
}

export default App;
