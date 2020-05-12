/* eslint-disable */
import axios from 'axios'
import {showAlert, hideAlert} from './alerts'

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:4000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:4000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// // type is either 'password' or 'data'
// export const updateData = async (data) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:4000/api/v1/users/updateMe',
//       data: {
//         data
//       }
//     })
  
//     if (res.data.status === 'success') {
//       showAlert('success', 'Data updated successfully')
//       window.setTimeout(()=>{
//         location.assign('/me')
//       }, 1000)
//     }
//   } catch (error) {
//     showAlert('error', error.response.data.message)
//   }
// }

// export const updatePassword = async (
//   passwordCurrent, password, passwordConfirm
//   ) => {
//     try {
//       const res = await axios({
//         method: 'PATCH',
//         url: 'http://127.0.0.1:4000/api/v1/users/updateMyPassword',
//         data: {
//           passwordCurrent,
//           password,
//           passwordConfirm
//         }
//       })

//       if (res.data.status === 'success') {
//         showAlert('success', 'Data updated successfully')
//         window.setTimeout(()=>{
//           location.assign('/me')
//         }, 1000)
//       }
//     } catch (error) {
//       showAlert('error', error.response.data.message)
//     }
// }