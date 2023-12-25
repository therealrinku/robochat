import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import useAppContext from "../hooks/useAppContext";
import { Link } from "react-router-dom";

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
    <div className="bg-gray-50">
      <header className="relative z-10 py-4 md:py-6" x-data="{expanded: false}">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link to="/" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                <p>Robochatbot</p>
              </Link>
            </div>

            <div className="hidden md:flex">
              <button
                onClick={onLogin}
                className="inline-flex gap-3 items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                <FaGoogle />
                Login with google
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-12 sm:py-16 lg:pb-24">
        <div className="absolute bottom-0 right-0 overflow-hidden">
          <img
            className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:mx-auto lg:object-cover lg:scale-75"
            src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/background-pattern.png"
            alt=""
          />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
            <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
                Create chatbot on the fly
              </h1>
              <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
                Customer support matters and we are here to help, customize chatbot that fits your needs instantly and
                improve your customer support.
              </p>

              <button
                onClick={onLogin}
                className="inline-flex items-center gap-3 px-8 py-4 mt-8 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded sm:mt-10 font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Get Started
              </button>
            </div>

            <div className="xl:col-span-1">
              <img
                className="w-full mx-auto"
                src="https://firebasestorage.googleapis.com/v0/b/arc3share.appspot.com/o/files%2FScreenshot%20from%202023-12-25%2014-28-29.png?alt=media&token=77ebfbaf-a02e-432e-a299-bf9fafea23b5"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
