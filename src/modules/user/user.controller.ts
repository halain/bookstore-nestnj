import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Controller('users')
export class UserController {

    constructor(private _userServise: UserService){

    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto>{
        const user: any = await this._userServise.get(id);
        return user;
    }


    @Get()
    async getUsers(): Promise<UserDto[]>{
        const users = await this._userServise.getAll();
        return users;
    }

    @Post()
    async createUser(@Body() user: User): Promise<UserDto>{
        const createdUser =  await this._userServise.create(user);
        return createdUser;
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id:number, @Body() user: User): Promise<boolean>{
         await this._userServise.update(id,user);
         return true;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean>{
        await this._userServise.delete(id);
        return true;
    }




}
