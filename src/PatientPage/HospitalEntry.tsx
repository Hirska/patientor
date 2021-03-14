import React from 'react';
import Diagnosis from './Diagnosis';
import { HospitalEntry as Hospital } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry?.date} <Icon name='hospital' />
        </Card.Header>
        <Card.Meta>{entry?.discharge?.date} {entry?.discharge?.criteria}</Card.Meta>
        <Card.Description>
          <p> {entry.description} </p>
          <Diagnosis entry={entry} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;