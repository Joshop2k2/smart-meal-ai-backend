import { Request, Response, NextFunction } from 'express';

export const syncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await Promise.resolve(fn(req, res, next));
      console.log(`syncMiddleware: ${fn.name}`);
      console.log(`req.params: ${JSON.stringify(req.params)}`);
      console.log(`req.body: ${JSON.stringify(req.body)}`);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
};
