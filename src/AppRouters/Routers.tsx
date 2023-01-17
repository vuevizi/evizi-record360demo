import {Routes, Route, Navigate} from "react-router-dom";
import {AdminLayout, AuthLayout} from "../layouts";
import {RoutesPath} from "../constants/RoutesPath";
import {DashBoard, Login} from "../pages";

export const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={RoutesPath.LOGIN}/>}/>
            <Route element={<AdminLayout/>}>
                <Route path={RoutesPath.DASHBOARD} element={<DashBoard/>}/>
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path={RoutesPath.LOGIN} element={<Login/>}/>
            </Route>
        </Routes>
    )
}