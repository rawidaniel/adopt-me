import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
// import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./modal";
import { adopt } from "./adoptedPetSlice";
import { useGetPetQuery } from "./petApiService";

const Details = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  // const results = useQuery(["details", id], fetchPet);
  const { isLoading, data: pet } = useGetPetQuery(id);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  // const pet = results.data.pets[0];
  // console.log(pet.i  mages);
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal && (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    naviagte("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

function DetailErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailErrorBoundary;
