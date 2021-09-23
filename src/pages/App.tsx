import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/Global.css";
import Header from "../components/Header/Header";
import CharacterItem from "../components/UI/CharacterItem/CharacterItem";

function App() {
    interface CharacterInfo {
        id: string;
        name: string;
    }

    interface ChangePage {
      selected: number;
  }

    const [characters, setCharacters] = useState<CharacterInfo[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;

    const displayCharacters = characters
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((characters1) => {
            {
                return (
                    <CharacterItem
                        key={characters1.id}
                        name={characters1.name}
                    />
                );
            }
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
            setCharacters(data);
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <Header />
            <ul className="character-list">{displayCharacters}</ul>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                pageRangeDisplayed={10}
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
