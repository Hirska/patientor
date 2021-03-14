import React from 'react';
import { HealthCheckEntry as Healthcheck } from '../types';
import Diagnosis from './Diagnosis';
import { Card, Icon } from 'semantic-ui-react';

const HealthCheckEntry: React.FC<{ entry: Healthcheck }> = ({ entry }) => {
  
  const getHealtRating = () => {
    if(entry?.healthCheckRating === 0) {
      return <Icon name='heart' color='green'/>;
    } else if(entry?.healthCheckRating === 1) {
      return <Icon name='heart' color='yellow'/>;
    } else if(entry?.healthCheckRating === 2) {
      return <Icon name='heart' color='orange'/>;
    } else if(entry?.healthCheckRating === 3) {
      return <Icon name='heart' color='red'/>;
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry?.date} <Icon name='doctor'></Icon>
        </Card.Header>
        <Card.Description>
          <p> {entry.description} </p>
          <Diagnosis entry={entry} />
          {getHealtRating()}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;