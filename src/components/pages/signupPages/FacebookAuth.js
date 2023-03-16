import React, { useState } from 'react'
import queryString from 'query-string';
import axios from 'axios';

export const FacebookAuth = () => {
   
    const [client, setClient] = useState()

const urlParams = queryString.parse(window.location.search);
setClient(urlParams.code)

async function getAccessTokenFromCode(code) {
    const { data } = await axios({
      url: 'https://graph.facebook.com/v16.0/oauth/access_token',
      method: 'get',
      params: {
        client_id: 183448377762282,
        client_secret: client,
        redirect_uri: 'https://bog-project-new.netlify.app/authenticate/facebook/',
        code,
      },
    });
    console.log(data); // { access_token, token_type, expires_in }
    return data.access_token;
  };

console.log(`The code is: ${urlParams.code}`);
  return (
    <div>

    </div>
  )
}
