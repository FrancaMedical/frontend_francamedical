import React from 'react'
import {
    Calendar,
    Views,
    DateLocalizer,
    momentLocalizer,
  } from "react-big-calendar";
  import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useMemo } from 'react';
import ContentMain from '../../ContentMain';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const Schedule = () => {
    const defaultDate = useMemo(() => new Date(), []);
    const localizer = momentLocalizer(moment);
  return (
    <div>
       <ContentMain showHeader={false}>
     <div className='flex'>
     <div className='w-3/4'>
     <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          localizer={localizer}
          resizable
          popup
          selectable
          showAllEvents
        />
     </div>
        <div className='w-1/4 rounded-md ml-12 min-h-screen flex flex-col'>
            <div className='bg-blueMain p-3 rounded-tl-full rounded-tr-full'>
                <h1 className='text-white text-center text-2xl'>Programação</h1>
            </div>
            <div className='bg-blueLight min-h-screen'>

            </div>
        </div>
     </div>
       </ContentMain>
    </div>
  )
}

export default Schedule