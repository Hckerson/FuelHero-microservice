import { RiskService } from './risk.service';
import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { riskAnalyserDto } from './dto/risk-analyser-dto';

@Controller()
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @MessagePattern({ cmd: 'risk' })
  async calculateRisk(identifier: riskAnalyserDto) {
    return this.riskService.calculateRisk(identifier);
  }

}
