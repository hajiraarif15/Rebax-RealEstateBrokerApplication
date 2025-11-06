import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Inquiries() {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/inquiries/me");
      setItems(data);
    } catch (error) {
      console.error("Error loading inquiries:", error);
      toast.error("Failed to load inquiries");
    }
    setLoading(false);
  };

  const loadChatHistory = async (inquiryId) => {
    setChatLoading(true);
    try {
      const { data } = await api.get(`/api/chat/inquiry/${inquiryId}`);
      setChatMessages(data);
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error("Error loading chat:", error);
      toast.error("Failed to load chat history");
    }
    setChatLoading(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (selectedInquiry) {
      loadChatHistory(selectedInquiry.id);
    }
  }, [selectedInquiry]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedInquiry) return;
    
    try {
      const { data } = await api.post("/api/chat/send", {
        inquiryId: selectedInquiry.id,
        message: newMessage
      });
      
      setChatMessages(prev => [...prev, data]);
      setNewMessage("");
      setTimeout(() => scrollToBottom(), 100);
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inquiries & Chat</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
        {/* Inquiries List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Conversations</h2>
          </div>
          
          <div className="overflow-y-auto h-full">
            {loading ? (
              <div className="space-y-3 p-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-700" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No inquiries yet
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {items.map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedInquiry?.id === inq.id
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {inq.property?.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {auth?.role === 'BROKER' ? inq.buyer?.name : inq.broker?.name}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatTime(inq.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate mt-1">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {selectedInquiry ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedInquiry.property?.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Chatting with {auth?.role === 'BROKER' ? selectedInquiry.buyer?.name : selectedInquiry.broker?.name}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    Started {formatTime(selectedInquiry.createdAt)}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <>
                    {/* Original inquiry message */}
                    <div className="flex">
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        selectedInquiry.buyer?.id === auth?.userId
                          ? 'bg-indigo-500 text-white ml-auto'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {formatTime(selectedInquiry.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Original reply if exists */}
                    {selectedInquiry.reply && (
                      <div className="flex">
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          selectedInquiry.broker?.id === auth?.userId
                            ? 'bg-indigo-500 text-white ml-auto'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          <p className="whitespace-pre-wrap">{selectedInquiry.reply}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {formatTime(selectedInquiry.repliedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Chat Messages */}
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex">
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender?.id === auth?.userId
                            ? 'bg-indigo-500 text-white ml-auto'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.message}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {formatTime(message.sentAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <textarea
                    rows={1}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Type a message... (Press Enter to send, Shift+Enter for new line)"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
