import * as Yup from "yup";
import { set } from "lodash";

const createInvitationSchema = (numberOfFields: any) => {
  const schema = Yup.object().shape({});

  for (let i = 0; i < numberOfFields; i++) {
    set(schema, `email_${i}`, Yup.string().email().required());
  }

  return schema;
};
export default createInvitationSchema;
