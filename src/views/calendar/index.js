import React, { useEffect, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import AddEventToCalendar from './AddEventToCalendar';
import PopUp from './PopUp';
import fire from 'src/config/fire-conf';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    fontFamily: 'Arial',
    position: 'relative'
  }
}));

const Calendar = () => {
  const classes = useStyles();
  const [viewPopUp, setViewPopUp] = useState(false);
  const [eventDescription, setEventDescription] = useState('');
  const [allEvent, setAllEvent] = useState([]);
  const [handleChangeEvent, setHandleChangeEvent] = useState(false);
  const [delleteEventInfo, setDelleteEventInfo] = useState({});

  const handlePopUpClose = () => {
    setViewPopUp(prevState => !prevState);
  };

  const handlePopUpOpen = e => {
    setEventDescription(e.event.extendedProps.description);
    setDelleteEventInfo({
      title: e.event.title,
      start: moment(e.event.start).format('YYYY-MM-DD')
    });
    setViewPopUp(prevState => !prevState);
  };

  const handleDateClick = arg => {
    console.log(arg);
  };

  const change = () => {
    setHandleChangeEvent(prevState => !prevState);
  };

  useEffect(() => {
    setAllEvent([]);
    fire
      .database()
      .ref('calendar')
      .on('child_added', data => {
        setAllEvent(prevState => [...prevState, data.val()]);
      });
  }, [handleChangeEvent]);

  return (
    <Page className={classes.root}>
      <Container maxWidth="lg">
        {viewPopUp && (
          <PopUp
            description={eventDescription}
            close={handlePopUpClose}
            eventDel={delleteEventInfo}
            change={change}
          />
        )}
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          contentHeight='80vh'
          locale={ruLocale}
          headerToolbar={{
            start: 'prev next today',
            center: 'title',
            end: 'dayGridMonth'
          }}
          buttonText={{
            today: 'Сегодня',
            month: 'Месяц'
          }}
          dateClick={handleDateClick}
          eventClick={handlePopUpOpen}
          events={allEvent}
        />
        <AddEventToCalendar addEvent={change} />
      </Container>
    </Page>
  );
};

export default Calendar;
