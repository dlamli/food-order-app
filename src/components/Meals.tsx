import { MEALS_API_URL } from "../apis/foodApi";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import { Meal } from "../types";
import Error from "./Error";

const requestConfig = {};

const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp(MEALS_API_URL, [], requestConfig);

  if (isLoading) return <p className="center">Loading Meals...</p>;

  if (error)
    return (
      <Error className="center" title="Failed to load meals" message={error} />
    );

  return (
    <ul id="meals">
      {meals?.map((meal: Meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
