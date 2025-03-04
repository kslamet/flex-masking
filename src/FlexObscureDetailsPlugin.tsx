import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import MessageBubbleWrapper from "./components/MessageBubbleWrapper";

const PLUGIN_NAME = "FlexObscureDetailsPlugin";

export default class FlexObscureDetailsPlugin extends FlexPlugin {
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
    // Only obscure messages NOT from the Flex user
    const options: Flex.ContentFragmentProps = {
      if: (props: any) => {
        if (props?.message?.isFromMe) return false;
        return true;
      },
      sortOrder: -1,
    };

    flex.MessageBubble.Content.replace(
      <MessageBubbleWrapper key="bubble-wrap" />,
      options
    );
  }
}
