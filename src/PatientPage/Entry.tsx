import React from 'react';
import { useStateValue } from "../state";
import { Entry } from '../types';
type EntryProps = {
  entry: Entry;
};

const EntryComponent = ({ entry }: EntryProps) => {
  const [{ diagnosis },] = useStateValue();
  return (
    <>
      <p>{entry?.date} {entry.description} </p>
      <ul>
        {entry?.diagnosisCodes?.map(diagnosisCode =>
          <li key={diagnosisCode}>
            {diagnosisCode} {diagnosis.find(diagnose => diagnose.code === diagnosisCode)?.name}
          </li>)
        }
      </ul>
    </>
  );
};

export default EntryComponent;