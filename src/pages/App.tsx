import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/Global/Global.css";
import Header from "../components/Header/Header";
import CharacterItem from "../components/UI/CharacterItem/CharacterItem";

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

    const [raceSelected, setRaceSelected] = useState<string>("");
    const [characters, setCharacters] = useState<CharacterInfo[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [filterByName, setFilterByName] = useState<string>("");
    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer xvi06TocPJvBmrQC4yZv",
    };

    const displayCharacters = characters
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((characters1, index) => {
            return (
                <CharacterItem
                    key={characters1.id}
                    name={characters1.name}
                    index={index + 1 + pagesVisited}
                    race={characters1.race}
                    gender={characters1.gender}
                    link={characters1.wikiUrl}
                    birth={characters1.birth}
                    death={characters1.death}
                />
            );
        });

    const pageCount = Math.ceil(characters.length / usersPerPage);

    const changePage = ({ selected }: ChangePage) => {
        setPageNumber(selected);
    };

    const removeIncorrectData = (data: []) => {
        const newData: CharacterInfo[] = [];
        data.forEach((character: CharacterInfo) => {
            if (character.race !== "NaN" && character.race.length > 2) {
                newData.push(character);
            } else {
                console.log(character);
            }
        });

        return newData;
    };

    useEffect(() => {
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
        };
        firstRender();
        return;
    }, []);

    useEffect(() => {
        if (raceSelected === "") return;
        if (raceSelected === "All") {
            const fetchData = async () => {
                const characters = await fetch(
                    `https://the-one-api.dev/v2/character`,
                    {
                        headers,
                    }
                );
                const listOfCharacters = await characters.json();
                const data = listOfCharacters.docs;
                const newData = removeIncorrectData(data);

                setCharacters(newData);
            };

            fetchData();
            return;
        }

        const fetchData = async () => {
            const characters = await fetch(
                `https://the-one-api.dev/v2/character?race=${raceSelected}`,
                {
                    headers,
                }
            );
            const listOfCharacters = await characters.json();
            const data = listOfCharacters.docs;
            const newData = removeIncorrectData(data);
            setCharacters(newData);
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
        const timer = setTimeout(() => {
            const fetchData = async () => {
                const characters = await fetch(
                    `https://the-one-api.dev/v2/character?name=${filterByName}`,
                    {
                        headers,
                    }
                );
                const listOfCharacters = await characters.json();
                const data = listOfCharacters.docs;
                const newData = removeIncorrectData(data);
                setCharacters(newData);
            };

            fetchData();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filterByName]);

    return (
        <div className="App">
            <Header
                onReceiveRace={receiveRace}
                onFilteringByName={filteringByName}
            />
            {characters.length > 0 ? (
                <ul className="character-list">{displayCharacters}</ul>
            ) : (
                <h1 className="warning-text"> No Character Was Found </h1>
            )}

            <ReactPaginate
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
            />
        </div>
    );
}

export default App;
