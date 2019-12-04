
const SERVER_URL = 'http://10.182.140.14:5005/';

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