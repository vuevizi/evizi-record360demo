import React from 'react';
import {HeaderProps} from "../../interfaces/interfaces";
import "./style.css"
import {Button, Modal} from "antd";
import {useAppDispatch} from "../../redux/hooks";
import {logout} from "../../features/login/login.slice";
import {useNavigate} from "react-router-dom";
import {RoutesPath} from "../../constants/RoutesPath";
const Header: React.FC<HeaderProps> = ({title}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const accessToken = Boolean(localStorage.getItem("access-token"));
    const handleLogOut = () => {
        Modal.confirm({
            content: "Do you want to log out ?",
            onOk: () => {
                localStorage.removeItem("access-token");
                navigate(RoutesPath.LOGIN);
                dispatch(logout())
            }
        })

    }
    return (
        <header>
            <nav>
                <div className="header__title">
                    <span>{title}</span>
                </div>
                {accessToken&&<Button onClick={()=>handleLogOut()} className="btn__logout">Logout</Button>}
            </nav>
        </header>
    );
};

export default Header;