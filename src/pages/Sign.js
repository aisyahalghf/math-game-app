import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import BackgroundPageWhite from "../componen/BackgroundPageWhite";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Sign = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const avatarImage = [
    "https://drive.google.com/uc?export=view&id=1kkx64Y0NC0Se2tvle8Y8FcnSNw2UweWT",
    "https://drive.google.com/uc?export=view&id=1EgvnvVUDUbI5x8SHtoGzPiQUx1yFIiPP",
    "https://drive.google.com/uc?export=view&id=1H3ppo0PZEooM8BCDbQ8UPmw0XEnjIzpn",
    "https://drive.google.com/uc?export=view&id=1gn3JvTl3TszFRnECTe89YEnzjr5JT-Ih",
    "https://drive.google.com/uc?export=view&id=1OLDmpuOp2Bi_nNluK5rmTolzvrTe9vkk",
    "https://drive.google.com/uc?export=view&id=1k8Dhs853kOYohbEAgNGElx4AGNnO3zA7",
    "https://drive.google.com/uc?export=view&id=1mURBJJmUpguyNMO-pR-QaN7qRNY8hsD6",
    "https://drive.google.com/uc?export=view&id=1XxwA--C5z4HKE_L-ixv2wMR5xCr5JceX",
    "https://drive.google.com/uc?export=view&id=1Y-eQx2p4zOpEp25TuD0FtkQY77zB_4Yu",
    "https://drive.google.com/uc?export=view&id=1VskeQmRz1I9W_7qkbi6i6HJUr7V0nH1e",
  ];

  const getWidth = () => {
    if (isMobile) {
      return { width: "230px" };
    }
    return { width: "300px" };
  };

  const handlePlayGame = async () => {
    try {
      const randomNumb = Math.round(Math.random() * 10);
      let timerInterval;
      let avatar = avatarImage[randomNumb];

      const ref = await addDoc(collection(db, "user"), {
        name: username,
        avatar,
      });
      let id = ref?.id;
      localStorage.setItem("my_Token", id);

      Swal.fire({
        title: "Please wait...",
        html: "your account wiil create after <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire({
            title: `Hooray! `,
            text: "Your account has been created",
            imageUrl: avatar,
            confirmButtonColor: "#173B3A",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
            showDenyButton: true,
            denyButtonText: `Back to Home`,
            confirmButtonText: "Play Game",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/quiz");
            } else if (result.isDenied) {
              navigate("/");
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidate = () => {
    const pattern = /^(?=.*[^\s])[a-zA-Z0-9\s]+$/;
    if (!pattern.test(username)) {
      setErrorMessage("Invalid username");
    } else {
      setErrorMessage("");
    }
  };

  const error = () => {
    if (errorMessage) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="relative bg-[white] h-screen md:h-screen flex justify-center items-center">
      <BackgroundPageWhite />
      <div className=" relative flex-col gap-4 shadow shadow-[#173B3A] border-2 border-[#173B3A] h-fit py-10 px-10 md:px-20 md:py-20 rounded-lg md:mx-0  ">
        <div>
          <TextField
            sx={getWidth()}
            error={error()}
            color="success"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleValidate}
            helperText={errorMessage}
          />
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <Link to={"/"}>
            <Button variant="contained" color="error" size="large">
              Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handlePlayGame}
            disabled={errorMessage || !username}
          >
            Play Game
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Sign;
