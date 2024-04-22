import {Link} from "react-router-dom";

export function ReminderDialog({title, message, confirmUrl, noFunc}) {
  return (
    <div className="row">
      <div className="col">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{title}</span>
            <p>
              {message}
            </p>
          </div>
          <div className="card-action">
            <div className="TAIL-flex TAIL-justify-end">
            <p onClick={noFunc}>No</p>
            <Link to={confirmUrl}>
              <p>Yes</p>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
