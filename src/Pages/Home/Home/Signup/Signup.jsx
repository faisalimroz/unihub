import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
// import Swal from 'sweetalert2';


import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../context/AuthProvider';
const Signup = () => {
    const {register,handleSubmit,watch, formState: { errors }}=useForm();
    const [signUpError,setSignUpError]=useState('')
    const {createUser,verifyEmail,updateUser}=useContext(AuthContext)
    const navigate= useNavigate()

    const onSubmit=(data)=>{

        console.log(data)
        setSignUpError('')
        createUser(data.email,data.password)
        
        .then(user=>{
            verifyEmail(user)
            .then(()=>{
               
                navigate('/')
                console.log('email verified')
                const userInfo= {
                    displayName:data.name,

                }
                console.log(userInfo)
                updateUser(userInfo)
                .then(()=>{
                    saveUser(data.name,data.email)
                })
                Swal.fire({
                    title: 'Signup Successful',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
             
            })
         })
        .catch(error=>{
            console.log(error)
            setSignUpError(error.message)
         })

    }
    const saveUser=(name,email)=>{
        const user={name,email};
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('saveuser',data);
            // setCreatedUserEmail(email);
        })
    }
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse bg-base-200">

                <div className="card md:w-1/2 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control " >
                            <label className="label" for="name">
                                <span className="label-text">Name</span>
                            </label>
                            <input id='form-borders' {...register('name')} type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control ">
                            <label className="label" for="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register('email')} name='email' placeholder="email" className="input input-bordered" />
                        </div>
                      
                        
                        <div className="form-control ">
                            <label className="label" for="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register('password')} name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Signup" />
                        </div>
                        <div>
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        </div>
                    </form>
                    <p><small>Already have an account? <Link to='/login'>Login</Link></small></p>
                </div>
                <div className="text-center lg:text-left md:w-1/2">
                    <h1 className="text-5xl font-bold">Signup now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;