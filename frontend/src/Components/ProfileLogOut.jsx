import { useState } from 'react';
import { useLogOut, useToast } from "../hooks/indexHooks";


const ProfileLogOut = ({username}) => {

	const logOut = useLogOut();
	const callToast = useToast();
	const [exit, setExit] = useState(false);
 
	if(exit) return logOut();

    const handleLogOut = () => {
		setExit(prev => !prev);
		callToast('information', `Goodbye ${username}`);
	};

    return (
        <button className="base-btn-form-cropLeft" onClick={handleLogOut}>
        <i
            className="bi bi-box-arrow-left profile__form-iconAdjust"
    
        ></i>
        Log Out
    </button>
    )
}

export default ProfileLogOut;