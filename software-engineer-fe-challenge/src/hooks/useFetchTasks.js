import { useState, useEffect, useCallback } from "react";
import mockApiService from "../api/mockApi";

const useFetchTasks = ({ limit = 10 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = useCallback(async (pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await mockApiService.fetchTasks({ page: pageNum, limit });
      
      if (append && data) {
        setData({
          tasks: [...data.tasks, ...res.tasks],
          hasNextPage: res.hasNextPage
        });
      } else {
        setData(res);
      }
      
      setHasNextPage(res.hasNextPage);
      setCurrentPage(pageNum);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [data, limit]);

  const loadMore = useCallback(() => {
    if (!loading && hasNextPage) {
      fetchTasks(currentPage + 1, true);
    }
  }, [loading, hasNextPage, currentPage, fetchTasks]);

  useEffect(() => {
    fetchTasks(1, false);
  }, []);

  return { 
    data, 
    loading, 
    error, 
    hasNextPage, 
    loadMore,
    refetch: () => fetchTasks(1, false)
  };
};

export default useFetchTasks;
