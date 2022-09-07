import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import Login from '../../pages/Login/Login';
import { getTimeLine } from '../../ApiService/Apiservice';
import { createContext } from 'react';

function DefaultLayout({ children }) {
    const UserContext = createContext();
    const [user, setUser] = useState();
    const [timeline, setTimeline] = useState([]);

    const getUser = (token) => {
        setUser(token);
    };

    const token = localStorage.getItem('token');
    const token2 = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const allTimeline = await getTimeLine();
                setTimeline(allTimeline);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    const getDataTimeline = (data) => {
        setTimeline([...timeline, data]);
    };
    if (user || token || token2) {
        return (
            <>
                <UserContext.Provider value={getDataTimeline}>
                    <Header timeline={timeline} />
                    <div className="container">
                        <Sidebar />
                        <div className="main--page"> {children} </div>
                    </div>
                </UserContext.Provider>
            </>
        );
    } else return <Login getUser={getUser}></Login>;
}

export default DefaultLayout;
