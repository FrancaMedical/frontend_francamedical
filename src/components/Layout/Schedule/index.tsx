import React, { useEffect, useRef, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useMemo } from "react";
import ContentMain from "../../ContentMain";
import { useConsultService } from "@/app/services/consult.service";

type Eventos = {
  id?: string;
  title?: string;
  start?: string;
  end?: string;
};

const DragAndDropCalendar = withDragAndDrop(Calendar);

const Schedule = () => {
  const defaultDate = useMemo(() => new Date(), []);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const serviceConsult = useConsultService();

  const shouldLog = useRef(true);

  function SetarEventos() {
    useEffect(() => {
      if (shouldLog.current) {
        shouldLog.current = false;
        serviceConsult.GETALL().then((res) => {
          for (let i = 0; i < res.length; i++) {
            //@ts-ignore
            setEvents((prev) => [
              ...prev,
              {
                id: res[i].id,
                title: res[i].descricao,
                start: res[i].dataConsulta,
                end: res[i].dataConsulta,
              },
            ]);
          }
        });
      }
    }, []);
  }

  SetarEventos();

  return (
    <div>
      <ContentMain showHeader={false}>
        <div className="flex">
          <div className="w-3/4">
            <DragAndDropCalendar
              defaultDate={defaultDate}
              events={events}
              defaultView={Views.MONTH}
              localizer={localizer}
              resizable
              popup
              selectable
              showAllEvents
            />
          </div>
          <div className="w-1/4 rounded-md ml-12 min-h-screen flex flex-col">
            <div className="bg-blueMain dark:bg-dark p-3 rounded-tl-full rounded-tr-full">
              <h1 className="text-white text-center text-2xl">Programação</h1>
            </div>
            <div className="bg-blueLight dark:bg-dark3 min-h-screen p-3">
              {events.map((val: Eventos) => (
                <>
                  <div className="mb-4">
                    <h1 className="text-md font-bold dark:text-white">
                      {moment(val.start).format("DD/MM/YYYY")}
                    </h1>
                    <h1 className="dark:text-white">{val.title}</h1>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </ContentMain>
    </div>
  );
};

export default Schedule;
