import LoginForm from './LoginForm.jsx';
import Profile from './Profile.jsx';

const Menu = ({activeLogin, btnLogin}) => {
    return (
        activeLogin ? (
            <Profile btnActive={btnLogin} />
        ) : (
            <LoginForm active={btnLogin} />
        )
    )
}

export default Menu;