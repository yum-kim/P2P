import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <img src="/images/loading.gif" alt="loading"/>
        </div>
    );
};

export default Loading;