export type Tmessage = {
    type: "assistant" | "user",
    text: string,
    prediction: null | string
  }