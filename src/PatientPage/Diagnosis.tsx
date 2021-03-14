import React from 'react';
import { useStateValue } from "../state";
import { Entry } from '../types';
import { List } from 'semantic-ui-react';

const Diagnosis: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis },] = useStateValue();
  return (
    <List>
      {entry?.diagnosisCodes?.map(diagnosisCode =>
          <List.Item key={diagnosisCode}>
            {diagnosisCode} {diagnosis.find(diagnose => diagnose.code === diagnosisCode)?.name}
          </List.Item>)
        }
    </List>
  );
};

export default Diagnosis;