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
            <div className="hero-content flex-col lg:flex-row-reverse bg-base-200">

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
                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center font-bold'><small>New to Unihub? <Link to='/signup'>Sign Up</Link></small></p>
                </div>
                <div className="text-center lg:text-left md:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;