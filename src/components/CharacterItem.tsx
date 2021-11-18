import styles from "../styles/components/CharacterItem/CharacterItem.module.css";
import icon_nazgul from "../assets/images/icon-nazgul.png";
import esmeralda from "../assets/images/esmeralda1.png";
import ainur_img from "../assets/images/ainur.png";
import dragons from "../assets/images/dragons.png";
import dwarf_male from "../assets/images/dwarf-male.gif";
import dwarves from "../assets/images/dwarves.png";
import elf_female from "../assets/images/elf-female.gif";
import elf_male from "../assets/images/elve-male.gif";
import elves from "../assets/images/elves.gif";
import ent from "../assets/images/ent.gif";
import female from "../assets/images/female.gif";
import hobbit_female from "../assets/images/hobbit-female.gif";
import hobbit_male from "../assets/images/hobbit-male.gif";
import maiar from "../assets/images/maiar.gif";
import man from "../assets/images/man.gif";
import men from "../assets/images/men.gif";
import orc from "../assets/images/orc-male.gif";
import orcs from "../assets/images/orcs.gif";
import ring_default_img from "../assets/images/ring.png";

interface CharacterInfo {
    name: string;
    index: number;
    race: string;
    gender: string;
    link: string;
    birth: string;
    death: string;
    key: string;
}

const CharacterItem = (props: CharacterInfo) => {
    const checkGender = () => {
        switch (true) {
            //Human
            case props.race === "Human" && props.gender === "Male":
                return man;
            case props.race === "Human" && props.gender === "male":
                return man;
            case props.race === "Human" && props.gender === "Female":
                return female;
            case props.race === "Human" && props.gender === "Males":
                return men;
            case props.race === "Men":
                return men;
            //elves
            case props.race === "Elf" && props.gender === "Male":
                return elf_male;
            case props.race === "Elf" && props.gender === "Female":
                return elf_female;
            case props.race === "Elf":
                return elf_male;
            case props.race === "Elves":
                return elves;
            //hobbits
            case props.race === "Hobbit" && props.gender === "Male":
                return hobbit_male;
            case props.race === "Hobbit" && props.gender === "male":
                return hobbit_male;
            case props.race === "Hobbit" && props.gender === "Female":
                return hobbit_female;
            case props.race === "Hobbit":
                return hobbit_male;
            case props.race === "Hobbits":
                return hobbit_male;
            //dwarfs
            case props.race === "Dwarf":
                return dwarf_male;
            case props.race === "Dwarves":
                return dwarves;
            //orcs
            case props.race === "Orc":
                return orc;
            case props.race === "Orcs":
                return orcs;
            //Ent
            case props.race === "Ent" || props.race === "Ents":
                return ent;
            //Maiar
            case props.race === "Maiar":
                return maiar;
            //Ainur
            case props.race === "Ainur":
                return ainur_img;
            //Dragons
            case props.race === "Dragons" || props.race === "Dragon":
                return dragons;
            default:
                return ring_default_img;
        }
    };

    return (
        <li id={props.key} className={styles["character-card"]}>
            <div className={styles["character-card__content"]}>
                <div className={styles["character-card__dots"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles["character-card__header"]}>
                    <div className={styles["character-card__index-wrapper"]}>
                        <div className={styles.img}>
                            <img
                                src={icon_nazgul}
                                alt="icon-nazgul"
                                loading="lazy"
                            />
                        </div>
                        <div className={styles["character-card__index-number"]}>
                            <span> {props.index} </span>
                        </div>
                    </div>
                    <p>{props.name}</p>
                </div>
                <div className={styles["character-card__image"]}>
                    <img src={checkGender()} alt="avatar" loading="lazy" />
                </div>
                <div className={styles["character-card__race"]}>
                    <img src={esmeralda} alt="esmeralta item" loading="lazy" />{" "}
                    {props.race}
                </div>
                <div className={styles["character-card__info-field"]}>
                    {props.gender !== "NaN" && props.gender !== "" && (
                        <p>Gender : {props.gender} </p>
                    )}
                    {props.birth !== "NaN" && props.birth !== "" && (
                        <p>Birth : {props.birth} </p>
                    )}
                    {props.death !== "NaN" && props.death !== "" && (
                        <p className={styles["character-card__death"]}>
                            Death : {props.death}{" "}
                        </p>
                    )}
                    <p className={styles["character-card__link"]}>
                        <a
                            href={`${props.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            More About This Character{" "}
                        </a>
                    </p>
                </div>
                <p className={styles["character-card__elfic-font"]}>tt</p>
            </div>
        </li>
    );
};

export default CharacterItem;
