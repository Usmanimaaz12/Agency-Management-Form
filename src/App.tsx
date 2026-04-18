import "./App.css";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  return (
    <>
      <h1 className="w-full bg-black text-white">Agency Management</h1>
      <Button variant="dark" className="rounded-sm">test Button</Button>
      <Input label="test Input" required />
    </>
  );
}

export default App;
