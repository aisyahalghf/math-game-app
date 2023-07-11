import { useEffect } from "react";
import Swal from "sweetalert2";

const SelectLevelPage = () => {
  let level = "9";

  const levelPage = () => {
    Swal.fire({
      title: "Choose your level for your experiance",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#B48d75",
      denyButtonColor: "#558776",
      cancelButtonColor: "#173B3A",
      confirmButtonText: "Easy",
      denyButtonText: "Medium",
      cancelButtonText: "Hard",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        level = "easy";
      } else if (result.isDenied) {
        level = "medium";
      } else if (result.isDismissed) {
        level = "hard";
      }
    });
  };

  useEffect(() => {
    levelPage();
  }, []);

  console.log(level);

  return level;
};

export default SelectLevelPage;
