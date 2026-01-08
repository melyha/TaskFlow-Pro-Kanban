// Storage utilities for TaskFlow Pro

const STORAGE_KEY = 'taskflow_pro_data';
const STORAGE_VERSION = '1.0';

/**
 * Reads data from localStorage
 */
export const readStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    
    // Check version compatibility
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('Storage version mismatch, might need migration');
    }
    
    return parsed.data;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

/**
 * Writes data to localStorage
 */
export const writeStorage = (data) => {
  try {
    const storageData = {
      version: STORAGE_VERSION,
      data,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
};

/**
 * Clears all stored data
 */
export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Gets storage stats
 */
export const getStorageStats = () => {
  const data = readStorage();
  if (!data) return null;
  
  return {
    boards: data.boards?.length || 0,
    totalColumns: data.boards?.reduce((acc, board) => acc + board.columns.length, 0) || 0,
    totalTasks: data.boards?.reduce((acc, board) => 
      acc + board.columns.reduce((colAcc, column) => colAcc + column.tasks.length, 0), 0
    ) || 0,
    storageSize: new Blob([JSON.stringify(data)]).size,
    lastUpdated: data.timestamp
  };
};

/**
 * Export data for backup
 */
export const exportData = () => {
  const data = readStorage();
  if (!data) return null;
  
  return {
    ...data,
    exportedAt: new Date().toISOString(),
    version: STORAGE_VERSION
  };
};

/**
 * Import data from backup
 */
export const importData = (importedData) => {
  try {
    // Basic validation
    if (!importedData || typeof importedData !== 'object') {
      throw new Error('Invalid import data format');
    }
    
    // Remove export metadata
    const { exportedAt, version, ...cleanData } = importedData;
    
    // Write to storage
    const success = writeStorage(cleanData);
    if (!success) {
      throw new Error('Failed to save imported data');
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
};