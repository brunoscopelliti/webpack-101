
import React from 'react';

import cardStyle from './stylesheets/index.css';

export function Label({ title, value }) {
  return (
    <div className={ cardStyle.label }>
      <span className={ 'is-highlighted ' + cardStyle.title }>{ title }:</span>
      <span className={ cardStyle.value }>{ value || '-' }</span>
    </div>
  );
};