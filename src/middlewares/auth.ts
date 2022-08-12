import { Request, Response, NextFunction } from 'express'
import { decode } from 'punycode';
import { User } from '../models/User'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        //Fazer verificação de auth
        let success = false
        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ')
            if (authType === 'Bearer') {
                try {
                    console.log('Token', token)
                    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string)
                    console.log(decoded)
                    success = true
                }
                catch (err) {
                    console.log('Erro na autenticação')
                }
            }
        }
        if (success) {
            next();
        } else {
            res.status(401);
            res.json({ error: "não autorizado!" })
        }
    }
}