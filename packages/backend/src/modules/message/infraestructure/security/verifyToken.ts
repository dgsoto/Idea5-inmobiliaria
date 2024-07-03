import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
/*en proceso*/
interface CustomRequest extends Request {
  userData: any;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  console.log('Pase por aqui');
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, 'thiismysecretkey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.userData = decoded;
    next();
  });
};
