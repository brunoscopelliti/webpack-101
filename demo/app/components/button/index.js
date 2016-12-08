
import React from 'react';

class Button extends React.Component {
  render() {
    const { buttonLabel: label, onClick } = this.props;
    return (
      <button onClick={ onClick }>
        <span className='icon'></span>
        <span className='text'>{ label }</span>
      </button>
    );
  }
}

Button.defaultProps = {
  buttonLabel: 'Go'
};

export default Button;