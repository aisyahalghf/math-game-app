import { Icon } from "@iconify/react";
import BackgroundPage from "../componen/BackgroundPage";
import { Link } from "react-router-dom";

const HomePages = () => {
  const scorers = () => {
    for (let i = 0; i < 6; i++) {
      return (
        <div className=" flex justify-between px-2 rounded-lg items-center shadow shadow-[#D9D9D9]  ">
          <div className=" flex  items-center gap-2 ">
            <Icon icon="game-icons:laurels-trophy" className="text-3xl" />
            <div>
              <h1 className=" text-lg font-bold  "> Jordy Kenter</h1>
              <h2 className=" text-sm italic">9 Point</h2>
            </div>
          </div>
          <h2 className=" text-lg font-bold  ">
            1 <sup>th</sup>
          </h2>
        </div>
      );
    }
  };

  return (
    <section className="relative  h-screen md:h-screen ">
      <BackgroundPage />
      <div className=" relative container mx-auto  ">
        <h1 className=" text-5xl text-[#D9D9D9] font-bold text-center pt-10  ">
          Leader Board
        </h1>
        <div className=" flex justify-center  text-[#D9D9D9]  mt-20 mx-3   ">
          <div className=" border shadow shadow-slate-200 py-10 px-5 md:px-20 bg-transparent rounded-lg flex flex-col gap-5 w-full md:w-[500px] xl:w-[700px]  bg-[#173B3A] opacity-80 ">
            <h1 className="text-3xl font-bold text-center">Top Scorers</h1>
            {scorers()}
            <div className=" flex items-center gap-3 text-[#D9D9D9]  justify-center">
              <Link to="/sign">
                <button className=" border-2 border-[#D9D9D9] px-2 rounded-lg py-1 hover:bg-[#D9D9D9] hover:text-[#173B3A]  ">
                  Let's Play
                </button>
              </Link>
              <button className=" border-2 border-[#D9D9D9] px-2 rounded-lg py-1 hover:bg-[#D9D9D9] hover:text-[#173B3A]">
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
