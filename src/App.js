import './App.css';
import { useState } from 'react';
import { BsTelephoneFill, BsLockFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg'
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from './firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [showOTPSection, setShowOTPSection] = useState(false);
  const [otpCode, setOtpCode] = useState("")
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState(false);

  function onCaptchaVerify() {
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignUp();
        },
        'expired-callback': () => {}
      }, auth);
    }
  }

  function onSignUp() {
    setLoadingVerify(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const myNumber = '+' + phone;

    signInWithPhoneNumber(auth, myNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setLoadingVerify(false);
      setShowOTPSection(true);
      toast.success('OTP sent successfully!')
    }).catch((error) => {
      console.log(error);
      setLoadingVerify(false);
    });
  }

  function onOtpVerify() {
    setLoadingVerify(true);
    window.confirmationResult.confirm(otpCode).then(res => {
      console.log(res);
      setLogin(true);
      setLoadingVerify(false);
    }).catch(error => {
      console.log(error);
      setLoadingVerify(false);
    })
  }

  return (
    <div className='bg-light-navy flex items-center justify-center w-[100vw] h-[100vh]'>

      <Toaster toastOptions={{duration: 5000}} />
      <div id='recaptcha-container'></div>

      {
        login ?

        <div>
          <h2>HOME Screen!!!</h2>
        </div>

        :

        <div className='w-full max-w-[600px] bg-dark-navy min-h-[400px] shadow-1 p-5 md:p-12 text-center flex flex-col justify-center'>
          <h2 className='font-bold text-4xl uppercase'>Welcome!</h2>
          <h5 className='font-normal text-xl'>My Assessment Task</h5>
          {
            showOTPSection ?

            <div className='otp-section'>
              <div className='mt-5 bg-white text-dark-navy p-2 rounded-full w-fit mx-auto'>
                <BsLockFill className='text-dark-navy' size={25} />
              </div>
              <h3 className='mt-3 text-base'>Enter your 6 digit OTP</h3>
              <OtpInput 
                OTPLength={6}
                OTPType={Number}
                autoFocus
                disabled={false}
                value={otpCode}
                onChange={setOtpCode}
                className='mt-3 flex items-center justify-center otp-container'>
              </OtpInput>
              <button className='mt-5 bg-light-navy text-base px-12 py-2 rounded-md flex gap-2 mx-auto'
                onClick={onOtpVerify}>
                {loadingVerify ? <CgSpinner size={25} className='animate-spin' /> : '' }
                Verify OTP
              </button>
            </div>

            :

            <div className='phone-section'>
              <div className='mt-5 bg-white text-dark-navy p-2 rounded-full w-fit mx-auto'>
                <BsTelephoneFill className='text-dark-navy' size={25} />
              </div>
              <h3 className='mt-3 text-base'>Enter your Mobile Number</h3>
              <div className='mt-3 relative w-fit mx-auto'>
                <PhoneInput country={"us"} value={phone} onChange={setPhone} />
              </div>
              <button className='mt-5 bg-light-navy text-base px-12 py-2 rounded-md flex gap-2 mx-auto'
                onClick={onSignUp}>
                {loadingVerify ? <CgSpinner size={25} className='animate-spin' /> : '' }
                Send OTP
              </button>
            </div>

          }

        </div>
      }
    </div>
  );
}

export default App;
