
export default function fetchProfile(user) {
  return fetch(`https://api.github.com/users/${ user }`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Network request failed: ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      return prepareResponse(data);
    });
}

function prepareResponse(data){
  const { name, bio, location, email } = data;
  return {
    name,
    bio,
    location,
    email,
    avatar: data.avatar_url.substring(0, data.avatar_url.indexOf('?'))
  };
}