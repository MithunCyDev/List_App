import { collection, onSnapshot } from "firebase/firestore";
import { saveMember } from "./Utils/FirebaseFunction";
import { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { firestore } from "./firebase.config";

function App() {
  const [receiver, setReceiver] = useState("");
  const [giver, setGiver] = useState("");
  const [amount, setAmount] = useState("");
  const [member, setMember] = useState("");
  const [list, setList] = useState(false);
  const [giverName, setGivername] = useState(false);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    // setSubmit({...submit, receiver, giver, amount})
    const myDate = new Date();

    if (!amount || !giver || !receiver) {
      setAlert("Something Error");
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      // Add a new document in collection
      saveMember({ receiver, giver, amount, myDate });

      setAmount("");
      setGiver("");
      setReceiver("");
      setAlert("Save Successfully");
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  // Get Data From Firestore Database
  useEffect(
    () =>
      onSnapshot(collection(firestore, "member_list"), (snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      }),
    [receiver, giver, amount]
  );

  //  console.log(data);

  const NewMemberSubmit = (e) => {
    e.preventDefault();
    saveMember({ giver: member });
    setAlert("New Member Added");
    setMember("");
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  //Total Taka Count
  const myTotal = data.map((total) => parseFloat(total.amount));
  const filterNumber = myTotal.filter((i) => Number(i));

  const totalPrice = filterNumber.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <section className="w-full h-screen bg-dark flex flex-col justify-center font-[roboto]">
      <div className="flex items-center justify-center w-full h-20 fixed top-10 left-0 gap-12">
        <button
          onClick={() => setList(!list)}
          className="text-black font-semibold bg-green text-md py-2 px-4 rounded-md"
        >
          Member List
        </button>
        <button
          onClick={() => setGivername(!giverName)}
          className="text-black font-semibold bg-green text-md py-2 px-4 rounded-md"
        >
          Giver Name
        </button>
      </div>

      {/* Set Alert Message */}
      <div className={alert ? "flex justify-center z-10" : "hidden"}>
        <div
          className={
            alert === "Something Error"
              ? "fixed top-10 bg-red px-4 py-2 rounded-md"
              : "fixed top-10 bg-green px-4 py-2 rounded-md"
          }
        >
          <h1 className="font-medium text-white">{alert}</h1>
        </div>
      </div>

      <h1 className=" mt-14 text-white font-bold text-xl flex justify-center items-center py-6 gap-2">
        {totalPrice} <span className="text-green">Total TK</span>
      </h1>

      {/* Add New Member section */}
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
            name="receiver"
            autoComplete="off"
            placeholder="receiver name"
            className="bg-notblack text-white py-2 px-6 outline-none rounded-md mb-3"
          />

          <label className="text-white font-medium text-lg my-2">
            Giver Name
          </label>
          <input
            onChange={(e) => setGiver(e.target.value)}
            value={giver}
            type="text"
            name="giver"
            autoComplete="off"
            placeholder="giver name"
            className="bg-notblack text-white py-2 px-6 outline-none rounded-md mb-3"
          />

          <label className="text-white font-medium text-lg my-2">
            Amount Of Money
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            name="amount"
            autoComplete="off"
            placeholder="amount"
            className="bg-notblack text-white py-2 px-6 outline-none rounded-md mb-3"
          />

          <button
            type="submit"
            className="bg-green py-2 px-4 rounded-md my-6 text-black text-lg font-semibold"
          >
            Save Details
          </button>
        </form>
      </div>

      <div
        className={
          list
            ? "backdrop-blur-xl lg:w-96 sm:w-60 h-screen border-r border-green overflow-y-scroll fixed top-0 left-0"
            : "hidden"
        }
      >
        <AiFillCloseSquare
          onClick={() => setList(false)}
          className="text-gray text-2xl m-5 cursor-pointer fixed"
        />

        <form
          onSubmit={NewMemberSubmit}
          className="mt-16 ml-6 flex flex-col py-4"
        >
          <label className="text-green font-medium mb-2 text-lg">
            Add New Member
          </label>

          <input
            onChange={(e) => setMember(e.target.value)}
            value={member}
            placeholder="add member"
            className="outline-none text-white bg-notblack bg-opacity-10 border border-deepgreen rounded-md py-2 px-4 sm:w-44 lg:w-60"
          />

          <button
            type="submit"
            className="text-white bg-green w-24 h-10 rounded-md mt-4"
          >
            {" "}
            Add
          </button>
        </form>

        <div className="mt-6 pl-6">
          {data.map((name) => (
            <h1
              key={name.id}
              className="text-white font-medium text-lg text-left mb-2"
            >
              {name.giver}
            </h1>
          ))}
        </div>
      </div>

      <div
        className={
          giverName
            ? "flex flex-col border-l border-deepgreen bg-gray-dark lg:w-96 sm:w-[340px] h-screen overflow-y-scroll fixed top-0 right-0"
            : "hidden"
        }
      >
        <AiFillCloseSquare
          onClick={() => setGivername(false)}
          className="text-gray text-2xl m-5 cursor-pointer fixed"
        />

        {/* Giver Name Receiver Name */}
        <div className="w-full flex gap-12 ml-6 mt-20">
          <h1 className="text-green2 font-semibold bg-green py-1 px-2 rounded-sm">Giver Name</h1>
          <h1 className="text-black font-semibold bg-green py-1 px-2 rounded-sm">Receiver Name</h1>
        </div>

        <div className="ml-6 mt-6">
          {data.map((name) => (
            <div className="flex items-center">
              <h1 key={name.id} className="text-white py-1 font-medium text-lg">
                {name.giver}:
              </h1>
              <span className="ml-4 text-lightgreen font-semibold">
                {name.amount ? name.amount : 0} Tk
              </span>
              <span className="ml-16 text-left text-gray font-semibold">
               |  {name.receiver}
              </span>
              
              {/* <span className="text-notblack">{parseFloat(name.myDate)}</span> */}
            </div>
          ))}
          <div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
