export declare const EVENT_ACTIONS: {
  register: {
    inPerson: {
      success: string;
      unexpected: string;
      capacity: string;
      telemetry: {
        type: string;
        category: string;
        action: string;
        label: string;
        details: string;
      };
    };
    online: {
      success: string;
      unexpected: string;
      capacity: string;
      telemetry: {
        type: string;
        category: string;
        action: string;
        label: string;
        details: string;
      };
    };
  };
  unregister: {
    inPerson: {
      success: string;
      error: string;
      telemetry: {
        type: string;
        category: string;
        action: string;
        label: string;
        details: string;
      };
    };
    online: {
      success: string;
      error: string;
      telemetry: {
        type: string;
        category: string;
        action: string;
        label: string;
        details: string;
      };
    };
  };
};
