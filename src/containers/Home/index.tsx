import React from "react";
import { HomeView } from "../../views/Home";

export const HomeContainer = () => {
  const startGame = () => {
    console.log("startGame clicked");
  };
  return (
    <>
      <HomeView handleStartGame={startGame} />
    </>
  );
};
