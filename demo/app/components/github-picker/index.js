
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSelectedUser } from 'state/selectedUser/actions';
import { setProfile, resetProfile } from 'state/profile/actions';

import fetchProfile from 'libs/get-user-profile/';

import pickerStyle from './stylesheets/index.css';

import Button from 'components/button/';

class GithubPicker extends React.Component {
  constructor(props){
    super(props);
    this.fetchFromGithub = this.fetchFromGithub.bind(this);
  }

  fetchFromGithub(){
    const user = this.refs.field.value;
    this.props.setSelectedUser(user);
    fetchProfile(user)
      .then(this.props.setProfile, this.props.resetProfile);

    this.refs.field.value = '';
  }

  render() {
    return (
      <div className={ pickerStyle.githubPicker }>
        <label className={ pickerStyle.githubPickerLabel } htmlFor='username'>Type the username of a Github user</label>
        <div>
          <input id='username' type='text' ref='field' />
          <Button onClick={ this.fetchFromGithub } />
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSelectedUser, setProfile, resetProfile }, dispatch);
}

export default connect(null, mapDispatchToProps)(GithubPicker);