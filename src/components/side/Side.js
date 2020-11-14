import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../context/main-context";
import "./Side.css";

const Side = () => {
  const mainContextValue = useContext(MainContext);
  
  return (
    <div className="side">
      {/* <div className="side-content"> */}
      <header>
        <Link to="/" className="logo-div">
          <img src="./assets/logo.jpg" alt="logo" />
        </Link>
        <h1>OPER DASHBOARD</h1>
      </header>
      <div className="errors-logged">
        <div>
          <div>
            <h4>Total Errors</h4>
          </div>
          <div>{mainContextValue.errors.length > 0 ? mainContextValue.errors.length : 0}</div>
          <div className="dwnld-div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              id="vector"
              onClick = {mainContextValue.handleCsvDownloadButton}
            >
              <g id="group">
                <path
                  id="path"
                  d="M 255.13 385.54 C 253.026 385.534 250.947 385.086 249.028 384.225 C 247.109 383.363 245.392 382.108 243.99 380.54 L 103.67 224.93 C 101.086 222.041 99.72 218.26 99.86 214.387 C 100 210.513 101.637 206.841 104.423 204.147 C 107.209 201.453 110.934 199.94 114.81 199.93 L 171 199.93 L 171 63 C 171 59.023 172.581 55.205 175.393 52.393 C 178.205 49.581 182.023 48 186 48 L 324.3 48 C 328.277 48 332.095 49.581 334.907 52.393 C 337.719 55.205 339.3 59.023 339.3 63 L 339.3 199.89 L 395.46 199.89 C 399.336 199.9 403.061 201.413 405.847 204.107 C 408.633 206.801 410.27 210.473 410.41 214.347 C 410.55 218.22 409.184 222.001 406.6 224.89 L 266.27 380.58 C 264.864 382.141 263.146 383.389 261.227 384.243 C 259.308 385.098 257.231 385.539 255.13 385.54 Z M 148.53 229.89 L 255.13 348.14 L 361.74 229.89 L 324.3 229.89 C 320.323 229.89 316.505 228.309 313.693 225.497 C 310.881 222.685 309.3 218.867 309.3 214.89 L 309.3 78 L 201 78 L 201 214.89 C 201 218.867 199.419 222.685 196.607 225.497 C 193.795 228.309 189.977 229.89 186 229.89 Z"
                  fill="#2699FB"
                  strokeWidth="1"
                />
                <path
                  id="path_1"
                  d="M 390.84 450 L 119.43 450 C 102.125 449.981 85.517 443.092 73.28 430.857 C 61.043 418.622 54.151 402.015 54.13 384.71 L 54.13 346.54 C 54.13 342.563 55.711 338.745 58.523 335.933 C 61.335 333.121 65.153 331.54 69.13 331.54 C 73.107 331.54 76.925 333.121 79.737 335.933 C 82.549 338.745 84.13 342.563 84.13 346.54 L 84.13 384.71 C 84.143 394.064 87.869 403.04 94.484 409.653 C 101.099 416.266 110.076 419.989 119.43 420 L 390.84 420 C 400.193 419.989 409.169 416.265 415.782 409.652 C 422.395 403.039 426.119 394.063 426.13 384.71 L 426.13 346.54 C 426.13 342.563 427.711 338.745 430.523 335.933 C 433.335 333.121 437.153 331.54 441.13 331.54 C 445.107 331.54 448.925 333.121 451.737 335.933 C 454.549 338.745 456.13 342.563 456.13 346.54 L 456.13 384.71 C 456.109 402.013 449.219 418.619 436.984 430.854 C 424.749 443.089 408.143 449.979 390.84 450 Z"
                  fill="#2699FB"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </div>
        </div>
        <div>
          <div>
            <h4>Poller Errors</h4>
          </div>
          <div>{mainContextValue.pollerErrors > 0 ? mainContextValue.pollerErrors : 0}</div>
        </div>
        <div>
          <div>
            <h4>Task Errors</h4>
          </div>
          <div>{mainContextValue.taskErrors > 0 ? mainContextValue.taskErrors : 0}</div>
        </div>
      </div>
      <footer>
        <h1>© Michael Anokye</h1>
      </footer>
      {/* </div> */}
    </div>
  );
};

export default Side;
