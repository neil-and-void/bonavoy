import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
//import UserModal from '../UserModal/UserModal'
import Modal from '../Modal/Modal';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './MNavbar.css';

function MNavbar(props) {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalReg, setModalReg] = useState(false);

  const modalClick = () => {
    setModal(true);
  }
  const modalClickS = () => {
    setModalReg(true);
  }
  const handleClose = () => {
    setModal(false);
  }
  const handleCloseReg = () => {
    setModalReg(false);
  }
  const switchModal = () => {
    setModal(!modal);
    setModalReg(!modalReg);
  }

  const handleClick = () => {
    setClick(!click);
    if (!click){
      document.body.style.overflow = 'hidden';
    } else{
      document.body.style.overflow = 'unset';
    }
  }
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 1200) {
      setButton(false);
    } else {
      setButton(true);
      document.body.style.overflow = 'unset';
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  
  window.addEventListener('resize', showButton);

  const transNav = () => {
    if(window.scrollY >= 80) {
        setNavbar(true);
    }
    else{
        setNavbar(false)
    }
  }
  window.addEventListener('scroll', transNav)
  return (
    <>
      <nav className={click ? navbar ? 'navbar active' : 'navbar active': navbar ? 'navbar active' : 'navbar' }>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          {/* <i className = 'fas fa-route'/> */}
            bonavoy
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'navbar-x fas fa-times' : 'navbar-bars fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {/* <ul className={navbar ? click ? 'nav-menu active' : 'nav-menu': click ? 'nav-menu active past' : 'nav-menu'}> */}
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu && handleClick}>
                Explore
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/planner'
                className='nav-links'
                onClick={closeMobileMenu && handleClick}
              >
                Trip Planner
              </Link>
            </li>
            <div className="flexbox">
              <li className={!props.data ? 'nav-item' : 'nav-item display-none'}>
                <div
                  className='nav-links-mobile'
                  onClick={closeMobileMenu && handleClick && modalClick}
                >
                  LOG IN
                </div>
              </li>

              <li className={!props.data ? ' ': 'display-none'}>
                <div
                  className='nav-links-mobile nooutline'
                  onClick={closeMobileMenu && handleClick && modalClickS}
                >
                  SIGN UP
                </div>
              </li>
              
            </div>
          </ul>
          <div className="btns">
            <span className={!props.data ? "btn-span" : "btn-span display-none"}>
              {button && <Button buttonStyle='btn--outline' onClick={modalClick}>LOG IN</Button>}
            </span>
            <span className={!props.data ? "btn-span" : "btn-span display-none"}>
              {button && <Button buttonStyle='btn--primary' onClick={modalClickS}>SIGN UP</Button>}
            </span>
            <span className={props.data ? "navbar-user-icon" : "navbar-user-icon display-none"}>
              <div className="dropdown">
                {button && <i className="fas fa-user-circle"></i>}
                <div className="dropdown-content">
                  <h1 className="navbar-username-dropdown">Hello, {props.data ? props.data.firstname : ""}</h1>
                  <a className="user-dropdown" href="/trips">My Trips</a>
                  <a className="user-dropdown" href="/account">Account</a>
                  {/* <a href="#">Link 3</a> */}
                  <div className="lastelement-dropdown">
                    <div className="logout-dropdown">
                      <i className="fas fa-sign-out-alt logout-dropdown-icon" onClick={props.logoutfunction}></i>
                    </div>
                    <div className="help-dropdown">
                      <i className="fas fa-question-circle help-dropdown-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </nav>
      {modal ?
        <Modal show={modal} className="user-modal"><Login switch={switchModal} handleClose={handleClose}/></Modal> : null
      }
      {modalReg ?
        <Modal show={modalReg} className="user-modal"><Register switch={switchModal} handleClose={handleCloseReg}/></Modal> : null
      }
    </>
  );
}

export default MNavbar;
