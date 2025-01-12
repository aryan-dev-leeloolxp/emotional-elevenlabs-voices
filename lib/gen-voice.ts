import elevenlabs from "./init-eleven-labs";

export default async function genVoice({
  voiceId,
  text,
  emotion,
}: {
  voiceId: string;
  text: string;
  emotion?: string;
}) {
  try {
    const audio = await elevenlabs.generate({
      voice: voiceId,
      text: `${text}"`,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.75,
        use_speaker_boost: true,
      },
      next_text: `", ${emotion}`,
    });
    console.log("Generated voice", { voiceId, text, emotion });

    return audio;
  } catch (error) {
    console.log("Error generating voice: " + error);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  genVoice({
    voiceId: "N2lVS1w4EtoT3dr4eOWO",
    text: "Hello, world! This is a test.",
    emotion: "they said with excitement.",
  }).then(console.log);
}

