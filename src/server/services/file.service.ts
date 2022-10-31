import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async getFile(path: string): Promise<any> {
    return createReadStream(`${path}`);
  }

  async hashFile(path: string): Promise<string> {
    const file = fs.readFileSync(path);
    
    return '0x' + crypto
      .createHash('sha256')
      .update(file)
      .digest('hex');
  }
}
