
import Login from "pages/login";
import PublicRoutes from "app/routes/public-routes";
import { useAuthContext } from "./contexts/auth-context";
import PrivateRoutes from "./routes/private-routes";

const App = (): JSX.Element => {
  const { currentAuthUser } = useAuthContext();

  return (
    <main className="bg-[url('/images/background-login.gif')] bg-no-repeat bg-cover h-screen">
      { currentAuthUser ? 
          <PrivateRoutes />
        : <PublicRoutes /> }
    </main>
  );
};

export default App;
