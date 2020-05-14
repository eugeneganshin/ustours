/* eslint-disable */
import '@babel/polyfill'
import { login, logout } from './login'
import { updateSettings } from './updateSettings'
import { displayMap } from './mapbox'
import { bookTour } from './stripe'

// DOM elements
const mapBox = document.querySelector('#map')
const loginForm = document.querySelector('.form--login')
const logOutBtn = document.querySelector('.nav__el--logout')
const formUserData = document.querySelector('.form-user-data')
const formUserSettings = document.querySelector('.form-user-settings')
const bookBtn = document.querySelector('#book-tour')

// Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations)
  displayMap(locations)
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout)

if (formUserData) {
  formUserData.addEventListener('submit', e => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', document.querySelector('#name').value)
    form.append('email', document.querySelector('#email').value)
    form.append('photo', document.querySelector('#photo').files[0])
    // const name = document.querySelector('#name').value
    // const email = document.querySelector('#email').value
    
    updateSettings(form)
  })
}

if (formUserSettings) {
  formUserSettings.addEventListener('submit', async e => {
    e.preventDefault()

    document.querySelector('.btn--save-password').textContent = 'Updating...'

    const passwordCurrent = document.querySelector('#password-current').value
    const password = document.querySelector('#password').value
    const passwordConfirm = document.querySelector('#password-confirm').value
    
    await updateSettings({passwordCurrent, password, passwordConfirm}, 'password')

    document.querySelector('#password-current').value = ''
    document.querySelector('#password').value = ''
    document.querySelector('#password-confirm').value = ''

    document.querySelector('.btn--save-password').textContent = 'Save password'
  })
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...'
    const { tourId } = e.target.dataset
    bookTour(tourId)
  })
}