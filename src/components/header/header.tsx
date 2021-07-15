import React from 'react';

import './header.css';

const Header = () => {
    return (
    <div className="header d-flex navbar-dark bg-primary">
        <h3>
        <a href="/view-component">
            JiraAPI
        </a>
        </h3>
        <div className="d-flex vyhod">
            <ul>
                <li>
                    <a href="./" onClick={e=>{
                        localStorage.clear();
                    }}>Выход</a>
                </li>
            </ul>
        </div>
    </div>
    );
};

export default Header;