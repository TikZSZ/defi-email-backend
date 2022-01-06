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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const sdk_1 = require("@hashgraph/sdk");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const jwt_1 = require("@nestjs/jwt");
const decorators_1 = require("./decorators");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async createUser(body, req) {
        const isCorrect = sdk_1.PublicKey.fromString(body.data.public_key).verify(Buffer.from("bills"), Buffer.from(body.data.signature, "hex"));
        if (!isCorrect)
            throw new common_1.BadRequestException();
        const createdUser = await this.authService.createUser(body.data);
        const token = this.jwtService.sign({ userAccountId: createdUser.userAccountId, name: createdUser.name });
        req.session['user'] = token;
        return createdUser;
    }
    async loginUser(body, req) {
        console.log(body);
        const foundUser = await this.authService.loginUser(body.data);
        const token = this.jwtService.sign(foundUser);
        req.session['user'] = token;
        return foundUser;
    }
    getCurrentUser(user) {
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return this.authService.getCurrentUser(user.userAccountId);
    }
    logOut(req) {
        req.session['user'] = null;
        return;
    }
    createTopic(body, user) {
        return this.authService.createTopic(body.data, user.userAccountId);
    }
    getTopics() {
        return this.authService.getTopics();
    }
    getTopicsByUser(user) {
        if (!user)
            throw new common_1.UnauthorizedException();
        return this.authService.getTopicsByUser(user.userAccountId);
    }
    getTopicsByTopicID(topicId) {
        return this.authService.getTopicsByTopicID(topicId);
    }
};
__decorate([
    (0, common_1.Post)('/createUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/loginUser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)("/currentUser"),
    __param(0, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)("/logout"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('/createTopic'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createTopic", null);
__decorate([
    (0, common_1.Get)('/getTopics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getTopics", null);
__decorate([
    (0, common_1.Get)('/getTopicsByUser'),
    __param(0, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getTopicsByUser", null);
__decorate([
    (0, common_1.Get)('/getTopics/:topicId'),
    __param(0, (0, common_1.Param)('topicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getTopicsByTopicID", null);
AuthController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map