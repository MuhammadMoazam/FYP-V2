import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import '../Login/Login.css'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import useApi from '../../components/Contexts/API/useApi'
import useUser from '../../components/Contexts/User/useUser'

import OtpInput from 'react-otp-input'
import ClipLoader from "react-spinners/ClipLoader";

const VerifyOTP = () => {

    const { resendOTP: resendOtpApi, verifyOTP } = useApi()
    const { login } = useUser()

    const navigate = useNavigate();
    const location = useLocation();

    const [otpEmail, setOtpEmail] = useState(location?.state?.email || null)
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)

    async function submit(e) {
        e.preventDefault()
        try {
            setLoading(true)

            const response = await verifyOTP(otpEmail, otp)

            if (response) {
                login(response)
                navigate('/account', { replace: true })
            }

            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    async function resendOtp() {
        try {
            const response = await resendOtpApi(otpEmail)
            if (response) {
                alert('OTP Resent!!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!otpEmail) {
            navigate('/account')
        }
    })


    return (
        <div>
            <Navbar />

            <div className='container'>

                <br />

                <h1> {'OTP Verification'} </h1>

                <div className='form-container'>
                    <form className='form' onSubmit={(e) => submit(e)}>
                        <div>
                            <h5> An OTP has been sent to your email address {otpEmail} </h5>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                inputType='number'
                                containerStyle={{ justifyContent: 'center', gap: '10px', marginTop: '20px' }}
                                inputStyle={{ width: '50px', height: '50px', justifyContent: 'center', borderRadius: '5px', border: '1px solid gray' }}
                                renderInput={(props) => <input {...props} />}
                            />
                            <br />
                            <label> Didn't receive the OTP? <label style={{ color: '#3b4fe4', cursor: 'pointer', fontSize: '12px' }} onClick={() => resendOtp()}> Resend OTP? </label> </label>
                        </div>

                        <button type='submit' className='submit-button' style={{ justifySelf: 'center' }} disabled={loading}> {
                            loading ? (<ClipLoader
                                color={'white'}
                                loading={loading}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />)
                                : 'Verify'} </button>
                    </form>
                </div >

            </div >

            <Footer />
        </div >
    )
}

export default VerifyOTP