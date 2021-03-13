import React from 'react';
import { Entry } from '../types';
type EntryProps = {
  entry: Entry;
};

const EntryComponent = ({entry} : EntryProps) => {
  return (
    <>
    <p>{entry?.date} {entry.description} </p>
    <ul>
      {entry?.diagnosisCodes?.map(diagnosisCode => <li key={diagnosisCode}>{diagnosisCode}</li>)}
    </ul>
    </>
  );
};

export default EntryComponent;