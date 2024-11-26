const TrelloIcon = () => {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      className="w-4 h-4"
    >
      <defs>
        <linearGradient id="linearGradient-1" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop stopColor="#0079bf" offset="0%"></stop>
          <stop stopColor="#005c93" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g>
        <rect fill="url(#linearGradient-1)" x="0" y="0" width="256" height="256" rx="25"></rect>
        <rect fill="#FFFFFF" x="144.64" y="33.28" width="78.08" height="112" rx="12"></rect>
        <rect fill="#FFFFFF" x="33.28" y="33.28" width="78.08" height="176" rx="12"></rect>
      </g>
    </svg>
  );
};

export default TrelloIcon;
