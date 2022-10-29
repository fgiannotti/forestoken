import {
    UnauthorizedException,
    HttpException,
    HttpService,
    HttpStatus,
    Injectable,
    NestMiddleware
} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly httpService: HttpService) {
    }

    use(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.cookies['accessToken'];
        console.log('que es estooo ', accessToken);
        if (typeof accessToken === 'undefined') {
            throw new UnauthorizedException();
        }
        const url = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken;
        const googleData = this.httpService.axiosRef.get(url);
        googleData.then(val => {
            const userDB = this.userRepository.findOneBy({mail: val['data']['email']})
            userDB.then(user => {
                if (!user) {
                    res.redirect('auth/google/login')
                } else {
                    next();
                }
            })
        });
    }
}
