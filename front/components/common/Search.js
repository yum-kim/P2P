import React from 'react';
import styles from './Search.module.scss';

const Search = ({ ...rest }) => {
    return (
        <div className={styles.search}>
            <i class="bi bi-search"></i>
            <input type="text" {...rest} />
        </div>
    );
};

export default Search;