import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// google map api key is AIzaSyCRfOlLH_3g607EfdjFPkCyaUWoSaeu-68


const firebaseConfig = {
//   apiKey: "AIzaSyAhzEi15mQe-KY7rhbmIi8MnvL2-KcL7uw",
//   authDomain: "mayatutor-6bf6d.firebaseapp.com",
//   databaseURL: "https://mayatutor-f5748.firebaseio.com",
//   projectId: "mayatutor-6bf6d",
//   storageBucket: "mayatutor-6bf6d.appspot.com",
//   messagingSenderId: "717157472041",
//   appId: "1:717157472041:web:ffedb70bff29fcd9390938",
//   measurementId: "G-JQHPN5ELGR"
apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_FIREBASE_APP_ID,
measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
  
const fire = initializeApp(firebaseConfig);

const auth = getAuth(fire);
// auth.settings.appVerificationDisabledForTesting = true

// set this to remove reCaptcha web
// fire.getFirebaseAuthSettings().setAppVerificationDisabledForTesting(true);
const recaptchaVerifier = new RecaptchaVerifier('sign-in-button',     
    {
    'size': 'invisible',
    // 'callback': (response:any) => {
    //     return response;
    //     console.log(response)
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     // onSignInSubmit();
    // }
    }
    , auth);

const PhoneOtp = async (phone: string = '') =>{        
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier).then(res=>{
        console.log(res)
        return res;
    });
    
    // signInWithPhoneNumber(auth, phone, recaptchaVerifier).then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     let code = prompt("Please enter your OTP", "");
    //     if(code){
    //         confirmationResult.confirm(code).then((result) => {
    //             console.log(result)
    //         // User signed in successfully.
    //         const user = result.user;
    //         // ...
    //         }).catch((error) => {
    //             console.log(error)
    //         // User couldn't sign in (bad verification code?)
    //         // ...
    //         });
    //     }
        
          
    //     // ...
    //   }).catch((error) => {
    //     // Error; SMS not sent
    //     // ...
    //   });
  
}

export {
    PhoneOtp
};
export default fire;