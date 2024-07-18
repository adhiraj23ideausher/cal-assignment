import { CiGlobe } from "react-icons/ci";
import { extractTimezoneText } from "../utils/helper";
import { BsThreeDots } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ListComponent = ({
  availibilty,
  deleteItem,
  toggleDefault,
  duplicateAvailability,
}) => {
  const navigate = useNavigate();
  return (
    // <Link to={`${availibilty.id}`}>
    <div
      className="border-b-[1px] border-[#575757]  cursor-pointer"
      onClick={() => navigate(`${availibilty.id}`)}
    >
      <div className="flex items-center justify-between p-6 hover:bg-[#1f1f1f]">
        <div className="flex flex-col gap-2">
          <p>
            <span className="text-white font-semibold text-xl mr-3">
              {" "}
              {availibilty.name}
            </span>
            {availibilty.isDefault && (
              <span className="bg-green-700 text-green-100 text-md py-1 px-3 rounded-md font-semibold">
                Default
              </span>
            )}
          </p>
          <p className="flex gap-3 items-center text-xl">
            {availibilty?.message}
          </p>
          <p className="flex gap-3 items-center text-xl">
            <CiGlobe /> {extractTimezoneText(availibilty.timezone)}
          </p>
        </div>
        {/* <div className="border-[1px] border-[#575757] p-2 rounded-lg hover:bg-[#1f1f1f]">
          <BsThreeDots className="text-white text-xl" />
        </div> */}
        <details
          className="dropdown dropdown-end"
          onClick={(e) => e.stopPropagation()}
        >
          <summary className="btn border-[1px] border-[#575757] py-2 rounded-lg hover:bg-[#1f1f1f]">
            <BsThreeDots className="text-white text-xl" />
          </summary>
          <ul
            className="menu dropdown-content bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
            onClick={(e) => e.stopPropagation()}
          >
            {!availibilty.isDefault && (
              <li onClick={() => toggleDefault(availibilty.id)}>
                <a className="text-lg">
                  <FaRegStar />
                  Set as default
                </a>
              </li>
            )}

            <li>
              <a
                className="text-lg"
                onClick={() => duplicateAvailability(availibilty.id)}
              >
                <MdContentCopy />
                Duplicate
              </a>
            </li>
            <li onClick={() => deleteItem(availibilty.id)}>
              <a className="text-lg">
                <MdDeleteOutline />
                Delete
              </a>
            </li>
          </ul>
        </details>
      </div>
    </div>
    // </Link>
  );
};

export default ListComponent;
