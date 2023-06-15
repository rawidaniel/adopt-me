// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { all } from "./searchParamsSlice";
import { useSearchQuery } from "./petApiService";
// import fetchSearch from "./fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const dispatch = useDispatch();
  const searchParams = useSelector((state) => state.searchParams.value);
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  // const results = useQuery(["search", searchParams], fetchSearch);
  let { isLoading, data: pets } = useSearchQuery(searchParams);
  pets = pets ?? [];
  // const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal").toString() ?? "",
            breed: formData.get("breed").toString() ?? "",
            location: formData.get("location").toString() ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed" id="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} isLoading={isLoading} />
    </div>
  );
};

export default SearchParams;
