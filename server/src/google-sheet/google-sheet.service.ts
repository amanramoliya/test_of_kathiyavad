// src/google-sheets/google-sheets.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheets;

  constructor(private readonly configService: ConfigService) {
    const credentials = {
      type: this.configService.get<string>('GOOGLE_TYPE') || 'service_account',
      project_id: this.configService.get<string>('GOOGLE_PROJECT_ID'),
      private_key_id: this.configService.get<string>('GOOGLE_PRIVATE_KEY_ID'),
      private_key: this.configService
        .get<string>('GOOGLE_PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
      client_email: this.configService.get<string>('GOOGLE_CLIENT_EMAIL'),
      client_id: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      auth_uri:
        this.configService.get<string>('GOOGLE_AUTH_URI') ||
        'https://accounts.google.com/o/oauth2/auth',
      token_uri:
        this.configService.get<string>('GOOGLE_TOKEN_URI') ||
        'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url:
        this.configService.get<string>('GOOGLE_AUTH_PROVIDER_CERT_URL') ||
        'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: this.configService.get<string>(
        'GOOGLE_CLIENT_CERT_URL',
      ),
      universe_domain:
        this.configService.get<string>('GOOGLE_UNIVERSE_DOMAIN') ||
        'googleapis.com',
    };
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getSheetData(spreadsheetId: string, range: string) {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  }
}
