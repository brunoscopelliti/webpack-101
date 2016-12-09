
import React from 'react';

import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { setSelectedUser } from 'state/selectedUser/actions';
import { setProfile, resetProfile } from 'state/profile/actions';

import fetchProfile from 'libs/get-user-profile/';

import { updateProfile } from 'state/profile/actions';

import profileFormStyle from './stylesheets/index.css';

class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.onPropertyChange = this.onPropertyChange.bind(this);
  }

  componentWillMount(){
    const { profile, currentUser } = this.props;
    if (currentUser !== '' && typeof profile.name == 'undefined'){
      this.props.setSelectedUser(currentUser);
      fetchProfile(currentUser)
        .then(this.props.setProfile, this.props.resetProfile);
    }
  }

  onPropertyChange(event) {
    const { name, type, value } = event.target;
    if (type === 'email'){
      this.validate(value).then(isEmailValid => {
        if (isEmailValid){
          this.props.updateProfile(name, value);
        }
      });
    }
    else {
      this.props.updateProfile(name, value);
    }
  }

  validate(email) {
    return System.import('email-validator').then(validator => {
      return validator.validate(email);
    }, error => {
      console.log('Loading erroror', err.message);
    });

    // return require.ensure(['email-validator'], function(require) {
    //   const { validate } = require('email-validator');
    //   return validate(email);
    // });

    // return new Promise(function(res, rej) {
    //   require(['email-validator'], function(validator) {
    //     try{
    //       res(validator.validate(email));
    //     } catch(err){
    //       rej(err);
    //     }
    //   });
    // });
  }

  render() {

    const { profile } = this.props;

    if (!profile.name)
      return null;

    return (
      <form className={ profileFormStyle.profileForm }>
        <h2 className={ profileFormStyle.title }>Edit profile</h2>
        <fieldset>
          <label className={ 'is-highlighted ' + profileFormStyle.fieldLabel } htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' value={ profile.name } onChange={ this.onPropertyChange } />
        </fieldset>
        <fieldset>
          <label className={ 'is-highlighted ' + profileFormStyle.fieldLabel } htmlFor='bio'>Bio:</label>
          <textarea type='text' id='bio' name='bio' value={ profile.bio || '' } onChange={ this.onPropertyChange }></textarea>
        </fieldset>
        <fieldset>
          <label className={ 'is-highlighted ' + profileFormStyle.fieldLabel } htmlFor='location'>Location:</label>
          <input type='text' id='location' name='location' value={ profile.location || '' } onChange={ this.onPropertyChange } />
        </fieldset>
        <fieldset>
          <label className={ 'is-highlighted ' + profileFormStyle.fieldLabel } htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' value={ profile.email || '' } onChange={ this.onPropertyChange } />
        </fieldset>
        <div className={ profileFormStyle.buttonsRow }>
          <Link to={ '' }>Done</Link>
        </div>
      </form>
    );
  }

};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: ownProps.params.username,
    profile: Object.assign({}, state.profile)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile, setSelectedUser, setProfile, resetProfile }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);