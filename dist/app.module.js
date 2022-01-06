"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const UserAuthMiddleware_1 = require("./UserAuthMiddleware");
const isProd = process.env.NODE_ENV === 'production';
const secret = process.env.SECRET || 'asdf';
const cookie_session_1 = __importDefault(require("cookie-session"));
const CookieProdConfig = {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    signed: false,
    maxAge: 10000000,
    overwrite: false,
};
const CookieDevConfig = {
    secure: false,
    httpOnly: false,
    signed: false,
};
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply((0, cookie_session_1.default)(isProd ? CookieProdConfig : CookieDevConfig))
            .forRoutes('*')
            .apply(UserAuthMiddleware_1.UserAuthMiddleware)
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            jwt_1.JwtModule.register({
                secret: secret,
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map