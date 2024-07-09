import React, { useState } from "react";
import addButton from '../asset/createbutton.svg';
import dashboard from '../asset/collapse tab.svg';
import openbar from '../asset/Frame 1171275844.svg'
import closebar from '../asset/icons.svg'
import { useLocation, useNavigate } from "react-router";
import '../design.css';



function DashBoard() {
    const [expanded, setExpanded] = useState(false);
    const [iconContent, seticonContent] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [toggleImg, settoggleImg] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setExpanded(!expanded);
        seticonContent(!iconContent)
        settoggleImg(!toggleImg)
    };

    const handleHomePage = () => {
        navigate('/')
        setIsClicked(true);
        // setActiveIcon(!activeIcon)
    }
    const handleViewPage = () => {
        navigate('/viewpage')
        setIsClicked(true);

    }

    return (
        <div className={`dashboard-comp ${expanded ? 'expanded' : ''}`}>
            <button className="btn" style={{ width: "10px", position: "sticky", left: "300px" }} onClick={toggleSidebar}>
                {toggleImg ? (
                    <img style={{
                        width: "28px",
                        height: "28px",
                        background: "white",
                        borderRadius: "32px",
                        position: "relative",
                        left: "0px"
                    }} src={closebar} alt="Close Sidebar" />

                ) : (
                    <img className="open-close" src={openbar} alt="Open Sidebar" />
                )}
            </button>
            <div className="icon-container ms-3">
                <div className={`icon-wrapper mt-5`}>
                    <div className={`icon-content ${location.pathname == '/adduser' ? 'iconContentWrap' : ''} `}>
                        <img className="icon" src={addButton} alt="Add" onClick={handleHomePage} />
                        {expanded && <span className={`icon-text ${location.pathname == '/adduser' ? 'icon-txt-color' : ''}`} onClick={handleHomePage} >Add</span>}
                    </div>
                </div>
                <div className="icon-wrapper mt-5">
                    <div className={`icon-content ${location.pathname == '/viewpage' ? 'iconContentWrap' : ''} `}>
                        <img className="icon" src={dashboard} alt="Dashboard" onClick={handleViewPage} />
                        {expanded && <span className={`icon-text ${location.pathname == '/viewpage' ? 'icon-txt-color' : ''}`} onClick={handleViewPage} >Dashboard</span>}
                    </div>
                </div>
                {/* Add more images and text spans or components similarly */}
            </div>
        </div>
    );
}

export default DashBoard;
