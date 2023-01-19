import {gql, useQuery} from '@apollo/client';
import React, {useCallback, useState} from 'react';
import {FilterParamsState} from '../interfaces/interfaces';

const GET_COMPANIES = gql`
  query Query(
    $name: String
    $active: Boolean
    $demo: Boolean
    $after: String
    $before: String
    $first: Int
    $last: Int
    $orderBy: CompanyOrder
  ) {
    companies(
      name: $name
      active: $active
      demo: $demo
      after: $after
      before: $before
      first: $first
      last: $last
      orderBy: $orderBy
    ) {
      edges {
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

export const useQueryCompanies = () => {
  const [filterParams, setFilterParams] = useState<FilterParamsState>({
    name: '',
    lastCursor: '',
    orderBy: {
      field: 'CREATED_AT',
      direction: 'ASC'
    },
    page: {
      first: 20,
      after: null
    }
  });

  const {data, loading, error} = useQuery(GET_COMPANIES, {
    variables: {
      name: filterParams.name,
      ...filterParams.page,
      orderBy: {...filterParams.orderBy}
    }
  });
  const handleChangeField = (value: string) => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        orderBy: {
          ...prevState.orderBy,
          field: value
        }
      };
    });
  };
  const handleChangeDirection = (value: string) => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        orderBy: {
          ...prevState.orderBy,
          direction: value
        }
      };
    });
  };
  const handleFilterByInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        name: value.target.value,
        page: {
          first: 20,
          after: null
        }
      };
    });
  };
  const handleNextPage = (cursor: string) => {
    // @ts-ignore
    const lastCursor: [] = JSON.parse(localStorage.getItem('cursor'));
    // @ts-ignore
    lastCursor.push(cursor);
    localStorage.setItem('cursor', JSON.stringify(lastCursor));
    setFilterParams((prevState) => {
      return {
        ...prevState,
        lastCursor: cursor,
        page: {
          first: 20,
          after: cursor
        }
      };
    });
  };

  const handlePreviousPage = (cursor: string) => {
    const lastCursor = JSON.parse(localStorage.getItem('cursor'));
    lastCursor.push(cursor);
    localStorage.setItem('cursor', JSON.stringify(lastCursor));
    setFilterParams((prevState) => {
      return {
        ...prevState,
        lastCursor: cursor,
        page: {
          last: 20,
          before: cursor
        }
      };
    });
  };
  const handleGoBack = () => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        name: '',
        lastCursor: '',
        page: {
          first: 20,
          after: null
        }
      };
    });
  };

  return {
    data,
    loading,
    error,
    filterParams,
    handleNextPage,
    handlePreviousPage,
    handleGoBack,
    handleFilterByInput,
    handleChangeField,
    handleChangeDirection
  };
};
