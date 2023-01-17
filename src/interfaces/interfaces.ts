import {ApolloError} from '@apollo/client';

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
export interface NextParams {

    first: number,
    after: null | string,
}export interface PreviousParams {

    last: number,
    before: null | string,
}
export interface OrderByFilter {
    field: string;
    direction: string;
}
export interface FilterParamsState {
    name: null | string;
    lastCursor: string,
    page: NextParams | PreviousParams;
    orderBy: OrderByFilter
}
export interface CompanyNode{
    active
        :
        boolean
    demo
        :
        boolean
    id
        :
        string
    maxUsers
        :
        number
    name
        :
        string
    planLevel
        :
        string
    __typename
        :
        string
}
export interface CompanyData {

}
export interface EdgesItems {
    __typename: string;
    cursor?: string;
    node: CompanyNode;
}
export interface EdgesData {
   edges: EdgesItems[];
    __typename:string;


}

export interface CompaniesData {
    companies: EdgesData;
}
export interface DashBoardTableProps {
    data?: CompaniesData;
    loading: boolean;
    error?: ApolloError;
    handleGoBack: ()=>void;
}