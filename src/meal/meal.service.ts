import { Meal } from '@/meal/meal.model';

export const getMealsByUserId = async (userId: string) => {
  return await Meal.find({ userId });
};

export const addNewMeal = async (userId: string, mealData: Partial<typeof Meal>) => {
  const meal = new Meal({ userId, ...mealData });
  return await meal.save();
};
