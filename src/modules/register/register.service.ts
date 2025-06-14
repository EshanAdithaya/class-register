import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './entities/register.entity';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private registerRepository: Repository<Register>,
  ) {}

  async create(createRegisterDto: CreateRegisterDto): Promise<Register> {
    const register = new Register(createRegisterDto);
    return this.registerRepository.save(register);
  }

  async findAll(): Promise<Register[]> {
    return this.registerRepository.find();
  }

  async findOne(id: string): Promise<Register> {
    const register = await this.registerRepository.findOneBy({ id });
    if (!register) {
      throw new NotFoundException(`Register with ID ${id} not found`);
    }
    return register;
  }

  async update(id: string, updateRegisterDto: UpdateRegisterDto): Promise<Register> {
    const register = await this.findOne(id);
    Object.assign(register, updateRegisterDto);
    return this.registerRepository.save(register);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Throw error if not found
    await this.registerRepository.delete(id);
  }
}