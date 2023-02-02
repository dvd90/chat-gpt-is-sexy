import { Configuration, OpenAIApi } from 'openai';

export default class AI {
  private static openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.CHATGPT_APIKEY
    })
  );

  static async listModels() {
    const {
      data: { data: models }
    } = await this.openai.listModels();

    return models;
  }

  static async createCompletion(prompt: string, model = 'text-davinci-003') {
    const completion = await this.openai.createCompletion({
      model,
      prompt
    });

    return completion;
  }
}
