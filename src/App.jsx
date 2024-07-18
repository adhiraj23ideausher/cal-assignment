import { Routes, Route } from "react-router-dom";
import AvailabilityPage from "./pages/AvailabilityPage";
import SingleAvailability from "./pages/SingleAvailability";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AvailabilityPage />} />
        <Route path="/:id" element={<SingleAvailability />} />
      </Routes>
    </div>
  );
};

export default App;
