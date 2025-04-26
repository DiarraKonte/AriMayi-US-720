import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import JobListCard from '../../../components/JobListCard';
import jobsReducer from '../../../Slice/jobs/jobsSlice';
import { toggleFavorite as toggleFavoriteAction } from '../../../Slice/jobs/jobSlice';
import { Job } from '../../../Slice/jobs/jobInterfaces';

// Configurer un store Redux pour les tests
const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
  preloadedState: {
    jobs: {
      jobs: [
        {
          id: 1,
          title: 'DEV',
          company: { companyName: 'Tech Corp' },
          location: 'Paris',
          contractType: 'CDI',
          views: 100,
          publishedDate: new Date().toISOString(),
          favorite: false, // Initialement non favori
          applied: false,
          status: 'available',
        },
      ],
      jobDetails: null,
      favorites: [],
      loading: false,
      error: null,
    },
  },
});

// Mock de l'action toggleFavorite pour vérifier qu'elle est appelée
jest.mock('../../../Slice/jobs/jobSlice', () => ({
  toggleFavorite: jest.fn(),
}));

describe('JobListCard', () => {
  const job = {
    id: 1,
    title: 'DEV',
    company: { companyName: 'Tech Corp' },
    location: 'Paris',
    contractType: 'CDI',
    views: 100,
    publishedDate: new Date().toISOString(),
    favorite: false,
    applied: false,
    status: 'available',
  };

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    (toggleFavoriteAction as jest.Mock).mockClear();
    render(
      <Provider store={store}>
        <JobListCard job={job} isSelected={false} onClick={() => {}} />
      </Provider>,
    );
  });

  test('toggles favorite status when favorite icon is clicked', () => {
    // Trouver l'icône de favori (utilisation du data-testid)
    const favoriteIcon = screen.getByTestId('favorite-icon');

    // Simuler un clic sur l'icône
    fireEvent.click(favoriteIcon);

    // Vérifier que l'action toggleFavorite a été appelée avec le bon ID
    expect(toggleFavoriteAction).toHaveBeenCalledWith(job.id);

    // (Optionnel) Vérifier l'état mis à jour dans le store si nécessaire
    const state = store.getState().jobs;
    const updatedJob = state.jobs.find((j) => j.id === job.id);
    expect(updatedJob?.favorite).toBe(true); // L'état devrait être inversé
  });

  test('renders initial favorite state correctly', () => {
    const favoriteIcon = screen.getByTestId('favorite-icon');
    expect(favoriteIcon).toContainElement(screen.queryByTestId('heart-outlined')); // Vérifie l'icône non remplie initialement
  });
});