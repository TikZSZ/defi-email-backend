import { PublicKey ,PrivateKey} from '@hashgraph/sdk';
import { BadRequestException, Body, Controller, Get, NotFoundException,Req, Param, Post ,Session, UnauthorizedException, ParseIntPipe, Query} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import {JwtService} from "@nestjs/jwt"
import {User} from "./decorators"

type body<T> = {
  data: T;
};

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService,private jwtService: JwtService) {}
  
  @Post('/createUser')
  async createUser(@Body() body: body<Prisma.UserCreateInput>,@Req() req:any) {
    const isCorrect = PublicKey.fromString(body.data.public_key).verify(Buffer.from("bills"),Buffer.from(body.data.signature as any,"hex"));
    if(!isCorrect) throw new BadRequestException() 
    const createdUser = await this.authService.createUser(body.data);
    const token = this.jwtService.sign({userAccountId:createdUser.userAccountId,name:createdUser.name})
    req.session['user'] = token
    return createdUser
  }

  @Post('/loginUser')
  async loginUser(@Body() body: LoginUserDto,@Req() req:any) {
    const foundUser = await this.authService.loginUser(body.data);
    const token = this.jwtService.sign(foundUser)
    req.session['user'] = token
    return foundUser
  }

  @Get("/currentUser")
  getCurrentUser(@User() user:{userAccountId:string,name:string}|undefined) {
    if(!user){
      throw new NotFoundException()
    }
    return this.authService.getCurrentUser(user.userAccountId)
  }

  @Get("/logout")
  logOut(@Req() req:any){
    req.session['user'] = null;
    return 
  }

  @Post('/createTopic')
  createTopic(@Body() body:body<Prisma.TopicCreateWithoutUserInput>,@User() user:{userAccountId:string,name:string}|undefined){
    return this.authService.createTopic(body.data,user.userAccountId)
  }

  @Get('/getTopicsByUser',)
  getTopicsByUser(@User() user:{userAccountId:string,name:string}|undefined){
    if (!user) throw new UnauthorizedException()
    return this.authService.getTopicsByUser(user.userAccountId)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  @Get('/getTopics')
  async getTopicsByTopicID(@Query('topicId') topicId:string,@Query('id',ParseIntPipe) id:number){
    return this.authService.getTopicsByTopicID(topicId !== ''?topicId:undefined,id)
  }

  @Get('/deleteTopic/:id')
  deleteTopic(@User() user:{userAccountId:string,name:string}|undefined,@Param('id',ParseIntPipe) id:number){
    if(!user.userAccountId) throw new UnauthorizedException()
    return this.authService.deleteTopic(id,user.userAccountId)
  }
  
}
