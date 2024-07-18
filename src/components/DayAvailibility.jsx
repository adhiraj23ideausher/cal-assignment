import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { useParams } from "react-router-dom";
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

const DayAvailability = () => {
  const [data, setData] = useState([]);
  // const [availability, setAvailability] = useState({});
  const { id } = useParams();
  const [monday, setMonday] = useState([]);

  const [sunday, setSunday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);

  const [sundayStart, setSundayStart] = useState("");
  const [sundayEnd, setSundayEnd] = useState("");
  const [mondayStart, setMondayStart] = useState("");
  const [mondayEnd, setMondayEnd] = useState("");
  const [tuesdayStart, setTuesdayStart] = useState("");
  const [tuesdayEnd, setTuesdayEnd] = useState("");
  const [wednesdayStart, setWednesdayStart] = useState("");
  const [wednesdayEnd, setWednesdayEnd] = useState("");
  const [thursdayStart, setThursdayStart] = useState("");
  const [thursdayEnd, setThursdayEnd] = useState("");
  const [fridayStart, setFridayStart] = useState("");
  const [fridayEnd, setFridayEnd] = useState("");
  const [saturdayStart, setSaturdayStart] = useState("");
  const [saturdayEnd, setSaturdayEnd] = useState("");

  const [sundayEnabled, setSundayEnabled] = useState(true);
  const [mondayEnabled, setMondayEnabled] = useState(true);
  const [tuesdayEnabled, setTuesdayEnabled] = useState(true);
  const [wednesdayEnabled, setWednesdayEnabled] = useState(true);
  const [thursdayEnabled, setThursdayEnabled] = useState(true);
  const [fridayEnabled, setFridayEnabled] = useState(true);
  const [saturdayEnabled, setSaturdayEnabled] = useState(true);

  const syncMessage = () => {
    const newData = [...data];
    const targetAvailability = newData.find((a) => a.id === id);
    if (targetAvailability) {
      const monMessage =
        monday.length > 0 ? `Mon ${monday[0].start} - ${monday[0].end} ` : "";
      const tueMessage =
        tuesday.length > 0
          ? `Tue ${tuesday[0].start} - ${tuesday[0].end} `
          : "";
      const wedMessage =
        wednesday.length > 0
          ? `Wed ${wednesday[0].start} - ${wednesday[0].end} `
          : "";
      const thuMessage =
        thursday.length > 0
          ? `Thu ${thursday[0].start} - ${thursday[0].end} `
          : "";
      const friMessage =
        friday.length > 0 ? `Fri ${friday[0].start} - ${friday[0].end} ` : "";
      const satMessage =
        saturday.length > 0
          ? `Sat ${saturday[0].start} - ${saturday[0].end} `
          : "";
      const sunMessage =
        sunday.length > 0 ? `Sun ${sunday[0].start} - ${sunday[0].end} ` : "";

      const message =
        monMessage +
        tueMessage +
        wedMessage +
        thuMessage +
        friMessage +
        satMessage +
        sunMessage;
      targetAvailability.message = message;
      setData(newData);
      localStorage.setItem("dataList", JSON.stringify(newData));
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataList"));
    setData(storedData || []);
    const availability = storedData.find((item) => item.id === id);
    console.log(availability);
    setSunday(availability.sunday);
    setMonday(availability.monday);
    setTuesday(availability.tuesday);
    setWednesday(availability.wednesday);
    setThursday(availability.thursday);
    setFriday(availability.friday);
    setSaturday(availability.saturday);

    // setAvailability(availability);
    if (availability) {
      setSundayEnabled(availability.sunday.length > 0);
      setMondayEnabled(availability.monday.length > 0);
      setTuesdayEnabled(availability.tuesday.length > 0);
      setWednesdayEnabled(availability.wednesday.length > 0);
      setThursdayEnabled(availability.thursday.length > 0);
      setFridayEnabled(availability.friday.length > 0);
      setSaturdayEnabled(availability.saturday.length > 0);
    }
  }, []);

  const handleTimeChange = (day, start, end) => {
    if (times.indexOf(end) > times.indexOf(start)) {
      const newData = [...data];
      const targetAvailability = newData.find((a) => a.id === id);
      if (targetAvailability) {
        targetAvailability[day][0] = { start, end };
        setData(newData);
        localStorage.setItem("dataList", JSON.stringify(newData));
      }
      syncMessage();
    } else {
      alert("End time must be after start time");
    }
  };

  const handleToggleChange = (day, enabled) => {
    const newData = [...data];
    const targetAvailability = newData.find((a) => a.id === id);
    if (targetAvailability) {
      targetAvailability[day] = enabled ? [] : [];
      setData(newData);
      localStorage.setItem("dataList", JSON.stringify(newData));
    }
    syncMessage();
  };

  useEffect(() => {
    if (sundayStart && sundayEnd) {
      handleTimeChange("sunday", sundayStart, sundayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [sundayEnd]);

  useEffect(() => {
    if (mondayStart && mondayEnd) {
      handleTimeChange("monday", mondayStart, mondayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [mondayEnd]);

  useEffect(() => {
    if (tuesdayStart && tuesdayEnd) {
      handleTimeChange("tuesday", tuesdayStart, tuesdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [tuesdayEnd]);

  useEffect(() => {
    if (wednesdayStart && wednesdayEnd) {
      handleTimeChange("wednesday", wednesdayStart, wednesdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [wednesdayEnd]);

  useEffect(() => {
    if (thursdayStart && thursdayEnd) {
      handleTimeChange("thursday", thursdayStart, thursdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [thursdayEnd]);

  useEffect(() => {
    if (fridayStart && fridayEnd) {
      handleTimeChange("friday", fridayStart, fridayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [fridayEnd]);

  useEffect(() => {
    if (saturdayStart && saturdayEnd) {
      handleTimeChange("saturday", saturdayStart, saturdayEnd);
      toast.success("Schedule updated successfully", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
        },
      });
    }
    syncMessage();
  }, [saturdayEnd]);
  useEffect(() => {
    handleToggleChange("sunday", sundayEnabled);
    syncMessage();
  }, [sundayEnabled]);

  useEffect(() => {
    handleToggleChange("monday", mondayEnabled);
    syncMessage();
  }, [mondayEnabled]);

  useEffect(() => {
    handleToggleChange("tuesday", tuesdayEnabled);
    syncMessage();
  }, [tuesdayEnabled]);

  useEffect(() => {
    handleToggleChange("wednesday", wednesdayEnabled);
    syncMessage();
  }, [wednesdayEnabled]);

  useEffect(() => {
    handleToggleChange("thursday", thursdayEnabled);
    syncMessage();
  }, [thursdayEnabled]);

  useEffect(() => {
    handleToggleChange("friday", fridayEnabled);
    syncMessage();
  }, [fridayEnabled]);

  useEffect(() => {
    handleToggleChange("saturday", saturdayEnabled);
    syncMessage();
  }, [saturdayEnabled]);
  return (
    <div className="border-[1px] border-[#575757] rounded-lg px-5 py-7 flex flex-col gap-5">
      <div className="grid grid-cols-7">
        <div className="col-span-2 flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            checked={sundayEnabled}
            onChange={(e) => setSundayEnabled(e.target.checked)}
          />
          <p className="text-xl"> Sunday</p>
        </div>
        {sundayEnabled && (
          <div className="col-span-3 flex gap-5 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={sundayStart}
              onChange={(e) => setSundayStart(e.target.value)}
            >
              <option value="" disabled>
                {sunday[0]?.start}
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
              value={sundayEnd}
              onChange={(e) => setSundayEnd(e.target.value)}
            >
              <option value="" disabled>
                {sunday[0]?.end}
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        {sundayEnabled && (
          <div className="col-span-2 flex gap-5 items-center justify-evenly">
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <FaPlus />
            </div>
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <LuCopy />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-2 flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            checked={mondayEnabled}
            onChange={(e) => setMondayEnabled(e.target.checked)}
          />
          <p className="text-xl"> Monday</p>
        </div>
        {mondayEnabled && (
          <div className="col-span-3 flex gap-5 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={mondayStart}
              onChange={(e) => setMondayStart(e.target.value)}
            >
              <option value="" disabled>
                {monday[0]?.start}
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
              value={mondayEnd}
              onChange={(e) => setMondayEnd(e.target.value)}
            >
              <option value="" disabled>
                {monday[0]?.end}
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        {mondayEnabled && (
          <div className="col-span-2 flex gap-5 items-center justify-evenly">
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <FaPlus />
            </div>
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <LuCopy />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-2 flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            checked={tuesdayEnabled}
            onChange={(e) => setTuesdayEnabled(e.target.checked)}
          />
          <p className="text-xl"> Tuesday</p>
        </div>
        {tuesdayEnabled && (
          <div className="col-span-3 flex gap-5 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={tuesdayStart}
              onChange={(e) => setTuesdayStart(e.target.value)}
            >
              <option value="" disabled>
                {tuesday[0]?.start}
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
              value={tuesdayEnd}
              onChange={(e) => setTuesdayEnd(e.target.value)}
            >
              <option value="" disabled>
                {tuesday[0]?.end}
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        {tuesdayEnabled && (
          <div className="col-span-2 flex gap-5 items-center justify-evenly">
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <FaPlus />
            </div>
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <LuCopy />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-2 flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            checked={wednesdayEnabled}
            onChange={(e) => setWednesdayEnabled(e.target.checked)}
          />
          <p className="text-xl"> Wednesday</p>
        </div>
        {wednesdayEnabled && (
          <div className="col-span-3 flex gap-5 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={wednesdayStart}
              onChange={(e) => setWednesdayStart(e.target.value)}
            >
              <option value="" disabled>
                {wednesday[0]?.start}
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
              value={wednesdayEnd}
              onChange={(e) => setWednesdayEnd(e.target.value)}
            >
              <option value="" disabled>
                {wednesday[0]?.end}
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        {wednesdayEnabled && (
          <div className="col-span-2 flex gap-5 items-center justify-evenly">
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <FaPlus />
            </div>
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <LuCopy />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-2 flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            checked={thursdayEnabled}
            onChange={(e) => setThursdayEnabled(e.target.checked)}
          />
          <p className="text-xl"> Thursday</p>
        </div>
        {thursdayEnabled && (
          <div className="col-span-3 flex gap-5 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={thursdayStart}
              onChange={(e) => setThursdayStart(e.target.value)}
            >
              <option value="" disabled>
                {thursday[0]?.start}
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
              value={thursdayEnd}
              onChange={(e) => setThursdayEnd(e.target.value)}
            >
              <option value="" disabled>
                {thursday[0]?.end}
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        {thursdayEnabled && (
          <div className="col-span-2 flex gap-5 items-center justify-evenly">
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <FaPlus />
            </div>
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <LuCopy />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-2 flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            checked={fridayEnabled}
            onChange={(e) => setFridayEnabled(e.target.checked)}
          />
          <p className="text-xl"> Friday</p>
        </div>
        {fridayEnabled && (
          <div className="col-span-3 flex gap-5 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={fridayStart}
              onChange={(e) => setFridayStart(e.target.value)}
            >
              <option value="" disabled>
                {friday[0]?.start}
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
              value={fridayEnd}
              onChange={(e) => setFridayEnd(e.target.value)}
            >
              <option value="" disabled>
                {friday[0]?.end}
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        {fridayEnabled && (
          <div className="col-span-2 flex gap-5 items-center justify-evenly">
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <FaPlus />
            </div>
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <LuCopy />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-2 flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            checked={saturdayEnabled}
            onChange={(e) => setSaturdayEnabled(e.target.checked)}
          />
          <p className="text-xl"> Saturday</p>
        </div>
        {saturdayEnabled && (
          <div className="col-span-3 flex gap-5 items-center">
            <select
              className="select select-bordered w-full max-w-xs"
              value={saturdayStart}
              onChange={(e) => setSaturdayStart(e.target.value)}
            >
              <option value="" disabled>
                {saturday[0]?.start}
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
              value={saturdayEnd}
              onChange={(e) => setSaturdayEnd(e.target.value)}
            >
              <option value="" disabled>
                {saturday[0]?.end}
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
        {saturdayEnabled && (
          <div className="col-span-2 flex gap-5 items-center justify-evenly">
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <FaPlus />
            </div>
            <div className="text-2xl cursor-pointer hover:bg-[#575757] p-2 rounded-lg">
              <LuCopy />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayAvailability;
