import { Icon } from "@iconify/react";
import BackgroundPage from "../componen/BackgroundPage";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";

const HomePages = ({ dataLeaderBoard, dataUser, getUser }) => {
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [dataUser?.score]);

  const scorers = () => {
    return dataLeaderBoard?.map((val, idx) => {
      let name = dataUser?.name;
      let ava = dataUser?.avatar;
      let score = dataUser?.score;
      return (
        <div
          key={idx.toLocaleString()}
          className={
            val?.name === name && val?.score === score && val.avatar === ava
              ? "text-red-600"
              : "text-white"
          }
        >
          <div className=" flex justify-between px-2 rounded-lg items-center shadow shadow-[#D9D9D9]  ">
            <div className=" flex  items-center gap-2 ">
              <Avatar alt="" src={val?.avatar} sx={{ width: 40, height: 40 }} />
              <div>
                <h1 className=" text-lg font-bold  ">{val.name}</h1>
                <h2 className=" text-sm italic">{val.score} Point</h2>
              </div>
            </div>
            <div className=" flex  items-center gap-2 ">
              <Icon
                hidden={idx !== 0}
                icon="game-icons:laurels-trophy"
                className="text-3xl text-yellow-600"
              />
              <Icon
                icon="ant-design:trophy-twotone"
                hidden={idx !== 1}
                className="text-3xl text-gray-300"
              />

              <Icon
                icon="mdi:badge"
                hidden={idx !== 2}
                className="text-3xl text-gray-500"
              />
              <h2 className=" text-lg font-bold  ">
                {idx + 1} <sup>th</sup>
              </h2>
            </div>
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
