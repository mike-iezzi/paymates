import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Deal from "./components/Deal";

// authentication packages
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.signInWithPhoneNumber(),
};

class App extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
        </header>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

type providers = {
  signInWithGoogle: () => void;
  signInWithPhoneNumber: (
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier,
  ) => void;
};


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);







// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Switch>
//           <Route path={"/login"}>
//             <Login />
//           </Route>
//           <Route path={"/book-list"}>
//             <BookList />
//           </Route>
//         </Switch>
//       </BrowserRouter>
//     </div>
//   );
// }