import { motion } from "framer-motion";

export default function Task({ 
  task, 
  onRename, 
  onDelete, 
  onCheck, 
  constraintRef 
}) {
  return (
    <motion.li
      drag="y"
      dragMomentum={false}
      dragConstraints={constraintRef}
      dragElastic={0}
      className="list-group-item"
    >
      <div className="dropdown" style={{ display: "inline" }}>
        <button
          className="btn btn-light me-3"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-ellipsis" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#" onClick={onRename}>
              Rename
            </a>
          </li>
          <li>
            <a className="dropdown-item text-danger" href="#" onClick={onDelete}>
              Delete
            </a>
          </li>
        </ul>
      </div>
      {task.title}
      <input
        className="form-check-input ms-3 float-end"
        type="checkbox"
        defaultChecked={task.status}
        onChange={onCheck}
      />
    </motion.li>
  );
}
