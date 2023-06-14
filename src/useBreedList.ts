import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import { Animal } from "./ApiResponsesTypes";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}

// import { useState, useEffect } from "react";
// const localCache = {};

// export default function useBreedList(animal) {
//   const [breedList, setBreedList] = useState([]);
//   const [status, setStatus] = useState("unloaded");

//   useEffect(() => {
//     if (!animal) {
//       setBreedList([]);
//     } else if (localCache[animal]) {
//       setBreedList(localCache[animal]);
//     } else {
//       requestBreedList();
//     }
//     async function requestBreedList() {
//       setBreedList([]);
//       setStatus("loading");

//       const res = await fetch(
//         `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
//       );
//       const data = await res.json();
//       localCache[animal] = data.breeds || [];
//       setBreedList(localCache[animal]);
//       setStatus("loaded");
//     }
//   }, [animal]);

//   return [breedList, status];
// }
