import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Navbar = ({ score }) => {
  const navigate = useNavigate();
  const handleExit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "If you quit this game, your score will be recorded as the last score you achieved.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Quit This Game",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Good Job", `Your Score is ${score} .`, "success");
        navigate("/");
      }
    });
  };

  return (
    <nav className=" bg-[#D9D9D9] h-20 shadow shadow-slate-200 flex items-center   ">
      <div className=" container mx-auto flex justify-between">
        <Tooltip title="aisyah">
          <Avatar
            alt=""
            src="https://drive.google.com/uc?export=view&id=1VskeQmRz1I9W_7qkbi6i6HJUr7V0nH1e"
            sx={{ width: 56, height: 56 }}
          />
        </Tooltip>
        <div className=" flex items-center gap-6 text-[#173B3A] ">
          <div className=" flex flex-col items-center ga-1 ">
            <h1 className=" italic font-extrabold text-lg ">
              My Score : {score}
            </h1>
          </div>
          <button
            onClick={handleExit}
            className=" border-2 border-[#173B3A] px-2 rounded-lg py-1 hover:bg-[#173B3A] hover:text-[#D9D9D9]  "
          >
            Exit Game
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
