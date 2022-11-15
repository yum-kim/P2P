import React from 'react';
import Head from 'next/head';
import propTypes from 'prop-types';
import '../styles/global.scss';
import wrapper from '../store/configureStore';

const Ptop = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>P2P</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

Ptop.propTypes = {
    Component: propTypes.elementType.isRequired
} 

export default wrapper.withRedux(Ptop);