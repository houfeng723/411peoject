const SERVER_URL = 'http://10.180.131.146:5005/';
export const fetch_port = async(state, port) => {
  let response = await fetch(SERVER_URL + port, {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(state),
    method: 'POST'
  })
  console.log(response);
  return response;
}

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

export const getUserInfo = async(id) => {
  let response = await fetch(SERVER_URL + 'user', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({"uid": id}),
    method: 'POST'
  })
  return response;
}

export const addSportsEvent = async(state) => {
  let response = await fetch(SERVER_URL + 'addSport', {
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
  // response.then(suc=>{
  //   console.log("Successed");
  // }).catch(err=>console.log(err));
}

export const signUpAccount = async(state) => {
  let response = await fetch(SERVER_URL + 'signUp', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(state),
    method: 'POST'
  });
  response.then(res => {
    if(res.status === 200) {
      console.log(res.json());
      console.log(res.status);
      alert("Sign Up Success!");

      api.addPerson(state).then(suc=>{
        console.log(suc);
      }).catch(err=>{
        console.log(err);
        alert("connection failed for neo4j");
      });
    } else {
      alert("Address Has Been Used");
    }
  }).catch( err =>  alert("Address Has Been Used"));
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
  console.log("99");
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
console.log(resp);
  return resp;
}

export const joinStudyEvent = async(info, email) => {
  let response = await fetch(SERVER_URL + 'joinStudy', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({info:info, email:email
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