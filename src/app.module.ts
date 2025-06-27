import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RiskModule } from './risk/risk.module';

@Module({
  imports: [RiskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
