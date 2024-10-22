import React, { useState, useCallback } from 'react';
import downIcon from '../../Assets/Images/Down.svg';


import './NavbarComponent.css';

export default function Navbar(props) {
    // State to track the visibility of filter dropdown
    const [toggleFilter, setToggleFilter] = useState(false);

    const handleDisplayToggle = useCallback((e) => {
        setToggleFilter((prev) => !prev);
        if (e.target.value !== undefined) {
            props.handleGroupValue(e.target.value);
        }
    }, [props]);

    const handleOrderingValue = useCallback((e) => {
        // Toggle dropdown visibility
        setToggleFilter((prev) => !prev); 
        if (e.target.value !== undefined) {
            // Update the groupValue passed from parent component
            props.handleOrderValue(e.target.value);
        }
    }, [props]);

    return (
        <section className="nav">
            <div className="nav-container">
                <div>
                    <div className="nav-disp-btn" onClick={handleDisplayToggle}>
                        <div className="nav-disp-icon nav-disp-filter">
                        
                        </div>
                        <div className="nav-disp-heading">Display</div>
                        <div className="nav-disp-icon nav-disp-drop">
                            <img src={downIcon} alt="Dropdown Icon" />
                        </div>
                    </div>
                    <div className={toggleFilter ? "nav-disp-dropdown nav-disp-dropdown-show" : "nav-disp-dropdown"}>
                        <div className="nav-disp-filters">
                            <div className="nav-dropdown-category">Grouping</div>
                            <div className="nav-dropdown-selector">
                                <select
                                    value={props.groupValue}
                                    onChange={handleDisplayToggle}
                                    className='nav-selector'
                                    name="grouping"
                                    id=""
                                >
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>
                            </div>
                        </div>
                        <div className="nav-disp-filters">
                            <div className="nav-dropdown-category">Ordering</div>
                            <div className="nav-dropdown-selector">
                                <select
                                    value={props.orderValue}
                                    onChange={handleOrderingValue}
                                    className='nav-selector'
                                    name="ordering"
                                    id=""
                                >
                                    <option value="priority">Priority</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
