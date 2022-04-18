import { useState } from "react";
import Modal from "../Modal/Modal";
import OneCycleMode from "../OneCycleMode/OneCycleMode";
import PomodoroMode from "../PomodoroMode/PomodoroMode";
import "./App.css"
import settings from "../../assets/settings.svg"
import PomodoroCounter from "../PomodoroCounter/PomodoroCounter";

function App() {
  const [open, setOpen] = useState(false)
  const [pomodoros, setPomodoros] = useState(0)
  const [newOptions, setNewOptions] = useState({})
  const [workTime, setWorkTime] = useState(1)
  const [relaxTime, setRelaxTime] = useState(2)
  const [longRelaxTime, setLongRelaxTime] = useState(2)
  const [mode, setMode] = useState("pomodoro");

  const saveOptions = (e) => {
    e.preventDefault()
    newOptions.workTime && setWorkTime(newOptions.workTime)
    newOptions.relaxTime && setRelaxTime(newOptions.relaxTime)
    newOptions.longRelaxTime && setLongRelaxTime(newOptions.longRelaxTime)
    newOptions.mode && setMode(newOptions.mode)
    setOpen(false)
  }
  const onNewOption = (e) => {
    setNewOptions({
      ...newOptions,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="settings-container">
        <img src={settings} alt="Rueda de ajustes" onClick={() => setOpen(true)} />
      </div>

      {mode === "pomodoro" ?
        <PomodoroMode setPomodoros={setPomodoros} workTime={workTime} relaxTime={relaxTime} longRelaxTime={longRelaxTime} /> :
        <OneCycleMode setPomodoros={setPomodoros} workTime={workTime} relaxTime={relaxTime} longRelaxTime={longRelaxTime} />
      }

      <PomodoroCounter pomodoros={pomodoros} />

      <Modal
        message="Hello World!"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <h2 className="title-modal">Configuración</h2>
        <form
          className="options-modal"
          id="formModal"
          onSubmit={saveOptions}
        >
          <div>
            <label>Trabajo</label>
            <input
              type="number"
              value={newOptions.workTime != undefined ? newOptions.workTime : workTime}
              name="workTime"
              className="work"
              onChange={onNewOption} />
          </div>
          <div>
            <label>Descanso</label>
            <input
              type="number"
              value={newOptions.relaxTime != undefined ? newOptions.relaxTime : relaxTime}
              name="relaxTime"
              onChange={onNewOption} />
          </div>
          <div>
            <label>Descanso Prolongado</label>
            <input
              type="number"
              value={newOptions.longRelaxTime != undefined ? newOptions.longRelaxTime : longRelaxTime}
              name="longRelaxTime"
              onChange={onNewOption} />
          </div>
          <div>
            <label>Modo</label>
            <select className="select-modal" onChange={onNewOption} name="mode">
              <option value="pomodoro">Pomodoro</option>
              <option value="oneCycle">One Cycle</option>
            </select>
          </div>
        </form>
        <div className="buttons-modal">
          <button className="button-modal button-cancel" onClick={() => { setOpen(false) }}>Cancelar</button>
          <input className="button-modal button-save" form="formModal" type="submit" value="Guardar"/>
        </div>
      </Modal>
    </>
  )
}
export default App;