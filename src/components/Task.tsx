import { Trash } from 'phosphor-react';
import { useState } from 'react';
import { TaskProps } from '../App';

import styles from './Task.module.css';

interface Task {
  content: TaskProps;
  onDeleteTask: (id: number) => void;
  onChangeTask: (id: number) => void;
}

export function Task({content, onDeleteTask, onChangeTask}: Task) {

  function handleDeleteTask() { 
    onDeleteTask(content.id);
  }

  function handleChangeStatus() {
    onChangeTask(content.id);
  }

  return (
    <li className={styles.task}>
      <div>
        <input type="checkbox" onChange={handleChangeStatus}/>
        <label className={content.isFinished ? styles.taskFinished : styles.taskNoFinished}>
          {content.content}
        </label>
      </div>

      <button 
        type="button"
        onClick={handleDeleteTask}
        >
        <Trash/>
      </button>
    </li> 
  );
}