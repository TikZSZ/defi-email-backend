import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

const selectTopic = {
  topicId: true,
  topic_id: true,
  user: {
    select: {
      public_key: true,
      x25519_public_key: true,
    },
  },
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  getCurrentUser(accountId: string) {
    return this.prisma.user.findUnique({
      where: {
        userAccountId: accountId,
      },
      select: {
        name: true,
        userAccountId: true,
        public_key: true,
        x25519_public_key: true,
      },
    });
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
      select: {
        userAccountId: true,
        public_key: true,
        name: true,
      },
    });
  }

  async loginUser(data: Prisma.UserWhereUniqueInput & { signature: string }) {
    const { userAccountId, name, public_key, x25519_public_key, signature } =
      await this.prisma.user.findUnique({
        where: {
          userAccountId: data.userAccountId,
        },
      });
    if (!userAccountId) throw new NotFoundException();
    if (!(signature === data.signature)) throw new UnauthorizedException();
    return {
      userAccountId,
      name,
      public_key,
      x25519_public_key,
    };
  }

  createTopic(data: Prisma.TopicCreateInput, userAccountId: string) {
    return this.prisma.topic.create({
      data: { ...data, user: { connect: { userAccountId: userAccountId } } },
      select: selectTopic,
    });
  }

  getTopics() {
    return this.prisma.topic.findMany({
      orderBy: { topic_id: 'desc' },
      select: selectTopic,
    });
  }

  getTopicsByUser(userAccountId: string) {
    return this.prisma.topic.findMany({
      orderBy: { topic_id: 'desc' },
      select: {
        ...selectTopic,
        topic_name: true,
        date_created: true,
        user: false,
      },
      where: { userAccountId },
    });
  }

  getTopicsByTopicID(topicId?: string, id?: number) {
    return this.prisma.topic.findMany({
      orderBy: { topic_id: 'desc' },
      select: selectTopic,
      where: {
        AND: [
          {
            topicId: topicId && {
              contains: topicId,
              startsWith: topicId,
            },
          },
          {
            topic_id:  {
              lt: id === 0?undefined:id,
            },
          },
        ],
      },
      take: 1,
    });
  }
  async deleteTopic(id:number,userAccountId: string){
    const topic = await this.prisma.topic.findUnique({
      where:{
        topic_id:id
      },
      select:{
        userAccountId:true
      }
    })
    if(topic.userAccountId !== userAccountId ) throw new UnauthorizedException()
    return this.prisma.topic.delete({
      where:{
        topic_id:id
      },
      select:{
        topic_id:true
      }
    })
  } 
  
}
