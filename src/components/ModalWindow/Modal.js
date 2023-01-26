import { v4 } from 'uuid';

import { useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';

function Modal({ isOpen, setIsOpen }) {
  const [values, setValues] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      id: '',
      name: '',
      age: '',
    },
  );
  const dispatch = useDispatch();

  const handleAddUser = e => {
    e.preventDefault();
    dispatch(addUser({ ...values, id: v4().slice(0, 3) }));
    setIsOpen(false);
    setValues({ id: '', name: '', age: '' });
  };

  if (!isOpen) {
    return null;
  }
  return createPortal(
    <>
      <div className={`border bg-info `}>
        <div className="d-flex flex-column p-3 ">
          <form onSubmit={handleAddUser}>
            <div className="d-flex justify-content-between">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={e => setValues({ [e.target.name]: e.target.value })}
                required
              />
            </div>
            <div className="d-flex justify-content-between mt-2">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                name="age"
                id="age"
                value={values.age}
                onChange={e => setValues({ [e.target.name]: e.target.value })}
                required
              />
            </div>
            <div className="d-flex justify-content-evenly mt-3">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal'),
  );
}

export default Modal;
