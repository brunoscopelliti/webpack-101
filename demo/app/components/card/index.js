
import React from 'react';

import { connect } from 'react-redux';

import { Label } from './label.js';
import { EmptyResult } from './card-404.js';

import cardStyle from './stylesheets/index.css';

class Card extends React.Component {
  render(){
    const propertyBlacklist = ['avatar'];
    const { user, profile } = this.props;

    if (!profile.name)
      return <EmptyResult />;

    const info = Object.keys(profile)
      .filter(prop => !propertyBlacklist.includes(prop))
      .map((prop, i, arr) => ( 
        <Label key={ i } title={ prop } value={ profile[prop] } />
      ));

    return (
      <div className={ cardStyle.card }>
        <h2>
          {user}'s profile
        </h2>
        <div>
          <img className={ cardStyle.cardAvatar } src={ profile.avatar } alt={ profile.name } />
          <div className={ cardStyle.cardProfileInfo }>
            { info }
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  user: state.selectedUser,
  profile: state.profile
});

export default connect(mapStateToProps)(Card);