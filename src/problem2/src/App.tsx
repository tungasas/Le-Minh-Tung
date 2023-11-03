import React from 'react';
import SwapForm from './components/SwapForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='bg-primary w-screen h-screen flex justify-center items-center'>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: '#56ac92',
              color: '#222222',
              fontWeight: 500,
            },
          },
          error: {
            style: {
              background: '#c06060',
              color: '#222222',
              fontWeight: 500,
            },
          },
        }}
      />
      <SwapForm />
    </div>
  );
}

export default App;
