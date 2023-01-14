import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Admin } from '../components/Admin';
import { Errorlog } from '../components/Errorlog';

export const AdminPanel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Admin-Panel';
        if (sessionStorage.getItem('username') == null) {
            navigate('/Login');
        }
    }, []);

    return (
        <div className="h-5/6 flex flex-row flex-grow-0">
            <Admin></Admin>
            <Errorlog></Errorlog>
        </div>
    );
};
