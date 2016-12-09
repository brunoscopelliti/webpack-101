
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSelectedUser } from 'state/selectedUser/actions';
import { setProfile, resetProfile } from 'state/profile/actions';

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
    fetch(`https://api.github.com/users/${ user }`)
      .then(response => {
        if (!response.ok)
          throw new Error(`Network request failed: ${response.statusText}`);
        return response.json();
      })
      .then(data => {
        const { name, bio, location, email } = data;
        this.props.setProfile({
          name,
          bio,
          location,
          email,
          avatar: data.avatar_url.substring(0, data.avatar_url.indexOf('?'))
        });
      }, () => {
        this.props.resetProfile();
      });

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