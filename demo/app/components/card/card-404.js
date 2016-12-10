
import React from 'react';

export function EmptyResult(){
  return (
    <div>
      <img alt='' title='Specify a valid Github account' src='/images/empty.png'/>
      <p>Enter a valid Github account!</p>
    </div>
  );
}