import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

const validateSchema =
    (schema: ZodType) =>
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params
                });

                return next();
            } catch (error) {
                if (error instanceof ZodError) {
                    res.status(400).json({
                        error: "Erro de validação",
                        detalhes: error.issues.map(issue => ({
                            campo: issue.path.slice(1).join('.'),
                            mensagem: issue.message
                        }))
                    });
                    return;
                }

                res.status(500).json({ error: "Erro interno do servidor" });
                return;
            }
        }

export { validateSchema };