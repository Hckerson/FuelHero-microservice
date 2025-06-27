import { Injectable } from '@nestjs/common';
import { riskAnalyserDto } from './dto/risk-analyser-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RiskService {
  constructor(private readonly prisma: PrismaService) {}
  async calculateRisk(
    identifier: riskAnalyserDto,
  ): Promise<{ score: number; approved: boolean }> {
    // Step 1: Fetch user data from a database or another service
    const { userId } = identifier;
    const userData = await this.getUserData(userId);
    if (!userData) return { score: 0, approved: false };
    const { kycVerified, createdAt, reviews, payments, Order, repaymentOnTime } = userData;
    const now = new Date();
    const created = new Date(createdAt);
    const accountAgeMonths =
      (now.getFullYear() - created.getFullYear()) * 12 +
      (now.getMonth() - created.getMonth());
    // Step 2: Calculate score based on simple rules (you can later replace this with ML model)
    let score = 0;

    if (Order.length > 10) score += 30;
    if (repaymentOnTime) score += 40;
    if (kycVerified) score += 20;
    if (accountAgeMonths > 6) score += 10;

    const approved = score >= 70;

    return { score, approved };
  }

  private async getUserData(userId: string) {
    try {
      const response = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          kycVerified: true,
          createdAt: true,
          reviews: true,
          payments: true,
          Order: true,
          repaymentOnTime: true
        },
      });
      return response;
    } catch (error) {
      console.error(`Error getting user data`);
    }
  }
}
