import React, { useState } from "react";
import { useSelector } from "react-redux";
import EmptySelected from "./Chats/emptySelected";
import UserChatView from "./Chats/UserChatView";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import UserMessageList from "./Chats/admin/UserMsgList";
import SearchUserList from "./Chats/admin/SearchUser";

const AdminSupportChat = () => {
  const user = useSelector((state) => state.auth.user);
  const [selected, setSelected] = useState("");
  return (
    <>
      <div className="p-5 min-h-screen">
        <div className="p-5 bg-white items-center flex justify-between">
          <div className="w-7/12">
            <p className="text-2xl fw-600">BOG Chat Support</p>
            <p className="fs-500 mt-2 text-gray-600">
              As part of our customer support strategy, we aim to enhance user
              satisfaction by offering a real-time chat service that enables
              direct interaction with BOG users, facilitating prompt issue
              resolution and ensuring their concerns are effectively addressed
            </p>
          </div>
          <div className="w-5/12 h-36 bg-support bg-center bg-cover"></div>
        </div>
        <div className="mt-12">
          <div className="bg-white shadow-lg p-5 lg:min-h-[600px] flex">
            <div className="w-[400px]">
              <p className="border-b-2 pb-1 text-primary fw-600 mb-3">BOG User(s)</p>
              <div>
                <Tabs className=''>
                  <TabList className="flex border-b border-gray-600 fs-400 lg:fs-600">
                    <Tab>Chats</Tab>
                    <Tab>Start New</Tab>
                  </TabList>
                  <TabPanel>
                    <UserMessageList selected={selected} select={setSelected}/>
                  </TabPanel>
                  <TabPanel>
                    <SearchUserList select={setSelected}/>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <div className="w-full">
              <div className="border rounded-lg h-full">
                {selected && <UserChatView item={selected}/>}
                {!selected && <EmptySelected />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSupportChat;
