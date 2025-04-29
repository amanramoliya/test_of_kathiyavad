// src/google-sheets/google-sheets.module.ts
import { Module } from '@nestjs/common';
import { GoogleSheetsService } from 'src/google-sheet/google-sheet.service';

@Module({
  providers: [GoogleSheetsService],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule {}
