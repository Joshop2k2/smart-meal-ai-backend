import { Request, Response } from 'express';
import { getMealPlan } from '@/ai/ai.service';
import { getMealsByUserId, addNewMeal } from '@/meal/meal.service';

export const suggest = async (req: Request, res: Response) => {
  try {
    const { name, target, gender, age, height, weight, active, meal, addInfo, startDate, endDate } =
      req.body;

    const request = {
      startDate,
      endDate,
      age,
      gender,
      height,
      weight,
      active,
      meal,
      addInfo,
      target,
    };

    const suggest = await getMealPlan(request);
    res.status(201).json({ message: 'success', suggest: suggest });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const getMeals = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const meals = await getMealsByUserId(userId);

    res.status(200).json({ message: 'Meals retrieved successfully', meals });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const createMeal = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    // Assuming you have a service function to handle meal creation
    const createdMeal = await addNewMeal(userId, data);

    res.status(201).json({ message: 'Meal created successfully', meal: createdMeal });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
