import React, { useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Patient } from '../types';
import { Icon } from "semantic-ui-react";
import { setPatient } from '../state/reducer';

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

  return (
    <>
      <h2>{patient?.name}<Icon name='mars' /></h2><p>ssn: {patient?.ssn} </p>
      <p>
        occupation: {patient?.occupation}
      </p>
    </>
  );
};

export default PatientPage;
