import styles from '../../../styles/UI/CharacterItem/CharacterItem.module.css'

interface  CharacterInfo {
    name: string;
    index: number;
    race: string;
    gender: string;
    link: string;
    birth: string
    death: string;
    key: string;
}

const CharacterItem = (props:CharacterInfo) => {

    const checkGender = () => {
        switch(true){
            //Human
            case props.race === 'Human' && props.gender === 'Male':
                return './man.gif';
            case props.race === 'Human' && props.gender === 'male':
                return './man.gif';
            case props.race === 'Human' && props.gender === 'Female':
                return './female.gif'
            case props.race === 'Human' && props.gender === 'Males':
                return './men.gif'
            case props.race === 'Men':
                return './men.gif'
            //elves
            case props.race === 'Elf' && props.gender === 'Male':
                return './elve-male.gif'
            case props.race === 'Elf' && props.gender === 'Female':
                return './elf-female.gif'
            case props.race === 'Elf':
                return './elve-male.gif'
            case props.race === 'Elves':
                return './elves.gif'
            //hobbits
            case props.race === 'Hobbit' && props.gender === 'Male':
                return './hobbit-male.gif'
            case props.race === 'Hobbit' && props.gender === 'male':
                return './hobbit-male.gif'
            case props.race === 'Hobbit' && props.gender === 'Female':
                return './hobbit-female.gif'
            case props.race === 'Hobbit':
                return './hobbit-male.gif'
            case props.race === 'Hobbits':
                return './hobbit-male.gif'
            //dwarfs
            case props.race === 'Dwarf':
                return './dwarf-male.gif'
            case props.race === 'Dwarves':
                return './dwarves.png'
            //orcs
            case props.race === 'Orc' || props.race === 'Orcs':
                return './orc-male.gif'
            //Ent
            case props.race === 'Ent' || props.race === 'Ents':
                return './ent.gif'
            //Maiar
            case props.race === 'Maiar':
                return './maiar.gif'
            //Ainur
            case props.race === 'Ainur':
                return './ainur.png'
            //Dragons
            case props.race === 'Dragons' || props.race === 'Dragon':
                return './dragons.png'
            default:
                return './ring.png'
        }
    }

    return(
        <li id={props.key} className={styles['character-wrapper']}>
            <div className={styles["character-item"]}>
                <div className={styles.header}> 
                    <div className={styles.index}> 
                        <div className={styles.img}>
                            <img src="./icon-nazgul.png" alt="icon-nazgul" />
                        </div>
                        <div className={styles['index-number']}>
                            <span> {props.index}  </span>
                        </div>

                    </div>
                    <p>{ props.name}</p>

                </div>
                <div className={styles.picture}> 
                    <img src={checkGender()} alt="dd" />
                </div>
                <div className={styles.race}> <img src="./esmeralda1.png" alt="esmeralta item"/>  {props.race} </div>
                <div className={styles.info}>
                    {props.gender !== 'NaN' && props.gender !== '' && <p>Gender : {props.gender} </p>}
                    {props.birth !== 'NaN' && props.birth !== '' && <p>Birth : {props.birth } </p>}
                    {props.death !== 'NaN' && props.death !== '' && <p className={styles.death}>Death : {props.death } </p>}
                    <p className={styles.link}> <a href={`${props.link}`}  target="_blank" rel="noopener noreferrer"> More About This Character </a> </p>
                </div>
            </div>
        </li>
    )
}

export default CharacterItem;