export function ReminderDialog({
  title,
  message,
  noFunc,
  confirmFunc,
  confirmBtnText = "",
  onlyConfirm = false,
}) {

  const confirnText = confirmBtnText !== "" ? confirmBtnText : "Yes";

  return (
    <div className="row">
      <div className="col">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <h4>{title}</h4>
            <h5>{message}</h5>
          </div>
          <div className="TAIL-p-2">
            
              {onlyConfirm === false && (
                <>
                <div className="TAIL-flex TAIL-justify-end TAIL-justify-between">
                  <button
                    onClick={noFunc}
                    className="no-uppercase grey darken-1 btn-large flow-text"
                  >
                    No
                  </button>

                  <button
                    onClick={confirmFunc}
                    className="no-uppercase green lighten-2 darken-1 btn-large flow-text"
                  >
                    {confirnText}
                  </button>
                  </div>
                </>
              )}
              {onlyConfirm  && (
                <>
                <div className="TAIL-flex TAIL-justify-center">
                  <button
                    onClick={confirmFunc}
                    className="no-uppercase green lighten-2 darken-1 btn-large flow-text"
                  >
                    {confirnText}
                  </button>
                  </div>
                </>
              )}

          </div>
        </div>
      </div>
    </div>
  );
}
