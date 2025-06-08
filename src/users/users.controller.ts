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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
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

  @Get('/:id')
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
    summary: 'Fetches a registered user',
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

  /*
  @Get('/{:id}')
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The position of the page number that you want to return',
    example: 1,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  } */

  @Post()
  // @SetMetadata('authType', 'None')
  @Auth(AuthType.None)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
