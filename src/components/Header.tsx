import React from "react";
import styles from "../styles/components/Header/Header.module.css";
import ring_logo from "../assets/images/ring-logo.png";

interface HeaderProps {
	onReceiveRace: (e: string) => void;
	onFilteringByName: (e: string) => void;
}

const Header = (props: HeaderProps) => {
	const raceSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.onReceiveRace(e.currentTarget.value);
	};

	const filteringByName = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onFilteringByName(e.currentTarget.value);
	};

	return (
		<header className={styles["main-header"]}>
			<div className={styles["main-header__logo"]}>
				<img src={ring_logo} alt="card avatar" />
				<h1 className={styles["main-header__title"]}>
					The lord of the Rings{" "}
				</h1>
			</div>
			<div>
				<select
					className={styles["main-header__select"]}
					name="Select the Race"
					onChange={raceSelected}
				>
					<option selected disabled>
						Select by Race
					</option>
					<option value="All">All</option>
					<option value="Human,Men">Human</option>
					<option value="Hobbit,Hobbits">Hobbit</option>
					<option value="Elf,Elves">Elf</option>
					<option value="Dwarf,Dwarves">Dwarf</option>
					<option value="Maiar">Maiar</option>
					<option value="Orcs,Orc">Orcs</option>
					<option value="Dragons,Dragon">Dragon</option>
					<option value="Ents,Ent">Ent</option>
					<option value="Ainur">Ainur</option>
					<option value="Uruk-hai">Uruk-hai</option>
					<option value="Eagle,Great Eagles">Eagle</option>
					<option value="Vampire,Half-elven,Stone-trolls,Balrog,Werewolves,Urulóki,Wraith,Great Spiders,Horse">
						This List Goes On
					</option>
				</select>
				<input
					type="search"
					placeholder="Search by name"
					onChange={filteringByName}
					className={styles["main-header__search"]}
				/>
			</div>
		</header>
	);
};

export default Header;
