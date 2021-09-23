import React from 'react';
import styles from '../../styles/Header/Header.module.css'

const Header:React.FC = () => {
    return(
        <header className={styles.header} >
            <h1>The lord of the rings</h1>
        </header>
    )
}

export default Header