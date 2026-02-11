import Bytez from "bytez.js"


const AiPower = async (prompt) => {
    const key = process.env.BYTEZ_AI_KEY;
    const sdk = new Bytez(key);

    const model = sdk.model("openai/gpt-4o")

    const { error, output } = await model.run([
      {
        "role": "user",
        "content": prompt
      }
    ]) 

    return { error, output }
}

export default AiPower;