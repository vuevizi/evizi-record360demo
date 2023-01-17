import {gql, useQuery} from '@apollo/client';

const GET_COMPANIES = gql`
   query Query($name:String $active:Boolean $demo:Boolean $after:String $before:String $first:Int $last:Int $orderBy:CompanyOrder){
    companies (
      name:$name
      active:$active
      demo:$demo
      after:$after
      before: $before
      first: $first
      last: $last
      orderBy: $orderBy
      ) {
      edges{
        cursor
        node {
          active
          demo
          id
          maxUsers
          name
          planLevel
        }
        
      }
    }
  }
`;
const GET_COMPANY = gql`
query($id:ID!){
  company(id:$id){
    id
    name
  }
}
   
`;
export const useQueryCompanies = ({id}:{id:string}) => {

    const {data, loading, error} = useQuery(GET_COMPANY, {
        variables: {id}
    });

    return {data, loading, error};
};