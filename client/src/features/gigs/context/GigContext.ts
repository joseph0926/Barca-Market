import { Context, createContext } from 'react';
import { emptyGigData, emptySellerData } from '@/shared/utils/static-data';

import { IGigContext } from '@/features/gigs/interfaces/gig.interface';

export const GigContext: Context<IGigContext> = createContext({
  gig: emptyGigData,
  seller: emptySellerData
}) as Context<IGigContext>;
