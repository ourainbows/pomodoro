import { useState } from "react";
import Modal from "../Modal/Modal";
import OneCycleMode from "../OneCycleMode/OneCycleMode";
import PomodoroMode from "../PomodoroMode/PomodoroMode";
import "./App.css"
import settings from "../../assets/settings.svg"
import PomodoroCounter from "../PomodoroCounter/PomodoroCounter";

function App() {
  const [mode, setMode] = useState("pomodoro");
  const [open, setOpen] = useState(false)
  const[pomodoros, setPomodoros] = useState(0)
  return (
    <>
      <div className="settings-container">
        <img src={settings} alt="Rueda de ajustes" onClick={() => setOpen(true)} />
      </div>

      {mode === "pomodoro" ?
        <PomodoroMode setPomodoros={setPomodoros} /> :
        <OneCycleMode setPomodoros={setPomodoros} />
      }

      <PomodoroCounter pomodoros={pomodoros}/>

      <Modal
        message="Hello World!"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <h2>Configuración</h2>
        <section>
          <div>
            <label>Trabajo</label>
            <input type="number" />
            <label >Descanso</label>
            <input type="number" />
            <label >Descanso Prolongado</label>
            <input type="number" />
            <label>Modo</label>
            <select>
              <option value="pomodoro">Pomodoro</option>
              <option value="oneCycle">One Cycle</option>
            </select>
          </div>
        </section>
      </Modal>
    </>
  )
}
export default App;