import axios from "axios";
import { plainToClass, plainToInstance, Type } from "class-transformer";
import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import { Socket } from "socket.io-client";
import { addMessage, db, getMessages, Message, } from "./db";
import { log } from "console";
import { useUser } from "../context/Username";

interface ChatScreenProps {
    socket: Socket;
    jwt: string
}

class Users {
    username: string = ""
    chatId: string = ""

    constructor(data?: Partial<Users>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

class ChatModel {
    id = ""
    username = ""
    chatWith = ""

    messages: Message[] = []
}

const ChatScreen: React.FC<ChatScreenProps> = ({ socket, jwt }) => {
    const [done, setDone] = useState(false);
    const [users, setUsers] = useState<Users[]>([])
    const [current, setCurrent] = useState<Users | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const {usernameHolder,setUsernameHolder}=useUser()
    const currentRef = useRef<Users | null>(null);

    useEffect(() => {
        currentRef.current = current;
    }, [current]);
    useEffect(() => {

        socket.on("inactive",async(data)=>{
            console.log("data");
            
            setUsers((prev)=>{
                return prev.filter((val)=> val.chatId != data)
            })
            
            if(currentRef.current?.chatId==data){
                setCurrent((prev)=>{return null})
                setMessages([])
                db.clear(data)
            }
        })


        socket.on("msg", async (data) => {
            // Update Users List
            setUsers((prevUsers) => {
                const existingUser = prevUsers.find((i) => i.chatId === data.id);
                console.log(existingUser);
                
                if (!existingUser) {
                
                    return [new Users({ username: data.message.from, chatId: data.id }), ...prevUsers];
                }
                return [existingUser, ...prevUsers.filter((i) => i.chatId !== existingUser.chatId)];
            });
            
            // Update Messages if Chat is Active
            
            if (data.id === currentRef.current?.chatId) {
                setMessages((prevMessages) => [...prevMessages, plainToInstance(Message, data.message)]);
            }

            // Add Message to Local Database
            try {
                addMessage(data.id, [plainToInstance(Message, data.message)]);
            } catch (error) {
                console.error("Error saving message:", error);
            }
        })
        getUsers()

        return () => {
            socket.off('msg')
            socket.off("inactive")
        }
    }, []);

    async function sendMessage(msg:string) {
        if(!current) return;
        const obj={id:current.chatId,
            message: { from: usernameHolder, index: 0, msg: msg, to: current.username }}
        const newMsg=plainToInstance(Message,obj.message)
        setMessages((old)=>[...old,newMsg])
        addMessage(obj.id,[newMsg])
        const data = JSON.stringify(obj)
        socket.emit("send",data)
    }


    const getUsers = async () => {
        await db.clearAll()
        setCurrent((prev)=>{
            return null
        })
        setMessages([])
        setDone(false)
        try {
            let res = await axios.get("http://localhost:8080/services/getChatList", {
                headers: { "Authentication": "bearer " + jwt }
            })
            if (res.data) {
                const data = plainToInstance(ChatModel, res.data)
                // console.log(data)
                const users_arr: Users[] = []
                for (let i of data as any) {
                    users_arr.push(new Users({ username: i.username, chatId: i.id }))
                    addMessage(i.id, [...i.messages])
                }
                setUsers(users_arr)
            }

        } catch {

        }
        setDone(true)
    }

    // Conditional rendering logic
    if (done) {
        return <Screen users={users} getUsers={getUsers}
            current={current} setCurrunt={setCurrent} messages={messages} setMessages={setMessages}
            sendMessage={sendMessage}
        />;
    }
    return <Loading />;
};

export default ChatScreen;

// Loading component
const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-green-50">
            <p className="text-green-500 font-semibold">Loading...</p>
        </div>
    );
};

// Screen component (chat interface)

interface screenProps {
    users: Users[]
    getUsers: () => {}
    current: Users | null
    setCurrunt: Dispatch<SetStateAction<Users | null>>
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
    sendMessage:(msg:string)=>{}
}

const Screen: React.FC<screenProps> = ({ users, getUsers, current, setCurrunt, messages, setMessages,sendMessage }) => {
    const {usernameHolder,setUsernameHolder} = useUser()
    const [input,changeInp] = useState("")
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

    return (
        <div className="flex h-screen bg-green-50">
            {/* Left Sidebar: User List */}
            <div className="w-1/4 bg-green-100 p-4 border-r border-green-300">

                <h2 className="text-xl font-bold text-green-800 mb-4" onClick={async () => {
                    getUsers()

                }}>Requests</h2>
                <div className="border border-black" style={{height:"1px"}}></div>
                <ul style={{paddingTop:"10px"}}>
                    {/* List of users can go here */}
                    {users.map((val) => {
                        return <p className={`w-full h-10 p-3 flex border-green-500 ${current?.chatId==val.chatId? "bg-green-500" :""}`}
                        key={val.chatId} onClick={async () => {
                            setMessages(await getMessages(val.chatId))
                            console.log(val);
                            
                            setCurrunt((prev)=>{return val})
                        }} style={{alignItems:"center",borderRadius:"10px"}}> {val.username} </p>
                    })}
                </ul>
            </div>

            {/* Right Side: Chat Messages */}
            <div className="w-3/4 flex flex-col">
                {/* Chat Header */}
                <div className="bg-green-200 p-4 border-b border-green-300">
                    <h3 className="text-lg font-semibold text-green-900">{current?.chatId}({current?.username})</h3>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto bg-green-50">
                    {/* Messages will be rendered here */}
                    {messages.map((val, i) => (
                        <div
                            key={i}
                            className={`flex mb-2 ${
                                val.from === usernameHolder ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                                    val.from === usernameHolder
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-300 text-black"
                                }`}
                                style={{
                                    wordWrap: "break-word", 
                                    whiteSpace: "pre-wrap", 
                                }}
                            >
                                {val.msg}
                            </div>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef}></div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-green-300 bg-green-100">
                    <div className="flex">
                        <button className="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            Refresh
                        </button>
                        <input
                            value={input}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => changeInp(e.target.value)}
                            onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=>{
                                if(e.key=="Enter"){
                                    if(input=="")return
                                    sendMessage(input)
                                    changeInp('')
                                }
                            }} 
                            type="text"
                            className="flex-1 p-2 border border-green-300 rounded-lg outline-none"
                            placeholder="Type a message..."
                        />
                        <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={async()=>{
                                if(input=="")return
                                sendMessage(input)
                                changeInp('')
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
