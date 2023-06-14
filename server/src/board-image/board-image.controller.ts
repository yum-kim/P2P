import { Controller } from '@nestjs/common';
import { BoardImageService } from './board-image.service';

@Controller('board-image')
export class BoardImageController {
  constructor(private readonly boardImageService: BoardImageService) {}
}
