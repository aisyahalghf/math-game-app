import { ClassNames } from "@emotion/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ResultConfirmation = () => {
  const navigate = useNavigate();
  Swal.fire({
    title: "Good Job!",
    text: " you got score 10/10 ",
    icon: "success",
    showCancelButton: true,
    cancelButtonText: "See Leader Board",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Retry Quiz!",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("hallo");
      navigate("/quiz");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log("hore");
      navigate("/");
    }
  });
};

export default ResultConfirmation;
