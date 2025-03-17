import Header from "./assets/components/Header";
import Main from "./assets/components/Main";
import Footer from "./assets/components/Footer";
import { ToastProvider } from "./assets/context/ToastContext";
import Toastify from "./assets/components/Toastify";


function App() {
  
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen p-4 justify-between bg-gradient-to-b bg-[#ebf4e9]">
        <Toastify />
        <Header />
        <Main />        
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
