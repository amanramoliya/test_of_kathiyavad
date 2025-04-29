import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSheetsService } from 'src/google-sheet/google-sheet.service';

@Injectable()
export class ItemsService {
  constructor(
    private readonly sheetsService: GoogleSheetsService,
    private readonly configService: ConfigService,
  ) {}
  private readonly spreadsheetId = this.configService.get<string>('SHEET_ID');
  async getItems(): Promise<any[]> {
    const range = 'Sheet1!A1:E5'; // adjust range as needed
    const data = await this.sheetsService.getSheetData(
      this.spreadsheetId!,
      range,
    );
    const mappedData = data.map((row) => {
      return {
        id: row[0],
        name: row[1],
        colorCode: row[2],
        price: Number(row[3]),
        description: row[4],
        imageUrl: row[5],
      };
    });
    return mappedData;
  }
}
