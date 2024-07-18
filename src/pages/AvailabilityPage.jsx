import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { FaPlus } from "react-icons/fa6";
import MyAvailibility from "../components/MyAvailibility";
import TeamAvailibilty from "../components/TeamAvailibilty";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AvailabilityPage = () => {
  const [availabilityType, setAvailabilityType] = useState("my");
  const [name, setName] = useState("");
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataList"));
    if (savedData) {
      setDataList(savedData);
    }
  }, []);
  const submitName = () => {
    const uuid = uuidv4();
    const newDataItem = {
      id: uuid,
      name: name,
      sunday: [],
      monday: [{ start: "9:00am", end: "5:00pm" }],
      tuesday: [{ start: "9:00am", end: "5:00pm" }],
      wednesday: [{ start: "9:00am", end: "5:00pm" }],
      thursday: [{ start: "9:00am", end: "5:00pm" }],
      friday: [{ start: "9:00am", end: "5:00pm" }],
      saturday: [],
      isDefault: dataList.length > 0 ? false : true,
      timezone: "Asia/Kolkata +5:30 GMT",
      overrides: [],
      message:
        "Mon 9:00am - 5:00pm Tue 9:00am - 5:00pm Wed 9:00am - 5:00pm Thu 9:00am - 5:00pm Fri 9:00am - 5:00pm",
    };
    const updatedDataList = [...dataList, newDataItem];
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    setName("");
    navigate(`/${uuid}`);
    toast(name + " schedule created successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };
  const duplicateAvailability = (id) => {
    const av = dataList.filter((a) => a.id === id);
    const uuid = uuidv4();
    const newDataItem = {
      id: uuid,
      name: `${av[0].name}(Copy)`,
      sunday: [],
      monday: [{ start: "9:00am", end: "5:00pm" }],
      tuesday: [{ start: "9:00am", end: "5:00pm" }],
      wednesday: [{ start: "9:00am", end: "5:00pm" }],
      thursday: [{ start: "9:00am", end: "5:00pm" }],
      friday: [{ start: "9:00am", end: "5:00pm" }],
      saturday: [],
      isDefault: false,
      timezone: "Asia/Kolkata +5:30 GMT",
      overrides: [],
      message:
        "Mon 9:00am - 5:00pm Tue 9:00am - 5:00pm Wed 9:00am - 5:00pm Thu 9:00am - 5:00pm Fri 9:00am - 5:00pm",
    };
    const updatedDataList = [...dataList, newDataItem];
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    setName("");
    navigate(`/${uuid}`);
    toast(`${av[0].name}(Copy)` + " schedule created successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };
  const deleteItem = (id) => {
    const updatedDataList = dataList.filter((item) => item.id !== id);
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    console.log("deleted");
    toast("Schedule deleted successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };
  const toggleDefault = (id) => {
    const updatedDataList = dataList.map((item) =>
      item.id === id
        ? { ...item, isDefault: !item.isDefault }
        : { ...item, isDefault: false }
    );
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    toast.success("Default status updated!", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="col-span-5 bg-[#1a1a1a] p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-white font-bold">Availability</h1>
            <p className="text-white text-lg">
              Configure times when you are available for bookings.
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <div className="border-[1px] border-[#575757] rounded-xl p-2 text-white flex items-center">
              <div
                className={`px-5 cursor-pointer ${
                  availabilityType === "my" && "bg-[#575757]"
                } rounded-md py-2 text-lg`}
                onClick={() => setAvailabilityType("my")}
              >
                My Availability
              </div>
              <div
                className={`px-5 cursor-pointer ${
                  availabilityType === "team" && "bg-[#575757]"
                } rounded-md py-2 text-lg`}
                onClick={() => setAvailabilityType("team")}
              >
                Team Availability
              </div>{" "}
            </div>
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="flex bg-white px-5 py-2 text-xl font-semibold items-center gap-3 rounded-lg hover:bg-[#e1e1e1]"
            >
              <FaPlus />
              <div>New</div>
            </button>
          </div>
        </div>
        <div>
          {availabilityType === "my" ? (
            <MyAvailibility
              data={dataList}
              deleteItem={deleteItem}
              toggleDefault={toggleDefault}
              duplicateAvailability={duplicateAvailability}
            />
          ) : (
            <TeamAvailibilty />
          )}
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-[#1a1a1a] max-w-2xl">
          <h3 className="font-bold text-3xl text-white mb-5">
            Add a new schedule
          </h3>
          <p className="text-xl text-white font-semibold mb-2">Name</p>
          <input
            type="text"
            placeholder="Working Hours"
            onChange={(e) => setName(e.target.value)}
            className="bg-[#1a1a1a] border-[1px] border-[#575757] py-2 px-5 text-lg rounded-lg w-full"
          />
          <div className="modal-action mt-10">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="px-6 py-3 rounded-lg hover:bg-[#575757] mr-5 text-xl text-white font-semibold">
                Close
              </button>
              <button
                onClick={submitName}
                className="bg-white rounded-lg px-6 py-3 text-xl text-black font-semibold"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AvailabilityPage;
