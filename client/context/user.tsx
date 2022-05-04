import { Loader } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    useQuery,
} from 'react-query';
import { getMe } from '../api';
import { QueryKeys, User } from '../types';

const UserContext = createContext<{
    user: User;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
    //@ts-ignore
}>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, refetch } = useQuery(QueryKeys.USER, getMe);

    return (
        <UserContext.Provider value={{ user: data, refetch }}>
            {isLoading ? <Loader /> : children}
        </UserContext.Provider>
    );
};

const useMe = () => useContext(UserContext);

export { UserContextProvider, useMe };
