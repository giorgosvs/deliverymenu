import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { Header } from "./components/Header";
import { Meals } from "./components/Meals";
import { CartContextProvider } from "./components/store/CartContext";
import { UserProgressContextProvider } from "./components/store/UserProgressContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header></Header>
        <Meals></Meals>
        <Cart></Cart>
        <Checkout></Checkout>
      </CartContextProvider>
      <ToastContainer />
    </UserProgressContextProvider>
  );
}

export default App;
