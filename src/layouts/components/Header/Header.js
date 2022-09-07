import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'rsuite';
import TimeLine from './TimeLine/TimeLine';

function Header(props) {
    const [user, setUser] = useState();
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();
    const { timeline } = props;

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const user = localStorage.getItem('lastName') + localStorage.getItem('firstName');
                const user2 = sessionStorage.getItem('lastName') + sessionStorage.getItem('firstName');
                if (user) {
                    setUser(user);
                } else if (user2) {
                    setUser(user2);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    const showExit = () => setLogout(!logout);
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setLogout(false);
        window.location.reload();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header--title">CRUD</div>
            <i className="fa-solid fa-sliders  header--title--side"></i>
            <span className="alert--header--affer"></span>
            <div className="header--action">
                <div className="header--icon">
                    <div className="header--icon--content">
                        {user ? <span className="user">{user}</span> : ''}
                        {timeline && <TimeLine timeline={timeline}></TimeLine>}
                        {logout === true ? (
                            <div className="showlogout" onClick={handleLogout}>
                                <span>Đăng xuất</span>
                                <Icon icon="sign-out" />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                <div className="header--img">
                    <img
                        onClick={showExit}
                        className="header--img--content"
                        alt="img"
                        src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
