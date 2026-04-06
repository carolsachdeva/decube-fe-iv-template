import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#000',
        height: '4rem',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div>
        <h1 className="text-white text-2xl font-bold">Movie Search</h1>
      </div>
    </header>
  );
};

export default Header;
