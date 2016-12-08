
import React from 'react';
import { render } from 'react-dom';

import profile from './profile';

import './card.css';

function Label({ title, value }) {
  return (
    <div className='label'>
      <span className='title'>{ title }:</span>
      <span className='value'>{ value }</span>
    </div>
  );
}

function Card({ profile }){

  const propertyBlacklist = ['avatar'];

  const info = Object.keys(profile)
    .filter(prop => !propertyBlacklist.includes(prop))
    .map((prop, i, arr) => ( 
      <Label key={ i } title={ prop } value={ profile[prop] } />
     ));

  return (
    <div className='card'>
      <img src={ profile.avatar } alt={ profile.name } />
      <div className='cardProfileInfo'>{ info }</div>
    </div>
  );
}

render(
  <Card profile={ profile } />,
  document.getElementById('root')
);