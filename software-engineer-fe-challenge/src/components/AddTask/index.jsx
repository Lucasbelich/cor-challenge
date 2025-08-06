import React, { useState } from "react";
import "./AddTask.styles.css";

const AddTask = ({ onAddTask, loading }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddTask(text.trim());
      setText("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe la tarea"
          className="add-task-input"
          disabled={loading || isSubmitting}
          minLength={3}
          required
        />
        <button
          type="submit"
          className="add-task-button"
          disabled={!text.trim() || loading || isSubmitting}
        >
          {isSubmitting ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default AddTask; 