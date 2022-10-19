import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';

@Injectable()
export class FileService {
  async getFile(path: string): Promise<any> {
    return createReadStream(`${path}`);
  }
}
