import { Icon } from "@iconify/react";
import BackgroundPage from "../componen/BackgroundPage";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Swal from "sweetalert2";

const HomePages = ({ dataUser }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  let level = dataUser?.level;
  const getLeaderBoard = async () => {
    const userRef = collection(db, "user");
    const querySnapshot = await getDocs(
      query(
        userRef,
        where("level", "==", level),
        orderBy("score", "desc"),
        limit(5)
      )
    );
    const dataLeaderBoard = querySnapshot.docs.map((doc) => doc.data());
    setLeaderBoard(dataLeaderBoard);
  };

  console.log(leaderBoard);

  useEffect(() => {
    if (dataUser?.level) {
      getLeaderBoard();
    } else {
      // level = "easy";
      // getLeaderBoard();
    }
  }, [dataUser, level]);

  const scorers = () => {
    let color;
    return leaderBoard.map((val, idx) => {
      let name = dataUser.name;
      let ava = dataUser.avatar;
      let score = dataUser.score;

      if (val?.name === name && val?.score === score && val.avatar === ava) {
        color = "text-red-600";
      } else {
        color = "text-white";
      }
      return (
        <div key={idx.toLocaleString()} className={color}>
          <div className=" flex justify-between px-2 rounded-lg items-center shadow shadow-[#D9D9D9]  ">
            <div className=" flex  items-center gap-2 ">
              {idx <= 2 ? (
                <Icon
                  icon="game-icons:laurels-trophy"
                  className={
                    idx === 0
                      ? "text-3xl text-yellow-600"
                      : idx === 1
                      ? "text-3xl text-gray-500"
                      : "text-3xl text-white"
                  }
                />
              ) : (
                <img src={val?.avatar} width={"32px"} alt="" />
              )}
              <div>
                <h1 className=" text-lg font-bold  ">{val.name}</h1>
                <h2 className=" text-sm italic">{val.score} Point</h2>
              </div>
            </div>
            <h2 className=" text-lg font-bold  ">
              {idx + 1} <sup>th</sup>
            </h2>
          </div>
        </div>
      );
    });
  };

  const handleMyScore = () => {
    Swal.fire({
      title: `You are the best ${dataUser?.name}!! `,
      text: `Your in level ${dataUser?.level} with score ${dataUser?.score}`,
      imageUrl: dataUser?.avatar,
      confirmButtonColor: "#173B3A",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "close",
    });
  };

  return (
    <section className="relative  h-[100vh] md:h-screen ">
      <BackgroundPage />
      <div className=" relative container mx-auto  ">
        <h1 className=" text-5xl text-[#D9D9D9] font-bold text-center pt-10  ">
          Leader Board
        </h1>
        <div className=" flex justify-center  text-[#D9D9D9]  mt-20 mx-3   ">
          <div className=" r border shadow shadow-slate-200 py-10 px-5 md:px-20 bg-transparent rounded-lg flex flex-col gap-5 w-full md:w-[500px] xl:w-[700px]  bg-[#173B3A] opacity-80  ">
            <h1 className="text-3xl font-bold text-center">Top Scorers</h1>
            {scorers()}
            <div className=" flex items-center gap-3 text-[#D9D9D9]  justify-center">
              <Link to={dataUser?.name ? "/quiz" : "/sign"}>
                <button className=" border-2 border-[#D9D9D9] px-2 rounded-lg py-1 hover:bg-[#D9D9D9] hover:text-[#173B3A]  ">
                  Let's Play
                </button>
              </Link>
              <button
                hidden={!dataUser?.name}
                onClick={handleMyScore}
                className=" border-2 border-[#D9D9D9] px-2 rounded-lg py-1 hover:bg-[#D9D9D9] hover:text-[#173B3A]"
              >
                My Score
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePages;
