import { Link, Outlet } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {user}=useContext(AuthContext)
    
    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch the user role from MongoDB
          const response = await fetch(`http://localhost:5000/users/${user.email}`);
          const data = await response.json();
  
          if (data && data.role === 'admin') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
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
    <div className='bg-violet-100'>
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            <Outlet></Outlet>
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button sm:hidden md:hidden lg:hidden">Open drawer</label>
        </div>
        <div className="drawer-side bg-purple-400 ">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full  text-base-content">
                {/* Common links for all users */}
                <li><Link to='updateprofile'><img className='h-8 w-8 ' src="https://i.ibb.co/mhq2T4p/update-user.png " alt="salary" />Update Profile</Link></li>
                

                {/* Links visible only for admin */}
                {isAdmin && (
                    <>
                        <li><Link to='adminhome'><img className='h-8 w-8 ' src="https://i.ibb.co/mtHSzh4/image.png" alt="salary" />Admin Home</Link></li>
                        <li><Link to='allusers'><img className='h-8 w-8 ' src="https://i.ibb.co/stssN8z/image.png" alt="salary" />All Users</Link></li>
                    </>
                )}
            </ul>
        </div>
    </div>
</div>
  );
};

export default Profile;
