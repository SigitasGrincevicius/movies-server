import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  DefaultValuePipe,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Request } from 'express';
import { GetUsersDto } from './dtos/get-users.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    /**
     * Inject Users Service
     */
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Fetches a registered user',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully based on the parameter',
  })
  public getUser(@Param() getUsersParamDto: GetUsersParamDto) {
    return this.usersService.findOneById(getUsersParamDto.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Fetches a registered users',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully based on the parameter',
  })
  public getUsers(@Query() getUsersDto: GetUsersDto, @Req() req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const originalUrl = req.originalUrl;
    return this.usersService.findAll(getUsersDto, baseUrl, originalUrl);
  }

  @Post()
  // @SetMetadata('authType', 'None')
  @Auth(AuthType.None)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Auth(AuthType.Admin)
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }

  @Auth(AuthType.Admin)
  @Delete(':id')
  public deleteUser(@Param() getUsersParamDto: GetUsersParamDto) {
    return this.usersService.deleteUser(getUsersParamDto.id);
  }

  // Add grant admin endpoint
}
