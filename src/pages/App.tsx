import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/Global.css";
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

    const [raceSelected, setRaceSelected] = useState<string>('')
    const [characters, setCharacters] = useState<CharacterInfo[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;

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

    useEffect(() => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer xvi06TocPJvBmrQC4yZv",
        };

        const fetchData = async () => {
            const characters = await fetch(
                "https://the-one-api.dev/v2/character",
                {
                    headers,
                }
            );
            const quotes = await characters.json();
            const data = quotes.docs;
            const newData:CharacterInfo[]  = []
            data.forEach((character: CharacterInfo) => {
                if(character.race !== 'NaN' && character.race.length > 2){
                    newData.push(character)
                }   
            })

            setCharacters(newData)
        };

        fetchData();
    }, []);

    const receiveRace = (race: string) => {
        setRaceSelected(race);
    }

    useEffect(() => {
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer xvi06TocPJvBmrQC4yZv",
        };

        if(raceSelected === 'All'){
            const fetchData = async () => {
                const characters = await fetch(
                    `https://the-one-api.dev/v2/character`,
                    {
                        headers,
                    }
                );
                const quotes = await characters.json();
                const data = quotes.docs;
                const newData:CharacterInfo[]  = []
                data.forEach((character: CharacterInfo) => {
                    if(character.race !== 'NaN' && character.race.length > 2){
                        newData.push(character)
                    }   
                })
    
                setCharacters(newData)
            };
    
            fetchData();
            return
        }

        const fetchData = async () => {
            const characters = await fetch(
                `https://the-one-api.dev/v2/character?race=${raceSelected}`,
                {
                    headers,
                }
            );
            const quotes = await characters.json();
            const data = quotes.docs;
            const newData:CharacterInfo[]  = []
            data.forEach((character: CharacterInfo) => {
                if(character.race !== 'NaN' && character.race.length > 2){
                    newData.push(character)
                }   
            })

            setCharacters(newData)
        };

        fetchData();
    }, [raceSelected])

    return (
        <div className="App">
            <Header onReceiveRace={receiveRace} />
            <ul className="character-list">
                {displayCharacters}
            </ul>
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
