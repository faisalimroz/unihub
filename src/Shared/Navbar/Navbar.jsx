import  { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthProvider';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const handleLogout = () => {
        logOut()
            .then(() => {

            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        const fetchUserRole = async () => {
          try {
            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch the user role from MongoDB
            const response = await fetch(`https://unihub-server-ne3q.vercel.app//users/${user.email}`);
            const data = await response.json();
    
            if (data && data.role === 'admin') {
              setIsAdmin(true);
              
            }
          } catch (error) {
            console.error('Error fetching user roleeeee:', error);
          }
        };
    
        // Fetch the user's role when the component mounts
        if (user && user.uid) {
          fetchUserRole();
        }
      }, [user]);
        console.log('user', user);
    console.log('isAdmin', isAdmin);
    console.log('user.role', user && user.role);
    return (
        <div>
        <div className="navbar bg-purple-400 h-18">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/addinfo'>AddInfo</Link></li>
                        <li><Link to='/list'>List</Link></li>
                    
                    
                    
                        {
                                    user?.uid ? (
                                        <div className="dropdown dropdown-end  ">
                                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                                                <div className="w-10 rounded-full mb-5">
                                                    <img src={user.photoURL}alt='ddd' />
                                                </div>
                                            </label>
                                        
                                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                               {
                                                isAdmin && <li><Link to='/profile'>Profile</Link></li> 
                                               }
                                                


                                                <li onClick={handleLogout}><a>Logout</a></li>
                                            </ul>
                                            
                                        </div>
                                    ) : (
                                        <li><Link to='/login'>Login</Link></li>
                                    )
                                }



                    </ul>
                </div>
                <img src='https://i.ibb.co/QjXH5zb/image-removebg-preview.png' alt='' className='logo' />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal  h-18">
                    <li><Link to='/home'>Home</Link></li>
                  
                    <li><Link to='/addinfo'>AddInfo</Link></li>
                    <li><Link to='/list'>List</Link></li>
                    <li><Link to='/contactus'>Contact Us</Link></li>
                    
               
                    
                    {
                                    user?.uid ? (
                                        <div className="dropdown dropdown-end ">
                                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                <div className="w-10 rounded-full mt-2">
                                                    <img src={user.photoURL} alt='ddd' />
                                                </div>
                                            </label>
                                           
                                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                {
                                                isAdmin && <li><Link to='/profile'>Profile</Link></li> 
                                               }
                                                


                                                <li onClick={handleLogout}><a>Logout</a></li>
                                            </ul>
                                           
                                           
                                        </div>
                                    ) : (
                                        <li><Link to='/login'>Login</Link></li>
                                    )
                                }



                </ul>
            </div>
            <div className="navbar-end">

            </div>
        </div>
    </div>
    );
};

export default Navbar;