import React from 'react'
import styles from '../../../styles/UI/CharacterItem/CharacterItem.module.css'

interface  CharacterInfo {
    name: string
}

const CharacterItem = (props:CharacterInfo) => {
    return(
        <li className={styles['character-wrapper']}>
            <div className={styles["character-item"]}>
                {props.name}
            </div>
        </li>
    )
}

export default CharacterItem;