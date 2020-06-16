import { ElectionItemModel } from './election-item-model';

export class ElectionModel {
  id: string;
  name: string;
  photoUrl: string;
  isActive: boolean;
  items: ElectionItemModel[];
}
