import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDto: SignUpDto): Promise<{token: string; message: string; user: User}> {
        const { name, email, password, role} = signUpDto;

        // Hash password -> run this command
        // npm i bcryptjs --save

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashPassword,
            role
        });

        const token = this.jwtService.sign({ id: user._id, email: user.email });

        return {
            message: 'User created successfully',
            user,
            token
        };
    }

    async login(login: LoginDto): Promise<{token: string}>{
        const { email, password } = login;
        const user = await this.userModel.findOne({ email });
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: user._id, email: user.email });
        return { token };
    }
}
