
import MenuLogin from './MenuLogin.jsx'
import MenuProfile from './MenuProfile.jsx';

const Menu = ({activeLogin, btnLogin}) => {
    return (
        activeLogin ? (
            <MenuProfile btnActive={btnLogin} />
        ) : (
            <MenuLogin active={btnLogin} />
        )
    )
}

export default Menu;