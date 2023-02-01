import { Configuration, OpenAIApi } from 'openai';

export default class API {
  private static configuration = new Configuration({
    apiKey: process.env.CHATGPT_APIKEY
  });
  private static openai = new OpenAIApi(configuration);

  // const completion = await openai.createCompletion({
  //   model: "text-davinci-002",
  //   prompt: "Hello world",
  // });
  // console.log(completion.data.choices[0].text);
}
