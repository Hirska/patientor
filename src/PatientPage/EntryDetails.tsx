import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntry entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalEntry entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
};

export default EntryDetails;