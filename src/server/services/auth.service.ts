import {Injectable} from '@nestjs/common';
import {Response} from 'express';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../entities/user.entity';
import {UserGoogle} from "../../shared/types/UserGoogle";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async validateUser(details: UserGoogle) {
        console.log('AuthService');
        const user = await this.userRepository.findOneBy({mail: details.mail});
        if (user) return user;
        console.log('User not found. Creating...');
        const newUser = this.userRepository.create(details);
        console.log('los datos del nuevo usuario son:', newUser);
        return newUser;
    }

    async findUser(id: number) {
        const user = await this.userRepository.findOneBy({id});
        return user;
    }

    async getGoogleLogin(req, res) {
        await this.userRepository.findOneBy({mail: req.user.mail}).then((user) => {
            if (user) {
                return res.redirect('/home');
            } else {
                return req.user;
            }
        });
    }
}