import {Member} from '../models/Member';
import {Patota} from '../models/Patota';
import api from './api';

export async function getPatota(year: string, month: string): Promise<Patota> {
  const response = await api.get<Patota>(`/patota/${year}/${month}`);

  return response.data;
}

export async function updateMemberPayment(
  month: string,
  year: string,
  paid: boolean,
  memberId: string,
): Promise<Member> {
  const response = await api.post<Member>(`/updateMemberPayment/${memberId}`, {paid, month, year});

  return response.data;
}

export async function updateSavedMoney(month: string, year: string, savedMoney: number): Promise<Patota> {
  const response = await api.post<Patota>(`/updateSavedMoney`, {savedMoney, month, year});

  return response.data;
}
