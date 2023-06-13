import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: Function) {
    const { method, url } = req;
    this.logger.log(`[${method}] ${url}`);
    next();
  }
}
