import { useLayoutEffect, useRef } from "react";

export type ContainerMeasures = {
  offsetHeight: number;
  scrollHeight: number;
};

const client = {
  userID: "Salam",
};

export type StreamMessage = {
  id: string;
  user: {
    id: string;
  };
  latest_reactions: string[];
  reply_count: number;
};

export type UseMessageListScrollManagerParams = {
  loadMoreScrollThreshold: number;
  messages: StreamMessage[];
  onScrollBy: (scrollBy: number) => void;
  scrollContainerMeasures: () => ContainerMeasures;
  scrolledUpThreshold: number;
  scrollToBottom: () => void;
  showNewMessages: () => void;
};

// FIXME: change this generic name to something like useAdjustScrollPositionToListSize
export function useMessageListScrollManager(
  params: UseMessageListScrollManagerParams
) {
  const {
    loadMoreScrollThreshold,
    onScrollBy,
    scrollContainerMeasures,
    scrolledUpThreshold,
    scrollToBottom,
    showNewMessages,
  } = params;

  const measures = useRef<ContainerMeasures>({
    offsetHeight: 0,
    scrollHeight: 0,
  });
  const messages = useRef<StreamMessage[]>();
  const scrollTop = useRef(0);

  useLayoutEffect(() => {
    const prevMeasures = measures.current;
    const prevMessages = messages.current;
    const newMessages = params.messages;
    const lastNewMessage = newMessages[newMessages.length - 1] || {};
    const lastPrevMessage = prevMessages?.[prevMessages.length - 1];
    const newMeasures = scrollContainerMeasures();

    const wasAtBottom =
      prevMeasures.scrollHeight -
        prevMeasures.offsetHeight -
        scrollTop.current <
      scrolledUpThreshold;

    if (typeof prevMessages !== "undefined") {
      if (prevMessages.length < newMessages.length) {
        // messages added to the top
        if (lastPrevMessage?.id === lastNewMessage.id) {
          if (scrollTop.current < loadMoreScrollThreshold) {
            const listHeightDelta =
              newMeasures.scrollHeight - prevMeasures.scrollHeight;
            onScrollBy(listHeightDelta);
          }
        }
        // messages added to the bottom
        else {
          const lastMessageIsFromCurrentUser =
            lastNewMessage.user?.id === client.userID;

          if (lastMessageIsFromCurrentUser || wasAtBottom) {
            scrollToBottom();
          } else {
            showNewMessages();
          }
        }
      }
      // message list length didn't change, but check if last message had reaction/reply update
      else {
        const hasNewReactions =
          lastPrevMessage?.latest_reactions?.length !==
          lastNewMessage.latest_reactions?.length;
        const hasNewReplies =
          lastPrevMessage?.reply_count !== lastNewMessage.reply_count;

        if ((hasNewReactions || hasNewReplies) && wasAtBottom) {
          scrollToBottom();
        }
      }
    }

    messages.current = newMessages;
    measures.current = newMeasures;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measures, messages, params.messages]);

  return (scrollTopValue: number) => {
    scrollTop.current = scrollTopValue;
  };
}
