import { Controller, Post, Req, Body, Headers } from '@nestjs/common';
import { Request } from 'express';

@Controller('diagnose')
export class DiagnoseController {
  @Post('')
  logRequest(
    @Req() request: Request,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    const logInfo = {
      requestBody: body,
      requestHeaders: headers,
      fullUrl:
        request.protocol + '://' + request.get('host') + request.originalUrl,
    };

    console.log('Request Log:', logInfo);

    return logInfo;
  }
}
