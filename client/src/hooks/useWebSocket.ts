import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(true); // Simulate connected state
  const queryClient = useQueryClient();

  useEffect(() => {
    // Set up polling to refresh data every 2 seconds for real-time effect
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['/api/markets'] });
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/market-data'] });
    }, 2000);

    return () => clearInterval(interval);
  }, [queryClient]);

  return { isConnected };
}