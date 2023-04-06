interface IValidateRequestProps {
  messageType: string;
  id: number;
  data: any;
}

interface IValidateResponseProps {
  hasError: boolean;
  isEqualToMessageType: boolean;
}

class ResponseUtil {
  static validateResponse(
    props: IValidateRequestProps
  ): IValidateResponseProps {
    let hasError = false;
    let isEqualToMessageType = false;
    const { data, messageType, id } = props;
    if (data.req_id === id && data.msg_type === messageType) {
      isEqualToMessageType = true;
      if (data.error) {
        hasError = true;
      }
    }
    return {
      hasError,
      isEqualToMessageType,
    };
  }
}

export default ResponseUtil;
