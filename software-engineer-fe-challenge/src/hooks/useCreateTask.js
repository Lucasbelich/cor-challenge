import { useState, useCallback } from "react";
import mockApiService from "../api/mockApi";

const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = useCallback(async (text) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await mockApiService.createTask(text);
      return newTask;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createTask,
    loading,
    error,
    clearError: () => setError(null),
  };
};

export default useCreateTask;
