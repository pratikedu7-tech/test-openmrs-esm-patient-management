import dayjs from 'dayjs';
import useSWR from 'swr';
import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import { type Appointment, type AppointmentsFetchResponse } from '../types';
import { omrsDateFormat } from '../constants';

export function useAppointmentsByDate(isoDate: string | null | undefined): {
  appointments: Array<Appointment>;
  isLoading: boolean;
  error: Error | undefined;
} {
  const startOfDay = isoDate ? dayjs(isoDate).startOf('day').format(omrsDateFormat) : null;

  const url = startOfDay ? `${restBaseUrl}/appointments?forDate=${startOfDay}` : null;

  const { data, isLoading, error } = useSWR<AppointmentsFetchResponse, Error>(url, openmrsFetch, {
    errorRetryCount: 2,
  });

  return { appointments: data?.data ?? [], isLoading, error };
}
