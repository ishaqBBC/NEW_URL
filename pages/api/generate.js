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
  const capitalisedFrank = normalSpeak
    ? normalSpeak[0].toUpperCase() + normalSpeak.slice(1).toLowerCase()
    : "please enter a phrase";
  if (normalSpeak) {
    return `Say it like a Frank.


Normal: Don’t expect to hear from me again.
Frank:  I will get back to you in due course.
Normal: lets talk about it later.
Frank: lets circle back.
Normal: I do nothing in the company, but get payed allot.
Frank: I'm a change leader.
Normal: I will pay you minimum wage.
Frank: I offer a Competitive salary.
Normal: We are seriously understaffed.
Frank: We run lean.
Normal: this guy is stopping me from doing my work.
Frank: We are expriencing pushback.
Normal: Im not doing this extra work.
Frank: I believe this is scope creep, and therefore requires another ticket to be raised.
Normal: that sounds like a you problem.
Frank: I believe that falls within the scope of your responsibilites, but im happy to support where it makes sense.
Normal: stop emailing me so often,
Frank: to ensure the information does not get lost , lets reduce frequency of communication.
Normal: fuck off .
Frank: regards.
Normal: I'm lazy and unemployed and spend my time losing money in crypto.
Frank: Im an entrepreneur.
Normal: I hate it here.
Frank: We work hard, play hard.

Normal: ${capitalisedFrank}.
Frank: 
`;
  }
  return "please enter a phrase";
}
