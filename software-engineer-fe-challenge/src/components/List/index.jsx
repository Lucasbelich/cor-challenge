import React, { useState, useCallback, useEffect } from "react";
import { useFetchTasks, useCreateTask, useInfiniteScroll } from "../../hooks";
import ItemList from "../ItemList";
import AddTask from "../AddTask";
import "./List.styles.css";
import { Spinner, EmptyState } from "../UI";

const List = () => {
  const [tasks, setTasks] = useState([]);

  const { data, loading, error, hasNextPage, loadMore, refetch } =
    useFetchTasks({ limit: 20 });

  const {
    createTask,
    loading: createTaskLoading,
    error: createTaskError,
    clearError,
  } = useCreateTask();

  // Actualizo la lista de tareas cuando cambian los datos
  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data]);

  const lastElementRef = useInfiniteScroll(loadMore, hasNextPage, loading);

  const handleAddTask = useCallback(
    async (text) => {
      try {
        const newTask = await createTask(text);
        setTasks((prevTasks) => [newTask, ...prevTasks]);
        clearError();
      } catch (error) {
        console.error("Error al agregar tarea:", error);
      }
    },
    [createTask, clearError]
  );

  const handleUpdateTask = useCallback(
    async (id, updates) => {
      try {
        // TODO: Acá debería hacer la llamada al back para actualizar el texto de la tarea
        // Por ahora, actualizo solo en el estado local
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          )
        );
        clearError();
      } catch (error) {
        console.error("Error al actualizar tarea:", error);
        throw error;
      }
    },
    [clearError]
  );

  const handleToggleComplete = useCallback(
    async (id, completed) => {
      try {
        // TODO: Acá debería hacer la llamada al back para actualizar el estado complete
        // Por ahora, actualizo solo en el estado local
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !completed } : task
          )
        );
        clearError();
      } catch (error) {
        console.error("Error al cambiar estado de tarea:", error);
      }
    },
    [clearError]
  );

  const handleRetry = () => {
    refetch();
    clearError();
  };

  if (error && !data) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Error al cargar las tareas</h2>
          <p>{error.message}</p>
          <button onClick={handleRetry} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <AddTask onAddTask={handleAddTask} loading={createTaskLoading} />

      {createTaskError && (
        <div className="error-message">
          <span>{createTaskError.message}</span>
          <button onClick={clearError} className="close-error">
            Cerrar
          </button>
        </div>
      )}

      <div className="tasks-container">
        {!data && loading ? (
          <Spinner size="medium" text="Cargando tareas..." />
        ) : tasks.length === 0 ? (
          <EmptyState title="No hay tareas" />
        ) : (
          <>
            <div className="tasks-container-list">
              {tasks.map((task, index) => {
                if (tasks.length === index + 1) {
                  return (
                    <div key={task.id} ref={lastElementRef}>
                      <ItemList
                        task={task}
                        onUpdateTask={handleUpdateTask}
                        onToggleComplete={handleToggleComplete}
                      />
                    </div>
                  );
                } else {
                  return (
                    <ItemList
                      key={task.id}
                      task={task}
                      onUpdateTask={handleUpdateTask}
                      onToggleComplete={handleToggleComplete}
                    />
                  );
                }
              })}
            </div>

            {loading && <Spinner size="small" text="Cargando más tareas..." />}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
