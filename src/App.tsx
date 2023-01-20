import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Header } from './components/Header';
import { Task } from './components/Task';

import { PlusCircle } from 'phosphor-react';

import clipboard from './assets/clipboard.svg';
import styles from './App.module.css';

import './global.css';

export interface TaskProps {
  id: number;
  content: string;
  isFinished: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps []>([]);
  const [newTask, setNewTask] = useState('');

  const tasksFinished = tasks.filter(task => task.isFinished)
  
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');

    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTask) {
      const task = {
        id: Math.random(),
        content: newTask,
        isFinished: false,
      }

      setTasks((state) => {
        return [...state, task]
      })
      setNewTask('');
    } 
  }

  function deleteTask(id: number) {
    const newTasks = tasks.filter(item => item.id !== id);

    setTasks([...newTasks]);
  }

  function changeTask(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.isFinished = !task.isFinished;
      }

      return task
    })
  
    setTasks([...updatedTasks]);
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <form onSubmit={handleCreateNewTask}>
          <input 
            type="text" 
            name="task"
            placeholder='Adicione uma nova tarefa'
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            value={newTask}
            required
            />
          <button type="submit">
            Criar
            <PlusCircle size={16}/>
          </button>
       </form>

        <div className={styles.tasksContainer}>
          <header className={styles.header}>
            <p>Tarefas criadas <span>{tasks.length}</span></p>
            <p>Concluídas <span>{tasksFinished.length} de {tasks.length}</span></p>
          </header>

          {tasks.length === 0 && (
            <div className={styles.clipboard}>
              <img src={clipboard} />
              <h3>Você ainda não tem tarefas cadastradas</h3>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}

          {tasks.map(task => {
            return (
              <Task 
                key={task.id}
                content={task}
                onDeleteTask={deleteTask}
                onChangeTask={changeTask}
              />
            );
          })}
                    
        </div>
      </main>
    </>
  )
}

export default App
