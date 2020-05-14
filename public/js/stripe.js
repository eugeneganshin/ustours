/* eslint-disable */
import axios from 'axios'
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_okSiWuiNWbQBXAM6hrI7gd6500QLM1lqs9')

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from endpoint of out API
    const session = await axios(`http://127.0.0.1:4000/api/v1/booking/checkout-session/${tourId}`)
    
    // 2) Create the checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
  } catch (error) {
    console.log(error)
    showAlert('error', error)
  }
  
}