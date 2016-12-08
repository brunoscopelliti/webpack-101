
import React from 'react';
import { render } from 'react-dom';

import profile from './profile';

import cardStyle from './card.css';

function Label({ title, value }) {
  return (
    <div className={ cardStyle.label }>
      <span className={ cardStyle.title }>{ title }:</span>
      <span className={ cardStyle.value }>{ value }</span>
    </div>
  );
}

function Card({ profile }){

  const propertyBlacklist = ['avatar'];

  const info = Object.keys(profile)
    .filter(prop => !propertyBlacklist.includes(prop))
    .map((prop, i) => ( 
      <Label key={ i } title={ prop } value={ profile[prop] } />
     ));

  return (
    <div className={ cardStyle.card }>
      <img className={ cardStyle.cardAvatar } src={ profile.avatar } alt={ profile.name } />
      <div className={ cardStyle.cardProfileInfo }>{ info }</div>
    </div>
  );
}

render(
  <Card profile={ profile } />,
  document.getElementById('root')
);