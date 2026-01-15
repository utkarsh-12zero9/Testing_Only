"use client";

import { managerStore } from './store';
import { Provider } from 'react-redux';

const ManagerProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <Provider store={managerStore}>
            {children}
        </Provider>
    )
}

export default ManagerProvider;