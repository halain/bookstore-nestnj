import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { MapperService } from '../../shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository,
        private _mapperServise: MapperService
    ){   }


    
    async get(id: number): Promise<UserDto>{
        if (!id){
            throw new BadRequestException("Debe enviar el id");
        }
        const user: User = await this._userRepository.findOne(id,{
            where: {status: 'ACTIVE'} 
           });
       if (!user){
           throw new NotFoundException("");
       }

       return this._mapperServise.map<User, UserDto>(user, new UserDto());
           
       }



       async getAll(): Promise<UserDto[]>{
        
        const users: User[] = await this._userRepository.find({
            where: {status: 'ACTIVE'} 
           });
    
       return this._mapperServise.mapCollection<User, UserDto>(users, new UserDto());
           
       }



       
       async create(user: User): Promise<UserDto>{
            const detail = new UserDetails();
            user.details = detail;
            const repo = await getConnection().getRepository(Role);
            const defaultRole = await repo.findOne({ where: {name: 'GENERAL'}});
            user.roles = [defaultRole];
           const savedUser: User = await this._userRepository.save(user);
           return this._mapperServise.map<User, UserDto>(savedUser, new UserDto())
       }

       async update(id: number, user: User): Promise<void>{
             await this._userRepository.update(id,user);
       }



       async delete(id: number): Promise<void>{
           const userExist: User = await this._userRepository.findOne(id, {where:{status: 'ACTIVE'}});

           if (!userExist){
               throw new NotFoundException("");               
           }

           await this._userRepository.update(id,{status: 'INACTIVE'})
       }
   

}
