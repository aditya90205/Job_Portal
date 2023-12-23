// const Navbar = (props) => {
//   return (
//     <>
//       <div className="h-20 flex items-center text-white w-full justify-between lg:px-56">
//         <h1 className="text-3xl pl-20 font-bold">Joboard.</h1>
//         <div className="mx-5">
//         <button
//             type="button"
//             className="mx-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//           >
//             Login
//           </button>

//           <button
//             type="button"
//             onClick={props.openJObModal}
//             className="mx-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//           >
//             Post Jobs
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

import { handleGoogleSignIn } from "../../App";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth);
  };

  return (
    <>
      <div className="h-20 flex items-center text-white w-full justify-between lg:px-56">
        <h1 className="text-3xl pl-20 font-bold">Joboard.</h1>
        <div className="mx-5">
          {user ? (
            <button
              onClick={handleLogout}
              type="button"
              className="mx-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="mx-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          )}
          <button
            type="button"
            onClick={props.openJObModal}
            className="mx-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Post Jobs
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
