import React from 'react';
import { TimeInputProps } from './TimeInput.types';
import { DateInput, DateSegment, Label, TimeField } from 'react-aria-components';
import { ErrorMessage } from '../Input/Input.styles.ts';
import './TimeInput.styles.css';

export const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, errorMessage }) => {
  return (
    <TimeField

      granularity={ 'second' }
      value={ value }
      onChange={ onChange }
      name={ 'time' }
    >
      <Label>Время игры</Label>
      <DateInput>
        { segment => ['minute', 'second'].includes(segment.type) ? <DateSegment segment={ segment } /> : <></> }
      </DateInput>
      <ErrorMessage>
        { errorMessage }
      </ErrorMessage>
    </TimeField>
  );
};
