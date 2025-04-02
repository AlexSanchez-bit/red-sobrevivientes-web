import { supabase } from "@/setup";
import { ref } from "vue";

export interface Message {
  from: string;
  text: string;
  status: MessageStatus;
  created_at: Date;
}

export enum MessageStatus {
  LOADING,
  SENT,
  READED,
  ERROR,
}

interface Chat {
  id: number;
  last_message?: string;
  unread_message?: number;
}

export const useChatService = () => {
  const user = ref(null);
  const chat = ref<Chat | null>(null);

  const initChatUser = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session; // Si hay sesión, se almacena aquí

    if (session) {
      user.value = session.user;
      return { data: session.user, error: null };
    } else {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (!error) {
        user.value = data.user;
        return { data, error };
      } else {
        return { data, error };
      }
    }
  };

  const get_or_create_chat = async () => {
    const { data: get_chat_data, error: get_chat_error } = await supabase
      .from("chat_user")
      .select("*")
      .eq("user_id", user.value.id)
      .single();

    if (get_chat_error) {
      const { data: create_chat_data, error: create_chat_error } =
        await supabase.functions.invoke("create_chat");
      chat.value = { id: create_chat_data.chat_id };
      return { data: create_chat_data, error: create_chat_error };
    } else {
      chat.value = { id: get_chat_data.chat_id };
      return { data: get_chat_data, error: get_chat_error };
    }
  };

  const sendMessage = async (message: string) => {
    return await supabase.functions.invoke("send_message", {
      method: "POST",
      body: {
        chat_id: chat.value.id,
        content: message,
      },
    });
  };

  const loadChatMessages = async () => {
    const { data, error } = await supabase
      .from("chat_message")
      .select("*")
      .eq("chat_id", chat.value.id)
      .order("id", { ascending: false })
      .limit(100);
    if (!error) {
      const mappedMessages = data
        .map((message) => {
          let from = "bot";
          if (message.user === user.value.id) {
            from = "user";
          }
          if (message.user !== user.value.id && message.user != null) {
            from = "humanuser";
          }
          return {
            from,
            text: message.content,
            status: MessageStatus.SENT,
            created_at: new Date(message.created_at),
          };
        })
        .reverse();
      return { data: mappedMessages, error: null };
    }
    return { data, error };
  };

  return { initChatUser, get_or_create_chat, sendMessage, loadChatMessages };
};
