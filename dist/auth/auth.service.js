"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const selectTopic = {
    topicId: true,
    topic_id: true,
    user: {
        select: {
            public_key: true,
            x25519_public_key: true
        }
    }
};
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getCurrentUser(accountId) {
        return this.prisma.user.findUnique({
            where: {
                userAccountId: accountId,
            },
            select: {
                name: true,
                userAccountId: true,
                public_key: true,
                x25519_public_key: true
            },
        });
    }
    createUser(data) {
        return this.prisma.user.create({
            data,
            select: {
                userAccountId: true,
                public_key: true,
                name: true,
            },
        });
    }
    async loginUser(data) {
        const { userAccountId, name, public_key, x25519_public_key, signature } = await this.prisma.user.findUnique({
            where: {
                userAccountId: data.userAccountId,
            },
        });
        if (!userAccountId)
            throw new common_1.NotFoundException();
        if (!(signature === data.signature))
            throw new common_1.UnauthorizedException();
        return {
            userAccountId,
            name,
            public_key,
            x25519_public_key,
        };
    }
    createTopic(data, userAccountId) {
        return this.prisma.topic.create({
            data: Object.assign(Object.assign({}, data), { user: { connect: { userAccountId: userAccountId } } }),
            select: selectTopic
        });
    }
    getTopics() {
        return this.prisma.topic.findMany({
            orderBy: { topic_id: 'desc' },
            select: selectTopic,
        });
    }
    getTopicsByUser(userAccountId) {
        return this.prisma.topic.findMany({
            orderBy: { topic_id: 'desc' },
            select: Object.assign(Object.assign({}, selectTopic), { topic_name: true, date_created: true, user: false }),
            where: { userAccountId },
        });
    }
    getTopicsByTopicID(topicId) {
        return this.prisma.topic.findMany({
            orderBy: { topic_id: 'desc' },
            select: selectTopic,
            where: {
                topicId: { contains: topicId, startsWith: topicId.split('.')[0] },
            },
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map