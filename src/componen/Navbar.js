import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = ({ score, level, generateLevel }) => {
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

  const gameLevel = () => {
    if (level === 10) {
      return "Easy Levels";
    } else if (level === 30) {
      return "Medium Levels";
    } else if (level === 40) {
      return "Hard Levels";
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <nav className=" bg-[#D9D9D9] shadow shadow-slate-200  px-3 md:px-0 sticky top-0 z-50 w-full ">
      <div className=" container mx-auto flex justify-between items-center h-20   ">
        <Tooltip title="aisyah">
          <div className=" flex flex-col items-center gap-">
            <Avatar
              alt=""
              src="https://drive.google.com/uc?export=view&id=1VskeQmRz1I9W_7qkbi6i6HJUr7V0nH1e"
              sx={{ width: 56, height: 56 }}
            />
            <h1 className=" hidden md:visible  font-extrabold text-xs text-[#173B3A] italic ">
              {gameLevel()}
            </h1>
          </div>
        </Tooltip>
        <div className=" flex items-center gap-6 text-[#173B3A] ">
          <div className=" flex items-center gap-3 md:gap-5 ">
            <div className=" flex flex-col justify-center items-start gap-1 ">
              <h1 className=" visible md:hidden font-extrabold text-sm text-[#173B3A] md:italic ">
                {gameLevel()}
              </h1>
              <h2 className=" md:italic font-extrabold text-xs md:text-lg ">
                My Score : {score}
              </h2>
            </div>
            <div>
              <Tooltip title="Setting Game">
                <button onClick={handleClick}>
                  <SettingsIcon />
                </button>
              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className=" p-5 flex flex-col gap-2 ">
                  <button
                    onClick={generateLevel}
                    onBlur={handleClose}
                    className=" border-2 border-[#173B3A] px-2 rounded-lg py-1 hover:bg-[#173B3A] hover:text-[#D9D9D9]  "
                  >
                    Upgrade Level
                  </button>

                  <button
                    onBlur={handleClose}
                    onClick={handleExit}
                    className=" border-2 border-[#173B3A] px-2 rounded-lg py-1 hover:bg-[#173B3A] hover:text-[#D9D9D9]  "
                  >
                    Exit Game
                  </button>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
