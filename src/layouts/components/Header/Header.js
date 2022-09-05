import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'rsuite';

function Header() {
    const [user, setUser] = useState();

    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('lastName') + localStorage.getItem('firstName');
        const user2 = sessionStorage.getItem('lastName') + sessionStorage.getItem('firstName');
        if (user) {
            setUser(user);
        } else if (user2) {
            setUser(user2);
        }
    }, []);

    const showExit = () => setLogout(!logout);
    const handleLogout = () => {
        localStorage.clear();
        setLogout(false);
        window.location.reload();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header--title">CRUD</div>
            <i className="fa-solid fa-sliders  header--title--side"></i>
            <div className="header--action">
                <div className="header--icon">
                    <div className="header--icon--content">
                        {user ? <span className="user">{user}</span> : ''}
                        <i className="fa-solid fa-bell bell--header"></i>
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
