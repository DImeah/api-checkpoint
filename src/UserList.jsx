// src/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
const { Meta } = Card;
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const UserList = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfThumbnails, setListOfThumbnails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setListOfUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    const fetchThumbnailData = async () => {
      try {
        const thumbnailResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setListOfThumbnails(thumbnailResponse.data);
      } catch (error) {
        console.error("Error fetching thumbnail data:", error.message);
      }
    };

    fetchData();
    fetchThumbnailData();
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <div>
      <h1 className="font-extrabold text-2xl">LIST OF USERS</h1>
      {listOfUsers.map((user) => {
        // Find the corresponding thumbnail for the current user
        const thumbnail = listOfThumbnails.find(
          (thumb) => thumb.id === user.id
        );
        return (
          <Card
            className="gap-2"
            key={user.id}
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src={thumbnail ? thumbnail.thumbnailUrl : ""}
              />
            }
          >
            <Avatar icon={<UserOutlined />} />
            <Meta title={user.name} description={user.email} />
          </Card>
        );
      })}
    </div>
  );
};

export default UserList;
