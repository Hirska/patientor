import React, { useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Patient } from '../types';
import { Icon } from "semantic-ui-react";
import { setPatient } from '../state/reducer';

import EntryComponent from './Entry';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromAPI } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromAPI));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
  }, [dispatch]);
  const displayGenderIcon = () => {
    if (patient?.gender === 'male') {
      return <Icon name='mars' />;
    } else if (patient?.gender === 'female') {
      return <Icon name='venus' />;
    } else if (patient?.gender === 'other') {
      return <Icon name='neuter' />;
    } else {
      return null;
    }
  };
  return (
    <>
      <h2>{patient?.name}{displayGenderIcon()}</h2><p>ssn: {patient?.ssn} </p>
      <p>
        occupation: {patient?.occupation}
      </p>
      <h3>entries</h3>
      {patient?.entries?.map(entry => <EntryComponent key={entry.id} entry={entry} />)}
    </>
  );
};

export default PatientPage;
