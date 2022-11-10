import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import '../styles/globals.scss';
import wrapper from '../store/configureStore';

const Ptop = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>P2P</title>
            </Head>
            <Component />
        </>
    )
}

Ptop.propTypes = {
    Component: propTypes.elementType.isRequired
} 

export default wrapper.withRedux(Ptop);