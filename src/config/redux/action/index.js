import firebase from "../../firebase";
export const registerUserApi = data => dispatch => {
  dispatch({ type: 'CHANGE_ISLOADING', value: true });
  return firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(res => {
      console.log("succes", res);
      dispatch({ type: 'CHANGE_ISLOADING', value: false });
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      dispatch({ type: 'CHANGE_ISLOADING', value: false });
    });
};
