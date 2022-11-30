import React from 'react';
import styles from './Search.module.scss';
import Input from './Input';

const Search = ({ ...rest }) => {
    return (
        <div className={styles.search}>
            <i class="bi bi-search"></i>
            <Input {...rest} />
        </div>
    );
};

export default Search;