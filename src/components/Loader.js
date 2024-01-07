export function Loader() {
  const svgStyle = {
    margin: 'auto',
    display: 'block',
    shapeRendering: 'auto',
    width: '100px',
    height: '100px'
  };

  return (
    <p className="loader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={svgStyle}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="rotate(0 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.6501182033096926s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(30 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.5910165484633569s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(60 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.5319148936170213s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(90 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.47281323877068554s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(120 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.4137115839243498s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(150 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.35460992907801414s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(180 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.29550827423167847s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(210 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.23640661938534277s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(240 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.17730496453900707s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(270 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.11820330969267138s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(300 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="-0.05910165484633569s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(330 50 50)">
          <rect x="46" y="26" rx="4" ry="4" width="8" height="8" fill="#ffffff">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7092198581560283s" begin="0s" repeatCount="indefinite"></animate>
          </rect>
        </g>
      </svg>
    </p>
  );
}
