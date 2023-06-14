import { createContext } from "react";

import { Pet } from "./ApiResponsesTypes";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: -1,
    name: "",
    animal: "dog",
    description: "",
    breed: "",
    images: [],
    city: "",
    state: "",
  },
  () => {},
]);

export default AdoptedPetContext;
