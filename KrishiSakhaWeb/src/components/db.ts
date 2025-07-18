import Dexie from 'dexie';

class MyDatabase extends Dexie {
  messages: Dexie.Table<{ chatId: string, messages: Message[] }, string>;

  constructor() {
    super('ChatAppDB');
    this.version(1).stores({
      messages: 'chatId', // chatId is the primary key
    });
    this.messages = this.table('messages');
  }

  async clearAll() {
    await this.messages.clear();
  }

  // Clear data for a specific chatId
  async clear(chatId: string) {
    await this.messages.delete(chatId);
  }
}

class Message{
    from:string= ""
    to:string=''
    msg:string=''
    index:Number =0
}
const db = new MyDatabase();

const addMessage = async (chatId: string, newMessage: Message[]) => {
    const existing = await db.messages.get(chatId);
    
    if (existing) {
      existing.messages.push(...newMessage); // Push the new message to existing messages
      await db.messages.put({ chatId, messages: existing.messages }); // Update DB
    } else {
      // If no existing messages for the chatId, add new record
      await db.messages.add({ chatId, messages: [...newMessage] });
    }
}

const getMessages = async (chatId: string): Promise<Message[]> => {
    const chatData = await db.messages.get(chatId);
    return chatData ? chatData.messages : [];
  };


export {db,Message,addMessage,getMessages};


