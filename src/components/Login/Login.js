
import React, { useContext } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //firebase initialize
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/book" } };
    //Google sign in with firebase
    const handleGoogleSignIn = () => {

        var GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const SignInUser = { name: displayName, email: email };
                setLoggedInUser(SignInUser);
                history.replace(from)
                storeAuthToken();
                console.log(SignInUser);

            }).catch((error) => {

                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
            // console.log(idToken)
            sessionStorage.setItem('token', idToken)
        }).catch(function (error) {
            // Handle error
        });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button type="button" onClick={handleGoogleSignIn} >Google Sign In</button>
        </div>
    );
};

export default Login;