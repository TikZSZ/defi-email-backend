import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    getCurrentUser(accountId: string): Prisma.Prisma__UserClient<{
        name: string;
        userAccountId: string;
        public_key: string;
        x25519_public_key: string;
    }>;
    createUser(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<{
        name: string;
        userAccountId: string;
        public_key: string;
    }>;
    loginUser(data: Prisma.UserWhereUniqueInput & {
        signature: string;
    }): Promise<{
        userAccountId: string;
        name: string;
        public_key: string;
        x25519_public_key: string;
    }>;
    createTopic(data: Prisma.TopicCreateInput, userAccountId: string): Prisma.Prisma__TopicClient<{
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
    getTopicsByUser(userAccountId: string): import(".prisma/client").PrismaPromise<{
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
