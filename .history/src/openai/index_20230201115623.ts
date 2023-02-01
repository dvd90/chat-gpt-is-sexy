import { Configuration, OpenAIApi } from 'openai';

export default class API {
  private static openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.CHATGPT_APIKEY
    })
  );

  static async getAnswer(question) {}

  // const completion = await openai.createCompletion({
  //   model: "text-davinci-002",
  //   prompt: "Hello world",
  // });
  // console.log(completion.data.choices[0].text);
}
