import Pet from "./Pet";

const Results = ({ pets, isLoading }) => {
  // console.log(isLoading);
  return (
    <div className="search">
      {isLoading && <h2>Please wait while isLoading.....</h2>}
      {!isLoading && !pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            id={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
