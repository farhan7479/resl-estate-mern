import React, { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const PhoneSignUp = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("Recaptcha verified");
      },
    });
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setLoading(true);

      // Save the confirmation result for later use (e.g., verifying OTP)
      window.confirmationResult = confirmationResult;

      console.log("OTP has been sent");
    } catch (error) {
      // Error; SMS not sent
      console.error("Error sending SMS:", error);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);

    try {
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
     

      const res = await fetch('/api/auth/phone-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone : user.phone
        
          
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
      
      
     

      console.log(JSON.stringify(user));
      
      
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      setMobile(value);
    } else if (name === "otp") {
      setOtp(value);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login Form</h2>
      <form onSubmit={onSignInSubmit} className="space-y-4">
        <div id="sign-in-button"></div>
        <input
          type="number"
          name="mobile"
          placeholder="Mobile number"
          required
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
        <button
          type="submit" disabled = {loading}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
           Click For OTP
          
        </button>
      </form>
        
      <h2 className="text-2xl font-semibold mt-8">Enter OTP</h2>
      <form onSubmit={onSubmitOTP} className="space-y-4 p-3" >
        <input
          type="number"
          name="otp"
          placeholder="OTP Number"
          required
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
         
        >
          
          Verify Otp
        </button>
      </form>
    </div>
  );
};

export default PhoneSignUp;
