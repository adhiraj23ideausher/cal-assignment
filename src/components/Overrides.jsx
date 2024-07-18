import { MdInfoOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";
const times = [
  "12:00am",
  "12:15am",
  "12:30am",
  "12:45am",
  "1:00am",
  "1:15am",
  "1:30am",
  "1:45am",
  "2:00am",
  "2:15am",
  "2:30am",
  "2:45am",
  "3:00am",
  "3:15am",
  "3:30am",
  "3:45am",
  "4:00am",
  "4:15am",
  "4:30am",
  "4:45am",
  "5:00am",
  "5:15am",
  "5:30am",
  "5:45am",
  "6:00am",
  "6:15am",
  "6:30am",
  "6:45am",
  "7:00am",
  "7:15am",
  "7:30am",
  "7:45am",
  "8:00am",
  "8:15am",
  "8:30am",
  "8:45am",
  "9:00am",
  "9:15am",
  "9:30am",
  "9:45am",
  "10:00am",
  "10:15am",
  "10:30am",
  "10:45am",
  "11:00am",
  "11:15am",
  "11:30am",
  "11:45am",
  "12:00pm",
  "12:15pm",
  "12:30pm",
  "12:45pm",
  "1:00pm",
  "1:15pm",
  "1:30pm",
  "1:45pm",
  "2:00pm",
  "2:15pm",
  "2:30pm",
  "2:45pm",
  "3:00pm",
  "3:15pm",
  "3:30pm",
  "3:45pm",
  "4:00pm",
  "4:15pm",
  "4:30pm",
  "4:45pm",
  "5:00pm",
  "5:15pm",
  "5:30pm",
  "5:45pm",
  "6:00pm",
  "6:15pm",
  "6:30pm",
  "6:45pm",
  "7:00pm",
  "7:15pm",
  "7:30pm",
  "7:45pm",
  "8:00pm",
  "8:15pm",
  "8:30pm",
  "8:45pm",
  "9:00pm",
  "9:15pm",
  "9:30pm",
  "9:45pm",
  "10:00pm",
  "10:15pm",
  "10:30pm",
  "10:45pm",
  "11:00pm",
  "11:15pm",
  "11:30pm",
  "11:45pm",
  "11:59pm",
];

const Overrides = ({ availability }) => {
  const [value, setValue] = useState(null);
  const [startTime, setStartTime] = useState("12:00am");
  const [endTime, setEndTime] = useState("5:00pm");
  const [data, setData] = useState({});
  const [overrides, setOverrides] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataList"));
    console.log(data);
    if (storedData) {
      const av = storedData.find((a) => a.id === availability?.id);
      if (av) {
        setData(av);
        setOverrides(av.overrides || []);
      }
    }
  }, [availability]);

  const addOverride = () => {
    const newOverride = {
      start: startTime,
      end: endTime,
      date: `${new Date(value).toLocaleDateString("en-US", {
        weekday: "long",
      })}, ${new Date(value).toLocaleString("default", {
        month: "long",
      })} ${new Date(value).getDate()}`,
    };

    const updatedOverrides = [...overrides, newOverride];
    setOverrides(updatedOverrides);

    const savedData = JSON.parse(localStorage.getItem("dataList"));
    const updatedData = savedData.map((a) =>
      a.id === availability.id ? { ...a, overrides: updatedOverrides } : a
    );
    localStorage.setItem("dataList", JSON.stringify(updatedData));
    toast.success("Schedule updated successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };

  const deleteOverride = (index) => {
    const updatedOverrides = overrides.filter((_, i) => i !== index);
    setOverrides(updatedOverrides);

    const savedData = JSON.parse(localStorage.getItem("dataList"));
    const updatedData = savedData.map((a) =>
      a.id === availability.id ? { ...a, overrides: updatedOverrides } : a
    );
    localStorage.setItem("dataList", JSON.stringify(updatedData));
    toast.success("Schedule updated successfully", {
      position: "bottom-center",
      style: {
        borderRadius: "10px",
      },
    });
  };

  return (
    <div className="p-10">
      <p className="flex items-center text-2xl font-semibold gap-3">
        Date overrides <MdInfoOutline />
      </p>
      <p className="text-lg text-[#575757]">
        Add dates when your availability changes from your daily hours.
      </p>
      <div className="flex flex-col gap-2">
        {overrides.map((o, index) => (
          <div
            className="border-[1px] border-[#575757] rounded-md p-3 flex justify-between"
            key={index}
          >
            <div>
              <p className="text-lg">{o.date}</p>
              <p className="text-[#575757]">
                {o.start} - {o.end}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div
                className="text-xl border-[1px] border-[#575757] p-2 rounded-lg hover:bg-[#1e1e1e] cursor-pointer"
                onClick={() => deleteOverride(index)}
              >
                <RiDeleteBinLine />
              </div>
              <div className="text-xl cursor-pointer">
                <MdOutlineEdit />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className="flex items-center gap-3 px-3 py-2 border-[1px] border-[#575757] text-xl rounded-md mt-5 hover:bg-[#1e1e1e]"
      >
        <FaPlus />
        Add an override
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-5xl grid grid-cols-2">
          <div className="col-span-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                style={{
                  width: "100%",
                  fontSize: 20,
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="col-span-1">
            <p className="text-white text-xl mb-3">Which hours are you free?</p>
            <div className="col-span-3 flex gap-5 items-center">
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option value="" disabled>
                  Select start time
                </option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div>-</div>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setEndTime(e.target.value)}
              >
                <option value="" disabled>
                  Select end time
                </option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
                <button
                  type="button"
                  onClick={addOverride}
                  className="bg-white p-2 ml-3 rounded-lg text-black font-semibold"
                >
                  Add override
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Overrides;
