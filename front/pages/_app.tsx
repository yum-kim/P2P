import React from 'react';
import Head from 'next/head';
import '../styles/global.scss';
// import wrapper from '../store/configureStore';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import { store } from '../store/configureStore';
import useSocket from '../hooks/useSocket';

interface AppProps {
    Component: NextPage
}

const App: React.FC<AppProps> = ({ Component }) => {
    // const { socket } = useSocket();

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
            <Provider store={store}>
                <div id="modal"></div>
                <Component />
            </Provider>
        </>
    )
}

export default App;
