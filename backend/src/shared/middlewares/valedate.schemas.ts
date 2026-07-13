import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const validateSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (validatedData.body !== undefined) {
        req.body = validatedData.body;
      }

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const missingRootObject = error.issues.find(
          (issue) => issue.code === "invalid_type" && issue.path.length === 1,
        );

        if (missingRootObject) {
          const field = missingRootObject.path[0];

          const messages = {
            body: "Nenhum dado foi enviado no corpo da requisição",
            query: "Nenhum dado foi enviado na query da requisição",
            params: "Nenhum parâmetro foi enviado na requisição",
          };

          return res.status(400).json({
            error: "Dados de entrada inválidos",
            details: messages[field as keyof typeof messages],
          });
        }

        return res.status(400).json({
          error: "Dados de entrada inválidos",
          details: error.issues.map((issue) => ({
            campo: issue.path.slice(1).join(".") || "geral",
            mensagem: issue.message,
          })),
        });
      }

      return next(error);
    }
  };
};

export { validateSchema };
