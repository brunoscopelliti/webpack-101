
import React from 'react';

import Card from 'components/card/';
import GuthubPicker from 'components/github-picker/';
import ProfileForm from 'components/profile-form/';

export default function App() {
  return (
    <div className='appContainer'>
      <GuthubPicker />
      <Card />
      {
        config.enableEditing && <ProfileForm />
      }
    </div>
  );
}