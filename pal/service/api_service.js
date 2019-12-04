
const SERVER_URL = 'http://10.195.239.188:5005/';

export const addStudyEvent = async(state) => {
  let response = await fetch(SERVER_URL + 'addStudy', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(state),
    method: 'POST'
  })
  return response;
}

export const addRide = async(state) => {
  let response = await fetch(SERVER_URL + 'addRide', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(state),
    method: 'POST'
  })
  return response;
}

export const getStudyEvent = async(state) => {
  let response = await fetch(SERVER_URL + 'searchStudy', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(state),
    method: 'POST'
  })
  return response;
}

export const login = async(email, password) => {
  let resp =  await fetch(SERVER_URL + 'login', {
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    email: email,
    password: password,
  }),
  method: 'POST'
});
  return resp;
}

export const joinStudyEvent = async(studygroupid) => {
  let response = await fetch(SERVER_URL + 'joinStudy', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      studygroupid: studygroupid,
    }),
    method: 'POST'
  })
  return response;
}


export const updateStudyEvent = (state) => {
    fetch(SERVER_URL + 'updateStudy', {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(state),
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);}
    ).catch(
      error => console.log(error)
    );

};