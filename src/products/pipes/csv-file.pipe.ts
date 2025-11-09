import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class CsvFilePipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Fișierul este obligatoriu');
    }

    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.csv') {
      throw new BadRequestException('Fișierul trebuie să aibă extensia .csv');
    }

    if (file.mimetype !== 'text/csv') {
      throw new BadRequestException('Tipul MIME trebuie să fie text/csv');
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB
      throw new BadRequestException('Fișierul nu trebuie să depășească 2MB');
    }

    return file;
  }
}
