import { Request, Response } from 'express';
import { getMealPlan, MealRequest } from '@/ai/ai.service';

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
