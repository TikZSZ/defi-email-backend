"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.set('trust proxy', true);
    app.enableCors({
        credentials: true,
        methods: ['GET', 'PUT', 'POST'],
        exposedHeaders: 'set-cookie',
        origin: process.env.NODE_ENV === 'production'
            ? 'https://factura-frontend.vercel.app'
            : 'http://localhost:3000',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const prismaService = app.get(prisma_service_1.PrismaService);
    prismaService.enableShutdownHooks(app);
    await app.listen(process.env.PORT || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map