import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
    private userServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.userServiceUrl = this.configService.get<string>('USER_SERVICE_URL') ?? 'http://localhost:3001';
    }

    async forward(method: string, path: string, body?: any, headers?: any) {
        const url = `${this.userServiceUrl}${path}`;
        try {
            const response = await firstValueFrom(
                this.httpService.request({
                    method,
                    url,
                    data: body,
                    headers: { ...headers, 'content-type': 'application/json' },
                }),
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                error.response?.data || 'User service error',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}