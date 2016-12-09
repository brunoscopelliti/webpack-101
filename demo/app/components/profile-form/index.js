
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateProfile } from 'state/profile/actions';

import profileFormStyle from './stylesheets/index.css';

class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.onPropertyChange = this.onPropertyChange.bind(this);
  }

  onPropertyChange(event) {
    this.props.updateProfile(event.target.name, event.target.value);
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
      </form>
    );
  }

};

function mapStateToProps(state, ownProps) {
  return {
    profile: Object.assign({}, state.profile)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);