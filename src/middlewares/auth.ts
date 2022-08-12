import { Request, Response, NextFunction } from 'express'
import { decode } from 'punycode';
import { User } from '../models/User'

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        //Fazer verificação de auth
        let success = false
        if (req.headers.authorization) {
            let hash: string = req.headers.authorization.substring(6)
            console.log('hash', hash)
            let decoded: string = Buffer.from(hash, 'base64').toString();
            console.log('decoded', decoded)
            let data: string[] = decoded.split(':')

            if (data.length === 2) {
                let hasUser = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                })
                if (hasUser) {
                    success = true
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