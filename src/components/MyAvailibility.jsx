// import { useEffect, useState } from "react";
import ListComponent from "./ListComponent";
const MyAvailibility = ({
  data,
  deleteItem,
  toggleDefault,
  duplicateAvailability,
}) => {
  //   const [availibilities, setAvailibilities] = useState([]);
  //   useEffect(() => {
  //     const savedData = JSON.parse(localStorage.getItem("dataList"));
  //     console.log(savedData);
  //     if (savedData) {
  //       setAvailibilities(savedData);
  //     }
  //   }, []);
  return (
    <div className="mt-10">
      <div className="border-[1px] border-[#575757] rounded-lg">
        {data.map((a) => (
          <ListComponent
            deleteItem={deleteItem}
            key={a.id}
            availibilty={a}
            toggleDefault={toggleDefault}
            duplicateAvailability={duplicateAvailability}
          />
        ))}
      </div>
      <p className="text-center text-xl my-5">
        Temporarily Out-Of-Office?{" "}
        <span className="underline cursor-pointer">Add a redirect</span>
      </p>
    </div>
  );
};

export default MyAvailibility;
