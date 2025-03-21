/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { deleteMessage, getAllMessages } from "@/services/messageServices";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MessagesDashboard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getAllMessages();
        console.log(res);
        if (res?.success) {
          setMessages(res.data);
        } else {
          console.log(res.message);
          setIsError(true);
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await deleteMessage(id);
      if (res?.success) {
        toast.success("message deleted successfully")
        setMessages(messages.filter(message => message._id !== id));
      } else {
        console.log(res.message);
        setIsError(true);
      }
    } catch (error) {
      console.log("Error deleting message:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-14 sm:p-14 md:p-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Messages</h1>
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to fetch messages.</p>}

      {messages.length === 0 && !isLoading && !isError ? (
        <p className="text-center text-gray-500">No messages available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {messages.map((message: any) => (
            <div key={message._id} className="p-6 border rounded-lg shadow bg-slate-200">
              <h2 className="text-xl font-bold mt-2">{message.name}</h2>
              <p className="mt-2 text-gray-700">{message.message}</p>
              <p className="mt-2 text-gray-500">{message.email}</p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(message._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesDashboard;
