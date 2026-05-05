import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Patota} from '../models/Patota';
import {getPatota, updateMemberGoalkeeper, updateMemberPayment} from '../services/patota-service';
import {getCurrentMonthAndYear} from '../utils/getCurrentMonthYear';

const PatotaContext = createContext<PatotaContext>({});

export const PatotaProvider = ({children}: PropsWithChildren) => {
  const now = getCurrentMonthAndYear();
  const [patota, setPatota] = useState<Patota>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(now.month);
  const [selectedYear, setSelectedYear] = useState<number>(now.year);

  const isCurrentMonth = selectedMonth === now.month && selectedYear === now.year;

  const goToPreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (isCurrentMonth) return;
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const updatePayment = async (id: string, paid: boolean) => {
    await updateMemberPayment(selectedMonth.toString(), selectedYear.toString(), paid, id);
    return patota!.members.map((member) => (member.id === id ? {...member, paid} : member));
  };

  const updateMemberPayment_ = async (memberId: string) => {
    setLoading(true);
    const currentMembers = await updatePayment(memberId, true);
    setPatota({...patota!, members: currentMembers});
    setLoading(false);
  };

  const toggleGoalkeeper = async (memberId: string, isGoalkeeper: boolean) => {
    await updateMemberGoalkeeper(selectedMonth.toString(), selectedYear.toString(), isGoalkeeper, memberId);
    const updatedMembers = patota!.members.map((m) =>
      m.id === memberId ? {...m, isGoalkeeper} : m
    );
    setPatota({...patota!, members: updatedMembers});
  };

  useEffect(() => {
    const fetchPatota = async () => {
      setLoading(true);
      try {
        const response = await getPatota(`${selectedYear}`, `${selectedMonth}`);
        setPatota(response);
      } catch {
        setPatota(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchPatota();
  }, [selectedMonth, selectedYear]);

  return (
    <PatotaContext.Provider
      value={{
        patota,
        loading,
        selectedMonth,
        selectedYear,
        isCurrentMonth,
        goToPreviousMonth,
        goToNextMonth,
        updateMemberPayment: updateMemberPayment_,
        toggleGoalkeeper,
      }}
    >
      {children}
    </PatotaContext.Provider>
  );
};

export function usePatota() {
  return useContext(PatotaContext);
}

interface PatotaContext {
  patota?: Patota;
  loading?: boolean;
  selectedMonth?: number;
  selectedYear?: number;
  isCurrentMonth?: boolean;
  goToPreviousMonth?: () => void;
  goToNextMonth?: () => void;
  updateMemberPayment?: (memberId: string) => Promise<void>;
  toggleGoalkeeper?: (memberId: string, isGoalkeeper: boolean) => Promise<void>;
}
