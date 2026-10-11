import { AppDataState } from '../types';
import { INITIAL_DATA } from '../data/defaultData';

const STORAGE_KEY = 'ar_teknik_rolling_door_app_data_v1';

export const loadAppData = (): AppDataState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_DATA;
    }
    const parsed = JSON.parse(raw);
    return {
      company: { ...INITIAL_DATA.company, ...(parsed.company || {}) },
      pricing: Array.isArray(parsed.pricing) && parsed.pricing.length > 0 ? parsed.pricing : INITIAL_DATA.pricing,
      projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : INITIAL_DATA.projects,
      testimonials: Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0 ? parsed.testimonials : INITIAL_DATA.testimonials,
    };
  } catch (err) {
    console.error('Failed to parse stored data, falling back to default:', err);
    return INITIAL_DATA;
  }
};

export const saveAppData = (data: AppDataState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save data to localStorage:', err);
  }
};

export const resetAppData = (): AppDataState => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to remove stored data:', err);
  }
  return INITIAL_DATA;
};

export const exportDataAsJson = (data: AppDataState): void => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ar-teknik-rollingdoor-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
