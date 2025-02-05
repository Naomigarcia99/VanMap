

const SorButton = ({ onClick, label, isActive, isAscending }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition ${
        isActive ? "font-bold bg-blue-600" : ""
      }`}
    >
      {label} {isActive ? (isAscending ? "↓" : "↑") : ""}
    </button>
  );
};

export default SorButton;
