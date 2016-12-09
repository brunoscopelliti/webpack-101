
import React from 'react';

import Card from 'components/card/';
import GuthubPicker from 'components/github-picker/';

export default function App() {
  return (
    <div className='appContainer'>
      <GuthubPicker />
      <Card />
    </div>
  );
}