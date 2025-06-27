export class RiskProfileDto {
  score: number;
  approved: boolean;
  orders?: number;
  repaymentsOnTime?: boolean;
  kycVerified?: boolean;
  accountAgeMonths?: number;
}