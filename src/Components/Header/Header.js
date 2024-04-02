import React, { useRef, useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { toast } from "react-toastify";
import { cartActions } from "../../redux/slices/cartSlice";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isProfileActionsVisible, setProfileActionsVisible] = useState(false);
  const dispatch = useDispatch();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
        // Reset the cart state to its initial values
        dispatch(cartActions.resetCart());
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const Profile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the profile actions
      if (
        isProfileActionsVisible &&
        !event.target.closest(".profile__actions") &&
        !event.target.closest(".profile")
      ) {
        setProfileActionsVisible(false);
      }
    };

    // Attach a global click event listener to handle outside clicks
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isProfileActionsVisible]);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    setProfileActionsVisible(!isProfileActionsVisible);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <Link to="/home">
                <img src={logo} alt="logo" />
              </Link>
              <div>
                <Link to="/home">
                  <h1>Furniture Mart</h1>
                </Link>
                {/*<p>Since 2000</p>*/}
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              {/* <span className="fav__icon">
                <i class="ri-heart-line"></i>
                <span className="badge">2</span>
                    </span>*/}
              <span className="cart__icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className={`profile__actions ${
                    isProfileActionsVisible ? "show__profileActions" : ""
                  }`}
                >
                  {currentUser ? (
                    <div>
                      <tr>
                        <span onClick={logout}>Logout</span>
                      </tr>
                      <tr>
                        <Link to="/profile">
                          <span onClick={Profile}>Profile</span>
                        </Link>
                      </tr>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  /<i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
