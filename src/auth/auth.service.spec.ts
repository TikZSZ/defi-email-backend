import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AuthService } from './auth.service';

let service: AuthService;
let prismaService: PrismaService

let topicId = '0.0.1'
let public_key = 'asdadad'

async function createUser(){
  const createUserData = {name:'Aditya',public_key,x25519_public_key:public_key,userAccountId:'0.0.253',signature:''}
  const resp1= await service.createUser(createUserData)
  return resp1
}

async function createTopic(userAccountId:string,tId?:string){
  return (await service.createTopic({topicId:tId||topicId,public_key},userAccountId))
}

describe('AuthService', () => {
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,PrismaService],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService)
    service = module.get<AuthService>(AuthService);
  });
  beforeEach(async () => {
    await prismaService.user.deleteMany();
    await prismaService.topic.deleteMany()
  });
  afterAll(async () => {
    await prismaService.user.deleteMany();
    await prismaService.topic.deleteMany()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create topics and verify they exist', async ()=>{
    const resp1= await createUser()
    await createTopic(resp1.userAccountId)
    await createTopic(resp1.userAccountId)
    await createTopic(resp1.userAccountId)
    const resp2 = await service.getTopics()
    expect(resp2.length).toEqual(3)
    const resp3 = await service.getTopicsByUser(resp1.userAccountId)
    expect(resp3.length).toEqual(3)
  })

  it('it should do a regex scan by topicId',async ()=> {
    const resp1= await createUser()
    await createTopic(resp1.userAccountId)
    await createTopic(resp1.userAccountId,'0.1.1')
    await createTopic(resp1.userAccountId,'1.1.2445')
    const resp2 = await service.getTopicsByTopicID('1.1')
    const resp3 = await service.getTopicsByTopicID('0.1')
    expect(resp2.length).toEqual(1)
    expect(resp3.length).toEqual(2)
  })

});
