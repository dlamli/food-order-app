import { FOOD_API_URL } from "../apis/foodApi";
import { Meal } from "../types";
import { currencyFormatter } from "../utils/formatting";
import Button from "./ui/Button";

interface MealItemProps {
  meal: Meal;
}

const MealItem = ({ meal }: MealItemProps) => {
  const handleClick = () => {
    console.log("Meal Button clicked");
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`${FOOD_API_URL}/${meal.image}`} alt="" />
        <div className="">
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(Number(meal.price))}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleClick}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
