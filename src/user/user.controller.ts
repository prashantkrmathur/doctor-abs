import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('user')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  @ApiOperation({
    summary: 'Get user profile information',
    description: 'This endpoint retrieves the profile information of the authenticated user.'
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: CreateUserDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access'
  })
  public async getUserProfile(@Request() req){        
     return await this.userService.getUserProfile(req);
  }
}
