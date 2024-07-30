// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';
// import '../components/navbar.css';
// import axios from 'axios';
// import { IoMdMenu } from "react-icons/io";
// import { RxCross1 } from "react-icons/rx";
// import { MdAccountCircle } from "react-icons/md";
// import { FiShoppingBag } from "react-icons/fi";
// import { FaCartShopping } from "react-icons/fa6";

// const Navbar = ({ authenticatedUser, logout }) => {

 
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDetail, setShowDetail] = useState(false);


//   const AccountMenu = () => {
//     setShowDetail(!showDetail);
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className='nav-header'>
//       <a className='nav-logo'>
//         <Link to='/uploadproduct'><img src={logo} alt="Logo" /></Link>
//       </a>
//       <ul className={isOpen ? 'menu-open' : 'menu-close'}>
//         <Link to='/home'><li><a>Home</a></li></Link>
//         <li><a href='#third'>About</a></li>
//         <li><a href='#third'>Product</a></li>
//         <li><a href='#footer'>Contact</a></li>
//       </ul>
//       <div className={`nav-image-container ${isOpen ? '' : 'hidden'}`}>
//         <MdAccountCircle onClick={AccountMenu} className='nav-icon' />
//         <FaCartShopping  className='nav-icon' />
//         <FiShoppingBag  className='nav-icon' />
//       </div>
//       {/* <div className='menu-toggle' onClick={toggleMenu}>
//         {isOpen ? <RxCross1 className='menu' /> : <IoMdMenu className='menu' />}
//       </div> */}

//       <div className={`${showDetail ? 'account-container' : 'account-container-2'}`}>
//         <div>
//           <h1>Welcome {authenticatedUser.username}</h1>
//           <button onClick={logout}>Logout</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
