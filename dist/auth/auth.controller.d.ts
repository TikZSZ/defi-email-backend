import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt";
declare type body<T> = {
    data: T;
};
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    createUser(body: body<Prisma.UserCreateInput>, req: any): Promise<{
        name: string;
        userAccountId: string;
        public_key: string;
    }>;
    loginUser(body: LoginUserDto, req: any): Promise<{
        userAccountId: string;
        name: string;
        public_key: string;
        x25519_public_key: string;
    }>;
    getCurrentUser(user: {
        userAccountId: string;
        name: string;
    } | undefined): Prisma.Prisma__UserClient<{
        name: string;
        userAccountId: string;
        public_key: string;
        x25519_public_key: string;
    }>;
    logOut(req: any): void;
    createTopic(body: body<Prisma.TopicCreateWithoutUserInput>, user: {
        userAccountId: string;
        name: string;
    } | undefined): Prisma.Prisma__TopicClient<{
        topicId: string;
        topic_id: number;
        user: {
            public_key: string;
            x25519_public_key: string;
        };
    }>;
    getTopics(): import(".prisma/client").PrismaPromise<{
        topicId: string;
        topic_id: number;
        user: {
            public_key: string;
            x25519_public_key: string;
        };
    }[]>;
    getTopicsByUser(user: {
        userAccountId: string;
        name: string;
    } | undefined): import(".prisma/client").PrismaPromise<{
        topicId: string;
        topic_name: string;
        date_created: string;
        topic_id: number;
    }[]>;
    getTopicsByTopicID(topicId: string): import(".prisma/client").PrismaPromise<{
        topicId: string;
        topic_id: number;
        user: {
            public_key: string;
            x25519_public_key: string;
        };
    }[]>;
}
export {};
