import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import useAppContext from "../hooks/useAppContext";
import { AiFillGoogleCircle, AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function Login() {
  const { setCurrentUser } = useAppContext();

  const [bgImgUrl, setBgImgUrl] = useState("");

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

  useEffect(() => {
    //fetching homepage bg image
    (async function () {
      const docRef = doc(db, "app_configs", "landing_page_image_url");
      const docSnap = await getDoc(docRef);
      //@ts-ignore
      setBgImgUrl(docSnap.data().url);
    })();
  }, []);

  return (
    <div className="flex flex-row md:justify-center mx-auto w-full max-w-[1000px] h-screen">
      <div className="border-r md:border-l w-full md:w-[50%] pb-5 overflow-y-hidden">
        <div className="px-5 py-2 border-b flex items-center justify-between">
          <p className="text-sm font-bold">Robochatbot</p>

          <div className="gap-3 flex items-center text-sm font-bold">
            <button onClick={onLogin} className={`flex items-center gap-2 text-red-500`}>
              <AiFillGoogleCircle size={22} />
              Login with Google
            </button>
          </div>
        </div>

        {bgImgUrl && <img className="w-full h-screen " src={bgImgUrl} />}
      </div>
    </div>
  );
}
