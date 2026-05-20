import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const EXERCISES = [
  'Rest Day','Bench Press','Chest Flyes','Push Ups','Incline Press',
  'Pull Ups','Lat Pulldown','Barbell Rows','Deadlift','Squat',
  'Leg Press','Lunges','Leg Curl','Calf Raises','Shoulder Press',
  'Lateral Raises','Front Raises','Bicep Curls','Hammer Curls',
  'Tricep Dips','Tricep Pushdown','Plank','Crunches','Russian Twists',
  'Leg Raises','Running','Cycling','Jump Rope','Rowing','HIIT Cardio',
]

const defaultDay = { exercise:'Rest Day', sets:'3', reps:'12', duration:'45', notes:'' }

 function WeeklyProgram() {
  const navigate = useNavigate()
  const [days,    setDays]    = useState(() => Object.fromEntries(DAYS.map(d => [d, { ...defaultDay }])))
  const [notes,   setNotes]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  // Pre-fill if program already exists
  useEffect(() => {
    API.get('/program').then(res => {
      const p = res.data
      const filled = {}
      DAYS.forEach(d => {
        filled[d] = {
          exercise: p[d]?.exercise || 'Rest Day',
          sets:     String(p[d]?.sets     || '3'),
          reps:     String(p[d]?.reps     || '12'),
          duration: String(p[d]?.duration || '45'),
          notes:    p[d]?.notes || '',
        }
      })
      setDays(filled)
      setNotes(p.notes || '')
    }).catch(() => {}) // no program yet — use defaults
  }, [])

  function handleChange(day, field, value) {
    setDays(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // Convert sets/reps/duration to numbers before sending
      const payload = { notes }
      DAYS.forEach(d => {
        payload[d] = {
          exercise: days[d].exercise,
          sets:     Number(days[d].sets),
          reps:     Number(days[d].reps),
          duration: Number(days[d].duration),
          notes:    days[d].notes,
        }
      })
      await API.post('/program', payload)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="weekly-form-page">
        <div className="weekly-form-wrapper">
          <h2>Create Your <span className="orange">Weekly Program</span></h2>
          <p>Plan your training schedule for each day of the week</p>

          <form onSubmit={handleSubmit}>
            {DAYS.map(day => (
              <div className="day-block" key={day}>
                <h4><i className="fas fa-calendar-day"></i> {day}</h4>
                <div className="day-fields">
                  <div className="form-group">
                    <label>Exercise</label>
                    <select value={days[day].exercise} onChange={e => handleChange(day,'exercise',e.target.value)}>
                      {EXERCISES.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Sets</label>
                    <input type="number" min="0" max="10" value={days[day].sets}
                      disabled={days[day].exercise === 'Rest Day'}
                      onChange={e => handleChange(day,'sets',e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Reps</label>
                    <input type="number" min="0" max="100" value={days[day].reps}
                      disabled={days[day].exercise === 'Rest Day'}
                      onChange={e => handleChange(day,'reps',e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Duration (min)</label>
                    <input type="number" min="0" max="180" value={days[day].duration}
                      disabled={days[day].exercise === 'Rest Day'}
                      onChange={e => handleChange(day,'duration',e.target.value)} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop:'10px' }}>
                  <label>Notes for {day}</label>
                  <input type="text" placeholder="Optional notes..."
                    value={days[day].notes}
                    onChange={e => handleChange(day,'notes',e.target.value)} />
                </div>
              </div>
            ))}

            <div className="form-group" style={{ marginTop:'10px' }}>
              <label>General Program Notes</label>
              <textarea rows="3" placeholder="Overall goals or reminders..."
                value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

            {error && <div className="error-msg">{error}</div>}

            <div style={{ display:'flex', gap:'14px', marginTop:'10px' }}>
              <button type="button" className="btn-ghost" style={{ padding:'13px 28px' }} onClick={() => navigate('/dashboard')}>
                <i className="fas fa-arrow-left"></i> Cancel
              </button>
              <button type="submit" className="btn-main" style={{ flex:1, justifyContent:'center' }} disabled={loading}>
                {loading
                  ? <><i className="fas fa-spinner fa-spin"></i> Saving...</>
                  : <><i className="fas fa-save"></i> Save &amp; Go to Dashboard</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default WeeklyProgram;