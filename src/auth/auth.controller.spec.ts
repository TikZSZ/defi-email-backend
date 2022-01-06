import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrivateKey, } from '@hashgraph/sdk';
import {JwtModule} from "@nestjs/jwt"

const id = Math.random() * 1000;
const privateKey = PrivateKey.generate();
let userAccountId = `0.0.${Math.floor(id)}`;
let signature = sign('bills').toString('hex');

function sign(str: string) {
  const bytesStr = Buffer.from(str);
  const signedBytes = privateKey.sign(bytesStr);
  return Buffer.from(signedBytes);
}

describe('AuthController', () => {
  let controller: AuthController;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[JwtModule.register({secret:'asdf'})],
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    })
      .compile()
    
    controller = module.get<AuthController>(AuthController);
    prismaService = module.get<PrismaService>(PrismaService);
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
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const { response, data } = await createUser();
    expect(response.userAccountId).toEqual(data.userAccountId);
  });

  it('should login user', async () => {
    await createUser();

    let data = {
      userAccountId,
      signature,
    };

    const resp = await controller.loginUser({ data }, {session:{}});
    expect(resp.userAccountId).toEqual(data.userAccountId);

    // throw not found user
  });

  it('should throw not found error', async () => {
    let data = {
      userAccountId,
      signature,
    };

    try {
      await controller.loginUser({ data: { ...data } }, {userAccountId,name:""});
      throw new Error();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should throw unauthorized error', async () => {
    await createUser();

    let data = {
      userAccountId,
      signature,
    };

    try {
      await controller.loginUser({ data: { ...data, signature: '' } }, {userAccountId,name:""});
      throw new Error();
    } catch (err) {
      expect(err.status).toEqual(401);
    }
  });

  async function createUser() {
    let data = {
      userAccountId,
      name: 'Aditya',
      public_key: privateKey.publicKey.toString(),
      'x25519_public_key': privateKey.publicKey.toString(),
      signature,
    };
    const response = await controller.createUser({ data }, {session:{}});
    return { response, data };
  }
});
