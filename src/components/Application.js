import React from 'react'

import 'components/Application.scss'
import DayList from 'components/DayList'
import Appointment from 'components/Appointment'
import useApplicationData from 'hooks/useApplicationData'
import Status from 'components/Appointment/Status'
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from 'helpers/selectors'

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData()
  const { day, days } = state
  const loading = Object.keys(state.appointments).length === 0

  const interviewers = getInterviewersForDay(state, day)
  const appointments = getAppointmentsForDay(state, day).map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {loading && <Status message="Loading" />}
        {appointments}
        {!loading && <Appointment key="last" time="5pm" />}
      </section>
    </main>
  )
}
