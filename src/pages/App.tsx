import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/Global/Global.css";
import Header from "../components/Header/Header";
import CharacterItem from "../components/UI/CharacterItem";
import Loading from "../components/UI/Loading";

function App() {
    interface CharacterInfo {
        id: string;
        name: string;
        index: number;
        race: string;
        gender: string;
        wikiUrl: string;
        birth: string;
        death: string;
    }

    interface ChangePage {
        selected: number;
    }

    const [mainListOfCharacters, setMainListOfCharacters] = useState<
        CharacterInfo[]
    >([]);
    const [raceSelected, setRaceSelected] = useState<string>("");
    const [characters, setCharacters] = useState<CharacterInfo[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [filterByName, setFilterByName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;

    const displayCharacters = characters
        .slice(pagesVisited, pagesVisited + usersPerPage)
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

    let pageCount = Math.ceil(characters.length / usersPerPage);

    const changePage = ({ selected }: ChangePage) => {
        setPageNumber(selected);
    };

    const removeIncorrectData = (data: []) => {
        const newData: CharacterInfo[] = [];
        data.forEach((character: CharacterInfo) => {
            if (character.race !== "NaN" && character.race.length > 2) {
                newData.push(character);
            }
        });

        return newData;
    };

    const capitalizeName = function (inputLetter: string) {
        if (inputLetter.includes(" ")) {
            const inputSlitted = inputLetter.split(" ");
            const inputArray = inputSlitted.filter((input) => input !== "");
            const inputUpper = inputArray.map(
                (n) => n[0].toUpperCase() + n.slice(1).toLowerCase()
            );
            const inputCapitelized = inputUpper.join(" ");
            return inputCapitelized;
        }
        const input = inputLetter.toLowerCase();
        const inputCapitelized = input[0].toUpperCase() + input.slice(1);
        return inputCapitelized;
    };

    useEffect(() => {
        setIsLoading(true);
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer Mx9pH2p0_osox9nIk9Tw",
        };
        const firstRender = async () => {
            const characters = await fetch(
                "https://the-one-api.dev/v2/character",
                {
                    headers,
                }
            );
            const listOfCharacters = await characters.json();
            const data = listOfCharacters.docs;
            const newData = removeIncorrectData(data);
            setCharacters(newData);
            setMainListOfCharacters(newData);
            setIsLoading(false);
        };
        firstRender();
        return;
    }, []);

    useEffect(() => {
        setIsLoading(true)
        if (raceSelected === "") return;
        if (raceSelected === "All") {
            setCharacters(mainListOfCharacters);
            setIsLoading(false)
            return;
        }

        const fetchData = async () => {
            const headers = {
                Accept: "application/json",
                Authorization: "Bearer Mx9pH2p0_osox9nIk9Tw",
            };

            const characters = await fetch(
                `https://the-one-api.dev/v2/character?race=${raceSelected}`,
                {
                    headers,
                }
            );
            const listOfCharacters = await characters.json();
            const data = listOfCharacters.docs;
            const newData = removeIncorrectData(data);
            setPageNumber(0);
            setCharacters(newData);
            setIsLoading(false)
        };
        fetchData();
    }, [raceSelected]);

    const receiveRace = (race: string) => {
        setRaceSelected(race);
    };

    //filter
    const filteringByName = (e: string) => {
        setFilterByName(e);
    };

    useEffect(() => {
        if (filterByName === "") return;

        const filterInputFormated = capitalizeName(filterByName);
        const filteredByName = mainListOfCharacters.filter((item) =>
            item.name.includes(filterInputFormated)
        );

        setPageNumber(0);
        setCharacters(filteredByName);
    }, [filterByName]);

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
            {characters.length === 0 && filterByName !== "" && <h1 className="warning-text"> No character was found</h1>}
            {filterByName !== "" && <ul className="character-list">{displayCharacters}</ul>}
            {!isLoading && <ReactPaginate
                forcePage={0}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />}
        </div>
    );
}

export default App;
