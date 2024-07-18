import SideBar from "../components/SideBar";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import DayAvailibility from "../components/DayAvailibility";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import Overrides from "../components/Overrides";
import { MdOutlineInfo } from "react-icons/md";

const timezoneOptions = [
  "Pacific/Midway -11:00 GMT",
  "Pacific/Pago_Pago -11:00 GMT",
  "Pacific/Honolulu -10:00 GMT",
  "America/Anchorage -9:00 GMT",
  "America/Los_Angeles -8:00 GMT",
  "America/Denver -7:00 GMT",
  "America/Chicago -6:00 GMT",
  "America/New_York -5:00 GMT",
  "America/Halifax -4:00 GMT",
  "America/Sao_Paulo -3:00 GMT",
  "Atlantic/South_Georgia -2:00 GMT",
  "Atlantic/Azores -1:00 GMT",
  "Europe/London +0:00 GMT",
  "Europe/Paris +1:00 GMT",
  "Europe/Athens +2:00 GMT",
  "Europe/Moscow +3:00 GMT",
  "Asia/Dubai +4:00 GMT",
  "Asia/Kolkata +5:30 GMT",
  "Asia/Bangkok +7:00 GMT",
  "Asia/Hong_Kong +8:00 GMT",
  "Asia/Tokyo +9:00 GMT",
  "Australia/Sydney +10:00 GMT",
  "Pacific/Noumea +11:00 GMT",
  "Pacific/Fiji +12:00 GMT",
  "Pacific/Tongatapu +13:00 GMT",
];

const SingleAvailability = () => {
  const { id } = useParams();
  const [availability, setAvailability] = useState(null);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  const [selectedTimezone, setSelectedTimezone] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataList"));
    if (savedData) {
      setDataList(savedData);
    }
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataList"));
    if (savedData) {
      const item = savedData.find((item) => item.id === id);
      setAvailability(item);
    }
  }, [id]);

  const handleTimezoneChange = (event) => {
    const newTimezone = event.target.value;
    const updatedDataList = dataList.map((item) =>
      item.id === availability.id ? { ...item, timezone: newTimezone } : item
    );
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    setSelectedTimezone(newTimezone);
    toast.success("Schedule updated successfully", {
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

  const deleteAvailability = (id) => {
    const updatedDataList = dataList.filter((item) => item.id !== id);
    setDataList(updatedDataList);
    localStorage.setItem("dataList", JSON.stringify(updatedDataList));
    toast.success("Availability deleted successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
    navigate("/");
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataList"));
    if (savedData) {
      const item = savedData.find((item) => item.id == id);
      setAvailability(item);
    }
  }, [id]);

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="col-span-5 bg-[#1a1a1a] text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="hover:bg-[#575757] p-2 rounded-lg cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FaArrowLeft />
            </div>
            <div>
              <p className="text-3xl font-semibold">{availability?.name}</p>
              <p className="text-[#575757] font-semibold text-lg w-4/5">
                {availability?.message}
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="flex gap-3">
              <p className="text-xl font-semibold">Set to Default</p>
              <input
                type="checkbox"
                className="toggle"
                defaultChecked={availability?.isDefault}
                onChange={() => toggleDefault(availability?.id)}
              />
            </div>
            <div className="border-r-[3px] h-5 border-[#575757]"></div>
            <div
              className="border-[1px] border-[#575757] rounded-lg p-2 text-3xl cursor-pointer hover:bg-red-900"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              <MdDeleteOutline />
            </div>
            <div className="border-r-[3px] h-5 border-[#575757]"></div>
            <div>
              <button
                onClick={() => {
                  toast.success("Schedule updated successfully", {
                    position: "bottom-center",
                    style: {
                      borderRadius: "10px",
                    },
                  });
                }}
                className="flex bg-white px-5 py-2 text-xl font-semibold items-center gap-3 rounded-lg hover:bg-[#e1e1e1] text-[#1a1a1a]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 mt-10">
          <div className="col-span-3 p-5">
            <DayAvailibility />
            <Overrides availability={availability} />
          </div>
          <div className="col-span-2 p-5">
            <div>
              <p className="text-xl font-semibold">Timezone</p>
              <select
                className="select select-bordered w-full max-w-xs mt-5"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
              >
                <option value={availability?.timezone}>
                  {availability?.timezone}
                </option>
                {timezoneOptions.map((timezone, index) => (
                  <option key={index} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-b-2 border-[#575757] my-10 w-4/6"></div>
            <div>
              <p className="text-xl font-semibold">
                Something doesn{"'"}t look right?
              </p>
              <button className="border-[1px] border-[#575757] rounded-lg px-5 py-2 text-xl hover:bg-[#3a2525] mt-5">
                Launch Troubleshooter
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <div className="grid grid-cols-8 justify-center">
            <div className="col-span-1">
              <div className="bg-red-600 w-fit text-4xl p-3 text-white rounded-full">
                <MdOutlineInfo />
              </div>
            </div>
            <div className="col-span-7">
              <p className="font-semibold text-3xl text-white">
                Delete schedule
              </p>
              <p className="text-white">
                Deleting a schedule will remove it from all event types. This
                action cannot be undone.
              </p>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>

              <button
                className="bg-white p-2 rounded-lg text-black ml-5"
                onClick={() => deleteAvailability(availability?.id)}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SingleAvailability;
