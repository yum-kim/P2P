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
                <link rel="shortcut icon" href="favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
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