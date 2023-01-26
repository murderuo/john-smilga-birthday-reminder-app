import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../ModalWindow';
import {
  clearAllUsers,
  deleteUser,
  doneUser,
  unDoneUser,
} from '../redux/userSlice';

function Main() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleDoneUser = id => {
    dispatch(doneUser(id));
  };

  const handleUnDoneUser = id => {
    dispatch(unDoneUser(id));
  };

  const handleDeleteUser = id => {
    dispatch(deleteUser(id));
  };

  const handleClear = () => {
    dispatch(clearAllUsers());
  };
  return (
    <>
      <div className="container position-relative  ">
        <div
          className={`portal position-absolute ${isOpen ? 'getfront' : ''}`}
          id="portal"
        ></div>
        <div className="row">
          <div className="col-lg-5 col-sm-7  mx-auto border rounded bg-light shadow">
            <div
              className={`d-flex flex-column mx-0 ${isOpen ? 'bg-blur' : ''} `}
            >
              <div className="p-3 mx-auto fs-3 nunito-semibold">
                {users.length} Person's Birthday today
              </div>
              {users.map(person => (
                <div
                  className="d-flex align-items-center p-3 col-sm-12 "
                  key={person.id}
                >
                  <div className="">
                    <img
                      src={person.image}
                      className="img-fluid imges rounded-circle"
                    />
                  </div>
                  <div className="d-flex flex-column ms-3">
                    <span
                      className={`nunito-semi-b-italic ${
                        person.done ? 'text-underline' : ''
                      }`}
                    >
                      {person.name}
                    </span>
                    <span className={`${person.done ? 'text-underline' : ''}`}>
                      {person.age}
                    </span>
                    <span>{person.done}</span>
                  </div>
                  <div className="ms-auto">
                    <button
                      className="btn btn-success"
                      onClick={() => handleDoneUser(person.id)}
                      disabled={person.done}
                    >
                      Done
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUnDoneUser(person.id)}
                      disabled={!person.done}
                    >
                      UnDone
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(person.id)}
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-evenly mx-auto my-3 w-100">
                <button className="btn btn-danger" onClick={handleClear}>
                  clear all
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => setIsOpen(true)}
                >
                  Add new people
                </button>
              </div>
              <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
