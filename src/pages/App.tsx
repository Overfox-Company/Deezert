import { type ProviderProps } from '../types/app';
import { AppProvider } from '../context/AppContext';
const App:React.FC<ProviderProps>=({children})=> {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
export default App;