import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import useAppContext from "../hooks/useAppContext";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function Login() {
  const { setCurrentUser } = useAppContext();

  function onLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        //@ts-ignore
        // const token = credential.accessToken;
        const user = result.user;
        setCurrentUser(user);
      })
      .catch((error) => {});
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <button
        onClick={onLogin}
        className="flex items-center gap-2 border px-5 py-3 rounded-md hover:bg-green-500 hover:text-white"
      >
        <AiFillGoogleCircle color="red" size={20} />
        <span>Login with google</span>
      </button>
    </div>
  );
}
