import React from 'react';
import { OccupationalHealthcareEntry as Occupational } from '../types';
import Diagnosis from './Diagnosis';
import { Card, Icon } from 'semantic-ui-react';

const OccupationalEntry: React.FC<{ entry: Occupational }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry?.date} <Icon name='stethoscope'/> {entry.employerName}
        </Card.Header>
        <Card.Description>
          <p> {entry.description} </p>
          <Diagnosis entry={entry} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OccupationalEntry;