import { MessageBubble, withTaskContext } from "@twilio/flex-ui";

type MessageBubbleWrapperProps = React.ComponentProps<typeof MessageBubble>;

const MessageBubbleWrapper = (props: Partial<MessageBubbleWrapperProps>) => {
  let modifiedAuthor = props.message?.authorName;
  if (modifiedAuthor && modifiedAuthor.length > 4) {
    modifiedAuthor = modifiedAuthor.slice(0, -4) + "•••••";
  }

  return (
    <div className="Twilio-MessageBubble-default">
      <div
        className="Twilio-MessageBubble-Header"
        style={{
          display: "flex",
          flexFlow: "row",
          flexGrow: 1,
          flexShrink: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginRight: "0.5rem",
            whiteSpace: "nowrap",
            fontSize: "0.75rem",
            fontWeight: "700",
            lineHeight: "1rem",
          }}
        >
          {modifiedAuthor}
        </div>
        <div
          className="Twilio-MessageBubble-Time"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.75rem",
            flex: "0 0 auto",
          }}
        >
          {props.message?.source.timestamp?.getHours() +
            ":" +
            props.message?.source.timestamp?.getMinutes()}
        </div>
      </div>
      <div className="Twilio-MessageBubble-Body">
        {props.message?.source.body}
      </div>
    </div>
  );
};

export default withTaskContext(MessageBubbleWrapper);
