export type HeaderProps = {
    title: string,
}
export type LoginParams = {
    username: string;
    password: string;
}
export interface UserInfo {
    email: string;
    id: string;
}
export interface LoginReduxState {
    user: UserInfo | null
}
