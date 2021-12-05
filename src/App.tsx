import { useEffect, useState } from "react";
import * as helper from "./helper/reusableFunctions";
import "./styles/Global/Global.css";
import { URLcharacters, headers, URLcharactersRace } from "./services/api/lotr";
import ICharacterInfo from "./interfaces/characterInfo";
import IPaginationChange from "./interfaces/paginationChange";
import ReactPaginate from "react-paginate";
import Header from "./components/Header";
import CharacterItem from "./components/CharacterItem";
import Loading from "./components/Loading";
import useHttp from "./hooks/use-http";

function App() {
	const [mainListOfCharacters, setMainListOfCharacters] = useState<
		ICharacterInfo[]
	>([]);
	const [raceSelected, setRaceSelected] = useState<string>("");
	const [characters, setCharacters] = useState<ICharacterInfo[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(0);
	const [filterByName, setFilterByName] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const itemsPerPage = 12;
	const pagesVisited = pageNumber * itemsPerPage;

	const { sendRequest: initialGetRequest } = useHttp();
	const { sendRequest: selectByRaceGetRequest } = useHttp();

	const displayCharacters = characters
		.slice(pagesVisited, pagesVisited + itemsPerPage)
		.map((charactersItem, index) => {
			return (
				<CharacterItem
					key={charactersItem.id}
					name={charactersItem.name}
					index={index + 1 + pagesVisited}
					race={charactersItem.race}
					gender={charactersItem.gender}
					link={charactersItem.wikiUrl}
					birth={charactersItem.birth}
					death={charactersItem.death}
				/>
			);
		});

	let pageCount = Math.ceil(characters.length / itemsPerPage);

	const changePage = ({ selected }: IPaginationChange) => {
		setPageNumber(selected);
		window.scroll(0, 0);
	};

	useEffect(() => {
		const send = (data: ICharacterInfo[]) => {
			const listOfCharacters = data;
			const transformedData = helper.removeIncorrectData(listOfCharacters);
			setCharacters(transformedData);
			setMainListOfCharacters(transformedData);
			setIsLoading(false);
		};

		initialGetRequest({ url: URLcharacters, headers: headers }, send);
		return;
	}, [helper.removeIncorrectData]);

	useEffect(() => {
		setIsLoading(true);
		if (raceSelected === "") return;
		if (raceSelected === "All") {
			setCharacters(mainListOfCharacters);
			setIsLoading(false);
			return;
		}

		const send = (data: ICharacterInfo[]) => {
			const listOfCharacters = data;
			const transformedData = helper.removeIncorrectData(listOfCharacters);
			setCharacters(transformedData);
			setPageNumber(0);
			setCharacters(transformedData);
			setIsLoading(false);
		};

		selectByRaceGetRequest(
			{ url: URLcharactersRace + raceSelected, headers },
			send
		);
	}, [raceSelected, helper.removeIncorrectData]);

	const receiveRace = (race: string) => {
		setRaceSelected(race);
	};

	//filter
	const filteringByName = (e: string) => {
		setFilterByName(e);
	};

	useEffect(() => {
		if (filterByName === "") return;

		const filterInputFormated = helper.capitalizeName(filterByName);
		const filteredByName = mainListOfCharacters.filter((item) =>
			item.name.includes(filterInputFormated)
		);

		setPageNumber(0);
		setCharacters(filteredByName);
	}, [filterByName, helper.capitalizeName]);

	return (
		<div className="App">
			<Header
				onReceiveRace={receiveRace}
				onFilteringByName={filteringByName}
			/>

			{!isLoading && characters.length > 0 && filterByName === "" && (
				<ul className="character-list">{displayCharacters}</ul>
			)}
			{isLoading && <Loading />}
			{!isLoading && characters.length === 0 && filterByName !== "" && (
				<h1 className="warning-text"> No character was found</h1>
			)}
			{!isLoading && filterByName !== "" && (
				<ul className="character-list">{displayCharacters}</ul>
			)}

			{!isLoading && (
				<ReactPaginate
					forcePage={0}
					previousLabel={"Prev"}
					nextLabel={"Next"}
					pageCount={pageCount}
					onPageChange={changePage}
					pageRangeDisplayed={1}
					marginPagesDisplayed={1}
					containerClassName={"pagination__bttns"}
					previousLinkClassName={"previousBttn"}
					nextLinkClassName={"nextBttn"}
					disabledClassName={"paginationDisabled"}
					activeClassName={"pagination--active"}
				/>
			)}
		</div>
	);
}

export default App;
