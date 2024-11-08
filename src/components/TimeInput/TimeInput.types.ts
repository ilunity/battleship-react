import { Time } from '@internationalized/date';

export interface TimeInputProps {
  value: Time;
  onChange: (value: Time) => void;
  errorMessage?: string;
}
