import React from "react";
import { CDBNotification, CDBContainer } from "cdbreact";

export const NotificationIndeicator = () => {
  return (
    <CDBContainer>
      <CDBNotification
        show
        fade
        autohide={2}
        title="Contrast"
        message="Hello, world! This is a primary message."
        text="11 mins ago"
      />
      <CDBNotification
        show
        fade
        iconClassName="text-primary"
        title="Contrast"
        message="Hello, world! This is a primary message."
        text="11 mins ago"
      />
      <CDBNotification
        show
        fade
        iconClassName="text-secondary"
        title="Contrast"
        message="Hello, world! This is a primary message."
        text="11 mins ago"
      />
    </CDBContainer>
  );
};