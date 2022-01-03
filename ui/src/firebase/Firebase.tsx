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
apiKey: "AIzaSyC_2Ct-PSH96U9KwCGimdyQI7LxV2MFMQc",
authDomain: "mayajobs-ca94a.firebaseapp.com",
projectId: "mayajobs-ca94a",
storageBucket: "mayajobs-ca94a.appspot.com",
messagingSenderId: "150283202677",
appId: "1:150283202677:web:b0af9fb7b2af77e3df483c",
measurementId: "G-4GNGK69Q9C"
};
  
const fire = initializeApp(firebaseConfig);

const auth = getAuth(fire);
const recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response:any) => {
        console.log(response)
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
    }
    }, auth);

const PhoneOtp = (phone: string = '') =>{

    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    
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