/* eslint-disable */
const login = async (email, password, form) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

  console.log(res)
  } catch (error) {
    console.log(error.response.data)
  }
}

const form = document.querySelector('.form')
form.addEventListener('submit', async e => {
  e.preventDefault()

  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  login(email,password)  
});
