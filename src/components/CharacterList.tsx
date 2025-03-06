import React, { useState, useEffect } from "react";
import { useCharacterList } from "../hooks/useCharacterList";

import CharacterCard from "./CharacterCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

import { Character } from "../types";
import "../styles/CharacterList.scss";
import { useQueryClient } from "@tanstack/react-query";

const CharacterList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const queryClient = useQueryClient();

    // Debounce the search input (wait for user to stop typing)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);


    const { data, isLoading, error } = useCharacterList(page, debouncedSearch);
    console.log(data, 'data')

    // Prefetch the next page
    useEffect(() => {
        if (data?.next) {
            const nextPage = page + 1;
            queryClient.prefetchQuery({
                queryKey: ["characters", nextPage, debouncedSearch],
                queryFn: async () => {
                    if (data.next) {
                        const response = await fetch(data.next);
                        return response.json();
                    }
                    return null;
                }
            });
        }
    }, [data, page, debouncedSearch, queryClient]);

    return (
        <div className="character-list">
            <h1>Star Wars Characters</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for a character..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            {/* Loading and Error States */}
            {isLoading && !error && <Loading />}
            {error && <p className="error">Error loading characters.</p>}

            {/* Character Cards */}
            <div className="characters">
                {data ? (
                    <ul>
                        {data.results.map((char: Character) => (
                            <CharacterCard key={char.url} character={char} />
                        ))}
                    </ul>
                ) : (
                    !isLoading && <p>No characters found.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {!searchTerm && data && (
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(data.count / 10)}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
};

export default CharacterList;