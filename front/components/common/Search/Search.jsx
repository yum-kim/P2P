import React from 'react';
import styles from './Search.module.scss';
import Input from '../../element/Input/Input';
import { BsSearch } from "react-icons/bs";

const Search = ({ ...rest }) => {
    return (
        <div className={styles.search}>
            <BsSearch />
            <Input {...rest} />
        </div>
    );
};

export default Search;