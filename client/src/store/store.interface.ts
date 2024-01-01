import { IAuthUser } from '@/features/auth/interfaces/auth.interface';
import { IBuyerDocument } from '@/features/buyer/interfaces/buyer.interface';
import { ISellerDocument } from '@/features/sellers/interfaces/seller.interface';
import { INotification } from '@/shared/interfaces/header.interface';

export interface IReduxState {
  authUser: IAuthUser;
  header: string;
  logout: boolean;
  buyer: IBuyerDocument;
  seller: ISellerDocument;
  showCategoryContainer: boolean;
  notification: INotification;
}
