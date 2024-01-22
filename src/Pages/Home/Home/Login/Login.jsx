import  { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loginError,setLoginError]=useState('')
    const { signIn, logOut } = useContext(AuthContext);
    const navigate= useNavigate()
    const onSubmits = data => {
        console.log(data)
        signIn(data.email,data.password)
        .then(result=>{
            const user=result.user;
            console.log(user)
            navigate('/')
        })
        .catch(error => {
            console.log(error)
            setLoginError(error.message)
        })

    }
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse  bg-purple-400">

                <div className="card md:w-1/2 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmits)} className="card-body">
                        <div className="form-control ">
                            <label className="label" >
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register('email')}  placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register('password')}  placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {loginError && <p className='bg-red-300'>{loginError}</p>}
                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center font-bold'><small>New to Unihub? <Link to='/signup'>Sign Up</Link></small></p>
                </div>
                <div className="text-center lg:text-left md:w-1/2">

                    <img src='https://i.ibb.co/T2p6NW8/image.png' alt='login'/>
                    <p className="py-6 text-xl">Welcome to the login page. By logging in you can add university information and contribute to our website.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;