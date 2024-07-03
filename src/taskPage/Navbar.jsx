import React from "react";
import '../design.css';
import { Link, useLocation } from "react-router-dom";
import homeIcon from '../asset/icons8-home.svg';
import listIcon from '../asset/list.png';

function Navbar() {
    const location = useLocation()
    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-light dashboard  ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="ms-5 h2 txt-color">{location.pathname == "/" ? "Home Page" : "View Page"}</div>
                <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                    <ul className="navbar-nav nav-gap">
                        <li class="nav-item">
                            <Link to={"/"}>
                                <img
                                    src={homeIcon}
                                    alt="home icon"
                                />
                            </Link>
                        </li>
                        <li class="nav-text">
                            <Link to={"/viewpage"}>
                                <img
                                    style={{ width: "20px", height: "20px" }}
                                    src={listIcon}
                                    alt="home icon"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar