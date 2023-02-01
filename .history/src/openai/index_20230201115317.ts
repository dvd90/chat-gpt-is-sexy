  import { Configuration, OpenAIApi } from "openai";



export default API {


 configuration = new Configuration({
  apiKey: process.env.CHATGPT_APIKEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: "Hello world",
});
console.log(completion.data.choices[0].text);
}
