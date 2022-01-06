import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {JwtService} from "@nestjs/jwt"
import { request } from 'http';
@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  constructor(private jwtService:JwtService){}
  use(req: Request, res: Response, next: NextFunction) {
    const userJwt = req.session.user as string|undefined;
    if(userJwt){
      const user = this.jwtService.verify(userJwt)  as  {userAccountId:string,name:string}
      req["user"] = user
    }
    next();
  }
}
