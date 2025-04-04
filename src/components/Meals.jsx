import React from "react";
import { MealItem } from "./MealItem";
import useHttp from "./hooks/useHttp";
import { Error } from "./Error.jsx";
import CircularProgress from "@mui/material/CircularProgress";

const requestConfig = {};

export const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <CircularProgress color="primary" size={40} />
      </div>
    );
  }

  if (error) {
    return <Error title="Failed to fetch meals!" message={error}></Error>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};
