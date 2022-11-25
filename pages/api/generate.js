import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.business),
    temperature: 1,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(normalSpeak) {
  const capitalisedBusiness = normalSpeak
    ? normalSpeak[0].toUpperCase() + normalSpeak.slice(1).toLowerCase()
    : "please enter a phrase";
  if (normalSpeak) {
    return `Suggest how to say this like business?.

Normal: Don’t expect to hear from me again.
Business: I will get back to you in due course.

Normal: lets talk about it later.
Business: We'll circle back.

Normal: I do nothing in the company, but get payed allot.
Business: I'm a change leader.

Normal: I will pay you minimum wage.
Business: we offer a Competitive salary.

Normal: We are seriously understaffed
Business: We run lean.

Normal: this guy is stopping me doing my work
Business: We are expriencing pushback

Normal: that sounds like a you problem
Business: I believe that falls within the scope of your responsibilites, but im happy to support where it makes sense

Normal: stop emailing me so often
Business: to ensure the information does not get lost , lets reduce frequency of communication

Normal: I dont work and I'm the manager
Business: I've been in meetings all day

Normal: ${capitalisedBusiness}
Business:`;
  }
  return "please enter a phrase";
}
