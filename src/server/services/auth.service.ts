import {Injectable} from '@nestjs/common';
import {Response} from 'express';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../entities/user.entity';
import {UserDetails} from "../../shared/types/UserGoogle";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    async validateUser(details: UserDetails) {
        console.log('AuthService');
        console.log(details);
        const user = await this.userRepository.findOneBy({mail: details.mail});
        console.log(user);
        if (user) return user;
        console.log('User not found. Creating...');
        const newUser = this.userRepository.create(details);
        console.log('los datos del nuevo usuario son:', newUser);
        // return this.userRepository.save(newUser);
        return newUser;
    }

    async findUser(id: number) {
        const user = await this.userRepository.findOneBy({id});
        return user;
    }

    async getGoogleLogin(req, res) {
        // const user = await this.userRepository.findOneBy({mail: req.user.mail}).then(val => {
        //     console.log('que es este user', val);
        //     return val.mail;
        // });
        const user = await this.userRepository.findOneBy({mail: req.user.mail});
        if (user) return res.redirect('/home');
        return req.user;
    }
}