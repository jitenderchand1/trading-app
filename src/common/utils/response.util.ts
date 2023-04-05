interface IValidateRequestProps {
  messageType: string;
  id: number;
  data: any;
}

interface IValidateResponseProps {
  hasError: boolean;
}

class ResponseUtil {
  static validateResponse(
    props: IValidateRequestProps
  ): IValidateResponseProps {
    let hasError = false;
    const { data, messageType, id } = props;
    if (data.req_id === id && data.msg_type === messageType) {
      if (data.error) {
        hasError = true;
      }
    }
    return {
      hasError,
    };
  }
}

export default ResponseUtil;
