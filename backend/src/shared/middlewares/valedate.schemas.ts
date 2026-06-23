import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const validateSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({
            error: "Dados de entrada inválidos",
            details: error.issues.map((issue) => ({
              campo: issue.path.slice(1).join("."),
              mensagem: issue.message,
            })),
          });
      }

      return next(error);
    }
  };
};

export { validateSchema };
