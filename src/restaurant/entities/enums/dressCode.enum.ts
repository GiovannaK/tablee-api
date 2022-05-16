import { registerEnumType } from '@nestjs/graphql';

export enum DressCodePortuguese {
  RESORT = 'RESORT CASUAL',
  BUSINESS = 'BUSINESS CASUAL',
  CASUAL = 'CASUAL',
  FORMAL = 'FORMAL',
}

registerEnumType(DressCodePortuguese, { name: 'DressCodePortuguese' });
