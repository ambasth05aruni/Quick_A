import React, { useState, useEffect } from 'react';
import './ListComponent.css';
import Card from '../CardComponent/CardComponent';
import Cancelled from '../../Assets/Images/Cancelled.svg'
import Done from '../../Assets/Images/Done.svg'
import Progress from '../../Assets/Images/in-progress.svg'
import todo from '../../Assets/Images/To-do.svg'
import backlog from '../../Assets/Images/Backlog.svg'


export default function List({ ticketDetails, listTitle, groupValue, priorityList }) {
  const [cardCount, setCardCount] = useState(0);

  //card count calculation 
  useEffect(() => {
    const filteredTickets = ticketDetails.filter(ticket => 
      ticket.status === listTitle || 
      ticket.priority === listTitle || 
      ticket.userObj.name === listTitle
    );
    setCardCount(filteredTickets.length);
  }, [ticketDetails, listTitle]);

  // icons for 'status' and 'priority'
  const icons = {
    'status': {
      'Backlog': (
        <div className="list-icon">
          <img src={backlog} alt="" />
        </div>
      ),
      'Todo': (
        <div className="list-icon">
         <img src={todo} alt="" />
        </div>
      ),
      'In progress': (
        <div className="list-icon">
           <img src={Progress} alt="Cancelled Icon" />
        </div>
      ),
      'Done': (
        <div className="list-icon">
           <img src={Done} alt="Cancelled Icon" />
        </div>
      ),
      'Cancelled': (
        <div className="list-icon">
          <img src={Cancelled} alt="Cancelled Icon" />
        </div>
      )
    },
    'priority': {
      0: (
        <div className="card-tag-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z"/>
          </svg>
        </div>
      ),
      1: (
        <div className="card-tag-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
            <g fill="currentColor">
              <path fillRule="evenodd" d="M35 6a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4Zm-1 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v30a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V9ZM19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V21Zm3-1a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V21a1 1 0 0 0-1-1h-4Z" clipRule="evenodd"/><path d="M6 33a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6Z"/>
            </g>
          </svg>
        </div>
      ),
      2: (
        <div className="card-tag-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
            <g fill="currentColor">
              <path d="M19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V21ZM6 33a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6Z"/>
              <path fillRule="evenodd" d="M32 9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9Zm3-1a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-4Z" clipRule="evenodd"/>
            </g>
          </svg>
        </div>
      ),
      3: (
        <div className="card-tag-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
            <path fill="currentColor" d="M32 9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9ZM19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V21ZM9 30a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H9Z"/>
          </svg>
        </div>
      ),
      4: (
        <div className="card-tag-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
            <path fill="red" d="M5.96 4.457a2.075 2.075 0 1 1 4.08 0l-.856 4.56a1.205 1.205 0 0 1-2.368 0l-.855-4.56ZM9.5 12.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z"/>
          </svg>
        </div>
      )
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          {icons[groupValue]?.[listTitle]}

          {/* List Title */}
          <div className="list-title">
            {
              {
                'priority': (
                  <>
                    {priorityList
                      ? priorityList.map(priorityProperty => (
                          priorityProperty.priority === listTitle ? (
                            <>{priorityProperty.name}</>
                          ) : null
                        ))
                      : null
                    }
                  </>
                ),
                'status': <>{listTitle}</>,
                'user': <>{listTitle}</>
              }[groupValue]
            }
          </div>

          <div className="list-sum">{cardCount}</div>
        </div>

        <div className="list-header-right">
          <div className="list-add-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"/>
            </svg>
          </div>

          <div className="list-option-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
              <path fill="currentColor" d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="list-card-items">
        {
          ticketDetails
            .filter(ticket => 
              ticket.status === listTitle ||
              ticket.priority === listTitle ||
              ticket.userObj.name === listTitle
            )
            .map((ticket, index) => (
              <Card key={ticket.id || index} cardDetails={ticket} />
            ))
        }
      </div>
    </div>
  );
}