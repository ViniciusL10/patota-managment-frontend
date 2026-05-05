import {Member} from './Member';

export interface Patota {
  totalCost: number;
  valuePerMember: number;
  monthYear: string;
  members: Member[];
}
