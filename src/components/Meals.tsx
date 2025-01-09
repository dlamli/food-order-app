import { useCallback, useEffect, useState } from "react";
import { MEALS_API_URL } from "../apis/foodApi";
import { Meal } from "../types";
import MealItem from "./MealItem";

const Meals = () => {
  const [meals, setMeals] = useState<Meal[] | null>(null);

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch(MEALS_API_URL);

      if (!response) {
        // TODO: Handle response fail
      }

      const data = await response.json();
      setMeals(data);
    } catch (error) {
      throw new Error(`An error ocurred: ${error}`);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals?.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
};

export default Meals;
