import AddressBookPage from "./components/pages/AddressBookPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AddressBookPage />
        </QueryClientProvider>
    );
}

export default App;
