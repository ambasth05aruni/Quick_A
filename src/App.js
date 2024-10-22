import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import './App.css';

import List from './Components/ListComponent/ListComponent';
import Navbar from './Components/NavbarComponent/NavbarComponent';

function App() {
  const statusList = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const priorityList = [
    { name: 'No priority', priority: 0 },
    { name: 'Urgent', priority: 4 },
    { name: 'High', priority: 3 },
    { name: 'Medium', priority: 2 },
    { name: 'Low', priority: 1 }
  ];

  const [groupValue, setgroupValue] = useState(getStateFromLocalStorage() || 'status');
  const [orderValue, setorderValue] = useState('title');
  const [ticketDetails, setticketDetails] = useState([]);
  const [userList, setUserList] = useState([]); // State for user list

  const orderDataByValue = useCallback(async (cardsArry) => {
    if (orderValue === 'priority') {
      cardsArry.sort((a, b) => b.priority - a.priority);
    } 
    else if (orderValue === 'title') {
      cardsArry.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        } 
        else if (titleA > titleB) {
          return 1;
        } 
        else {
          return 0;
        }
      });
    }
    await setticketDetails(cardsArry);
  }, [orderValue]);

  function saveStateToLocalStorage(state) {
    localStorage.setItem('groupValue', JSON.stringify(state));
  }

  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem('groupValue');
    return storedState ? JSON.parse(storedState) : null;
  }

  useEffect(() => {
    saveStateToLocalStorage(groupValue);

    async function fetchData() {
        try{
            const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
            await refactorData(response);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData();

    async function refactorData(response) {
        let ticketArray = [];
        try {
            if (response.status === 200) {
                for (let i = 0; i < response.data.tickets.length; i++) {
                    for (let j = 0; j < response.data.users.length; j++) {
                        if (response.data.tickets[i].userId === response.data.users[j].id) {
                            let ticketJson = { ...response.data.tickets[i], userObj: response.data.users[j] };
                            ticketArray.push(ticketJson);
                        }
                    }
                }
                await setticketDetails(ticketArray);
                orderDataByValue(ticketArray);

                const users = response.data.users.map(user => user.name); 
                setUserList(users); // Set the user list state
            }
        } 
        catch (error) {
            console.error("Error refactoring data:", error);
        }
    }
  }, [orderDataByValue, groupValue]);


  function handleGroupValue(value) {
    setgroupValue(value);
    console.log(value);
  }

  function handleOrderValue(value) {
    setorderValue(value);
    console.log(value);
  }

  return (
    <>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="board-details">
        <div className="board-details-list">
          {{
            'status': <>
              {statusList.map((listItem) => (
                <List
                  key={listItem}
                  groupValue='status'
                  orderValue={orderValue}
                  listTitle={listItem}
                  listIcon=''
                  statusList={statusList}
                  ticketDetails={ticketDetails}
                />
              ))}
            </>,
            'user': <>
              {userList.map((listItem) => (
                <List
                  key={listItem} // Add a key for each item
                  groupValue='user'
                  orderValue={orderValue}
                  listTitle={listItem}
                  listIcon=''
                  userList={userList}
                  ticketDetails={ticketDetails}
                />
              ))}
            </>,
            'priority': <>
              {priorityList.map((listItem) => (
                <List
                  key={listItem.priority} // Add a key for each item
                  groupValue='priority'
                  orderValue={orderValue}
                  listTitle={listItem.priority}
                  listIcon=''
                  priorityList={priorityList}
                  ticketDetails={ticketDetails}
                />
              ))}
            </>
          }[groupValue]}
        </div>
      </section>
    </>
  );
}

export default App;
