
import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import { Label } from './label';
import { EmptyResult } from './card-404';

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
        <h2 className={ cardStyle.cardTitle }>
          <span>{user}'s profile</span>
          <Link to={ `edit/${user}` }>Edit</Link>
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