import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import MessageBubbleWrapper from "./components/MessageBubbleWrapper";
import InlineMedia from "./components/InlineMedia";

const PLUGIN_NAME = "FlexMaskingPlugin";

export default class FlexMaskingPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    // Option flag to use or not use custom MessageBubbleWrapper
    const options: Flex.ContentFragmentProps = {
      if: (props: any) => {
        if (props?.message?.isFromMe) return false;
        return true;
      },
      sortOrder: -1,
    };

    // Add InlineMedia component for outgoing messages with media
    flex.MessageBubble.Content.add(<InlineMedia key="inline-media-component" />, {
      sortOrder: 0,
      if: (props) => props.message.source.type === 'media',
    });

    // Replace the default MessageBubbleWrapper with our custom one
    flex.MessageBubble.Content.replace(
      <MessageBubbleWrapper key="bubble-wrap" />,
      options
    );

    // Mask entire Second Line in TaskListItem
    flex.TaskListItem.Content.addWrapper((OriginalComponent) => (props) => {
      let newProps = {
        ...props,
      };
      newProps["secondLine"] = "Masked";
      return <OriginalComponent {...newProps} />;
    });
    

  }
}
