import {Link} from "react-router-dom";

export function ReminderDialog({title, message, confirmUrl, noFunc}) {
  return (
    <div className="row">
      <div className="col">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <h4>
              {title}
            </h4>
            <h5>
              {message}
            </h5>
          </div>
          <div className="TAIL-p-2">
            <div className="TAIL-flex TAIL-justify-end TAIL-justify-between">
            <button onClick={noFunc} className="no-uppercase grey darken-1 btn-large flow-text">
              No
            </button>

            <Link to={confirmUrl}>
              <button onClick={noFunc} className="no-uppercase green lighten-2 darken-1 btn-large flow-text">
                Yes
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
