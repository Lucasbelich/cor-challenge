import React, { useState } from "react";
import "./ItemList.styles.css";

const ItemList = ({ task, onUpdateTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = async () => {
    if (!editText.trim() || editText === task.text) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdateTask(task.id, { text: editText });
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  return (
    <div className={`item-list ${task.completed ? "completed" : ""}`}>
      <div className="item-content">
        <div className="item-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id, task.completed)}
            className="task-checkbox"
          />
        </div>

        <div className="item-text">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              disabled={isUpdating}
            />
          ) : (
            <span
              className={`task-text ${task.completed ? "completed-text" : ""}`}
              onClick={handleEdit}
            >
              {task.text}
            </span>
          )}
        </div>

        <div className="item-actions">
          {!isEditing && (
            <button onClick={handleEdit} className="action-button edit-button">
              Editar
            </button>
          )}
          {isEditing && (
            <div className="edit-actions">
              <button
                onClick={handleSave}
                className="action-button save-button"
                disabled={isUpdating}
              >
                {isUpdating ? "Guardando..." : "Guardar"}
              </button>
              <button
                onClick={handleCancel}
                className="action-button cancel-button"
                disabled={isUpdating}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="item-status">
        <span
          className={`status-badge ${
            task.completed ? "completed-badge" : "pending-badge"
          }`}
        >
          {task.completed ? "Completado" : "Pendiente"}
        </span>
      </div>
    </div>
  );
};

export default ItemList;
