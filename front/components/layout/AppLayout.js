import React from 'react';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Nav />
            {children}
        </>
    )
}

export default AppLayout;