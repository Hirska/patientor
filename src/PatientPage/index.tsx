import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Patient } from '../types';
import { Icon, Button } from "semantic-ui-react";
import { setPatient } from '../state/reducer';

import EntryDetails from './EntryDetails';
import AddEntryModal from './AddEntryModal';
import { HospitalFormValues } from './AddHospitalEntryForm';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const submitNewEntry = async (values: HospitalFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data || 'Unknown error');
    }
  };

  const openModal = () => {
    setModalOpen(true);

  };

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button onClick={openModal}>Add New Entry</Button>
      {patient?.entries?.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
    </>
  );
};

export default PatientPage;
