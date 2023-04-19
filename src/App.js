import { collection, onSnapshot } from "firebase/firestore";
import {saveMember} from "./Utils/FirebaseFunction";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseSquare } from "react-icons/ai";
import { firestore } from "./firebase.config";

function App() {
  const [receiver, setReceiver] = useState("");
  const [giver, setGiver] = useState("");
  const [amount, setAmount] = useState("");
  const [submit, setSubmit] = useState({});
  const [list, setList] = useState(false);
  const [giverName, setGivername] = useState(false);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);


  const HandleSubmit = (e) => {
    e.preventDefault();
    // setSubmit({...submit, receiver, giver, amount})

    // Add a new document in collection
    saveMember({ receiver, giver, amount });
    setAmount("");
    setGiver("");
    setReceiver("");
  };

   // Get Data From Firestore Database
   useEffect(
     () =>
       onSnapshot(collection(firestore,'member_list'), (snapshot) => {
         setData(
           snapshot.docs.map((doc) => {
             return { ...doc.data(), id: doc.id };
           })
         );
       }),
     [receiver, giver, amount]
   );
 
   console.log(data);

  return (
    <section className="w-full h-screen bg-dark flex flex-col justify-center">
      <div className="flex items-center justify-center w-full h-20 fixed top-10 left-0 gap-12">
        <button
          onClick={() => setList(!list)}
          className="text-white bg-redflower text-md py-2 px-4 rounded-md"
        >
          Member List
        </button>
        <button
          onClick={() => setGivername(!giverName)}
          className="text-white bg-redflower text-md py-2 px-4 rounded-md"
        >
          Giver Name
        </button>
      </div>

      <div className="flex justify-center">
        <div className="fixed top-10 bg-orange px-4 py-2 rounded-md">
          <h1 className="font-semibold text-white">Hello</h1>
        </div>
      </div>

      <h1 className="text-white font-bold text-xl flex justify-center items-center py-6 gap-2">
        200 <span className="text-redflower">Total TK</span>
      </h1>

      <div className=" w-full flex flex-col justify-center items-center">
        <form
          onSubmit={HandleSubmit}
          className="flex flex-col bg-black py-8 px-8 rounded-md"
        >
          <label className="text-white font-medium text-lg my-2">
            Receiver Name
          </label>
          <input
            onChange={(e) => setReceiver(e.target.value)}
            value={receiver}
            type="text"
            required
            name="receiver"
            autoComplete="off"
            className="bg-white py-2 px-6 outline-none rounded-md mb-3"
          />

          <label className="text-white font-medium text-lg my-2">
            Giver Name
          </label>
          <input
            onChange={(e) => setGiver(e.target.value)}
            value={giver}
            type="text"
            required
            name="giver"
            autoComplete="off"
            className="bg-white py-2 px-6 outline-none rounded-md mb-3"
          />

          <label className="text-white font-medium text-lg my-2">
            Amount Of Money
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="text"
            required
            name="amount"
            autoComplete="off"
            className="bg-white py-2 px-6 outline-none rounded-md mb-3"
          />

          <button
            type="submit"
            className="bg-redflower py-2 px-4 rounded-md my-6 text-white text-lg font-semibold"
          >
            Save Details
          </button>
        </form>
      </div>
      <div
        className={
          list
            ? "bg-black lg:w-96 sm:w-60 h-screen border-r border-gray overflow-y-scroll fixed top-0 left-0"
            : "hidden"
        }
      >
        <AiFillCloseSquare
          onClick={() => setList(false)}
          className="text-gray text-2xl m-5 cursor-pointer fixed"
        />

        <form className="mt-20 ml-6 flex flex-col border-b border-notblack py-4">
          <label className="text-white font-medium mb-2 text-lg">
            Add New Member
          </label>
          <input placeholder="add member" className="outline-none text-white bg-notblack rounded-md py-2 px-4 sm:w-44 lg:w-60"/>
          <button type="submit" className="text-white bg-luckypoint w-24 h-10 rounded-md mt-4"> Add</button>
        </form>

        <div className="mt-10 pl-6">
        {data.map((name)=> 
          <h1 key={name.id} className="text-white font-medium text-lg text-left mb-2">{name.giver}</h1>
        )}
        </div>
      </div>

      <div
        className={
          giverName
            ? "flex flex-col bg-gray-dark lg:w-96 sm:w-60 h-screen overflow-y-scroll fixed top-0 right-0"
            : "hidden"
        }
      >
        <AiFillCloseSquare
          onClick={() => setGivername(false)}
          className="text-gray text-2xl m-5 cursor-pointer fixed"
        />

        <div className="m-6 pt-8">
          <h1 className="text-red text-lg">
            1.<span className="text-white font-semibold ml-2">Umar</span>
          </h1>
          <h1 className="text-red text-lg">
            2.<span className="text-white font-semibold ml-2">Babu</span>
          </h1>
          <h1 className="text-red text-lg">
            3.<span className="text-white font-semibold ml-2">Tushar</span>
          </h1>
          <h1 className="text-red text-lg">
            1.<span className="text-white font-semibold ml-2">Umar</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default App;
