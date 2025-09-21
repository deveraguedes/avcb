import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

interface NetworkContextType {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  connectionType: string | null;
  syncData: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType | null>(null);

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

interface NetworkProviderProps {
  children: React.ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({children}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false);
      setIsInternetReachable(state.isInternetReachable);
      setConnectionType(state.type);
      
      console.log('Network state changed:', {
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      });

      // Auto sync when connection is restored
      if (state.isConnected && state.isInternetReachable) {
        syncData();
      }
    });

    // Get initial network state
    NetInfo.fetch().then((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false);
      setIsInternetReachable(state.isInternetReachable);
      setConnectionType(state.type);
    });

    return () => unsubscribe();
  }, []);

  const syncData = async () => {
    if (!isConnected || !isInternetReachable) {
      console.log('No internet connection, skipping sync');
      return;
    }

    try {
      console.log('Starting data synchronization...');
      // Implement your sync logic here
      // Example: upload pending changes, download latest data
      
      // This is where you would:
      // 1. Upload any local changes that haven't been synced
      // 2. Download latest data from the server
      // 3. Merge changes and resolve conflicts
      
      console.log('Data synchronization completed');
    } catch (error) {
      console.error('Data synchronization failed:', error);
    }
  };

  return (
    <NetworkContext.Provider
      value={{
        isConnected,
        isInternetReachable,
        connectionType,
        syncData,
      }}>
      {children}
    </NetworkContext.Provider>
  );
};
