import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useState } from 'react';
import Login from '../../pages/Login/Login';

function DefaultLayout({ children }) {
    const [user, setUser] = useState();
    const getUser = (token) => {
        setUser(token);
    };
    const token = localStorage.getItem('token');
    const token2 = sessionStorage.getItem('token');
    if (user || token || token2) {
        return (
            <>
                <Header />
                <div className="container">
                    <Sidebar />
                    <div className="main--page"> {children} </div>
                </div>
            </>
        );
    } else return <Login getUser={getUser}></Login>;
}

export default DefaultLayout;
